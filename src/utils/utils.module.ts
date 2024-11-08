import {
  CITY_SCHEMA_NAME,
  DOCUMENT_TYPE_SCHEMA_NAME,
  OCCUPATION_TYPE_SCHEMA_NAME,
  STATE_SCHEMA_NAME,
  TRANSACTION_STATUS_SCHEMA_NAME,
} from '@constants/mongo-db';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CitySchema } from '@utils/schemas/location/city.schema';
import { StateSchema } from '@utils/schemas/location/state.schema';
import { TransactionStatusSchema } from '@utils/schemas/process/transaction-status.schema';
import { DocumentTypeSchema } from '@utils/schemas/user-identity/document-type.schema';
import { OccupationTypeSchema } from '@utils/schemas/user-identity/occupation-type.schema';
import { UtilsController } from '@utils/utils.controller';
import { UtilsService } from '@utils/utils.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CITY_SCHEMA_NAME, schema: CitySchema },
      { name: STATE_SCHEMA_NAME, schema: StateSchema },
      { name: DOCUMENT_TYPE_SCHEMA_NAME, schema: DocumentTypeSchema },
      { name: OCCUPATION_TYPE_SCHEMA_NAME, schema: OccupationTypeSchema },
      {
        name: TRANSACTION_STATUS_SCHEMA_NAME,
        schema: TransactionStatusSchema,
      },
    ]),
  ],
  controllers: [UtilsController],
  providers: [UtilsService],
})
export class UtilsModule {}
