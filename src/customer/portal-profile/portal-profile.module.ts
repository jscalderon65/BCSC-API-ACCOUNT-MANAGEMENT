import {
  DOCUMENT_TYPE_SCHEMA_NAME,
  PORTAL_PROFILE_SCHEMA_NAME,
} from '@constants/mongo-db';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PortalProfileSchema } from '@portal-profile/entities/portal-profile.entity';
import { DocumentTypeSchema } from '@utils/schemas/user-identity/document-type.schema';

import { PortalProfileController } from './portal-profile.controller';
import { PortalProfileService } from './portal-profile.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PORTAL_PROFILE_SCHEMA_NAME, schema: PortalProfileSchema },
      { name: DOCUMENT_TYPE_SCHEMA_NAME, schema: DocumentTypeSchema },
    ]),
  ],
  controllers: [PortalProfileController],
  providers: [PortalProfileService],
})
export class PortalProfileModule {}
