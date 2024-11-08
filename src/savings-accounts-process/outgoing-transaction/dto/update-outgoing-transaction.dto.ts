import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  CreateOutgoingTransactionDto,
  TransactionStatus,
} from './create-outgoing-transaction.dto';
import { IsEnum } from 'class-validator';

export class UpdateOutgoingTransactionDto extends PartialType(
  CreateOutgoingTransactionDto,
) {
  @ApiProperty({
    description: 'Estatus de la operación',
    example: TransactionStatus.Pending,
    enum: TransactionStatus,
  })
  @IsEnum(TransactionStatus)
  status: TransactionStatus;
}
