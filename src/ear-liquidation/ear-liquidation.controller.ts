import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiQuery, ApiResponse } from '@nestjs/swagger';
import { ParseDatePipe } from '@pipes/parse-date.pipe';
import { ParseObjectIdPipe } from '@pipes/parse-object-id.pipe';
import {
  createSwaggerOptions,
  findAllSwaggerOptions,
  findOneSwaggerOptions,
  findOutgoingTransactionsByAccountIdSwaggerOptions,
} from '@swagger-docs/ear-liquidation';

import { CreateEarLiquidationDto } from './dto/create-ear-liquidation.dto';
import { EarLiquidationService } from './ear-liquidation.service';

@Controller('ear-liquidation')
export class EarLiquidationController {
  constructor(private readonly earLiquidationService: EarLiquidationService) {}

  @Post()
  @ApiResponse(createSwaggerOptions)
  create(@Body() createEarLiquidationDto: CreateEarLiquidationDto) {
    return this.earLiquidationService.create(createEarLiquidationDto);
  }

  @Get()
  @ApiResponse(findOneSwaggerOptions)
  @ApiResponse(findAllSwaggerOptions)
  findAll() {
    return this.earLiquidationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return this.earLiquidationService.findOne(id);
  }

  @Get(':account_id')
  @ApiResponse(findOutgoingTransactionsByAccountIdSwaggerOptions)
  @ApiQuery({
    name: 'startDate',
    required: true,
    type: String,
    description: 'Start date (YYYY-MM-DD)',
  })
  @ApiQuery({
    name: 'endDate',
    required: true,
    type: String,
    description: 'End date (YYYY-MM-DD)',
  })
  findOutgoingTransactionsByAccountId(
    @Param('account_id', ParseObjectIdPipe) id: string,
    @Query('startDate', ParseDatePipe) startDate: Date,
    @Query('endDate', ParseDatePipe) endDate: Date,
  ) {
    return this.earLiquidationService.findByDateRangeAndAccountId(
      id,
      startDate,
      endDate,
    );
  }
}
