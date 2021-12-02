import { Test, TestingModule } from '@nestjs/testing';
import { VueloController } from './vuelo.controller';

describe('VueloController', () => {
  let controller: VueloController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VueloController],
    }).compile();

    controller = module.get<VueloController>(VueloController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
