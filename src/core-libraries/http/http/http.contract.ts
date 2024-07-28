import { AxiosRequestHeaders } from 'axios';

export interface IHttp {
  get<T, U>(
    typeApi: string,
    url: string,
    body?: U,
    responseType?: 'json' | 'text',
    headers?: AxiosRequestHeaders
  ): Promise<T>;

  post<T, U>(
    typeApi: string,
    url: string,
    body: U,
    responseType?: 'json' | 'text',
    headers?: AxiosRequestHeaders
  ): Promise<T>;

  patch<T, U>(
    typeApi: string,
    url: string,
    body: U,
    responseType?: 'json' | 'text',
    headers?: AxiosRequestHeaders
  ): Promise<T>;

  put<T, U>(
    typeApi: string,
    url: string,
    body: U,
    id?: string | number | null,
    responseType?: 'json' | 'text',
    headers?: AxiosRequestHeaders
  ): Promise<T>;

  delete<T, U>(
    typeApi: string,
    url: string,
    id?: string | number,
    body?: U,
    responseType?: 'json' | 'text',
    headers?: AxiosRequestHeaders
  ): Promise<T>;
}

