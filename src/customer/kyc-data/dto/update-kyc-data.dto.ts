import { PartialType } from '@nestjs/swagger';

import { CreateKycDataDto } from './create-kyc-data.dto';

export class UpdateKycDataDto extends PartialType(CreateKycDataDto) {}
