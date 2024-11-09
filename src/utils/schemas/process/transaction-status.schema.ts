import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TransactionStatusDocument = TransactionStatus & Document;

@Schema({ timestamps: true })
export class TransactionStatus {
  @Prop({ required: true, unique: true })
  code: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;
}

export const TransactionStatusSchema =
  SchemaFactory.createForClass(TransactionStatus);
