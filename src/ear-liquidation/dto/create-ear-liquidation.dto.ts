import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

const earValue = parseFloat(
  faker.number.float({ min: 10, max: 14 }).toFixed(2),
);

const liquidationBase = faker.number.int({ min: 1000000, max: 100000000 });

const dailyRate = Math.pow(1 + earValue, 1 / 365) - 1;

const generatedInterest = liquidationBase * dailyRate;

export class CreateEarLiquidationDto {
  @ApiProperty({
    description: 'ID de la cuenta de ahorros',
    /* example: faker.database.mongodbObjectId(), */
    example: '672e658db946b0be13e12643',
  })
  @IsString()
  account_id: string;

  @ApiProperty({
    description: 'Tasa efectiva anual en porcentaje',
    example: earValue,
  })
  @IsString()
  annual_effective_rate: number;

  @ApiProperty({
    description: 'Valor sobre el que se liquido la tasa efectiva anual',
    example: liquidationBase,
  })
  @IsNumber()
  liquidation_base: number;

  @ApiProperty({
    description:
      'Valor de los intereses generados de la liquidación de la tasa efectiva anual',
    example: generatedInterest,
  })
  @IsNumber()
  generated_interest: number;
}
