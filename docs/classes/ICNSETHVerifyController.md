# Class: ICNSETHVerifyController

ICNS Eth verifier Controller.
This class is responsible for handling all the requests related to the ICNS eth-verify canister.

## Table of contents

### Constructors

- [constructor](ICNSETHVerifyController.md#constructor)

### Methods

- [getETHAddr](ICNSETHVerifyController.md#getethaddr)

## Constructors

### constructor

• **new ICNSETHVerifyController**(`ethVerifyActor?`)

Create an instance that communicates with icns reverse registrar canister.
Some of the functions uses the actor agent identity to identify the user that is interacting.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ethVerifyActor` | `ETHVerifyActor` | actor or an anonymous will be used |

## Methods

### getETHAddr

▸ **getETHAddr**(`domain`): `Promise`<`string`\>

Get ICNS domain name's verified ETH Address

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `domain` | `string` | Domain name |

#### Returns

`Promise`<`string`\>

Return domain name's verified ETH address string. If it has no verified address, return "".
