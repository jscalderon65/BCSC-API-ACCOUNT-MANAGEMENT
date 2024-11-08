const savingsAccounts = {
  _id: { type: 'string' },
  customer_id: { type: 'string' },
  balance: { type: 'number' },
  is_active: { type: 'boolean' },
  account_number: { type: 'string' },
  __v: { type: 'number' },
};

export const createSwaggerOptions = {
  status: 200,
  description:
    'Endpoint para la gestión de la creación de cuenta de ahorros en la plataforma transaccional.',
  schema: {
    type: 'object',
    properties: savingsAccounts,
  },
};

export const findAllSwaggerOptions = {
  status: 200,
  description:
    'Endpoint para obtener toda la información detallada de todas las cuentas de ahorros en la plataforma transaccional.',
  schema: {
    type: 'array',
    items: { type: 'object', properties: savingsAccounts },
  },
};

export const findOneSwaggerOptions = {
  status: 200,
  description:
    'Endpoint para obtener la información detallada de una cuenta de ahorros en la plataforma transaccional.',
  schema: {
    type: 'object',
    properties: savingsAccounts,
  },
};

export const updateSwaggerOptions = {
  status: 200,
  description:
    'Endpoint para la gestión de la edición de un cuenta de ahorros en la plataforma transaccional.',
  schema: {
    type: 'object',
    properties: savingsAccounts,
  },
};

export const removeSwaggerOptions = {
  status: 200,
  description:
    'Endpoint para la eliminación de una cuenta de ahorros en la plataforma transaccional.',
  schema: {
    type: 'object',
    properties: {
      messsage: { type: 'string' },
      profile: { type: 'object', properties: savingsAccounts },
    },
  },
};
