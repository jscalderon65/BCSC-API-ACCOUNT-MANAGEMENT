import {
  CITY_SCHEMA_NAME,
  DOCUMENT_TYPE_SCHEMA_NAME,
  OCCUPATION_TYPE_SCHEMA_NAME,
  STATE_SCHEMA_NAME,
} from '@constants/mongo-db';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { City, CityDocument } from '@utils/schemas/location/city.schema';
import { State, StateDocument } from '@utils/schemas/location/state.schema';
import {
  DocumentType,
  DocumentTypeDocument,
} from '@utils/schemas/user-identity/document-type.schema';
import {
  OccupationType,
  OccupationTypeDocument,
} from '@utils/schemas/user-identity/occupation-type.schema';
import { Request } from 'express';
import { Model } from 'mongoose';

@Injectable()
export class UtilsService {
  constructor(
    @InjectModel(CITY_SCHEMA_NAME)
    private readonly cityModel: Model<CityDocument>,

    @InjectModel(STATE_SCHEMA_NAME)
    private readonly stateModel: Model<StateDocument>,

    @InjectModel(DOCUMENT_TYPE_SCHEMA_NAME)
    private readonly documentTypeModel: Model<DocumentTypeDocument>,

    @InjectModel(OCCUPATION_TYPE_SCHEMA_NAME)
    private readonly occupacionType: Model<OccupationTypeDocument>,
  ) {}

  findAllCities(request: Request): Promise<City[]> {
    return this.cityModel.find(request.query).populate('state_id');
  }

  findAllStates(request: Request): Promise<State[]> {
    return this.stateModel.find(request.query);
  }

  findAllDocumentTypes(request: Request): Promise<DocumentType[]> {
    return this.documentTypeModel.find(request.query);
  }

  findAllOccupationTypes(request: Request): Promise<OccupationType[]> {
    return this.occupacionType.find(request.query);
  }
}
