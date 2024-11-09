import { Test, TestingModule } from '@nestjs/testing';

import { EarLiquidationController } from './ear-liquidation.controller';
import { EarLiquidationService } from './ear-liquidation.service';

describe('EarLiquidationController', () => {
  let controller: EarLiquidationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EarLiquidationController],
      providers: [EarLiquidationService],
    }).compile();

    controller = module.get<EarLiquidationController>(EarLiquidationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
