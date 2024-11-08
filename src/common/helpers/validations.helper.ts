import { MESSAGES } from '@constants/messages';
import { EntityServiceValidations } from '@interfaces/common.interfaces';
import { EntityRelationship } from '@interfaces/entity-relationship-validation.interface';
import { BadRequestException, NotFoundException } from '@nestjs/common';

export function ageValidation(birthDate: Date): boolean {
  const minAge = 16;
  const maxAge = 100;
  const today = new Date();
  const birth = new Date(birthDate);

  let age = today.getFullYear() - birth.getFullYear();
  const monthDifference = today.getMonth() - birth.getMonth();
  const dayDifference = today.getDate() - birth.getDate();

  if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
    age--;
  }

  return age >= minAge && age <= maxAge;
}

export async function protectedFieldUpdate<T>(
  id: string,
  currentResource: T,
  updateData: Partial<T>,
  protectedFields: string[],
): Promise<Partial<T>> {
  if (!currentResource) {
    throw new NotFoundException(MESSAGES.RESPONSE_MESSAGES.NO_RECORD_FOUND);
  }

  const attemptedProtectedUpdates = protectedFields.filter((field) => {
    if (updateData[field as keyof T] === undefined) return false;
    return updateData[field as keyof T] !== currentResource[field as keyof T];
  });

  if (attemptedProtectedUpdates.length > 0) {
    throw new BadRequestException(
      MESSAGES.RESPONSE_MESSAGES.CANNOT_MODIFY_FIELDS(protectedFields),
    );
  }

  const safeUpdateData = Object.keys(updateData)
    .filter((key) => {
      if (!protectedFields.includes(key)) return true;
      return updateData[key as keyof T] === currentResource[key as keyof T];
    })
    .reduce((obj, key) => {
      obj[key as keyof T] = updateData[key as keyof T];
      return obj;
    }, {} as Partial<T>);

  return safeUpdateData;
}

export async function validateEntityRelationships(
  entityIds: EntityRelationship[],
  entityServiceValidations: EntityServiceValidations,
): Promise<void> {
  const errors: string[] = [];

  for (const relation of entityIds) {
    const entityName = relation.entityName;
    const relationId = relation.id;
    const model = entityServiceValidations[entityName];

    if (!model) {
      errors.push(
        MESSAGES.RESPONSE_MESSAGES.NO_MODEL_FOUND_FOR_ENTITY(entityName),
      );
      continue;
    }

    const result = await model.findById(relationId).exec();

    if (!result) {
      errors.push(
        MESSAGES.RESPONSE_MESSAGES.NO_ENTITY_FOUND_WITH_ID(
          entityName,
          relationId,
        ),
      );
    }
  }

  if (errors.length > 0) {
    throw new NotFoundException(errors.join(', '));
  }
}
