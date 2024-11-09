import { PeriodType } from '@helpers/dates.helper';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
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

  @Get('/outgoing/:account_id/:period')
  @ApiResponse(findAllSwaggerOptions)
  findOutgoingTransactionsByAccountId(
    @Param('account_id', ParseObjectIdPipe) id: string,
    @Param('period') period: PeriodType,
  ) {
    return this.transactionService.findOutgoingTransactionsByAccountId(
      id,
      period,
    );
  }

  @Get('/incoming/:account_id/:period')
  @ApiResponse(findAllSwaggerOptions)
  findIncomingTransactionsByAccountId(
    @Param('account_id', ParseObjectIdPipe) id: string,
    @Param('period') period: PeriodType,
  ) {
    return this.transactionService.findIncomingTransactionsByAccountId(
      id,
      period,
    );
  }

  @Get(':id')
  @ApiResponse(findOneSwaggerOptions)
  findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return this.transactionService.findOne(id);
  }
}
