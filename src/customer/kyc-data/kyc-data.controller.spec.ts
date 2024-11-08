import { Test, TestingModule } from '@nestjs/testing';

import { KycDataController } from './kyc-data.controller';
import { KycDataService } from './kyc-data.service';

describe('KycDataController', () => {
  let controller: KycDataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KycDataController],
      providers: [KycDataService],
    }).compile();

    controller = module.get<KycDataController>(KycDataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
