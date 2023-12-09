import { httpService } from '../httpService';

export interface LoginData {
  username: string;
  password: string;
}

export const login = async (loginData: LoginData): Promise<string> => {
  const response = await httpService.post<LoginData, string>(
    'auth/login',
    loginData
  );

  return response.data;
};

// export const logout = async (accessToken: string): Promise<void> => {
//   try {
//     await httpService.post('/api/Auth/Logout', accessToken);
//   } catch (err) {
//     console.error(err);
//   }
// };

// export const refreshToken: (accessToken) => httpService.post('/api/Auth/RefreshToekn', accessToken);
