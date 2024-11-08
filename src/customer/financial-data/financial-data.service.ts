import { MESSAGES } from '@constants/messages';
import {
  FINANCIAL_DATA_SCHEMA_NAME,
  FINANCIAL_PROFILE_SCHEMA_NAME,
  PORTAL_PROFILE_SCHEMA_NAME,
} from '@constants/mongo-db';
import { CreateFinancialDataDto } from '@financial-data/dto/create-financial-datum.dto';
import { UpdateFinancialDatumDto } from '@financial-data/dto/update-financial-datum.dto';
import {
  FinancialData,
  FinancialDataDocument,
} from '@financial-data/entities/financial-datum.entity';
import {
  protectedFieldUpdate,
  validateEntityRelationships,
} from '@helpers/validations.helper';
import { DeleteResponse } from '@interfaces/common.interfaces';
import { EntityRelationship } from '@interfaces/entity-relationship-validation.interface';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TransactionStatus } from '@outgoing-transaction/dto/create-outgoing-transaction.dto';
import { PortalProfileDocument } from '@portal-profile/entities/portal-profile.entity';
import { Model } from 'mongoose';

@Injectable()
export class FinancialDataService {
  private readonly globalPopulatePath = [{ path: 'customer_id' }];
  constructor(
    @InjectModel(FINANCIAL_DATA_SCHEMA_NAME)
    private readonly financialDataModel: Model<FinancialDataDocument>,

    @InjectModel(PORTAL_PROFILE_SCHEMA_NAME)
    private readonly portalProfileModel: Model<PortalProfileDocument>,
  ) {}

  async isValidEntityRelationshipsId(
    entityIds: EntityRelationship[],
  ): Promise<void> {
    const entityServiceValidations = {
      [PORTAL_PROFILE_SCHEMA_NAME]: this.portalProfileModel,
    };
    await validateEntityRelationships(entityIds, entityServiceValidations);
  }

  async create(
    createFinancialDatumDto: CreateFinancialDataDto,
  ): Promise<FinancialData> {
    const entityIds: EntityRelationship[] = [
      {
        entityName: PORTAL_PROFILE_SCHEMA_NAME,
        id: createFinancialDatumDto.customer_id,
      },
    ];

    const intitialStatus = TransactionStatus.Pending;

    await this.isValidEntityRelationshipsId(entityIds);
    const newFinancialData = await this.financialDataModel.create({
      ...createFinancialDatumDto,
      status: intitialStatus,
    });
    return newFinancialData;
  }

  findAll(): Promise<FinancialData[]> {
    return this.financialDataModel.find().populate(this.globalPopulatePath);
  }

  async findOne(id: string): Promise<FinancialData> {
    const retrievedFinancialData = await this.financialDataModel
      .findById(id)
      .populate(this.globalPopulatePath);
    if (!retrievedFinancialData) {
      throw new NotFoundException(MESSAGES.RESPONSE_MESSAGES.NO_RECORD_FOUND);
    }
    return retrievedFinancialData;
  }

  async update(
    id: string,
    updateFinancialDatumDto: UpdateFinancialDatumDto,
  ): Promise<FinancialData> {
    const currentData = await this.financialDataModel.findById(id);
    const protectedField = ['customer_id'];

    const safeUpdateData = await protectedFieldUpdate(
      id,
      currentData,
      updateFinancialDatumDto,
      protectedField,
    );

    const updatedFinancialData = await this.financialDataModel
      .findOneAndUpdate({ _id: id }, safeUpdateData, { new: true })
      .populate(this.globalPopulatePath);

    return updatedFinancialData;
  }

  async remove(id: string): Promise<DeleteResponse<FinancialData>> {
    const financialData = await this.financialDataModel.findById(id).exec();
    if (!financialData) {
      throw new NotFoundException(MESSAGES.RESPONSE_MESSAGES.NO_RECORD_FOUND);
    }

    const associatedCustomer = await this.portalProfileModel
      .findById(financialData.customer_id)
      .exec();

    if (associatedCustomer) {
      throw new BadRequestException(
        MESSAGES.RESPONSE_MESSAGES.CANNOT_DELETE_RECORD('customer'),
      );
    }

    const deletedFinancialData = await this.financialDataModel
      .findByIdAndDelete(id)
      .populate(this.globalPopulatePath);

    return {
      message: MESSAGES.RESPONSE_MESSAGES.DELETE_RESPONSE(
        FINANCIAL_PROFILE_SCHEMA_NAME,
        id,
      ),
      deletedItem: deletedFinancialData,
    };
  }
}
