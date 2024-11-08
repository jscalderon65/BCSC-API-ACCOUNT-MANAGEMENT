const kycData = {
  _id: { type: 'string' },
  customer_id: { type: 'string' },
  occupation_type_id: { type: 'string' },
  city_id: { type: 'string' },
  state_id: { type: 'string' },
  address: { type: 'string' },
  postal_code: { type: 'string' },
  __v: { type: 'number' },
};

export const createSwaggerOptions = {
  status: 200,
  description:
    'Endpoint para la gestión de la creación de un registro de información detallada de usuario en la plataforma transaccional.',
  schema: {
    type: 'object',
    properties: kycData,
  },
};

export const findAllSwaggerOptions = {
  status: 200,
  description:
    'Endpoint para obtener toda la información detallada de todos los perfiles de usuario en la plataforma transaccional.',
  schema: {
    type: 'array',
    items: { type: 'object', properties: kycData },
  },
};

export const findOneSwaggerOptions = {
  status: 200,
  description:
    'Endpoint para obtener la información detallada de perfil de usuario en la plataforma transaccional por Id.',
  schema: {
    type: 'object',
    properties: kycData,
  },
};

export const updateSwaggerOptions = {
  status: 200,
  description:
    'Endpoint para la gestión de la edición de la información detallada de usuario en la plataforma transaccional.',
  schema: {
    type: 'object',
    properties: kycData,
  },
};

export const removeSwaggerOptions = {
  status: 200,
  description:
    'Endpoint para la eliminación de la información detallada de usuario en la plataforma transaccional.',
  schema: {
    type: 'object',
    properties: {
      messsage: { type: 'string' },
      profile: { type: 'object', properties: kycData },
    },
  },
};
