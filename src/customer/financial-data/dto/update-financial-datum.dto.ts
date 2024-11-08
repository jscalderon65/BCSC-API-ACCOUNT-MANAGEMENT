import { CreateFinancialDataDto } from '@financial-data/dto/create-financial-datum.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateFinancialDatumDto extends PartialType(
  CreateFinancialDataDto,
) {}
