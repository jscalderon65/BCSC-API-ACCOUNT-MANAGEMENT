import { PORTAL_PROFILE_SCHEMA_NAME } from '@constants/mongo-db';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { PortalProfileDocument } from '@portal-profile/entities/portal-profile.entity';
import { Document, Types } from 'mongoose';

export type FinancialDataDocument = FinancialData & Document;

@Schema({ timestamps: true })
export class FinancialData extends Document {
  @Prop({
    type: Types.ObjectId,
    ref: PORTAL_PROFILE_SCHEMA_NAME,
    required: true,
  })
  customer_id: string | PortalProfileDocument;

  @Prop({ required: true })
  monthlyIncome: number;

  @Prop({ required: true })
  monthlyExpenses: number;

  @Prop({ required: true })
  totalDebts: number;

  @Prop({ required: true })
  totalSavings: number;
}

export const FinancialDataSchema = SchemaFactory.createForClass(FinancialData);
