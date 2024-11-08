import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateFinancialDataDto {
  @ApiProperty({
    description: 'ID del perfil del cliente',
    example: faker.database.mongodbObjectId(),
    /* example: '672d89fbc08fede246f7440f', */
  })
  @IsString()
  customer_id: string;

  @ApiProperty({
    description: 'Ingreso mensual del cliente',
    example: faker.number.int({ min: 1000000, max: 10000000 }),
  })
  @IsNumber()
  @IsPositive()
  monthlyIncome: number;

  @ApiProperty({
    description: 'Gastos mensuales del cliente',
    example: faker.number.int({ min: 1000000, max: 10000000 }),
  })
  @IsNumber()
  @IsPositive()
  monthlyExpenses: number;

  @ApiProperty({
    description: 'Deuda total del cliente',
    example: faker.number.int({ min: 1000000, max: 10000000 }),
  })
  @IsNumber()
  @IsPositive()
  totalDebts: number;

  @ApiProperty({
    description: 'Ahorros totales del cliente',
    example: faker.number.int({ min: 1000000, max: 10000000 }),
  })
  @IsNumber()
  @IsPositive()
  totalSavings: number;
}
