import { STATE_SCHEMA_NAME } from '@constants/mongo-db';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { StateDocument } from '@utils/schemas/location/state.schema';
import { Document, Types } from 'mongoose';

export type CityDocument = City & Document;

@Schema({ timestamps: true })
export class City {
  @Prop({ required: true })
  name: string;

  @Prop({ type: Types.ObjectId, ref: STATE_SCHEMA_NAME, required: true })
  state_id: Types.ObjectId | StateDocument;
}

export const CitySchema = SchemaFactory.createForClass(City);
