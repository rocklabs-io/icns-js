import {
  AuctionExt,
  ICNSConstants,
  Info,
  Token,
  Types
} from '@/declarations';
import {idlRegistrarFactory} from '@/declarations/did/registrar.did'
import { toBigNumber } from '@/utils';
import { Actor } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';
import {
  ActorAdapter,
  createTokenActor,
  RegistrarActor,
} from '../..';
import { removeIcpSuffix, VerifyDomainName } from '@/utils/format'


/**
 * ICNS Registrar Canister Controller.
 * This class is responsible for handling all the requests related to the ICNS registrar canister.
 */
export class ICNSRegistrarController {
  info: Info | null = null

  /**
   * Create an instance that communicates with icns registrar canister.
   * Some of the functions uses the actor agent identity to identify the user that is interacting.
   * @param {RegistrarActor} registrarActor actor or an anonymous will be used
   */
  constructor(
    private registrarActor: RegistrarActor = ActorAdapter.createAnonymousActor<RegistrarActor>(
      ICNSConstants.canisterIds.registrar,
      idlRegistrarFactory
    )
  ) { }


  /**
   * Get the Common Info from registrar canister.
   * @returns {Promise<Info>}
   */
  async getRegistrarInfo(): Promise<Info> {
    const response = await this.registrarActor.getInfo();
    this.info = response;
    return response;
  }

  /**
   * Verify domain available or not.
   * @param {string} domain Represents domain name.
   * @returns {Promise<boolean>}
   */
  async domainIsAvailable(domain: string): Promise<boolean> {
    if (!VerifyDomainName(domain))
      throw new Error('Incorrect domain name')
    const name = removeIcpSuffix(domain)
    const response = await this.registrarActor.available(name);
    if('err' in response) throw new Error(JSON.stringify(response.err));

    return response.ok;
  }

  /**
   * Get auction state.
   * @param {string} domain Represents domain name.
   * @returns {Promise<[] | [AuctionExt]>} Return auction state.
   */
  async getAuciton(domain: string): Promise<[] | [AuctionExt]> {
    if (!VerifyDomainName(domain))
      throw new Error('Incorrect domain name')
    const name = removeIcpSuffix(domain)
    const response = await this.registrarActor.getAuction(name);
    return response
  }


  /**
   * Get one token balance for a given principal id (wicp as default).
   * @param {string} principalId Represents user identity.
   * @returns {Promise<Token.Balance>} Return balance.
   */
  async getUserBalance(principalId: string): Promise<Token.Balance> {
    const principal = Principal.fromText(principalId);
    const tokenActor = await createTokenActor({}); // default anonymous actor
    const tokenDecimals = await tokenActor.decimals();

    const plugBalance = toBigNumber(
      await tokenActor.balanceOf(principal)
    ).applyDecimals(tokenDecimals);

    const icnsBalance = toBigNumber(
      await this.registrarActor.getBalance(principal)
    ).applyDecimals(tokenDecimals);

    return {
      plug: plugBalance,
      icns: icnsBalance,
      total: plugBalance.plus(icnsBalance),
    };
  }

  /**
   * Get the principal of the agent.
   * It is going to throw if the principal is anonymous.
   * @internal
   * @returns {Promise<Principal>}
   */
  private async getAgentPrincipal(): Promise<Principal> {
    const agent = Actor.agentOf(this.registrarActor);
    if (!agent) throw new Error('Agent principal not found');

    const principal = await agent.getPrincipal();

    if (principal.toString() === Principal.anonymous().toString())
      throw new Error('Agent principal is anonymous');

    return agent.getPrincipal();
  }

  /**
   * Approve transfers from token to registrar canister.
   * This function uses the actor agent identity.
   * This function needs to be called before operate with registrar canister.
   * @param {string | undefined} tokenId the canister id of the token to be approved.
   * @param {Types.Amount} amount the amount of the token to be approved.
   * @returns {Promise<void>} Return void promise.
   */
  async approve(
    tokenId: string | undefined,
    amount: Types.Amount,
  ): Promise<void> {

    const tokenActor = await createTokenActor({
      canisterId: tokenId,
      actorAdapter: ActorAdapter.adapterOf(this.registrarActor),
    });

    const principal = await this.getAgentPrincipal(); //getAgentPrincipal
    const tokenDecimals = await tokenActor.decimals();

    const registrarPrincipal = Principal.fromText(ICNSConstants.canisterIds.registrar);
    const parsedAmount = toBigNumber(amount).removeDecimals(tokenDecimals);

    const parsedAllowance = toBigNumber(
      await tokenActor.allowance(principal, registrarPrincipal)
    );

    if (parsedAllowance.gte(parsedAmount)) return; // if enough allowance, return

    const result = await tokenActor.approve(
      registrarPrincipal,
      parsedAmount.toBigInt()
    );

    if ('Err' in result) throw new Error(JSON.stringify(result.Err));
  }

