import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';

@Injectable()
export class AxiosService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      timeout: 5000,
    });
  }

  setBaseUrl(url: string) {
    this.axiosInstance.defaults.baseURL = url;
  }

  async getData(endpoint: string) {
    const response = await this.axiosInstance.get(endpoint);
    return response.data;
  }
}
