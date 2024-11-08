import { faker } from '@faker-js/faker/locale/es';
import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsString, Length, Matches } from 'class-validator';

export class CreateKycDataDto {
  @ApiProperty({
    example: faker.database.mongodbObjectId(),
    description: 'ID de MongoDB del tipo del cliente del portal',
  })
  @IsMongoId()
  customer_id: string;

  @ApiProperty({
    example: faker.database.mongodbObjectId(),
    description: 'ID de MongoDB del tipo de ocupación',
  })
  @IsMongoId()
  occupation_type_id: string;

  @ApiProperty({
    example: faker.database.mongodbObjectId(),
    description: 'ID de MongoDB de la ciudad ciudad',
  })
  @IsMongoId()
  city_id: string;

  @ApiProperty({
    example: faker.database.mongodbObjectId(),
    description: 'ID de MongoDB del departamento',
  })
  @IsMongoId()
  state_id: string;

  @ApiProperty({
    example: faker.location.streetAddress(),
    description: 'Dirección completa del usuario',
  })
  @IsString()
  @Length(5, 100, {
    message: 'La dirección debe tener entre 5 y 100 caracteres',
  })
  address: string;

  @ApiProperty({
    example: faker.string.numeric(5),
    description: 'Código postal de la dirección',
  })
  @IsString()
  @Matches(/^[0-9]{4,6}$/, {
    message: 'El código postal debe tener entre 4 y 6 dígitos numéricos',
  })
  postal_code: string;
}

/* {
  "customer_id": "672d68acd9040d36bf3964a3",
  "occupation_type_id": "658470199401dd011fab6001",
  "city_id": "672cfe514aa8c8eaf7b757d6",
  "state_id": "672cfe4e0c5490289daac657",
  "address": "Prolongación Pablo, 35",
  "postal_code": "33634"
} */
