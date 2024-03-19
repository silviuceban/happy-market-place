export type ApiResponse<T> = {
  items: T[];
  total: number;
};

export interface RatingType {
  rate: number;
  count: number;
}

export interface Product {
  id: number;
  name: string;
  price: string;
  description?: string;
  image: string;
  rating: RatingType;
}
