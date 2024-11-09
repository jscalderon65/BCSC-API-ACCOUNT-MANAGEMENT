import {
  SAVINGS_ACCOUNT_SCHEMA_NAME,
  TRANSACTION_SCHEMA_NAME,
  TRANSACTION_STATUS_SCHEMA_NAME,
} from '@constants/mongo-db';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SavingsAccountSchema } from '@savings-accounts/entities/savings-account.entity';
import { TransactionSchema } from '@transactions/entities/transaction.entity';
import { TransactionController } from '@transactions/transaction.controller';
import { TransactionService } from '@transactions/transaction.service';
import { TransactionStatusSchema } from '@utils/schemas/process/transaction-status.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SAVINGS_ACCOUNT_SCHEMA_NAME, schema: SavingsAccountSchema },
      {
        name: TRANSACTION_SCHEMA_NAME,
        schema: TransactionSchema,
      },
      {
        name: TRANSACTION_STATUS_SCHEMA_NAME,
        schema: TransactionStatusSchema,
      },
    ]),
  ],
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionModule {}
