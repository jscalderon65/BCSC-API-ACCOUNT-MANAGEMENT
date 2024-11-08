import { AxiosModule } from '@axios/axios.module';
import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { UtilsModule } from '@utils/utils.module';
import { mongooseConnection } from 'src/common/db/mongo-db-connection';
import { AllExceptionsFilter } from 'src/common/interceptors/global-exception.interceptor';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FinancialDataModule } from './customer/financial-data/financial-data.module';
import { KycDataModule } from './customer/kyc-data/kyc-data.module';
import { PortalProfileModule } from './customer/portal-profile/portal-profile.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => mongooseConnection,
    }),
    UtilsModule,
    AxiosModule,
    PortalProfileModule,
    KycDataModule,
    FinancialDataModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
