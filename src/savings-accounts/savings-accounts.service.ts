import { MESSAGES } from '@constants/messages';
import {
  PORTAL_PROFILE_SCHEMA_NAME,
  SAVINGS_ACCOUNT_SCHEMA_NAME,
} from '@constants/mongo-db';
import { faker } from '@faker-js/faker';
import {
  protectedFieldUpdate,
  validateEntityRelationships,
} from '@helpers/validations.helper';
import { DeleteResponse } from '@interfaces/common.interfaces';
import { EntityRelationship } from '@interfaces/entity-relationship-validation.interface';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PortalProfileDocument } from '@portal-profile/entities/portal-profile.entity';
import { CreateSavingsAccountDto } from '@savings-accounts/dto/create-savings-account.dto';
import { UpdateSavingsAccountDto } from '@savings-accounts/dto/update-savings-account.dto';
import { Request } from 'express';
import { Model } from 'mongoose';

import {
  SavingsAccount,
  SavingsAccountDocument,
} from './entities/savings-account.entity';

@Injectable()
export class SavingsAccountsService {
  private readonly globalPopulatePath = [{ path: 'customer_id' }];
  constructor(
    @InjectModel(SAVINGS_ACCOUNT_SCHEMA_NAME)
    private readonly savingAccountModel: Model<SavingsAccountDocument>,

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
    createSavingsAccountDto: CreateSavingsAccountDto,
  ): Promise<SavingsAccount> {
    const entityIds: EntityRelationship[] = [
      {
        entityName: PORTAL_PROFILE_SCHEMA_NAME,
        id: createSavingsAccountDto.customer_id,
      },
    ];

    await this.isValidEntityRelationshipsId(entityIds);
    const account_number = faker.finance.accountNumber();
    const newSavingAccount = await this.savingAccountModel.create({
      ...createSavingsAccountDto,
      account_number,
    });
    return newSavingAccount;
  }

  findAll(request: Request): Promise<SavingsAccount[]> {
    return this.savingAccountModel
      .find(request.query)
      .populate(this.globalPopulatePath);
  }

  async findOne(id: string): Promise<SavingsAccount> {
    const retrievedFinancialData = await this.savingAccountModel
      .findById(id)
      .populate(this.globalPopulatePath);
    if (!retrievedFinancialData) {
      throw new NotFoundException(MESSAGES.RESPONSE_MESSAGES.NO_RECORD_FOUND);
    }
    return retrievedFinancialData;
  }

  async update(
    id: string,
    updateSavingsAccountDto: UpdateSavingsAccountDto,
  ): Promise<SavingsAccount> {
    const currentData = await this.savingAccountModel.findById(id);
    const protectedField = ['customer_id', 'account_number'];

    const safeUpdateData = await protectedFieldUpdate(
      id,
      currentData,
      updateSavingsAccountDto,
      protectedField,
    );

    const updatedSavingAccount = await this.savingAccountModel
      .findOneAndUpdate({ _id: id }, safeUpdateData, { new: true })
      .populate(this.globalPopulatePath);

    return updatedSavingAccount;
  }

  async remove(id: string): Promise<DeleteResponse<SavingsAccount>> {
    const deletedSavingAccount =
      await this.savingAccountModel.findByIdAndDelete(id);

    if (!deletedSavingAccount) {
      throw new NotFoundException(MESSAGES.RESPONSE_MESSAGES.NO_RECORD_FOUND);
    }

    return {
      message: MESSAGES.RESPONSE_MESSAGES.DELETE_RESPONSE(
        SAVINGS_ACCOUNT_SCHEMA_NAME,
        id,
      ),
      deletedItem: deletedSavingAccount,
    };
  }
}
