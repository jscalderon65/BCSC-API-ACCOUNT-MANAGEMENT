import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParseDatePipe implements PipeTransform<string, Date> {
  transform(value: string): Date {
    const date = new Date(value);

    if (isNaN(date.getTime())) {
      throw new BadRequestException(
        `Valor de fecha inválido. Formato esperado: YYYY-MM-DD`,
      );
    }

    return date;
  }
}
