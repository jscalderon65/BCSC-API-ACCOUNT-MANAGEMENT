import { MESSAGES } from '@constants/messages';
import {
  SAVINGS_ACCOUNT_SCHEMA_NAME,
  TRANSACTION_SCHEMA_NAME,
  TRANSACTION_STATUS_SCHEMA_NAME,
} from '@constants/mongo-db';
import { getDateRange, PeriodType } from '@helpers/dates.helper';
import { getRandomStatus } from '@helpers/simulations.helper';
import { validateEntityRelationships } from '@helpers/validations.helper';
import { EntityRelationship } from '@interfaces/entity-relationship-validation.interface';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SavingsAccountDocument } from '@savings-accounts/entities/savings-account.entity';
import { CreateTransactionDto } from '@transactions/dto/create-transaction.dto';
import {
  Transaction,
  TransactionDocument,
} from '@transactions/entities/transaction.entity';
import { TransactionStatus } from '@utils/schemas/process/transaction-status.schema';
import { Model } from 'mongoose';

@Injectable()
export class TransactionService {
  private readonly globalPopulatePath = [
    { path: 'source_account_id' },
    { path: 'destination_account_id' },
    { path: 'status_id' },
  ];
  financialDataModel: any;
  constructor(
    @InjectModel(TRANSACTION_SCHEMA_NAME)
    private readonly transactionModel: Model<TransactionDocument>,

    @InjectModel(SAVINGS_ACCOUNT_SCHEMA_NAME)
    private readonly savingAccountModel: Model<SavingsAccountDocument>,

    @InjectModel(TRANSACTION_STATUS_SCHEMA_NAME)
    private readonly transactionStatusModel: Model<TransactionStatus>,
  ) {}

  async isValidEntityRelationshipsId(
    entityIds: EntityRelationship[],
  ): Promise<void> {
    const entityServiceValidations = {
      [SAVINGS_ACCOUNT_SCHEMA_NAME]: this.savingAccountModel,
      [TRANSACTION_STATUS_SCHEMA_NAME]: this.transactionStatusModel,
    };
    await validateEntityRelationships(entityIds, entityServiceValidations);
  }

  async create(
    createTransactionDto: CreateTransactionDto,
  ): Promise<Transaction> {
    const allTransactionStatus = await this.transactionStatusModel.find();

    const randomTransactionStatus = getRandomStatus(allTransactionStatus);

    const minimumTransactionValue = 5000;
    if (createTransactionDto.value <= minimumTransactionValue) {
      throw new BadRequestException(
        `El valor de la transacción debe ser mayor a: ${minimumTransactionValue}`,
      );
    }

    if (
      createTransactionDto.source_account_id ===
      createTransactionDto.destination_account_id
    ) {
      throw new BadRequestException(
        'La cuenta de origen no puede ser igual a la cuenta de destino',
      );
    }

    const entityIds: EntityRelationship[] = [
      {
        entityName: SAVINGS_ACCOUNT_SCHEMA_NAME,
        id: createTransactionDto.source_account_id,
      },
      {
        entityName: SAVINGS_ACCOUNT_SCHEMA_NAME,
        id: createTransactionDto.destination_account_id,
      },
    ];

    await this.isValidEntityRelationshipsId(entityIds);

    const sourceAccountData = await this.savingAccountModel
      .findById(createTransactionDto.source_account_id)
      .exec();

    const balanceTransactionValidation =
      sourceAccountData.balance - createTransactionDto.value;

    if (balanceTransactionValidation < 0) {
      throw new BadRequestException(
        'El monto de la transacción supera el saldo de la cuenta de origen',
      );
    }

    const destinationAccountData = await this.savingAccountModel
      .findById(createTransactionDto.destination_account_id)
      .exec();

    const newBalanceForDestinationAccount =
      destinationAccountData.balance + createTransactionDto.value;

    const newTransaction = await this.transactionModel.create({
      ...createTransactionDto,
      status_id: randomTransactionStatus._id,
    });

    if (randomTransactionStatus.code === 'COMPLETED') {
      await this.savingAccountModel.findByIdAndUpdate(
        createTransactionDto.source_account_id,
        {
          balance: balanceTransactionValidation,
          updated_at: new Date(),
        },
      );

      await this.savingAccountModel.findByIdAndUpdate(
        createTransactionDto.destination_account_id,
        {
          balance: newBalanceForDestinationAccount,
          updated_at: new Date(),
        },
      );
    }

    return await this.transactionModel
      .findById(newTransaction._id)
      .populate(this.globalPopulatePath);
  }

  findAll(): Promise<Transaction[]> {
    return this.transactionModel.find().populate(this.globalPopulatePath);
  }

  findOutgoingTransactionsByAccountId(
    id: string,
    period: PeriodType,
  ): Promise<Transaction[]> {
    const { start, end } = getDateRange(new Date(), period);
    return this.transactionModel
      .find({ source_account_id: id, createdAt: { $gte: start, $lte: end } })
      .populate(this.globalPopulatePath);
  }

  findIncomingTransactionsByAccountId(
    id: string,
    period: PeriodType,
  ): Promise<Transaction[]> {
    const { start, end } = getDateRange(new Date(), period);
    return this.transactionModel
      .find({
        destination_account_id: id,
        createdAt: { $gte: start, $lte: end },
      })
      .populate(this.globalPopulatePath);
  }

  async findOne(id: string): Promise<Transaction> {
    const retrievedTransaction = await this.transactionModel
      .findById(id)
      .populate(this.globalPopulatePath);
    if (!retrievedTransaction) {
      throw new NotFoundException(MESSAGES.RESPONSE_MESSAGES.NO_RECORD_FOUND);
    }
    return retrievedTransaction;
  }
}
