import {
  SAVINGS_ACCOUNT_SCHEMA_NAME,
  TRANSACTION_STATUS_SCHEMA_NAME,
} from '@constants/mongo-db';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SavingsAccountDocument } from '@savings-accounts/entities/savings-account.entity';
import { TransactionStatusDocument } from '@utils/schemas/process/transaction-status.schema';
import { Document, Types } from 'mongoose';

export type TransactionDocument = Transaction & Document;

@Schema({ timestamps: true })
export class Transaction {
  @Prop({
    type: Types.ObjectId,
    ref: SAVINGS_ACCOUNT_SCHEMA_NAME,
    required: true,
  })
  source_account_id: string | SavingsAccountDocument;

  @Prop({
    type: Types.ObjectId,
    ref: SAVINGS_ACCOUNT_SCHEMA_NAME,
    required: true,
  })
  destination_account_id: string | SavingsAccountDocument;

  @Prop({ required: true })
  value: number;

  @Prop({
    type: Types.ObjectId,
    ref: TRANSACTION_STATUS_SCHEMA_NAME,
    required: true,
  })
  status_id: string | TransactionStatusDocument;

  @Prop({ required: true })
  description: string;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
