const financialData = {
  _id: { type: 'string' },
  customer_id: { type: 'string' },
  monthlyIncome: { type: 'number' },
  monthlyExpenses: { type: 'number' },
  totalDebts: { type: 'number' },
  totalSavings: { type: 'number' },
  createdAt: { type: 'string', format: 'date-time' },
  updatedAt: { type: 'string', format: 'date-time' },
};

export const createSwaggerOptions = {
  status: 201,
  description:
    'Endpoint para la creación de un registro de información financiera de un cliente en la plataforma transaccional.',
  schema: {
    type: 'object',
    properties: financialData,
  },
};

export const findAllSwaggerOptions = {
  status: 200,
  description:
    'Endpoint para obtener toda la información financiera de todos los clientes en la plataforma transaccional.',
  schema: {
    type: 'array',
    items: { type: 'object', properties: financialData },
  },
};

export const findOneSwaggerOptions = {
  status: 200,
  description:
    'Endpoint para obtener la información financiera de un cliente en la plataforma por su ID transaccional.',
  schema: {
    type: 'object',
    properties: financialData,
  },
};

export const updateSwaggerOptions = {
  status: 200,
  description:
    'Endpoint para la edición de la información financiera de un cliente en la plataforma transaccional.',
  schema: {
    type: 'object',
    properties: financialData,
  },
};

export const removeSwaggerOptions = {
  status: 200,
  description:
    'Endpoint para la eliminación de la información financiera de un cliente en la plataforma transaccional.',
  schema: {
    type: 'object',
    properties: {
      message: { type: 'string' },
      financialData: { type: 'object', properties: financialData },
    },
  },
};
