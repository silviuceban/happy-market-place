import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { AppStore } from '../store';

export interface ApiResponse<T> {
  items: T[];
  totalCount: number;
}

const defaultAxiosOptions = {
  // baseURL: process.env.NODE_ENV === 'development' ? '/' : '/NewTempo/',
  // baseURL: 'https://fakestoreapi.com/',
  baseURL: '/',
};

let appStore: AppStore;

export function setStore(store: AppStore): void {
  appStore = store;
}

export function getToken(): string | null {
  return appStore.getState().auth.token;
}

let token: string | null = null;

export const setToken = (accessToken: string): void => {
  token = accessToken;
};

// export function getUserId(): string | undefined {
//   return appStore.getState().auth.userDetails?.nameid;
// }

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

// setTimeout(() => {
//   console.log(getUserId());
// }, 0);

// const refreshTokenInterceptor = (err) => {
//   const originalConfig = err.config;

//   // console.log("err config OBJECT----------------------------------------------------------------",originalConfig._retry)

//   if (!(originalConfig.url == "/api/Auth" && originalConfig.method == "post") && err.response) {

//     if (err.response.status === 401 && !originalConfig._retry) {

//       originalConfig._retry = true;
//       this.post("/api/Auth/RefreshToken", { accessToken: sessionStorage.bearer }).then((resp) => {
//         sessionStorage.bearer = resp.data;
//         return this.axiosInstance(originalConfig);
//       })
//         .catch(_error => {

//           sessionStorage.removeItem("bearer");
//           router.push("/login");
//           return Promise.reject(_error);
//         });
//     }
//   }
//   return Promise.reject(err);
// }

class HttpService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create(defaultAxiosOptions);

    this.axiosInstance.interceptors.request.use(authorizationInterceptor);
    // this.axiosInstance.interceptors.response.use(authorizationInterceptor);
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
