import { ICNSETHVerifyController, ETHVerifyActor, createETHVerifyActor } from "integrations";
import { mockETHVerifyActor } from "../../mock/actor";

jest.mock('@/integrations/actor');
jest.mock('@dfinity/agent');

(createETHVerifyActor as jest.Mock).mockImplementation(async () => 
  mockETHVerifyActor()
)

describe('create eth verifier', () => {
  let ethVerifyActor: ETHVerifyActor;
  let controller: ICNSETHVerifyController;

  beforeEach(async () => {
    ethVerifyActor = await createETHVerifyActor()
    controller = new ICNSETHVerifyController(ethVerifyActor)
  })

  test('test domain get eth address', async () => {
    expect(controller).toBeDefined;
    const addr = await controller.getETHAddr('xxx.icp')
    console.log(addr)
    expect(addr).toBeDefined();
  })

})