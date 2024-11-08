import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OccupationTypeDocument = OccupationType & Document;

@Schema({ timestamps: true })
export class OccupationType {
  @Prop({ required: true, unique: true })
  name: string;
}

export const OccupationTypeSchema =
  SchemaFactory.createForClass(OccupationType);
