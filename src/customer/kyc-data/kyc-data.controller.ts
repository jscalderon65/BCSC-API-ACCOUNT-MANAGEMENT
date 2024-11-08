import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ParseObjectIdPipe } from '@pipes/parse-object-id.pipe';
import {
  createSwaggerOptions,
  findAllSwaggerOptions,
  findOneSwaggerOptions,
  removeSwaggerOptions,
  updateSwaggerOptions,
} from '@swagger-docs/kyc-data';

import { CreateKycDataDto } from './dto/create-kyc-data.dto';
import { UpdateKycDataDto } from './dto/update-kyc-data.dto';
import { KycDataService } from './kyc-data.service';

const controllerPrefix = 'customer/kyc-data';
@Controller(controllerPrefix)
@ApiTags(controllerPrefix)
export class KycDataController {
  constructor(private readonly kycDataService: KycDataService) {}

  @Post()
  @ApiResponse(createSwaggerOptions)
  create(@Body() createKycDataDto: CreateKycDataDto) {
    return this.kycDataService.create(createKycDataDto);
  }

  @Get()
  @ApiResponse(findAllSwaggerOptions)
  findAll() {
    return this.kycDataService.findAll();
  }

  @Get(':id')
  @ApiResponse(findOneSwaggerOptions)
  findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return this.kycDataService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse(updateSwaggerOptions)
  update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() updateKycDataDto: UpdateKycDataDto,
  ) {
    return this.kycDataService.update(id, updateKycDataDto);
  }

  @Delete(':id')
  @ApiResponse(removeSwaggerOptions)
  remove(@Param('id', ParseObjectIdPipe) id: string) {
    return this.kycDataService.remove(id);
  }
}
