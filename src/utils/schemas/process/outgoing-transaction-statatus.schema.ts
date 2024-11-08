import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OutgoingTransactionStatusDocument = OutgoingTransactionStatus &
  Document;

@Schema({ timestamps: true })
export class OutgoingTransactionStatus {
  @Prop({ required: true, unique: true })
  code: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;
}

export const OutgoingTransactionStatusSchema = SchemaFactory.createForClass(
  OutgoingTransactionStatus,
);
