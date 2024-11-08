import {
  CITY_SCHEMA_NAME,
  OCCUPATION_TYPE_SCHEMA_NAME,
  PORTAL_PROFILE_SCHEMA_NAME,
  STATE_SCHEMA_NAME,
} from '@constants/mongo-db';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { PortalProfileDocument } from '@portal-profile/entities/portal-profile.entity';
import { CityDocument } from '@utils/schemas/location/city.schema';
import { StateDocument } from '@utils/schemas/location/state.schema';
import { OccupationTypeDocument } from '@utils/schemas/user-identity/occupation-type.schema';
import { Document, Types } from 'mongoose';

export type KycDataDocument = KycData & Document;

@Schema({ timestamps: true })
export class KycData {
  @Prop({
    type: Types.ObjectId,
    ref: PORTAL_PROFILE_SCHEMA_NAME,
    required: true,
  })
  customer_id: string | PortalProfileDocument;

  @Prop({
    type: Types.ObjectId,
    ref: OCCUPATION_TYPE_SCHEMA_NAME,
    required: true,
  })
  occupation_type_id: string | OccupationTypeDocument;

  @Prop({ type: Types.ObjectId, ref: CITY_SCHEMA_NAME, required: true })
  city_id: string | CityDocument;

  @Prop({ type: Types.ObjectId, ref: STATE_SCHEMA_NAME, required: true })
  state_id: Types.ObjectId | StateDocument;

  @Prop({ type: String, required: true })
  address: string;

  @Prop({
    type: String,
    required: true,
  })
  postal_code: string;
}

export const KycDataSchema = SchemaFactory.createForClass(KycData);
