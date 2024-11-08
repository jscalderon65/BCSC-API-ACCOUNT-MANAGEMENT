import {
  OUTGOING_TRANSACTION_STATUS_SCHEMA_NAME,
  SAVINGS_ACCOUNT_SCHEMA_NAME,
} from '@constants/mongo-db';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SavingsAccountDocument } from '@savings-accounts/entities/savings-account.entity';
import { OutgoingTransactionStatusDocument } from '@utils/schemas/process/outgoing-transaction-statatus.schema';
import { Document, Types } from 'mongoose';

export type OutgoingTransactionDocument = OutgoingTransaction & Document;

@Schema({ timestamps: true })
export class OutgoingTransaction {
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
    ref: OUTGOING_TRANSACTION_STATUS_SCHEMA_NAME,
    required: true,
  })
  status_id: string | OutgoingTransactionStatusDocument;

  @Prop({ required: true })
  description: string;
}

export const OutgoingTransactionSchema =
  SchemaFactory.createForClass(OutgoingTransaction);
