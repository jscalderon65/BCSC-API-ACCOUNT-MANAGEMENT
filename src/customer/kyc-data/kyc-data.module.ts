import {
  CITY_SCHEMA_NAME,
  KYC_DATA_SCHEMA_NAME,
  OCCUPATION_TYPE_SCHEMA_NAME,
  PORTAL_PROFILE_SCHEMA_NAME,
  STATE_SCHEMA_NAME,
} from '@constants/mongo-db';
import { KycDataSchema } from '@kyc-data/entities/kyc-data.entity';
import { KycDataController } from '@kyc-data/kyc-data.controller';
import { KycDataService } from '@kyc-data/kyc-data.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PortalProfile } from '@portal-profile/entities/portal-profile.entity';
import { CitySchema } from '@utils/schemas/location/city.schema';
import { StateSchema } from '@utils/schemas/location/state.schema';
import { OccupationType } from '@utils/schemas/user-identity/occupation-type.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: KYC_DATA_SCHEMA_NAME, schema: KycDataSchema },
      { name: CITY_SCHEMA_NAME, schema: CitySchema },
      { name: STATE_SCHEMA_NAME, schema: StateSchema },
      { name: OCCUPATION_TYPE_SCHEMA_NAME, schema: OccupationType },
      { name: PORTAL_PROFILE_SCHEMA_NAME, schema: PortalProfile },
    ]),
  ],
  controllers: [KycDataController],
  providers: [KycDataService],
})
export class KycDataModule {}
