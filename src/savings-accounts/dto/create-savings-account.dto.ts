import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateSavingsAccountDto {
  @ApiProperty({
    description: 'ID del perfil del cliente',
    /* example: faker.database.mongodbObjectId(), */
    example: '672d89fbc08fede246f7440f',
  })
  @IsString()
  customer_id: string;

  @ApiProperty({
    description: 'Saldo inicial de la cuenta',
    example: faker.number.int({ min: 1000000, max: 10000000 }),
  })
  @IsNumber()
  balance: number;

  @ApiProperty({
    description: 'Indicdor de si la cuenta está activa',
    example: true,
  })
  @IsBoolean()
  is_active: boolean;
}
