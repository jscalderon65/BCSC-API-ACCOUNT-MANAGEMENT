import { PORTAL_PROFILE_SCHEMA_NAME } from '@constants/mongo-db';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { PortalProfileDocument } from '@portal-profile/entities/portal-profile.entity';
import { Document, Types } from 'mongoose';

export type SavingsAccountDocument = SavingsAccount & Document;

@Schema({ timestamps: true })
export class SavingsAccount extends Document {
  @Prop({
    type: Types.ObjectId,
    ref: PORTAL_PROFILE_SCHEMA_NAME,
    required: true,
  })
  customer_id: string | PortalProfileDocument;

  @Prop({ required: true })
  balance: number;

  @Prop({ required: true, default: true })
  is_active: boolean;

  @Prop({ required: true, unique: true })
  account_number: string;
}

export const SavingsAccountSchema =
  SchemaFactory.createForClass(SavingsAccount);
