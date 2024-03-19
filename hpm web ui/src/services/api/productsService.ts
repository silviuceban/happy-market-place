import { httpService } from '../httpService';
import { ApiResponse, Product } from '../../models/product';
import axios from 'axios';

export const getProducts = async (params: {
  take?: number;
  skip?: number;
}): Promise<Product[]> => {
  const res = await httpService.get<ApiResponse<Product>>('/products', {
    params,
  });

  return res.data.items;
};

export const getProductsbyId = async (id: string): Promise<Product[]> => {
  const res = await httpService.get<Product[]>(`/products${id}`);

  return res.data;
};

export const getProd = async (): Promise<any> => {
  const res = await httpService.get('/products/1');

  return res.data;
};

export const getData = async (): Promise<any> => {
  const res = await httpService.get('/data');

  return res.data;
};

export const getLogin = async (): Promise<any> => {
  await axios.get('/products');
};
