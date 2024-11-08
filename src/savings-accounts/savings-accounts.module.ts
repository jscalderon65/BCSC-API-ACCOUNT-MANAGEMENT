import {
  PORTAL_PROFILE_SCHEMA_NAME,
  SAVINGS_ACCOUNT_SCHEMA_NAME,
} from '@constants/mongo-db';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PortalProfile } from '@portal-profile/entities/portal-profile.entity';
import { SavingsAccountSchema } from '@savings-accounts/entities/savings-account.entity';
import { SavingsAccountsController } from '@savings-accounts/savings-accounts.controller';
import { SavingsAccountsService } from '@savings-accounts/savings-accounts.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SAVINGS_ACCOUNT_SCHEMA_NAME, schema: SavingsAccountSchema },
      { name: PORTAL_PROFILE_SCHEMA_NAME, schema: PortalProfile },
    ]),
  ],
  controllers: [SavingsAccountsController],
  providers: [SavingsAccountsService],
})
export class SavingsAccountsModule {}
