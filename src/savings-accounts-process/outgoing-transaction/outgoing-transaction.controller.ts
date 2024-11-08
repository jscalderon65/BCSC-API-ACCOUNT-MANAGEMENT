import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateOutgoingTransactionDto } from '@outgoing-transaction/dto/create-outgoing-transaction.dto';
import { UpdateOutgoingTransactionDto } from '@outgoing-transaction/dto/update-outgoing-transaction.dto';
import { OutgoingTransactionService } from '@outgoing-transaction/outgoing-transaction.service';
import { ParseObjectIdPipe } from '@pipes/parse-object-id.pipe';
import {
  createSwaggerOptions,
  findAllSwaggerOptions,
  findOneSwaggerOptions,
  updateSwaggerOptions,
} from '@swagger-docs/outgoint-transaction';

const controllerPrefix = 'savings-accounts-process/outgoing-transaction';

@Controller(controllerPrefix)
@ApiTags(controllerPrefix)
export class OutgoingTransactionController {
  constructor(
    private readonly outgoingTransactionService: OutgoingTransactionService,
  ) {}

  @Post()
  @ApiResponse(createSwaggerOptions)
  create(@Body() createOutgoingTransactionDto: CreateOutgoingTransactionDto) {
    return this.outgoingTransactionService.create(createOutgoingTransactionDto);
  }

  @Get()
  @ApiResponse(findAllSwaggerOptions)
  findAll() {
    return this.outgoingTransactionService.findAll();
  }

  @Get(':id')
  @ApiResponse(findOneSwaggerOptions)
  findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return this.outgoingTransactionService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse(updateSwaggerOptions)
  update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() updateOutgoingTransactionDto: UpdateOutgoingTransactionDto,
  ) {
    return this.outgoingTransactionService.update(
      id,
      updateOutgoingTransactionDto,
    );
  }
}
