import { Controller, Get, Req } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  findAllCitiesSwaggerOptions,
  findAllDocumentTypesSwaggerOptions,
  findAllOccupationTypesSwaggerOptions,
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

  @Get('occupation-types')
  @ApiResponse(findAllOccupationTypesSwaggerOptions)
  findAllOccupationTypes(@Req() request: Request) {
    return this.utilsService.findAllOccupationTypes(request);
  }

  @Get('outgoing-transaction-status')
  @ApiResponse(findAllOccupationTypesSwaggerOptions)
  findAlloutgoingTransactionStatus(@Req() request: Request) {
    return this.utilsService.findAlloutgoingTransactionStatus(request);
  }
}
