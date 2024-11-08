import { PartialType } from '@nestjs/swagger';
import { CreateSavingsAccountDto } from '@savings-accounts/dto/create-savings-account.dto';

export class UpdateSavingsAccountDto extends PartialType(
  CreateSavingsAccountDto,
) {}
