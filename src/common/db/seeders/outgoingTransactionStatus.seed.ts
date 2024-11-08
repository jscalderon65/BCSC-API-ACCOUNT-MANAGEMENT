import {
  MONGO_URI,
  OUTGOING_TRANSACTION_STATUS_SCHEMA_NAME,
} from '@constants/mongo-db';
import {
  OutgoingTransactionStatusDocument,
  OutgoingTransactionStatusSchema,
} from '@utils/schemas/process/outgoing-transaction-statatus.schema';
import mongoose from 'mongoose';

async function insertData() {
  try {
    const db = await mongoose.connect(MONGO_URI);

    const transactionStatusModel = db.model<OutgoingTransactionStatusDocument>(
      OUTGOING_TRANSACTION_STATUS_SCHEMA_NAME,
      OutgoingTransactionStatusSchema,
    );

    await transactionStatusModel.deleteMany();
    console.log('Deleting existing data...');

    const outgoingTransactionStatusToInsert = [
      {
        code: 'PENDING',
        name: 'Pendiente',
        description: 'La transacción está pendiente y esperando ser procesada.',
      },
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

    await transactionStatusModel.insertMany(outgoingTransactionStatusToInsert);

    console.log('OutgoingTransactionStatus data inserted successfully');
  } catch (error) {
    console.error('Error inserting outgoingTransactionStatus data:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Database connection closed.');
  }
}

insertData();
