import { MESSAGES } from '@constants/messages';
import {
  OUTGOING_TRANSACTION_SCHEMA_NAME,
  OUTGOING_TRANSACTION_STATUS_SCHEMA_NAME,
  SAVINGS_ACCOUNT_SCHEMA_NAME,
} from '@constants/mongo-db';
import {
  protectedFieldUpdate,
  validateEntityRelationships,
} from '@helpers/validations.helper';
import { EntityRelationship } from '@interfaces/entity-relationship-validation.interface';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateOutgoingTransactionDto } from '@outgoing-transaction/dto/create-outgoing-transaction.dto';
import { UpdateOutgoingTransactionDto } from '@outgoing-transaction/dto/update-outgoing-transaction.dto';
import {
  OutgoingTransaction,
  OutgoingTransactionDocument,
} from '@outgoing-transaction/entities/outgoing-transaction.entity';
import { SavingsAccountDocument } from '@savings-accounts/entities/savings-account.entity';
import { OutgoingTransactionStatus } from '@utils/schemas/process/outgoing-transaction-statatus.schema';
import { Model } from 'mongoose';

@Injectable()
export class OutgoingTransactionService {
  private readonly globalPopulatePath = [
    { path: 'source_account_id' },
    { path: 'destination_account_id' },
    { path: 'status_id' },
  ];
  financialDataModel: any;
  constructor(
    @InjectModel(OUTGOING_TRANSACTION_SCHEMA_NAME)
    private readonly outgoingTransactionModel: Model<OutgoingTransactionDocument>,

    @InjectModel(SAVINGS_ACCOUNT_SCHEMA_NAME)
    private readonly savingAccountModel: Model<SavingsAccountDocument>,

    @InjectModel(OUTGOING_TRANSACTION_STATUS_SCHEMA_NAME)
    private readonly outgoingTransactionStatusModel: Model<OutgoingTransactionStatus>,
  ) {}

  async isValidEntityRelationshipsId(
    entityIds: EntityRelationship[],
  ): Promise<void> {
    const entityServiceValidations = {
      [SAVINGS_ACCOUNT_SCHEMA_NAME]: this.savingAccountModel,
      [OUTGOING_TRANSACTION_STATUS_SCHEMA_NAME]:
        this.outgoingTransactionStatusModel,
    };
    await validateEntityRelationships(entityIds, entityServiceValidations);
  }

  async create(
    createOutgoingTransactionDto: CreateOutgoingTransactionDto,
  ): Promise<OutgoingTransaction> {
    const minimumTransactionValue = 5000;
    if (createOutgoingTransactionDto.value <= minimumTransactionValue) {
      throw new BadRequestException(
        `El valor de la transacción debe ser mayor a: ${minimumTransactionValue}`,
      );
    }

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
      {
        entityName: OUTGOING_TRANSACTION_STATUS_SCHEMA_NAME,
        id: createOutgoingTransactionDto.status_id,
      },
    ];

    await this.isValidEntityRelationshipsId(entityIds);

    const sourceAccountData = await this.savingAccountModel
      .findById(createOutgoingTransactionDto.source_account_id)
      .exec();

    const balanceTransactionValidation =
      sourceAccountData.balance - createOutgoingTransactionDto.value;

    if (balanceTransactionValidation < 0) {
      throw new BadRequestException(
        'El monto de la transacción supera el saldo de la cuenta de origen',
      );
    }

    const newOutgoingTransaction = await this.outgoingTransactionModel.create(
      createOutgoingTransactionDto,
    );

    await this.savingAccountModel.findByIdAndUpdate(
      createOutgoingTransactionDto.source_account_id,
      {
        balance: balanceTransactionValidation,
        updated_at: new Date(),
      },
    );

    return await this.outgoingTransactionModel
      .findById(newOutgoingTransaction._id)
      .populate(this.globalPopulatePath);
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
