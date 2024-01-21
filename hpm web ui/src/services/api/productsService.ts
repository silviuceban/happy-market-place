import { httpService } from '../httpService';
import { Product } from '../../models/product';

export const getProducts = async (limit: number): Promise<Product[]> => {
  const res = await httpService.get<Product[]>('products', {
    params: { limit },
  });

  return res.data;
};

export const getProd = async (): Promise<any> => {
  const res = await httpService.get('/products');

  return res.data;
};

export const getData = async (): Promise<any> => {
  const res = await httpService.get('/data');

  return res.data;
};
