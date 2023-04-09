import type { ActorMethod } from '@dfinity/agent';

export type Address = { 'V001' : AddressV1 };
export interface AddressV1 { 'eth' : string }
export type Result = { 'Ok' : null } |
  { 'Err' : string };
export interface ICNSETHVerify {
  'getAddr' : ActorMethod<[string], Address>,
  'setETHAddr' : ActorMethod<[string, string, Uint8Array, Uint8Array], Result>,
}
