import { SAVINGS_ACCOUNT_SCHEMA_NAME } from '@constants/mongo-db';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SavingsAccountDocument } from '@savings-accounts/entities/savings-account.entity';
import { Document, Types } from 'mongoose';

export type EarLiquidationDocument = EarLiquidation & Document;

@Schema({ timestamps: true })
export class EarLiquidation extends Document {
  @Prop({
    type: Types.ObjectId,
    ref: SAVINGS_ACCOUNT_SCHEMA_NAME,
    required: true,
  })
  account_id: string | SavingsAccountDocument;

  @Prop({ required: true })
  annual_effective_rate: number;

  @Prop({ required: true })
  liquidation_base: number;

  @Prop({ required: true })
  generated_interest: number;
}

export const EarLiquidationSchema =
  SchemaFactory.createForClass(EarLiquidation);
