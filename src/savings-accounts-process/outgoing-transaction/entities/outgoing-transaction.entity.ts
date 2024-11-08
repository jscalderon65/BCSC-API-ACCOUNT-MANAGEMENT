import { SAVINGS_ACCOUNT_SCHEMA_NAME } from '@constants/mongo-db';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SavingsAccountDocument } from '@savings-accounts/entities/savings-account.entity';
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

  @Prop({ required: true })
  status: string;

  @Prop({ required: true })
  description: string;
}

export const OutgoingTransactionSchema =
  SchemaFactory.createForClass(OutgoingTransaction);
