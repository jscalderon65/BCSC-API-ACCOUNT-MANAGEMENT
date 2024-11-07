import { faker } from '@faker-js/faker';
import { City } from '@utils/schemas/location/city.schema';
import { State } from '@utils/schemas/location/state.schema';
import { DocumentType } from '@utils/schemas/user-identity/document-type.schema';
import mongoose from 'mongoose';

export const CreateCityStub = (): City => {
  const objectId = new mongoose.Types.ObjectId();
  const cityData = {
    name: faker.location.city(),
    state_id: objectId,
  };
  const cityStub = new City();
  cityStub.name = cityData.name;
  cityStub.state_id = cityData.state_id;
  return cityStub;
};

export const CreateStateStub = (): State => {
  const stateData = {
    name: faker.location.city(),
  };
  const stateStub = new State();
  stateStub.name = stateData.name;
  return stateStub;
};

export const CreateDocumentTypeStub = (): DocumentType => {
  const documentTypeData = {
    code: faker.word.sample(),
    name: faker.word.sample(),
  };
  const documentStub = new DocumentType();
  documentStub.code = documentTypeData.code;
  documentStub.name = documentTypeData.name;
  return documentStub;
};
