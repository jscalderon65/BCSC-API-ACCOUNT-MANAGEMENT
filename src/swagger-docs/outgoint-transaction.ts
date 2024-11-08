import { TransactionStatus } from '@outgoing-transaction/dto/create-outgoing-transaction.dto';

const outgoingTransaction = {
  _id: { type: 'string' },
  saving_account_id: { type: 'string' },
  destination_account_id: { type: 'string' },
  value: { type: 'number' },
  status: {
    type: 'string',
    enum: Object.values(TransactionStatus),
    default: TransactionStatus.Pending,
  },
  description: { type: 'string' },
  createdAt: { type: 'string', format: 'date-time' },
  updatedAt: { type: 'string', format: 'date-time' },
};

export const createSwaggerOptions = {
  status: 201,
  description:
    'Endpoint para crear una transacción saliente, moviendo fondos desde una cuenta de ahorros a una cuenta de destino.',
  schema: {
    type: 'object',
    properties: outgoingTransaction,
  },
};

export const findAllSwaggerOptions = {
  status: 200,
  description:
    'Endpoint para obtener todas las transacciones salientes realizadas en la plataforma, incluyendo la información de las cuentas de origen y destino.',
  schema: {
    type: 'array',
    items: { type: 'object', properties: outgoingTransaction },
  },
};

export const findOneSwaggerOptions = {
  status: 200,
  description:
    'Endpoint para obtener la información de una transacción saliente específica, identificado por su ID único.',
  schema: {
    type: 'object',
    properties: outgoingTransaction,
  },
};

export const updateSwaggerOptions = {
  status: 200,
  description:
    'Endpoint para actualizar los detalles de una transacción saliente, como el valor o la descripción de la operación.',
  schema: {
    type: 'object',
    properties: {
      status: {
        type: 'enum',
        example: JSON.stringify(Object.values(TransactionStatus)),
      },
    },
  },
};

export const removeSwaggerOptions = {
  status: 200,
  description:
    'Endpoint para eliminar una transacción saliente previamente registrada en la plataforma.',
  schema: {
    type: 'object',
    properties: {
      message: { type: 'string' },
      outgoingTransaction: { type: 'object', properties: outgoingTransaction },
    },
  },
};
