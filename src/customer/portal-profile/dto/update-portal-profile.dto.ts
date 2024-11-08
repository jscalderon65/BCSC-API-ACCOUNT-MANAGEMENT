import { PartialType } from '@nestjs/swagger';

import { CreatePortalProfileDto } from './create-portal-profile.dto';

export class UpdatePortalProfileDto extends PartialType(
  CreatePortalProfileDto,
) {}
