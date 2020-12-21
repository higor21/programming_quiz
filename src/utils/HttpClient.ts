import axios, { AxiosInstance } from 'axios';

export default abstract class HttpClient {
  public readonly http: AxiosInstance;

  public constructor(baseURL?: string) {
    this.http = axios.create({
      baseURL,
    });
  }
}
