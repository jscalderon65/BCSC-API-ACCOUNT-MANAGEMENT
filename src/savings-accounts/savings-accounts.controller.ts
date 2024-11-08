import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { ParseObjectIdPipe } from '@pipes/parse-object-id.pipe';
import { CreateSavingsAccountDto } from '@savings-accounts/dto/create-savings-account.dto';
import { UpdateSavingsAccountDto } from '@savings-accounts/dto/update-savings-account.dto';
import { SavingsAccountsService } from '@savings-accounts/savings-accounts.service';
import {
  createSwaggerOptions,
  findAllSwaggerOptions,
  findOneSwaggerOptions,
  removeSwaggerOptions,
  updateSwaggerOptions,
} from '@swagger-docs/savings-accounts';
import { Request } from 'express';

@Controller('savings-accounts')
export class SavingsAccountsController {
  constructor(
    private readonly savingsAccountsService: SavingsAccountsService,
  ) {}

  @Post()
  @ApiResponse(createSwaggerOptions)
  create(@Body() createSavingsAccountDto: CreateSavingsAccountDto) {
    return this.savingsAccountsService.create(createSavingsAccountDto);
  }

  @Get()
  @ApiResponse(findAllSwaggerOptions)
  findAll(@Req() request: Request) {
    return this.savingsAccountsService.findAll(request);
  }

  @Get(':id')
  @ApiResponse(findOneSwaggerOptions)
  findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return this.savingsAccountsService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse(updateSwaggerOptions)
  update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() updateSavingsAccountDto: UpdateSavingsAccountDto,
  ) {
    return this.savingsAccountsService.update(id, updateSavingsAccountDto);
  }

  @Delete(':id')
  @ApiResponse(removeSwaggerOptions)
  remove(@Param('id', ParseObjectIdPipe) id: string) {
    return this.savingsAccountsService.remove(id);
  }
}
