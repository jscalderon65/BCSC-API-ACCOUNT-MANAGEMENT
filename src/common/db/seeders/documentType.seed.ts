import { DOCUMENT_TYPE_SCHEMA_NAME, MONGO_URI } from '@constants/mongo-db';
import {
  DocumentTypeDocument,
  DocumentTypeSchema,
} from '@utils/schemas/user-identity/document-type.schema';
import mongoose from 'mongoose';

async function insertData() {
  try {
    const db = await mongoose.connect(MONGO_URI);

    const DocumentTypeModel = db.model<DocumentTypeDocument>(
      DOCUMENT_TYPE_SCHEMA_NAME,
      DocumentTypeSchema,
    );

    await DocumentTypeModel.deleteMany();

    console.log('Deleting data...');

    const DocumentTypesToInsert = [
      {
        _id: '658470199401dd011fab609b',
        code: 'CC',
        name: 'CC - Cédula de ciudadanía',
        createdAt: '2023-12-21T17:04:25.715Z',
        updatedAt: '2023-12-21T17:04:25.715Z',
        __v: 0,
      },
      {
        _id: '658470199401dd011fab609c',
        code: 'TI',
        name: 'TI - Tarjeta de identidad',
        createdAt: '2023-12-21T17:04:25.715Z',
        updatedAt: '2023-12-21T17:04:25.715Z',
        __v: 0,
      },
    ];

    await DocumentTypeModel.insertMany(DocumentTypesToInsert);

    console.log('DocumentTypes data inserted successfully');
  } catch (error) {
    console.error('Error inserting DocumentTypes data:', error);
    mongoose.disconnect();
  } finally {
    await mongoose.disconnect();
    console.log('Database connection closed.');
  }
}

insertData();