  /**
   * Get expiry time by domain name.
   * @param {string} domain Domain name, 'hello' for example.
   * @returns {Promise<bigint>} Expiry time (nano seconds).
   */
  async nameExpiry (domain: string): Promise<bigint> {
    if (!VerifyDomainName(domain))
      throw new Error('Incorrect domain name')

    const name = removeIcpSuffix(domain);
    const expiryRes = await this.registrarActor.nameExpiry(name);

    if('err' in expiryRes) throw new Error(JSON.stringify(expiryRes.err));

    return expiryRes.ok;
  }

  /** Get minimum register price by domain.
   * @param {string} domain Domain name, 'hello' for example.
   * @returns {Promise<bigint>} Register price.
   */
  async getMinPrice (domain: string): Promise<bigint> {
    if (!VerifyDomainName(domain))
      throw new Error('Incorrect domain name')

    const name = removeIcpSuffix(domain);
    const priceRes = await this.registrarActor.getMinBidPrice(name);

    if('err' in priceRes) throw new Error(JSON.stringify(priceRes.err));

    return priceRes.ok;
  }

  /**
   * Register a name (sufficient WICP allowance is required).
   * @param {string} domain Domain name, 'hello' for example.
   * @returns {bigint} TxReceipt.
   */
  async instantRegister (
    domain: string
  ): Promise<bigint> {
    if (!VerifyDomainName(domain))
      throw new Error('Incorrect domain name')
    
    const name = removeIcpSuffix(domain);
    const registerTx = await this.registrarActor.instantRegister(name);
    
    if('err' in registerTx) throw new Error(JSON.stringify(registerTx.err));

    return registerTx.ok;
  }

  /**
   * Get minimum renew price by domain name.
   * @param {string} domain domain name to be renewed, 'hello' for example.
   * @returns {bigint} renew price.
   */
  async getRenewPrice(
    domain: string,
  ): Promise<bigint> {
    if (!VerifyDomainName(domain))
      throw new Error('Incorrect domain name')
    const name = removeIcpSuffix(domain)

    const priceRes = await this.registrarActor.getRenewPrice(name);

    if('err' in priceRes) throw new Error(JSON.stringify(priceRes.err));

    return priceRes.ok;
  }

  /**
 * Renew into canister.
 * This function uses the actor agent identity.
 * @param {Types.Number} duration duration of this renew, 1 for 1 year.
 * @param {string} domain domain name to be renewed, 'hello' for example.
 * @returns {Promise<void>} Return void promise.
 */
  async renew(
    domain: string,
    duration: Types.Number,
  ): Promise<void> {
    if (!VerifyDomainName(domain))
      throw new Error('Incorrect domain name')
    const name = removeIcpSuffix(domain)

    const result = await this.registrarActor.renew(
      name,
      toBigNumber(duration).toBigInt()
    );

    if ('err' in result) throw new Error(JSON.stringify(result.err));
  }

  /**
 * Claim into canister.
 * This function uses the actor agent identity.
 * @param {String} domain domain name to be claimed.
 * @returns {Promise<void>} Return void promise.
 */
  async claim(domain: string): Promise<void> {
    if (!VerifyDomainName(domain))
      throw new Error('Incorrect domain name')
    const name = removeIcpSuffix(domain)

    await this.getAgentPrincipal(); //this.registrarActor

    const result = await this.registrarActor.claimName(name);

    if ('err' in result) throw new Error(JSON.stringify(result.err));
  }

  /**
   * Withdraw wicp tokens from registrar canister.
   * This function uses the actor agent identity.
   * @returns {Promise<void>} Return void promise
   */
  async withdraw(): Promise<void> {

    await this.getAgentPrincipal(); //this.registrarActor

    const result = await this.registrarActor.withdraw();

    if ('err' in result) throw new Error(JSON.stringify(result.err));
  }
}