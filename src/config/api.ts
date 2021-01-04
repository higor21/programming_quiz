import { AxiosResponse, AxiosRequestConfig, AxiosError } from 'axios';

import { StorageProvider as Storage, HttpClient } from 'utils';

export const BASE_URL = 'http://localhost:3001/';

class Api extends HttpClient {
  private static instance: Api;

  private readonly storage = Storage.getInstance();

  private constructor() {
    super(BASE_URL);
    this.initializeRequestInterceptor();
    this.initializeResponseInterceptor();
  }

  public static getInstance(): Api {
    if (!Api.instance) {
      Api.instance = new Api();
    }

    return Api.instance;
  }

  private initializeResponseInterceptor = () => {
    this.http.interceptors.response.use(this.handleResponse, this.handleError);
  };

  private initializeRequestInterceptor = () => {
    this.http.interceptors.request.use(this.handleRequest, this.handleError);
  };

  private handleResponse = ({ data }: AxiosResponse) => data;

  protected handleError = (error: AxiosError) => Promise.reject(error);

  private handleRequest = async (config: AxiosRequestConfig) => config;

  get post() {
    return this.http.post;
  }

  get delete() {
    return this.http.delete;
  }

  get put() {
    return this.http.put;
  }

  get get() {
    return this.http.get;
  }

  get patch() {
    return this.http.patch;
  }
}

export default Api;
