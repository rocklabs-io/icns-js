import {
  ICNSConstants, idlETHVerifyFactory,
} from '@/declarations';
import {
  ActorAdapter,
  ETHVerifyActor,
} from '../..';

import { addIcpSuffix, VerifyDomainName } from '@/utils/format'


/**
 * ICNS Eth verifier Controller.
 * This class is responsible for handling all the requests related to the ICNS eth-verify canister.
 */
export class ICNSETHVerifyController {

  /**
   * Create an instance that communicates with icns reverse registrar canister.
   * Some of the functions uses the actor agent identity to identify the user that is interacting.
   * @param {ETHVerifyActor} ethVerifyActor actor or an anonymous will be used
   */
  constructor(
    private ethVerifyActor: ETHVerifyActor = ActorAdapter.createAnonymousActor<ETHVerifyActor>(
      ICNSConstants.canisterIds.ethVerfy,
      idlETHVerifyFactory
    )
  ) { }

  /**
   * Get ICNS domain name's verified ETH Address
   * @param {string} domain Domain name
   * @returns {Promise<string>} Return domain name's verified ETH address string. If it has no verified address, return "".
   */
  async getETHAddr(domain: string): Promise<string>{
    if (!VerifyDomainName(domain))
      throw new Error('Incorrect domain name')
    
    const name = addIcpSuffix(domain) // guarantee the domain name with .icp suffix

    const result = await this.ethVerifyActor.getAddr(name)
    return Promise.resolve(result?.V001?.eth)
  }
}