import { MESSAGES } from '@constants/messages';
import {
  DOCUMENT_TYPE_SCHEMA_NAME,
  PORTAL_PROFILE_SCHEMA_NAME,
} from '@constants/mongo-db';
import {
  ageValidation,
  protectedFieldUpdate,
} from '@helpers/validations.helper';
import { DeleteResponse } from '@interfaces/common.interfaces';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePortalProfileDto } from '@portal-profile/dto/create-portal-profile.dto';
import { UpdatePortalProfileDto } from '@portal-profile/dto/update-portal-profile.dto';
import {
  PortalProfile,
  PortalProfileDocument,
} from '@portal-profile/entities/portal-profile.entity';
import { DocumentTypeDocument } from '@utils/schemas/user-identity/document-type.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class PortalProfileService {
  private readonly globalPopulatePath = [{ path: 'document_type_id' }];
  constructor(
    @InjectModel(PORTAL_PROFILE_SCHEMA_NAME)
    private readonly PortalProfileModel: Model<PortalProfileDocument>,

    @InjectModel(DOCUMENT_TYPE_SCHEMA_NAME)
    private readonly DocumentTypeModel: Model<DocumentTypeDocument>,
  ) {}

  async create(
    createPortalProfileDto: CreatePortalProfileDto,
  ): Promise<PortalProfile> {
    if (!ageValidation(createPortalProfileDto.birth_date)) {
      throw new BadRequestException(
        'El usuario debe ser mayor de edad y menor de 90 años',
      );
    }

    const documentTypeExists = await this.DocumentTypeModel.exists({
      _id: new Types.ObjectId(createPortalProfileDto.document_type_id),
    });

    if (!documentTypeExists) {
      throw new BadRequestException(
        MESSAGES.RESPONSE_MESSAGES.NO_ENTITY_FOUND_WITH_ID(
          DOCUMENT_TYPE_SCHEMA_NAME,
          createPortalProfileDto.document_type_id,
        ),
      );
    }

    const existingEmail = await this.PortalProfileModel.exists({
      email: createPortalProfileDto.email,
    });

    if (existingEmail) {
      throw new BadRequestException(
        `Ya existe un perfil con el email ${createPortalProfileDto.email}`,
      );
    }

    const existingDocument = await this.PortalProfileModel.exists({
      document_number: createPortalProfileDto.document_number,
    });

    if (existingDocument) {
      throw new BadRequestException(
        `Ya existe un perfil con el número de documento ${createPortalProfileDto.document_number}`,
      );
    }

    const newPortalProfile = await this.PortalProfileModel.create(
      createPortalProfileDto,
    );
    return newPortalProfile;
  }

  async findAll(): Promise<PortalProfile[]> {
    return this.PortalProfileModel.find()
      .populate(this.globalPopulatePath)
      .exec();
  }

  async findOne(id: string): Promise<PortalProfile> {
    const profile = await this.PortalProfileModel.findById(id)
      .populate(this.globalPopulatePath)
      .exec();

    if (!profile) {
      throw new NotFoundException(MESSAGES.RESPONSE_MESSAGES.NO_RECORD_FOUND);
    }

    return profile;
  }

  async update(
    id: string,
    updatePortalProfileDto: UpdatePortalProfileDto,
  ): Promise<PortalProfile> {
    if (!ageValidation(updatePortalProfileDto.birth_date)) {
      throw new BadRequestException(
        'El usuario debe ser mayor de edad y menor de 90 años',
      );
    }
    const currentProfile = await this.PortalProfileModel.findById(id);
    const protectedFields = ['email', 'document_number', 'document_id'];

    const safeUpdateData = await protectedFieldUpdate(
      id,
      currentProfile,
      updatePortalProfileDto,
      protectedFields,
    );

    const updatedFinancialData = await this.PortalProfileModel.findOneAndUpdate(
      { _id: id },
      safeUpdateData,
      { new: true },
    ).populate(this.globalPopulatePath);

    return updatedFinancialData;
  }

  async remove(id: string): Promise<DeleteResponse<PortalProfile>> {
    const deletedProfile = await this.PortalProfileModel.findByIdAndDelete(id);

    if (!deletedProfile) {
      throw new NotFoundException(MESSAGES.RESPONSE_MESSAGES.NO_RECORD_FOUND);
    }

    return {
      message: MESSAGES.RESPONSE_MESSAGES.DELETE_RESPONSE(
        PORTAL_PROFILE_SCHEMA_NAME,
        id,
      ),
      deletedItem: deletedProfile,
    };
  }
}
