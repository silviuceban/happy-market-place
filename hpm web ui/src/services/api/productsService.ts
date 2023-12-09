import { httpService } from '../httpService';
import { Product } from '../../models/product';

export const getProducts = async (limit: number): Promise<Product[]> => {
  const res = await httpService.get<Product[]>('products', {
    params: { limit },
  });

  return res.data;
};
