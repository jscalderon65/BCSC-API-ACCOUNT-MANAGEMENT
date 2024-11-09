import { MESSAGES } from '@constants/messages';
import {
  EAR_LIQUIDATION_SCHEMA_NAME,
  SAVINGS_ACCOUNT_SCHEMA_NAME,
} from '@constants/mongo-db';
import { validateEntityRelationships } from '@helpers/validations.helper';
import { EntityRelationship } from '@interfaces/entity-relationship-validation.interface';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SavingsAccountDocument } from '@savings-accounts/entities/savings-account.entity';
import { Model } from 'mongoose';

import { CreateEarLiquidationDto } from './dto/create-ear-liquidation.dto';
import {
  EarLiquidation,
  EarLiquidationDocument,
} from './entities/ear-liquidation.entity';

@Injectable()
export class EarLiquidationService {
  private readonly globalPopulatePath = [{ path: 'account_id' }];
  constructor(
    @InjectModel(EAR_LIQUIDATION_SCHEMA_NAME)
    private readonly earLiquidationModel: Model<EarLiquidationDocument>,

    @InjectModel(SAVINGS_ACCOUNT_SCHEMA_NAME)
    private readonly savingAccountModel: Model<SavingsAccountDocument>,
  ) {}

  async isValidEntityRelationshipsId(
    entityIds: EntityRelationship[],
  ): Promise<void> {
    const entityServiceValidations = {
      [SAVINGS_ACCOUNT_SCHEMA_NAME]: this.savingAccountModel,
    };
    await validateEntityRelationships(entityIds, entityServiceValidations);
  }

  async create(
    createEarLiquidationDto: CreateEarLiquidationDto,
  ): Promise<EarLiquidation> {
    const entityIds: EntityRelationship[] = [
      {
        entityName: SAVINGS_ACCOUNT_SCHEMA_NAME,
        id: createEarLiquidationDto.account_id,
      },
    ];

    await this.isValidEntityRelationshipsId(entityIds);

    const createdEarLiquidation = await this.earLiquidationModel.create(
      createEarLiquidationDto,
    );

    return await this.earLiquidationModel
      .findById(createdEarLiquidation._id)
      .populate(this.globalPopulatePath);
  }

  findAll(): Promise<EarLiquidation[]> {
    return this.earLiquidationModel.find().populate(this.globalPopulatePath);
  }

  findByDateRangeAndAccountId(
    id: string,
    startDate: Date,
    endDate: Date,
  ): Promise<EarLiquidation[]> {
    return this.earLiquidationModel
      .find({
        source_account_id: id,
        createdAt: {
          $gte: startDate,
          $lte: endDate,
        },
      })
      .populate(this.globalPopulatePath);
  }

  async findOne(id: string): Promise<EarLiquidation> {
    const retreivedEarLiquidation = await this.earLiquidationModel
      .findById(id)
      .populate(this.globalPopulatePath);
    if (!retreivedEarLiquidation) {
      throw new NotFoundException(MESSAGES.RESPONSE_MESSAGES.NO_RECORD_FOUND);
    }
    return retreivedEarLiquidation;
  }
}
