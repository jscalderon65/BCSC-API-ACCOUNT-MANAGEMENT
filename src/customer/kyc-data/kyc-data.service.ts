import { MESSAGES } from '@constants/messages';
import {
  CITY_SCHEMA_NAME,
  KYC_DATA_SCHEMA_NAME,
  OCCUPATION_TYPE_SCHEMA_NAME,
  PORTAL_PROFILE_SCHEMA_NAME,
  STATE_SCHEMA_NAME,
} from '@constants/mongo-db';
import {
  protectedFieldUpdate,
  validateEntityRelationships,
} from '@helpers/validations.helper';
import { DeleteResponse } from '@interfaces/common.interfaces';
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
    const entityServiceValidations = {
      [CITY_SCHEMA_NAME]: this.cityModel,
      [STATE_SCHEMA_NAME]: this.stateModel,
      [OCCUPATION_TYPE_SCHEMA_NAME]: this.occupationTypeModel,
      [PORTAL_PROFILE_SCHEMA_NAME]: this.portalProfileModel,
    };
    await validateEntityRelationships(entityIds, entityServiceValidations);
  }

  async create(createKycDataDto: CreateKycDataDto): Promise<KycData> {
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

  async findOne(id: string): Promise<KycData> {
    const retrievedKycData = await this.kycDataModel
      .findById(id)
      .populate(this.globalPopulatePath);
    if (!retrievedKycData) {
      throw new NotFoundException(MESSAGES.RESPONSE_MESSAGES.NO_RECORD_FOUND);
    }
    return retrievedKycData;
  }

  async update(
    id: string,
    updateClientDto: UpdateKycDataDto,
  ): Promise<KycData> {
    const currentData = await this.kycDataModel.findById(id);

    const protectedField = ['customer_id'];

    const safeUpdateData = await protectedFieldUpdate(
      id,
      currentData,
      updateClientDto,
      protectedField,
    );

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

    const updatedKycData = await this.kycDataModel
      .findOneAndUpdate({ _id: id }, safeUpdateData, { new: true })
      .populate(this.globalPopulatePath);

    return updatedKycData;
  }

  async remove(id: string): Promise<DeleteResponse<KycData>> {
    const kycData = await this.kycDataModel.findById(id).exec();
    if (!kycData) {
      throw new NotFoundException(MESSAGES.RESPONSE_MESSAGES.NO_RECORD_FOUND);
    }

    const associatedCustomer = await this.portalProfileModel
      .findById(kycData.customer_id)
      .exec();

    if (associatedCustomer) {
      throw new BadRequestException(
        MESSAGES.RESPONSE_MESSAGES.CANNOT_DELETE_RECORD('customer'),
      );
    }

    const deletedKycData = await this.kycDataModel
      .findByIdAndDelete(id)
      .populate(this.globalPopulatePath);

    return {
      message: MESSAGES.RESPONSE_MESSAGES.DELETE_RESPONSE(
        KYC_DATA_SCHEMA_NAME,
        id,
      ),
      deletedItem: deletedKycData,
    };
  }
}
