/*

EAR = Effective Annual Rate

*/

import {
  EAR_LIQUIDATION_SCHEMA_NAME,
  SAVINGS_ACCOUNT_SCHEMA_NAME,
} from '@constants/mongo-db';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SavingsAccountSchema } from '@savings-accounts/entities/savings-account.entity';

import { EarLiquidationController } from './ear-liquidation.controller';
import { EarLiquidationService } from './ear-liquidation.service';
import { EarLiquidationSchema } from './entities/ear-liquidation.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SAVINGS_ACCOUNT_SCHEMA_NAME, schema: SavingsAccountSchema },
      {
        name: EAR_LIQUIDATION_SCHEMA_NAME,
        schema: EarLiquidationSchema,
      },
    ]),
  ],
  controllers: [EarLiquidationController],
  providers: [EarLiquidationService],
})
export class EarLiquidationModule {}
