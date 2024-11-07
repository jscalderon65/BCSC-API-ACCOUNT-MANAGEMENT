export const findAllStatesSwaggerOptions = {
  status: 200,
  description: 'Endpoint que devuelve todos los departamentos de Colombia.',
  schema: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        _id: { type: 'string' },
        name: { type: 'string' },
        createdAt: { type: 'string' },
        updatedAt: { type: 'string' },
        __v: { type: 'number' },
      },
    },
  },
};

export const findAllCitiesSwaggerOptions = {
  status: 200,
  description: 'Endpoint que devuelve todas las ciudades de Colombia.',
  schema: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        _id: { type: 'string' },
        name: { type: 'string' },
        state_id: { type: 'string' },
        createdAt: { type: 'string' },
        updatedAt: { type: 'string' },
        __v: { type: 'number' },
      },
    },
  },
};

export const findAllDocumentTypesSwaggerOptions = {
  status: 200,
  description:
    'Endpoint que devuelve los distintos tipos de documentos de identidad disponibles.',
  schema: {
    type: 'object',
    properties: {
      _id: { type: 'string' },
      code: { type: 'string' },
      name: { type: 'string' },
      createdAt: { type: 'string' },
      updatedAt: { type: 'string' },
      __v: { type: 'number' },
    },
  },
};
