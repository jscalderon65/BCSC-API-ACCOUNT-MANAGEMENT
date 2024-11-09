import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateTransactionDto {
  @ApiProperty({
    description: 'ID de la cuenta de ahorros',
    /* example: faker.database.mongodbObjectId(), */
    example: '672e658db946b0be13e12643',
  })
  @IsString()
  source_account_id: string;

  @ApiProperty({
    description: 'ID de la cuenta de destino',
    /* example: faker.database.mongodbObjectId(), */
    example: '672e7b65d9eae98ce5427e7e',
  })
  @IsString()
  destination_account_id: string;

  @ApiProperty({
    description: 'Valor de la operación',
    example: faker.number.int({ min: 1000000, max: 100000000 }),
  })
  @IsNumber()
  value: number;

  @ApiProperty({
    description: 'Descripción de la operación',
    example: faker.lorem.sentence(),
  })
  @IsString()
  description: string;
}
