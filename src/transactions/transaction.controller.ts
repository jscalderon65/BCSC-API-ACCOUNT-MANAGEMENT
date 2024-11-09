import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ParseDatePipe } from '@pipes/parse-date.pipe';
import { ParseObjectIdPipe } from '@pipes/parse-object-id.pipe';
import {
  createSwaggerOptions,
  findAllSwaggerOptions,
  findOneSwaggerOptions,
} from '@swagger-docs/transaction';
import { CreateTransactionDto } from '@transactions/dto/create-transaction.dto';
import { TransactionService } from '@transactions/transaction.service';

const controllerPrefix = 'savings-accounts-process/transaction';

@Controller(controllerPrefix)
@ApiTags(controllerPrefix)
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  @ApiResponse(createSwaggerOptions)
  create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionService.create(createTransactionDto);
  }

  @Get()
  @ApiResponse(findAllSwaggerOptions)
  findAll() {
    return this.transactionService.findAll();
  }

  @Get('/outgoing/:account_id')
  @ApiResponse(findAllSwaggerOptions)
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
    return this.transactionService.findOutgoingTransactionsByAccountId(
      id,
      startDate,
      endDate,
    );
  }

  @Get('/incoming/:account_id')
  @ApiResponse(findAllSwaggerOptions)
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
  findIncomingTransactionsByAccountId(
    @Param('account_id', ParseObjectIdPipe) id: string,
    @Query('startDate', ParseDatePipe) startDate: Date,
    @Query('endDate', ParseDatePipe) endDate: Date,
  ) {
    return this.transactionService.findIncomingTransactionsByAccountId(
      id,
      startDate,
      endDate,
    );
  }

  @Get(':id')
  @ApiResponse(findOneSwaggerOptions)
  findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return this.transactionService.findOne(id);
  }
}
