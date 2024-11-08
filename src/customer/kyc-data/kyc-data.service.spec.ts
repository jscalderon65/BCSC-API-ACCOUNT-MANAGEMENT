import { Test, TestingModule } from '@nestjs/testing';

import { KycDataService } from './kyc-data.service';

describe('KycDataService', () => {
  let service: KycDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KycDataService],
    }).compile();

    service = module.get<KycDataService>(KycDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
