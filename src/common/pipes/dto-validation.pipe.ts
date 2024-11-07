import { BadRequestException } from '@nestjs/common';

export const dtoValidationExceptionFactory = (errors: any[]) => {
  const result = errors.map((error) => ({
    property: error.property,
    message: error.constraints[Object.keys(error.constraints)[0]],
  }));

  return new BadRequestException(JSON.stringify(result));
};
