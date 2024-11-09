import { Test, TestingModule } from '@nestjs/testing';

import { EarLiquidationService } from './ear-liquidation.service';

describe('EarLiquidationService', () => {
  let service: EarLiquidationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EarLiquidationService],
    }).compile();

    service = module.get<EarLiquidationService>(EarLiquidationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
