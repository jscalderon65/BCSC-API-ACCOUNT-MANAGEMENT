import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOutgoingTransactionDto } from './dto/create-outgoing-transaction.dto';
import { UpdateOutgoingTransactionDto } from './dto/update-outgoing-transaction.dto';
import {
  OUTGOING_TRANSACTION_SCHEMA_NAME,
  SAVINGS_ACCOUNT_SCHEMA_NAME,
} from '@constants/mongo-db';
import {
  OutgoingTransaction,
  OutgoingTransactionDocument,
} from './entities/outgoing-transaction.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { SavingsAccountDocument } from '@savings-accounts/entities/savings-account.entity';
import { EntityRelationship } from '@interfaces/entity-relationship-validation.interface';
import {
  protectedFieldUpdate,
  validateEntityRelationships,
} from '@helpers/validations.helper';
import { MESSAGES } from '@constants/messages';

@Injectable()
export class OutgoingTransactionService {
  private readonly globalPopulatePath = [
    { path: 'source_account_id' },
    { path: 'destination_account_id' },
  ];
  financialDataModel: any;
  constructor(
    @InjectModel(OUTGOING_TRANSACTION_SCHEMA_NAME)
    private readonly outgoingTransactionModel: Model<OutgoingTransactionDocument>,

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
    createOutgoingTransactionDto: CreateOutgoingTransactionDto,
  ): Promise<OutgoingTransaction> {
    if (
      createOutgoingTransactionDto.source_account_id ===
      createOutgoingTransactionDto.destination_account_id
    ) {
      throw new BadRequestException(
        'La cuenta de origen no puede ser igual a la cuenta de destino',
      );
    }

    const entityIds: EntityRelationship[] = [
      {
        entityName: SAVINGS_ACCOUNT_SCHEMA_NAME,
        id: createOutgoingTransactionDto.source_account_id,
      },
      {
        entityName: SAVINGS_ACCOUNT_SCHEMA_NAME,
        id: createOutgoingTransactionDto.destination_account_id,
      },
    ];

    await this.isValidEntityRelationshipsId(entityIds);
    const newOutgoingTransaction = await this.outgoingTransactionModel.create(
      createOutgoingTransactionDto,
    );
    return newOutgoingTransaction;
  }

  findAll(): Promise<OutgoingTransaction[]> {
    return this.outgoingTransactionModel
      .find()
      .populate(this.globalPopulatePath);
  }

  async findOne(id: string): Promise<OutgoingTransaction> {
    const retrievedOutgoingTransaction = await this.outgoingTransactionModel
      .findById(id)
      .populate(this.globalPopulatePath);
    if (!retrievedOutgoingTransaction) {
      throw new NotFoundException(MESSAGES.RESPONSE_MESSAGES.NO_RECORD_FOUND);
    }
    return retrievedOutgoingTransaction;
  }
  async update(
    id: string,
    updateOutgoingTransactionDto: UpdateOutgoingTransactionDto,
  ): Promise<OutgoingTransaction> {
    const currentData = await this.financialDataModel.findById(id);
    const protectedField = [
      'source_account_id',
      'value',
      'outgoing_transaction_id',
      'description',
    ];

    const safeUpdateData = await protectedFieldUpdate(
      id,
      currentData,
      updateOutgoingTransactionDto,
      protectedField,
    );

    const updatedOutgoingTransaction = await this.financialDataModel
      .findOneAndUpdate({ _id: id }, safeUpdateData, { new: true })
      .populate(this.globalPopulatePath);

    return updatedOutgoingTransaction;
  }
}
