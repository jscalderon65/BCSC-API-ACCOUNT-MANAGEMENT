import {
  FINANCIAL_DATA_SCHEMA_NAME,
  PORTAL_PROFILE_SCHEMA_NAME,
} from '@constants/mongo-db';
import { FinancialDataSchema } from '@financial-data/entities/financial-datum.entity';
import { FinancialDataController } from '@financial-data/financial-data.controller';
import { FinancialDataService } from '@financial-data/financial-data.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PortalProfile } from '@portal-profile/entities/portal-profile.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FINANCIAL_DATA_SCHEMA_NAME, schema: FinancialDataSchema },
      { name: PORTAL_PROFILE_SCHEMA_NAME, schema: PortalProfile },
    ]),
  ],
  controllers: [FinancialDataController],
  providers: [FinancialDataService],
})
export class FinancialDataModule {}
