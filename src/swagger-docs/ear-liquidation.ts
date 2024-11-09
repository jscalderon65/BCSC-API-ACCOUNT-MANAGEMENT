const earLiquidation = {
  _id: { type: 'string' },
  account_id: { type: 'string' },
  annual_effective_rate: { type: 'number' },
  liquidation_base: { type: 'number' },
  generated_interest: {
    type: 'number',
  },
};

export const createSwaggerOptions = {
  status: 201,
  description:
    'Endpoint para crear una liquidación de la tasa de rendimiento de interes efectectivo anual.',
  schema: {
    type: 'object',
    properties: earLiquidation,
  },
};

export const findAllSwaggerOptions = {
  status: 200,
  description: 'Endpoint para obtener todas las liquidaciones realizadas.',
  schema: {
    type: 'array',
    items: { type: 'object', properties: earLiquidation },
  },
};

export const findOutgoingTransactionsByAccountIdSwaggerOptions = {
  status: 200,
  description:
    'Endpoint para obtener liquidaciones por el ID de una cuenta y un rango de fechas.',
  schema: {
    type: 'array',
    items: { type: 'object', properties: earLiquidation },
  },
};

export const findOneSwaggerOptions = {
  status: 200,
  description:
    'Endpoint para obtener una liquidación específica, identificada por su ID único.',
  schema: {
    type: 'object',
    properties: earLiquidation,
  },
};
