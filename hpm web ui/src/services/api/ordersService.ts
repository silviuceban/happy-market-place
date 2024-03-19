import { OrderParams } from '../../models/orders';
import { httpService } from '../httpService';

export const postOrder = async (arg: OrderParams[]): Promise<any> => {
  const res = await httpService.post<OrderParams[]>('/order', arg);

  return res.data;
};
