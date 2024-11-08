import { faker } from '@faker-js/faker/locale/es';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsMongoId,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class CreatePortalProfileDto {
  @ApiProperty({
    example: faker.internet.email(),
    description: 'Correo electrónico del usuario',
    format: 'email',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: faker.string.numeric(10),
    description: 'Número de teléfono móvil (10 dígitos)',
    pattern: '^[0-9]{10}$',
  })
  @IsString()
  @Matches(/^[0-9]{10}$/, {
    message: 'El teléfono debe tener exactamente 10 dígitos numéricos',
  })
  phone_number: string;

  @ApiProperty({
    example: faker.person.firstName(),
    description: 'Nombre del usuario',
    minLength: 2,
    maxLength: 50,
  })
  @IsString()
  @Length(2, 50)
  first_name: string;

  @ApiProperty({
    example: faker.person.lastName(),
    description: 'Apellido del usuario',
    minLength: 2,
    maxLength: 50,
  })
  @IsString()
  @Length(2, 50)
  last_name: string;

  @ApiProperty({
    example: faker.date
      .birthdate({ min: 18, max: 65, mode: 'age' })
      .toISOString(),
    description: 'Fecha de nacimiento (debe ser mayor de edad)',
    format: 'date-time',
  })
  @IsDate()
  @Type(() => Date)
  birth_date: Date;

  @ApiProperty({
    /* example: faker.database.mongodbObjectId(), */
    example: '658470199401dd011fab609c',
    description: 'ID de MongoDB del tipo de documento',
  })
  @IsMongoId()
  document_type_id: string;

  @ApiProperty({
    example: faker.string.numeric(10),
    description: 'Número de documento de identidad (10 dígitos)',
    pattern: '^[0-9]{10}$',
  })
  @IsString()
  @Matches(/^[0-9]{6,12}$/, {
    message: 'El documento debe tener entre 6 y 12 dígitos numéricos',
  })
  document_number: string;
}
