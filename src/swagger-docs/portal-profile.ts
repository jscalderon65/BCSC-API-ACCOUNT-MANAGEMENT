const portalProfile = {
  _id: { type: 'string' },
  email: { type: 'string' },
  phone_number: { type: 'string' },
  first_name: { type: 'string' },
  last_name: { type: 'string' },
  birth_date: { type: 'string' },
  document_type_id: { type: 'string' },
  document_number: { type: 'string' },
  createdAt: { type: 'string' },
  updatedAt: { type: 'string' },
  __v: { type: 'number' },
};

export const createSwaggerOptions = {
  status: 200,
  description:
    'Endpoint para la gestión de la creación de un perfil de usuario en la plataforma transaccional.',
  schema: {
    type: 'object',
    properties: portalProfile,
  },
};

export const findAllSwaggerOptions = {
  status: 200,
  description:
    'Endpoint para obtener todos los perfiles de usuario en la plataforma transaccional.',
  schema: {
    type: 'array',
    items: { type: 'object', properties: portalProfile },
  },
};

export const findOneSwaggerOptions = {
  status: 200,
  description:
    'Endpoint para obtener un perfil de usuario en la plataforma transaccional por Id.',
  schema: {
    type: 'object',
    properties: portalProfile,
  },
};

export const updateSwaggerOptions = {
  status: 200,
  description:
    'Endpoint para la gestión de la edición de un perfil de usuario en la plataforma transaccional.',
  schema: {
    type: 'object',
    properties: portalProfile,
  },
};

export const removeSwaggerOptions = {
  status: 200,
  description:
    'Endpoint para la eliminación de un perfil de usuario en la plataforma transaccional.',
  schema: {
    type: 'object',
    properties: {
      messsage: { type: 'string' },
      profile: { type: 'object', properties: portalProfile },
    },
  },
};
