# Class: ICNSRegistrarController

ICNS Registrar Canister Controller.
This class is responsible for handling all the requests related to the ICNS registrar canister.

## Table of contents

### Methods

- [approve](ICNSRegistrarController.md#approve)
- [claim](ICNSRegistrarController.md#claim)
- [domainIsAvailable](ICNSRegistrarController.md#domainisavailable)
- [getAuciton](ICNSRegistrarController.md#getauciton)
- [getMinPrice](ICNSRegistrarController.md#getminprice)
- [getRegistrarInfo](ICNSRegistrarController.md#getregistrarinfo)
- [getRenewPrice](ICNSRegistrarController.md#getrenewprice)
- [getUserBalance](ICNSRegistrarController.md#getuserbalance)
- [instantRegister](ICNSRegistrarController.md#instantregister)
- [nameExpiry](ICNSRegistrarController.md#nameexpiry)
- [renew](ICNSRegistrarController.md#renew)
- [withdraw](ICNSRegistrarController.md#withdraw)

### Constructors

- [constructor](ICNSRegistrarController.md#constructor)

### Properties

- [info](ICNSRegistrarController.md#info)

## Methods

### approve

▸ **approve**(`tokenId`, `amount`): `Promise`<`void`\>

Approve transfers from token to registrar canister.
This function uses the actor agent identity.
This function needs to be called before operate with registrar canister.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tokenId` | `undefined` \| `string` | the canister id of the token to be approved. |
| `amount` | `string` | the amount of the token to be approved. |

#### Returns

`Promise`<`void`\>

Return void promise.

___

### claim

▸ **claim**(`domain`): `Promise`<`void`\>

Claim into canister.
This function uses the actor agent identity.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `domain` | `string` | domain name to be claimed. |

#### Returns

`Promise`<`void`\>

Return void promise.

___

### domainIsAvailable

▸ **domainIsAvailable**(`domain`): `Promise`<`boolean`\>

Verify domain available or not.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `domain` | `string` | Represents domain name. |

#### Returns

`Promise`<`boolean`\>

___

### getAuciton

▸ **getAuciton**(`domain`): `Promise`<[] \| [[`AuctionExt`](../interfaces/AuctionExt.md)]\>

Get auction state.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `domain` | `string` | Represents domain name. |

#### Returns

`Promise`<[] \| [[`AuctionExt`](../interfaces/AuctionExt.md)]\>

Return auction state.

___

### getMinPrice

▸ **getMinPrice**(`domain`): `Promise`<`bigint`\>

Get minimum register price by domain.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `domain` | `string` | Domain name, 'hello' for example. |

#### Returns

`Promise`<`bigint`\>

Register price.

___

### getRegistrarInfo

▸ **getRegistrarInfo**(): `Promise`<[`Info`](../interfaces/Info.md)\>

Get the Common Info from registrar canister.

#### Returns

`Promise`<[`Info`](../interfaces/Info.md)\>

___

### getRenewPrice

▸ **getRenewPrice**(`domain`): `Promise`<`bigint`\>

Get minimum renew price by domain name.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `domain` | `string` | domain name to be renewed, 'hello' for example. |

#### Returns

`Promise`<`bigint`\>

renew price.

___

### getUserBalance

▸ **getUserBalance**(`principalId`): `Promise`<[`Balance`](../modules/Token.md#balance)\>

Get one token balance for a given principal id (wicp as default).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `principalId` | `string` | Represents user identity. |

#### Returns

`Promise`<[`Balance`](../modules/Token.md#balance)\>

Return balance.

___

### instantRegister

▸ **instantRegister**(`domain`): `Promise`<`bigint`\>

Register a name (sufficient WICP allowance is required).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `domain` | `string` | Domain name, 'hello' for example. |

#### Returns

`Promise`<`bigint`\>

TxReceipt.

___

### nameExpiry

▸ **nameExpiry**(`domain`): `Promise`<`bigint`\>

Get expiry time by domain name.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `domain` | `string` | Domain name, 'hello' for example. |

#### Returns

`Promise`<`bigint`\>

Expiry time (nano seconds).

___

### renew

▸ **renew**(`domain`, `duration`): `Promise`<`void`\>

Renew into canister.
This function uses the actor agent identity.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `domain` | `string` | domain name to be renewed, 'hello' for example. |
| `duration` | [`Number`](../modules/Types.md#number) | duration of this renew, 1 for 1 year. |

#### Returns

`Promise`<`void`\>

Return void promise.

___

### withdraw

▸ **withdraw**(): `Promise`<`void`\>

Withdraw wicp tokens from registrar canister.
This function uses the actor agent identity.

#### Returns

`Promise`<`void`\>

Return void promise

## Constructors

### constructor

• **new ICNSRegistrarController**(`registrarActor?`)

Create an instance that communicates with icns registrar canister.
Some of the functions uses the actor agent identity to identify the user that is interacting.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `registrarActor` | `RegistrarActor` | actor or an anonymous will be used |

## Properties

### info

• **info**: ``null`` \| [`Info`](../interfaces/Info.md) = `null`
