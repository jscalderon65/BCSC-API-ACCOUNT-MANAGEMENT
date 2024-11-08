import {
  CITY_SCHEMA_NAME,
  KYC_DATA_SCHEMA_NAME,
  OCCUPATION_TYPE_SCHEMA_NAME,
  PORTAL_PROFILE_SCHEMA_NAME,
  STATE_SCHEMA_NAME,
} from '@constants/mongo-db';
import { EntityRelationship } from '@interfaces/entity-relationship-validation.interface';
import { CreateKycDataDto } from '@kyc-data/dto/create-kyc-data.dto';
import { UpdateKycDataDto } from '@kyc-data/dto/update-kyc-data.dto';
import { KycData, KycDataDocument } from '@kyc-data/entities/kyc-data.entity';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PortalProfileDocument } from '@portal-profile/entities/portal-profile.entity';
import { CityDocument } from '@utils/schemas/location/city.schema';
import { StateDocument } from '@utils/schemas/location/state.schema';
import { OccupationTypeDocument } from '@utils/schemas/user-identity/occupation-type.schema';
import { Model } from 'mongoose';

@Injectable()
export class KycDataService {
  private readonly globalPopulatePath = [
    { path: 'state_id' },
    { path: 'city_id' },
    { path: 'occupation_type_id' },
    { path: 'customer_id' },
  ];
  constructor(
    @InjectModel(KYC_DATA_SCHEMA_NAME)
    private readonly kycDataModel: Model<KycDataDocument>,

    @InjectModel(CITY_SCHEMA_NAME)
    private readonly cityModel: Model<CityDocument>,

    @InjectModel(STATE_SCHEMA_NAME)
    private readonly stateModel: Model<StateDocument>,

    @InjectModel(OCCUPATION_TYPE_SCHEMA_NAME)
    private readonly occupationTypeModel: Model<OccupationTypeDocument>,

    @InjectModel(PORTAL_PROFILE_SCHEMA_NAME)
    private readonly portalProfileModel: Model<PortalProfileDocument>,
  ) {}

  async isValidEntityRelationshipsId(
    entityIds: EntityRelationship[],
  ): Promise<void> {
    const errors: string[] = [];
    const entityServiceValidations = {
      [CITY_SCHEMA_NAME]: this.cityModel,
      [STATE_SCHEMA_NAME]: this.stateModel,
      [OCCUPATION_TYPE_SCHEMA_NAME]: this.occupationTypeModel,
      [PORTAL_PROFILE_SCHEMA_NAME]: this.portalProfileModel,
    };

    for (const relation of entityIds) {
      const entityName = relation.entityName;
      const relationId = relation.id;
      const model = entityServiceValidations[entityName];

      if (!model) {
        errors.push(`No se encontró el modelo para la entidad: ${entityName}`);
        continue;
      }

      const result = await model.findById(relationId).exec();

      if (!result) {
        errors.push(
          `No se encontró un elemento para la entidad: ${entityName} con el id: ${relationId}`,
        );
      }
    }

    if (errors.length > 0) {
      throw new NotFoundException(JSON.stringify(errors));
    }
  }

  async create(createKycDataDto: CreateKycDataDto) {
    const entityIds: EntityRelationship[] = [
      {
        entityName: CITY_SCHEMA_NAME,
        id: createKycDataDto.city_id,
      },
      {
        entityName: STATE_SCHEMA_NAME,
        id: createKycDataDto.state_id,
      },
      {
        entityName: OCCUPATION_TYPE_SCHEMA_NAME,
        id: createKycDataDto.occupation_type_id,
      },
      {
        entityName: PORTAL_PROFILE_SCHEMA_NAME,
        id: createKycDataDto.customer_id,
      },
    ];

    await this.isValidEntityRelationshipsId(entityIds);
    const newKycData = await this.kycDataModel.create(createKycDataDto);
    return newKycData;
  }

  findAll(): Promise<KycData[]> {
    return this.kycDataModel.find().populate(this.globalPopulatePath);
  }

  async findOne(id: string) {
    const retrievedKycData = await this.kycDataModel
      .findById(id)
      .populate(this.globalPopulatePath);
    if (!retrievedKycData) {
      throw new NotFoundException(
        'No se encontró el registro de información detallada con el ID proporcionado',
      );
    }
    return retrievedKycData;
  }

  async update(id: string, updateClientDto: UpdateKycDataDto) {
    const currentData = await this.kycDataModel.findById(id);
    if (!currentData) {
      throw new NotFoundException(
        `No se encontró el registro de información detallada con el ID ${id}`,
      );
    }

    const entityIds: EntityRelationship[] = [
      {
        entityName: CITY_SCHEMA_NAME,
        id: updateClientDto.city_id,
      },
      {
        entityName: STATE_SCHEMA_NAME,
        id: updateClientDto.state_id,
      },
      {
        entityName: OCCUPATION_TYPE_SCHEMA_NAME,
        id: updateClientDto.occupation_type_id,
      },
    ];

    await this.isValidEntityRelationshipsId(entityIds);

    const protectedField = 'customer_id';

    if (
      updateClientDto[protectedField] !== undefined &&
      updateClientDto[protectedField] !== currentData[protectedField]
    ) {
      throw new BadRequestException(
        `El campo ${protectedField} no se puede modificar`,
      );
    }

    const safeUpdateData = Object.keys(updateClientDto)
      .filter((key) => key !== protectedField)
      .reduce((obj, key) => {
        obj[key] = updateClientDto[key];
        return obj;
      }, {});

    const updatedKycData = await this.kycDataModel
      .findOneAndUpdate({ _id: id }, safeUpdateData, { new: true })
      .populate(this.globalPopulatePath);

    return updatedKycData;
  }

  async remove(id: string) {
    const deletedKycData = await this.kycDataModel
      .findByIdAndDelete(id)
      .populate(this.globalPopulatePath);
    if (!deletedKycData) {
      throw new NotFoundException(
        'No se encontró el registro de información detallada con el ID proporcionado',
      );
    }
    return {
      message: `Información detallada con ID ${id} eliminado exitosamente`,
      profile: deletedKycData,
    };
  }
}
