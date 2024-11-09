import { MONGO_URI, TRANSACTION_STATUS_SCHEMA_NAME } from '@constants/mongo-db';
import {
  TransactionStatusDocument,
  TransactionStatusSchema,
} from '@utils/schemas/process/transaction-status.schema';
import mongoose from 'mongoose';

async function insertData() {
  try {
    const db = await mongoose.connect(MONGO_URI);

    const transactionStatusModel = db.model<TransactionStatusDocument>(
      TRANSACTION_STATUS_SCHEMA_NAME,
      TransactionStatusSchema,
    );

    await transactionStatusModel.deleteMany();
    console.log('Deleting existing data...');

    const transactionStatusToInsert = [
      {
        code: 'COMPLETED',
        name: 'Completada',
        description: 'La transacción ha sido completada exitosamente.',
      },
      {
        code: 'FAILED',
        name: 'Fallida',
        description: 'La transacción ha fallado debido a un error.',
      },
      {
        code: 'CANCELLED',
        name: 'Cancelada',
        description: 'La transacción ha sido cancelada por el usuario.',
      },
    ];

    await transactionStatusModel.insertMany(transactionStatusToInsert);

    console.log('TransactionStatus data inserted successfully');
  } catch (error) {
    console.error('Error inserting TransactionStatus data:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Database connection closed.');
  }
}

insertData();
