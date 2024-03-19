import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
// import { auto } from '@auth0/auth0-react';

export interface ApiResponse<T> {
  items: T[];
  totalCount: number;
}

const defaultAxiosOptions = {
  // baseURL: process.env.NODE_ENV === 'development' ? '/' : '/NewTempo/',
  // baseURL: 'https://fakestoreapi.com/',
  baseURL: '/',
};

let token: string | null = null;

let getTokenFn: () => any = () => {};

export const setGetNewAccessTokenFn = (arg: () => any): any => {
  getTokenFn = arg;
};
export const setToken = (accessToken: string): void => {
  token = accessToken;
};

const authorizationInterceptor = (config: AxiosRequestConfig) => {
  // const token = getToken();
  //   const token = '123';
  if (token) {
    const authHeader = { Authorization: 'Bearer ' + token };

    if (config.headers) {
      config.headers = { ...config.headers, ...authHeader };
    } else {
      config.headers = { ...authHeader };
    }
  }

  return config;
};

function refreshTokenInterceptor(err: any) {
  const originalConfig = err.config;

  if (
    !(
      originalConfig.url == '/oauth/token' && originalConfig.method == 'post'
    ) &&
    err.response
  ) {
    if (err.response.status === 401) {
      console.log(originalConfig);

      originalConfig._retry = true;

      console.log('hit interceptor');

      // getTokenFn().then((res: any) => {
      //   console.log(res);

      //   setToken(res);
      // });

      // axios
      //   .post('https://dev-g10af3b2ljs4f5f1.us.auth0.com/oauth/token', {
      //     grant_type: 'refresh_token',
      //     client_id: 'W9u1h7iL0OlL6FcrTEJItAWym4JVaghD',
      //     client_secret:
      //       'PJqnFhADMTmpbJXSzdG62ZKhsqWUM70-cpBmo9qiajZP5quGu6pM2TtVnJNOkZL4',
      //     refresh_token: 'refreshToken',
      //   })
      //   .then((resp: any) => {
      //     //

      //     // return axios.axiosInstance(originalConfig);
      //     return;
      //   })
      //   .catch((_error: unknown) => {
      //     sessionStorage.removeItem('bearer');
      //     // router.push('/login');

      //     return Promise.reject(_error);
      //   });
    }
  }

  return Promise.reject(err);
}

class HttpService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create(defaultAxiosOptions);
    this.axiosInstance.interceptors.request.use(authorizationInterceptor);
    // this.axiosInstance.interceptors.response.use(function () {},
    // refreshTokenInterceptor);
  }

  get<D = unknown>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<D>> {
    return this.axiosInstance.get(url, { ...config });
  }

  post<T, D = unknown>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<D>> {
    return this.axiosInstance.post(url, data, { ...config });
  }

  put<T, D = unknown>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<D>> {
    return this.axiosInstance.put(url, data, { ...config });
  }

  delete<T, D = unknown>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<D>> {
    return this.axiosInstance.delete(url, { data: data, ...config });
  }
}

export const httpService = new HttpService();
