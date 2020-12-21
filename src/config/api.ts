import { AxiosResponse, AxiosRequestConfig, AxiosError } from 'axios';

import { StorageProvider as Storage, HttpClient } from 'utils';

export const BASE_URL = '';

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

  protected handleError = (error: AxiosError) => {
    if (
      error?.response?.status === 401 &&
      error.response.data?.detail === 'Signature has expired.'
    ) {
      // reset authentication state
      // show toast error
    }
    return Promise.reject(error);
  };

  private handleRequest = async (config: AxiosRequestConfig) => {
    const token = await this.storage.getItem('userToken');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  };

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
