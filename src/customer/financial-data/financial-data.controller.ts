import { CreateFinancialDataDto } from '@financial-data/dto/create-financial-datum.dto';
import { UpdateFinancialDatumDto } from '@financial-data/dto/update-financial-datum.dto';
import { FinancialDataService } from '@financial-data/financial-data.service';
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
} from '@swagger-docs/financial-data';

const controllerPrefix = 'customer/financial-data';
@Controller(controllerPrefix)
@ApiTags(controllerPrefix)
export class FinancialDataController {
  constructor(private readonly financialDataService: FinancialDataService) {}

  @Post()
  @ApiResponse(createSwaggerOptions)
  create(@Body() createFinancialDatumDto: CreateFinancialDataDto) {
    return this.financialDataService.create(createFinancialDatumDto);
  }

  @Get()
  @ApiResponse(findAllSwaggerOptions)
  findAll() {
    return this.financialDataService.findAll();
  }

  @Get(':id')
  @ApiResponse(findOneSwaggerOptions)
  findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return this.financialDataService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse(updateSwaggerOptions)
  update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() updateFinancialDatumDto: UpdateFinancialDatumDto,
  ) {
    return this.financialDataService.update(id, updateFinancialDatumDto);
  }

  @Delete(':id')
  @ApiResponse(removeSwaggerOptions)
  remove(@Param('id', ParseObjectIdPipe) id: string) {
    return this.financialDataService.remove(id);
  }
}
