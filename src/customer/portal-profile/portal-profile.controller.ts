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
} from '@swagger-docs/portal-profile';

import { CreatePortalProfileDto } from './dto/create-portal-profile.dto';
import { UpdatePortalProfileDto } from './dto/update-portal-profile.dto';
import { PortalProfileService } from './portal-profile.service';

const controllerPrefix = 'customer/portal-profile';
@Controller(controllerPrefix)
@ApiTags(controllerPrefix)
export class PortalProfileController {
  constructor(private readonly portalProfileService: PortalProfileService) {}

  @Post()
  @ApiResponse(createSwaggerOptions)
  create(@Body() createPortalProfileDto: CreatePortalProfileDto) {
    return this.portalProfileService.create(createPortalProfileDto);
  }

  @Get()
  @ApiResponse(findAllSwaggerOptions)
  findAll() {
    return this.portalProfileService.findAll();
  }

  @Get(':id')
  @ApiResponse(findOneSwaggerOptions)
  findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return this.portalProfileService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse(updateSwaggerOptions)
  update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() updatePortalProfileDto: UpdatePortalProfileDto,
  ) {
    return this.portalProfileService.update(id, updatePortalProfileDto);
  }

  @Delete(':id')
  @ApiResponse(removeSwaggerOptions)
  remove(@Param('id', ParseObjectIdPipe) id: string) {
    return this.portalProfileService.remove(id);
  }
}
