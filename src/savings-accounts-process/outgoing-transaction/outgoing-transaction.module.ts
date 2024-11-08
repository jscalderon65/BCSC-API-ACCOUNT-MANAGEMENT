import { Module } from '@nestjs/common';
import { OutgoingTransactionService } from './outgoing-transaction.service';
import { OutgoingTransactionController } from './outgoing-transaction.controller';
import {
  OUTGOING_TRANSACTION_SCHEMA_NAME,
  SAVINGS_ACCOUNT_SCHEMA_NAME,
} from '@constants/mongo-db';
import { OutgoingTransactionSchema } from './entities/outgoing-transaction.entity';
import { SavingsAccountSchema } from '@savings-accounts/entities/savings-account.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SAVINGS_ACCOUNT_SCHEMA_NAME, schema: SavingsAccountSchema },
      {
        name: OUTGOING_TRANSACTION_SCHEMA_NAME,
        schema: OutgoingTransactionSchema,
      },
    ]),
  ],
  controllers: [OutgoingTransactionController],
  providers: [OutgoingTransactionService],
})
export class OutgoingTransactionModule {}
