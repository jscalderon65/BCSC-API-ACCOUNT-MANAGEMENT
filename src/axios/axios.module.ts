import { AxiosService } from '@axios/axios.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [AxiosService],
  exports: [AxiosService],
})
export class AxiosModule {}
