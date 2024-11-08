import {
  DOCUMENT_TYPE_SCHEMA_NAME,
  PORTAL_PROFILE_SCHEMA_NAME,
} from '@constants/mongo-db';
import { ageValidation } from '@helpers/validations.helper';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePortalProfileDto } from '@portal-profile/dto/create-portal-profile.dto';
import { UpdatePortalProfileDto } from '@portal-profile/dto/update-portal-profile.dto';
import { PortalProfileDocument } from '@portal-profile/entities/portal-profile.entity';
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

  async create(createPortalProfileDto: CreatePortalProfileDto) {
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
        `El tipo de documento con ID ${createPortalProfileDto.document_type_id} no existe`,
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

  async findAll() {
    return this.PortalProfileModel.find()
      .populate(this.globalPopulatePath)
      .exec();
  }

  async findOne(id: string) {
    const profile = await this.PortalProfileModel.findById(id)
      .populate(this.globalPopulatePath)
      .exec();

    if (!profile) {
      throw new BadRequestException(`No se encontró el perfil con ID ${id}`);
    }

    return profile;
  }

  async update(id: string, updatePortalProfileDto: UpdatePortalProfileDto) {
    if (!ageValidation(updatePortalProfileDto.birth_date)) {
      throw new BadRequestException(
        'El usuario debe ser mayor de edad y menor de 90 años',
      );
    }
    const currentProfile = await this.PortalProfileModel.findById(id);
    if (!currentProfile) {
      throw new NotFoundException(`No se encontró el perfil con ID ${id}`);
    }

    const protectedFields = ['email', 'document_number', 'document_id'];

    const attemptedProtectedUpdates = protectedFields.filter((field) => {
      if (updatePortalProfileDto[field] === undefined) return false;
      return updatePortalProfileDto[field] !== currentProfile[field];
    });

    if (attemptedProtectedUpdates.length > 0) {
      throw new BadRequestException(
        `No se pueden modificar los siguientes campos: ${protectedFields.join()}`,
      );
    }

    const safeUpdateData = Object.keys(updatePortalProfileDto)
      .filter((key) => {
        if (!protectedFields.includes(key)) return true;
        return updatePortalProfileDto[key] === currentProfile[key];
      })
      .reduce((obj, key) => {
        obj[key] = updatePortalProfileDto[key];
        return obj;
      }, {});

    const portalProfileUpdated = await this.PortalProfileModel.findOneAndUpdate(
      { _id: id },
      safeUpdateData,
      {
        new: true,
      },
    ).populate(this.globalPopulatePath);

    return portalProfileUpdated;
  }

  async remove(id: string) {
    const deletedProfile = await this.PortalProfileModel.findByIdAndDelete(id);

    if (!deletedProfile) {
      throw new NotFoundException(`No se encontró el perfil con ID ${id}`);
    }

    return {
      message: `Perfil con ID ${id} eliminado exitosamente`,
      profile: deletedProfile,
    };
  }
}
