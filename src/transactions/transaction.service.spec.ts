import { Test, TestingModule } from '@nestjs/testing';

import { OutgoingTransactionService } from './transaction.service';

describe('OutgoingTransactionService', () => {
  let service: OutgoingTransactionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OutgoingTransactionService],
    }).compile();

    service = module.get<OutgoingTransactionService>(
      OutgoingTransactionService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
