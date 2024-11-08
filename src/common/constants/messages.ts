import { PORT, TIME_ZONE } from 'src/common/constants/config-app';
import { MONGO_DB } from 'src/common/constants/mongo-db';
export const MESSAGES = {
  APP_RUNNING_STATUS: 'App running on port: ' + PORT + ' and TZ: ' + TIME_ZONE,
  ERROR_MESSAGES: {
    GENERIC_SERVER_ERROR_MESSAGE: 'Internal server error',
  },
  CONNECTION_MESSAGES: {
    MONGO_CORRECT_CONNECTION: 'DB successfully connected to ' + MONGO_DB,
    MONGO_END_CONNECTION: 'DB disconnected',
  },
  RESPONSE_MESSAGES: {
    DELETE_RESPONSE(schemaName: string, id: string): string {
      return `${schemaName} con ID ${id} eliminado exitosamente`;
    },
    NO_RECORD_FOUND: 'No se encontró el registro con el ID proporcionado',
    CANNOT_DELETE_RECORD(association: string): string {
      return `No se puede eliminar el registro, está asociado con un ${association}`;
    },
    CANNOT_MODIFY_FIELDS(protectedFields: string[]): string {
      return `No se pueden modificar los siguientes campos: ${protectedFields.join(', ')}`;
    },
    NO_MODEL_FOUND_FOR_ENTITY(entityName: string): string {
      return `No se encontró el modelo para la entidad: ${entityName}`;
    },
    NO_ENTITY_FOUND_WITH_ID(entityName: string, relationId: string): string {
      return `No se encontró un registro de la entidad: ${entityName} con ID: ${relationId}`;
    },
  },
};
