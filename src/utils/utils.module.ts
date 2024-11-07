import {
  CITY_SCHEMA_NAME,
  DOCUMENT_TYPE_SCHEMA_NAME,
  STATE_SCHEMA_NAME,
} from '@constants/mongo-db';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CitySchema } from '@utils/schemas/location/city.schema';
import { StateSchema } from '@utils/schemas/location/state.schema';
import { DocumentTypeSchema } from '@utils/schemas/user-identity/document-type.schema';
import { UtilsController } from '@utils/utils.controller';
import { UtilsService } from '@utils/utils.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: CITY_SCHEMA_NAME, schema: CitySchema }]),
    MongooseModule.forFeature([
      { name: STATE_SCHEMA_NAME, schema: StateSchema },
    ]),
    MongooseModule.forFeature([
      { name: DOCUMENT_TYPE_SCHEMA_NAME, schema: DocumentTypeSchema },
    ]),
  ],
  controllers: [UtilsController],
  providers: [UtilsService],
})
export class UtilsModule {}
