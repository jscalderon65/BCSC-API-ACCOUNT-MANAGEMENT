import { MONGO_URI, STATE_SCHEMA_NAME } from '@constants/mongo-db';
import {
  StateDocument,
  StateSchema,
} from '@utils/schemas/location/state.schema';
import mongoose from 'mongoose';

async function insertData() {
  try {
    const db = await mongoose.connect(MONGO_URI);

    const StateModel = db.model<StateDocument>(STATE_SCHEMA_NAME, StateSchema);

    await StateModel.deleteMany();

    console.log('Deleting data...');

    // Información obtenida de la API de Colombia: https://api-colombia.com/api/v1/Department
    const statesToInsert = [
      {
        _id: '672cfe4e0c5490289daac657',
        name: 'Amazonas',
        createdAt: '2024-11-07T17:59:22.009Z',
        updatedAt: '2024-11-07T17:59:22.009Z',
      },
      {
        _id: '672cfe4e0c5490289daac658',
        name: 'Antioquia',
        createdAt: '2024-11-07T17:59:22.009Z',
        updatedAt: '2024-11-07T17:59:22.009Z',
      },
      {
        _id: '672cfe4e0c5490289daac659',
        name: 'Arauca',
        createdAt: '2024-11-07T17:59:22.009Z',
        updatedAt: '2024-11-07T17:59:22.009Z',
      },
      {
        _id: '672cfe4e0c5490289daac65a',
        name: 'Atlántico',
        createdAt: '2024-11-07T17:59:22.009Z',
        updatedAt: '2024-11-07T17:59:22.009Z',
      },
      {
        _id: '672cfe4e0c5490289daac65b',
        name: 'Bogotá',
        createdAt: '2024-11-07T17:59:22.009Z',
        updatedAt: '2024-11-07T17:59:22.009Z',
      },
      {
        _id: '672cfe4e0c5490289daac65c',
        name: 'Bolívar',
        createdAt: '2024-11-07T17:59:22.009Z',
        updatedAt: '2024-11-07T17:59:22.009Z',
      },
      {
        _id: '672cfe4e0c5490289daac65d',
        name: 'Boyacá',
        createdAt: '2024-11-07T17:59:22.009Z',
        updatedAt: '2024-11-07T17:59:22.009Z',
      },
      {
        _id: '672cfe4e0c5490289daac65e',
        name: 'Caldas',
        createdAt: '2024-11-07T17:59:22.009Z',
        updatedAt: '2024-11-07T17:59:22.009Z',
      },
      {
        _id: '672cfe4e0c5490289daac65f',
        name: 'Caquetá',
        createdAt: '2024-11-07T17:59:22.009Z',
        updatedAt: '2024-11-07T17:59:22.009Z',
      },
      {
        _id: '672cfe4e0c5490289daac660',
        name: 'Casanare',
        createdAt: '2024-11-07T17:59:22.009Z',
        updatedAt: '2024-11-07T17:59:22.009Z',
      },
      {
        _id: '672cfe4e0c5490289daac661',
        name: 'Cauca',
        createdAt: '2024-11-07T17:59:22.009Z',
        updatedAt: '2024-11-07T17:59:22.009Z',
      },
      {
        _id: '672cfe4e0c5490289daac662',
        name: 'Cesar',
        createdAt: '2024-11-07T17:59:22.009Z',
        updatedAt: '2024-11-07T17:59:22.009Z',
      },
      {
        _id: '672cfe4e0c5490289daac663',
        name: 'Chocó',
        createdAt: '2024-11-07T17:59:22.009Z',
        updatedAt: '2024-11-07T17:59:22.009Z',
      },
      {
        _id: '672cfe4e0c5490289daac664',
        name: 'Córdoba',
        createdAt: '2024-11-07T17:59:22.009Z',
        updatedAt: '2024-11-07T17:59:22.009Z',
      },
      {
        _id: '672cfe4e0c5490289daac665',
        name: 'Cundinamarca',
        createdAt: '2024-11-07T17:59:22.009Z',
        updatedAt: '2024-11-07T17:59:22.009Z',
      },
      {
        _id: '672cfe4e0c5490289daac666',
        name: 'Guainía',
        createdAt: '2024-11-07T17:59:22.009Z',
        updatedAt: '2024-11-07T17:59:22.009Z',
      },
      {
        _id: '672cfe4e0c5490289daac667',
        name: 'Guaviare',
        createdAt: '2024-11-07T17:59:22.009Z',
        updatedAt: '2024-11-07T17:59:22.009Z',
      },
      {
        _id: '672cfe4e0c5490289daac668',
        name: 'Huila',
        createdAt: '2024-11-07T17:59:22.009Z',
        updatedAt: '2024-11-07T17:59:22.009Z',
      },
      {
        _id: '672cfe4e0c5490289daac669',
        name: 'La Guajira',
        createdAt: '2024-11-07T17:59:22.009Z',
        updatedAt: '2024-11-07T17:59:22.009Z',
      },
      {
        _id: '672cfe4e0c5490289daac66a',
        name: 'Magdalena',
        createdAt: '2024-11-07T17:59:22.009Z',
        updatedAt: '2024-11-07T17:59:22.009Z',
      },
      {
        _id: '672cfe4e0c5490289daac66b',
        name: 'Meta',
        createdAt: '2024-11-07T17:59:22.009Z',
        updatedAt: '2024-11-07T17:59:22.009Z',
      },
      {
        _id: '672cfe4e0c5490289daac66c',
        name: 'Nariño',
        createdAt: '2024-11-07T17:59:22.009Z',
        updatedAt: '2024-11-07T17:59:22.009Z',
      },
      {
        _id: '672cfe4e0c5490289daac66d',
        name: 'Norte de Santander',
        createdAt: '2024-11-07T17:59:22.009Z',
        updatedAt: '2024-11-07T17:59:22.009Z',
      },
      {
        _id: '672cfe4e0c5490289daac66e',
        name: 'Putumayo',
        createdAt: '2024-11-07T17:59:22.009Z',
        updatedAt: '2024-11-07T17:59:22.009Z',
      },
      {
        _id: '672cfe4e0c5490289daac66f',
        name: 'Quindío',
        createdAt: '2024-11-07T17:59:22.009Z',
        updatedAt: '2024-11-07T17:59:22.009Z',
      },
      {
        _id: '672cfe4e0c5490289daac670',
        name: 'Risaralda',
        createdAt: '2024-11-07T17:59:22.009Z',
        updatedAt: '2024-11-07T17:59:22.009Z',
      },
      {
        _id: '672cfe4e0c5490289daac671',
        name: 'San Andrés y Providencia',
        createdAt: '2024-11-07T17:59:22.009Z',
        updatedAt: '2024-11-07T17:59:22.009Z',
      },
      {
        _id: '672cfe4e0c5490289daac672',
        name: 'Santander',
        createdAt: '2024-11-07T17:59:22.009Z',
        updatedAt: '2024-11-07T17:59:22.009Z',
      },
      {
        _id: '672cfe4e0c5490289daac673',
        name: 'Sucre',
        createdAt: '2024-11-07T17:59:22.009Z',
        updatedAt: '2024-11-07T17:59:22.009Z',
      },
      {
        _id: '672cfe4e0c5490289daac674',
        name: 'Tolima',
        createdAt: '2024-11-07T17:59:22.009Z',
        updatedAt: '2024-11-07T17:59:22.009Z',
      },
      {
        _id: '672cfe4e0c5490289daac675',
        name: 'Valle del Cauca',
        createdAt: '2024-11-07T17:59:22.009Z',
        updatedAt: '2024-11-07T17:59:22.009Z',
      },
      {
        _id: '672cfe4e0c5490289daac676',
        name: 'Vaupés',
        createdAt: '2024-11-07T17:59:22.009Z',
        updatedAt: '2024-11-07T17:59:22.009Z',
      },
      {
        _id: '672cfe4e0c5490289daac677',
        name: 'Vichada',
        createdAt: '2024-11-07T17:59:22.009Z',
        updatedAt: '2024-11-07T17:59:22.009Z',
      },
    ];

    await StateModel.insertMany(statesToInsert);

    console.log('States data inserted successfully');
  } catch (error) {
    console.error('Error inserting states data:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Database connection closed.');
  }
}

insertData();
