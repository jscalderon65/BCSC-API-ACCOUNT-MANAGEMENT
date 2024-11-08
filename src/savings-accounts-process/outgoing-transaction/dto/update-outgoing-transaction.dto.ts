import { PartialType } from '@nestjs/swagger';

import { CreateOutgoingTransactionDto } from './create-outgoing-transaction.dto';

export class UpdateOutgoingTransactionDto extends PartialType(
  CreateOutgoingTransactionDto,
) {}
