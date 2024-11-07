import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { Model } from 'mongoose';
import { DocumentTypeDocument } from '@utils/schemas/user-identity/document-type.schema';
import { CityDocument } from '@utils/schemas/location/city.schema';
import { StateDocument } from '@utils/schemas/location/state.schema';
import {
  rootMongooseTestModule,
  closeInMongodConnection,
} from '@db/stubs/mongo-db-in-memory';
import { getModelToken } from '@nestjs/mongoose';
import { UtilsModule } from '@utils/utils.module';
import {
  CreateCityStub,
  CreateDocumentTypeStub,
  CreateStateStub,
} from '@db/stubs/utils.stub';
import {
  STATE_SCHEMA_NAME,
  CITY_SCHEMA_NAME,
  DOCUMENT_TYPE_SCHEMA_NAME,
} from '@constants/mongo-db';

let app;
let cityModel: Model<CityDocument>;
let stateModel: Model<StateDocument>;
let documentTypeModel: Model<DocumentTypeDocument>;

beforeAll(async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [rootMongooseTestModule(), UtilsModule],
  }).compile();

  cityModel = moduleFixture.get<Model<CityDocument>>(
    getModelToken(CITY_SCHEMA_NAME),
  );

  stateModel = moduleFixture.get<Model<StateDocument>>(
    getModelToken(STATE_SCHEMA_NAME),
  );

  documentTypeModel = moduleFixture.get<Model<DocumentTypeDocument>>(
    getModelToken(DOCUMENT_TYPE_SCHEMA_NAME),
  );
  app = moduleFixture.createNestApplication();
  await app.init();
});

afterAll(async () => {
  await closeInMongodConnection();
  await app.close();
});

describe('UtilsController', () => {
  it('GET /utils/states should return 200', async () => {
    await stateModel.insertMany([CreateStateStub(), CreateStateStub()]);

    const result = await request(app.getHttpServer())
      .get('/utils/states')
      .expect(200);

    const allStates = await stateModel.find();
    expect(result.body.length).toBe(allStates.length);
  });

  it('GET /utils/cities should return 200', async () => {
    await cityModel.insertMany([CreateCityStub(), CreateCityStub()]);

    const result = await request(app.getHttpServer())
      .get('/utils/cities')
      .expect(200);

    const allCities = await cityModel.find();
    expect(result.body.length).toBe(allCities.length);
  });

  it('GET /utils/document-types should return 200', async () => {
    await documentTypeModel.insertMany([
      CreateDocumentTypeStub(),
      CreateDocumentTypeStub(),
    ]);

    const result = await request(app.getHttpServer())
      .get('/utils/document-types')
      .expect(200);

    const allDocumentTypes = await documentTypeModel.find();
    expect(result.body.length).toBe(allDocumentTypes.length);
  });
});
