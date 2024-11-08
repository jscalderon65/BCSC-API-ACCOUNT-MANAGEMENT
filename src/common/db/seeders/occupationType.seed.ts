import { MONGO_URI, OCCUPATION_TYPE_SCHEMA_NAME } from '@constants/mongo-db';
import {
  OccupationTypeDocument,
  OccupationTypeSchema,
} from '@utils/schemas/user-identity/occupation-type.schema';
import mongoose from 'mongoose';

async function insertOccupationData() {
  try {
    const db = await mongoose.connect(MONGO_URI);

    const OccupationTypeModel = db.model<OccupationTypeDocument>(
      OCCUPATION_TYPE_SCHEMA_NAME,
      OccupationTypeSchema,
    );

    await OccupationTypeModel.deleteMany();

    console.log('Deleting existing occupation data...');

    const OccupationTypesToInsert = [
      {
        _id: '658470199401dd011fab6001',
        name: 'Estudiante',
        createdAt: new Date(),
        updatedAt: new Date(),
        __v: 0,
      },
      {
        _id: '658470199401dd011fab6002',
        name: 'Empleado',
        createdAt: new Date(),
        updatedAt: new Date(),
        __v: 0,
      },
      {
        _id: '658470199401dd011fab6003',
        name: 'Trabajador Independiente',
        createdAt: new Date(),
        updatedAt: new Date(),
        __v: 0,
      },
      {
        _id: '658470199401dd011fab6004',
        name: 'Desempleado',
        createdAt: new Date(),
        updatedAt: new Date(),
        __v: 0,
      },
      {
        _id: '658470199401dd011fab6005',
        name: 'Jubilado',
        createdAt: new Date(),
        updatedAt: new Date(),
        __v: 0,
      },
    ];

    await OccupationTypeModel.insertMany(OccupationTypesToInsert);

    console.log('OccupationTypes data inserted successfully');
  } catch (error) {
    console.error('Error inserting OccupationTypes data:', error);
    mongoose.disconnect();
  } finally {
    await mongoose.disconnect();
    console.log('Database connection closed.');
  }
}

insertOccupationData();
