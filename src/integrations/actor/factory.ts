import { ICNSConstants } from '@/declarations';
import {
  idlETHVerifyFactory,
  idlFavoriteFactory,
  idlRegistrarFactory,
  idlRegistryFactory,
  idlResolverFactory,
  idlReverseRegistrarFactory,
  idlWICPFactory
 } from '@/declarations/did';

import {
  ICNSETHVerify,
  ICNSFavorite,
  ICNSRegistrar,
  ICNSRegistry,
  ICNSResolver,
  ICNSReverseRegistrar,
  ICNSToken
} from "@/declarations/did/models"
import { ActorAdapter } from './adapter';

/**
 * Options for creating an CanisterActor.
 * @param {string} canisterId  Canister ID, default is applied
 * @param {ActorAdapter} actorAdapter ActorAdapter instance with or without a provider, default is applied
 * @internal
 */
export interface CreateCanisterActorOptions {
  canisterId?: string;
  actorAdapter?: ActorAdapter;
}

/**
 * Type of RegistrarActor.
 * @internal
 */
export type RegistrarActor = ActorAdapter.Actor<ICNSRegistrar>;

/**
 * Creates a Registrar canister actor.
 * If no option is provided, the actor will be created using the default canister options.
 * @param {CreateCanisterActorOptions} options Options for creating the RegistrarActor
 * @returns {RegistrarActor} actor instance
 * @internal
 */
export const createRegistrarActor = ({
  canisterId = ICNSConstants.canisterIds.registrar,
  actorAdapter = new ActorAdapter(), // defalut anonymous
}: CreateCanisterActorOptions = {}): Promise<RegistrarActor> => {
  return actorAdapter.createActor(canisterId, idlRegistrarFactory);
};


/**
 * Type of RegistryActor.
 * @internal
 */
export type RegistryActor = ActorAdapter.Actor<ICNSRegistry>;

/**
 * Creates a Registry canister actor.
 * If no option is provided, the actor will be created using the default canister options.
 * @internal
 * @param {CreateCanisterActorOptions} options Options for creating the RegistryActor
 * @returns {RegistryActor} actor instance
 */
export const createRegistryActor = ({
  canisterId = ICNSConstants.canisterIds.registry,
  actorAdapter = new ActorAdapter(),
}: CreateCanisterActorOptions = {}): Promise<RegistryActor> => {
  return actorAdapter.createActor(canisterId, idlRegistryFactory);
};

 /**
 * Type of ResolverActor.
 * @internal
 */
export type ResolverActor = ActorAdapter.Actor<ICNSResolver>;

/**
 * Creates a Resolver canister actor.
 * If no option is provided, the actor will be created using the default canister options.
 * @param {CreateCanisterActorOptions} options Options for creating the ResolverActor
 * @returns {ResolverActor} actor instance
 * @internal
 */
export const createResolverActor = ({
  canisterId = ICNSConstants.canisterIds.resolver,
  actorAdapter = new ActorAdapter(),
}: CreateCanisterActorOptions = {}): Promise<ResolverActor> => {
  return actorAdapter.createActor(canisterId, idlResolverFactory);
};

 /**
 * Type of ReverseActor.
 * @internal
 */
  export type ReverseActor = ActorAdapter.Actor<ICNSReverseRegistrar>;

  /**
   * Creates a Reverse canister actor.
   * If no option is provided, the actor will be created using the default canister options.
   * @internal
   * @param {CreateCanisterActorOptions} options Options for creating the ReverseActor
   * @returns {ReverseActor} actor instance
   */
  export const createReverseActor = ({
    canisterId = ICNSConstants.canisterIds.reverse_registrar,
    actorAdapter = new ActorAdapter(),
  }: CreateCanisterActorOptions = {}): Promise<ReverseActor> => {
    return actorAdapter.createActor(canisterId, idlReverseRegistrarFactory);
  };

/**
 * Type of FavoriteActor.
 * @internal
 */
 export type FavoriteActor = ActorAdapter.Actor<ICNSFavorite>;

 /**
  * Creates a Favorite canister actor.
  * If no option is provided, the actor will be created using the default canister options.
  * @param {CreateCanisterActorOptions} options Options for creating the FavoriteActor
  * @returns {FavoriteActor} actor instance
  * @internal
  */
 export const createFavoriteActor = ({
   canisterId = ICNSConstants.canisterIds.favorite,
   actorAdapter = new ActorAdapter(),
 }: CreateCanisterActorOptions = {}): Promise<FavoriteActor> => {
   return actorAdapter.createActor(canisterId, idlFavoriteFactory);
 };

 /**
 * Type of WICPActor.
 * @internal
 */
export type TokenActor = ActorAdapter.Actor<ICNSToken>;

/**
 * Creates a DIP20 Token canister actor.
 * If no option is provided, the actor will be created using the default canister options.
 * @param {CreateCanisterActorOptions} options Options for creating the TokenActor
 * @returns {TokenActor} actor instance
 * @internal
 */
export const createTokenActor = ({
  canisterId = ICNSConstants.canisterIds.WICP,
  actorAdapter = new ActorAdapter(),
}: CreateCanisterActorOptions): Promise<TokenActor> => {
  return actorAdapter.createActor(canisterId, idlWICPFactory);
};


 /**
 * Type of WICPActor.
 * @internal
 */
 export type ETHVerifyActor = ActorAdapter.Actor<ICNSETHVerify>;

/**
 * Creates a DIP20 Token canister actor.
 * If no option is provided, the actor will be created using the default canister options.
 * @param {CreateCanisterActorOptions} options Options for creating the TokenActor
 * @returns {ETHVerifyActor} actor instance
 * @internal
 */
export const createETHVerifyActor = ({
  canisterId = ICNSConstants.canisterIds.ethVerfy,
  actorAdapter = new ActorAdapter()
}: CreateCanisterActorOptions = {}): Promise<ETHVerifyActor> => {
  return actorAdapter.createActor(canisterId, idlETHVerifyFactory);
};