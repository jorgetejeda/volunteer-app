import {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
} from 'axios';
import { IHttp } from './http.contract';
import {
    apiAuthInstance,
  apiInstance,
  apiS3Instance,
  defaultHeaders,
} from './http.instance';
import { ServicesInstanceEnum } from '@/core/enums/services-instance.enum';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

const axiosInstances = new Map<string, AxiosInstance>([
  [ServicesInstanceEnum.API_INSTANCE, apiInstance],
  [ServicesInstanceEnum.API_S3, apiS3Instance],
  [ServicesInstanceEnum.API_AUTH, apiAuthInstance],
]);

const tokenInterceptor = (config: any): any => {
  const token = sessionStorage.getItem('token');
  if (token) {
    config.headers = { ...config.headers, Authorization: `Bearer ${token}` };
  }
  return config;
};

axiosInstances.forEach((instance) => {
  instance?.interceptors.request.use(tokenInterceptor, (error) =>
    Promise.reject(error)
  );
});

export default class HttpImplementation implements IHttp {
  private readonly REQUEST_TIMEOUT: number = 30000;

  private getInstance(typeApi: string): AxiosInstance {
    return axiosInstances.get(typeApi) || apiInstance;
  }

  public async request<T, U = any>(
    typeApi: string,
    method: HttpMethod,
    url: string,
    body?: U,
    responseType: 'json' | 'text' = 'json',
    headers?: AxiosRequestHeaders
  ): Promise<T> {
    const config: AxiosRequestConfig = {
      url,
      method,
      data: body,
      headers: { ...defaultHeaders, ...headers },
      responseType,
      timeout: this.REQUEST_TIMEOUT,
    };
    const instance = this.getInstance(typeApi);
    const responseAxios: AxiosResponse<T> = await instance.request(config);
    return responseAxios.data;
  }

  public get<T, U>(
    typeApi: string,
    url: string,
    body?: U,
    responseType: 'json' | 'text' = 'json',
    headers?: AxiosRequestHeaders
  ): Promise<T> {
    if (body) {
      const validData = Object.entries(body).reduce((prev, [key, value]) => {
        if (![null, null, undefined, ''].includes(value as any)) {
          prev = {
            ...prev,
            [key]: value,
          };
        }
        return prev;
      }, {});
      url = `${url}?${new URLSearchParams({
        ...(validData ?? {}),
      }).toString()}`;
    }
    return this.request<T>(
      typeApi,
      'GET',
      url,
      undefined,
      responseType,
      headers
    );
  }

  public post<T, U>(
    typeApi: string,
    url: string,
    body: U,
    responseType: 'json' | 'text' = 'json',
    headers?: AxiosRequestHeaders
  ): Promise<T> {
    return this.request<T, U>(
      typeApi,
      'POST',
      url,
      body,
      responseType,
      headers
    ).catch((error) => {
      throw error?.response?.data?.message
        ? new Error(error?.response?.data?.message)
        : error;
    });
  }

  public put<T, U>(
    typeApi: string,
    url: string,
    body: U,
    id?: string | number,
    responseType: 'json' | 'text' = 'json',
    headers?: AxiosRequestHeaders
  ): Promise<T> {
    if (id) {
      url = `${url}/${id}`;
    }
    return this.request<T, U>(typeApi, 'PUT', url, body, responseType, headers);
  }

  public patch<T, U>(
    typeApi: string,
    url: string,
    body: U,
    responseType: 'json' | 'text' = 'json',
    headers?: AxiosRequestHeaders
  ): Promise<T> {
    return this.request<T, U>(
      typeApi,
      'PATCH',
      url,
      body,
      responseType,
      headers
    );
  }

  public delete<T, U>(
    typeApi: string,
    url: string,
    id?: string | number | null,
    body?: U,
    responseType: 'json' | 'text' = 'json',
    headers?: AxiosRequestHeaders
  ): Promise<T> {
    if (id) {
      url = `${url}/${id}`;
    }
    return this.request<T>(typeApi, 'DELETE', url, body, responseType, headers);
  }
}

