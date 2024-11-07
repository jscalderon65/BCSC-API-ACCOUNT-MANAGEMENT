import { Controller, Get, Req } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  findAllCitiesSwaggerOptions,
  findAllDocumentTypesSwaggerOptions,
  findAllStatesSwaggerOptions,
} from '@swagger-docs/utils-services';

import { UtilsService } from '@utils/utils.service';
import { Request } from 'express';
@Controller('utils')
@ApiTags('Utils')
export class UtilsController {
  constructor(private readonly utilsService: UtilsService) {}

  @Get('states')
  @ApiResponse(findAllStatesSwaggerOptions)
  findAllStates(@Req() request: Request) {
    return this.utilsService.findAllStates(request);
  }

  @Get('cities')
  @ApiResponse(findAllCitiesSwaggerOptions)
  findAllCities(@Req() request: Request) {
    return this.utilsService.findAllCities(request);
  }

  @Get('document-types')
  @ApiResponse(findAllDocumentTypesSwaggerOptions)
  findAllDocumentTypes(@Req() request: Request) {
    return this.utilsService.findAllDocumentTypes(request);
  }
}
