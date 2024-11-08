import { DOCUMENT_TYPE_SCHEMA_NAME } from '@constants/mongo-db';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { DocumentTypeDocument } from '@utils/schemas/user-identity/document-type.schema';
import { Document, Types } from 'mongoose';
export type PortalProfileDocument = PortalProfile & Document;

@Schema({ timestamps: true })
export class PortalProfile {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  phone_number: string;

  @Prop({ required: true })
  first_name: string;

  @Prop({ required: true })
  last_name: string;

  @Prop({ required: true })
  birth_date: Date;

  @Prop({
    type: Types.ObjectId,
    ref: DOCUMENT_TYPE_SCHEMA_NAME,
    required: true,
  })
  document_type_id: Types.ObjectId | DocumentTypeDocument;

  @Prop({ required: true, unique: true })
  document_number: string;
}

export const PortalProfileSchema = SchemaFactory.createForClass(PortalProfile);
