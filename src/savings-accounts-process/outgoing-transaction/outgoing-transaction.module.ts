import {
  OUTGOING_TRANSACTION_SCHEMA_NAME,
  OUTGOING_TRANSACTION_STATUS_SCHEMA_NAME,
  SAVINGS_ACCOUNT_SCHEMA_NAME,
} from '@constants/mongo-db';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OutgoingTransactionSchema } from '@outgoing-transaction/entities/outgoing-transaction.entity';
import { OutgoingTransactionController } from '@outgoing-transaction/outgoing-transaction.controller';
import { OutgoingTransactionService } from '@outgoing-transaction/outgoing-transaction.service';
import { SavingsAccountSchema } from '@savings-accounts/entities/savings-account.entity';
import { OutgoingTransactionStatusSchema } from '@utils/schemas/process/outgoing-transaction-statatus.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SAVINGS_ACCOUNT_SCHEMA_NAME, schema: SavingsAccountSchema },
      {
        name: OUTGOING_TRANSACTION_SCHEMA_NAME,
        schema: OutgoingTransactionSchema,
      },
      {
        name: OUTGOING_TRANSACTION_STATUS_SCHEMA_NAME,
        schema: OutgoingTransactionStatusSchema,
      },
    ]),
  ],
  controllers: [OutgoingTransactionController],
  providers: [OutgoingTransactionService],
})
export class OutgoingTransactionModule {}
