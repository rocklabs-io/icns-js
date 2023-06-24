import 'big-number';
import { Actor } from "@dfinity/agent";
import { ICNSRegistrarController, RegistrarActor, createRegistrarActor } from "integrations";
import { mockAgent, mockRegistrarActor } from "../../mock/actor";

jest.mock('@/integrations/actor');
jest.mock('@dfinity/agent');

(createRegistrarActor as jest.Mock).mockImplementation(async () => 
mockRegistrarActor()
);

(Actor.agentOf as jest.Mock).mockImplementation(async () => 
  mockAgent()
);

describe('create resolver', () => {
  let registrarActor: RegistrarActor;
  let controller: ICNSRegistrarController;

  beforeEach(() => {
    registrarActor = mockRegistrarActor();
    controller = new ICNSRegistrarController(registrarActor)
  })

  test('test getMinPrice', async () => {
    const price = controller.getMinPrice('xxxx.icp');
    expect(price).toBeDefined();
  })

  test('test instant registrar', async () => {
    const tx = controller.instantRegister('xxxx.icp');
    expect(tx).toBeDefined();
  })

  test('test renew price', async () => {
    const price = controller.getRenewPrice('xxxx.icp');
    expect(price).toBeDefined();
  })

  test('test renew', async () => {
    const price = controller.renew('xxxx.icp', 1);
    expect(price).toBeDefined();
  })
})