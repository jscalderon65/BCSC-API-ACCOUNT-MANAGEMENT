import {
  CITY_SCHEMA_NAME,
  DOCUMENT_TYPE_SCHEMA_NAME,
  STATE_SCHEMA_NAME,
} from '@constants/mongo-db';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { CityDocument } from '@utils/schemas/location/city.schema';
import { StateDocument } from '@utils/schemas/location/state.schema';
import { DocumentTypeDocument } from '@utils/schemas/user-identity/document-type.schema';
import { UtilsService } from '@utils/utils.service';
import { Request } from 'express';
import { Model } from 'mongoose';

describe('UtilsService', () => {
  let service: UtilsService;
  let cityModel: Model<CityDocument>;
  let stateModel: Model<StateDocument>;
  let documentTypeModel: Model<DocumentTypeDocument>;

  const mockCityModel = {
    find: jest.fn(),
    populate: jest.fn(),
  };

  const mockStateModel = {
    find: jest.fn(),
  };

  const mockDocumentTypeModel = {
    find: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UtilsService,
        {
          provide: getModelToken(CITY_SCHEMA_NAME),
          useValue: mockCityModel,
        },
        {
          provide: getModelToken(STATE_SCHEMA_NAME),
          useValue: mockStateModel,
        },
        {
          provide: getModelToken(DOCUMENT_TYPE_SCHEMA_NAME),
          useValue: mockDocumentTypeModel,
        },
      ],
    }).compile();

    service = module.get<UtilsService>(UtilsService);
    cityModel = module.get<Model<CityDocument>>(
      getModelToken(CITY_SCHEMA_NAME),
    );
    stateModel = module.get<Model<StateDocument>>(
      getModelToken(STATE_SCHEMA_NAME),
    );
    documentTypeModel = module.get<Model<DocumentTypeDocument>>(
      getModelToken(DOCUMENT_TYPE_SCHEMA_NAME),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAllCities', () => {
    it('should return an array of cities', async () => {
      const mockRequest = {} as Request;

      const mockCities = [
        { name: 'City 1', state_id: 'state1' },
        { name: 'City 2', state_id: 'state2' },
      ];

      mockCityModel.find.mockReturnValue({
        populate: jest.fn().mockResolvedValue(mockCities),
      });

      const result = await service.findAllCities(mockRequest);

      expect(result).toEqual(mockCities);
      expect(cityModel.find).toHaveBeenCalledWith(mockRequest.query);
    });
  });

  describe('findAllStates', () => {
    it('should return an array of states', async () => {
      const mockRequest = {} as Request;

      const mockStates = [{ name: 'State 1' }, { name: 'State 2' }];

      mockStateModel.find.mockResolvedValue(mockStates);

      const result = await service.findAllStates(mockRequest);

      expect(result).toEqual(mockStates);
      expect(stateModel.find).toHaveBeenCalledWith(mockRequest.query);
    });
  });

  describe('findAllDocumentTypes', () => {
    it('should return an array of document types', async () => {
      const mockRequest = {} as Request;

      const mockDocumentTypes = [{ name: 'Type 1' }, { name: 'Type 2' }];

      mockDocumentTypeModel.find.mockResolvedValue(mockDocumentTypes);

      const result = await service.findAllDocumentTypes(mockRequest);

      expect(result).toEqual(mockDocumentTypes);
      expect(documentTypeModel.find).toHaveBeenCalledWith(mockRequest.query);
    });
  });
});
