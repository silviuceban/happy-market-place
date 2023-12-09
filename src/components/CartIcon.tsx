import React, { useCallback } from 'react';
import { Badge } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';
import { ProductInCart, selectProductsInCart } from '../store/cartSlice';
import { useSelector } from 'react-redux';

export function CartIcon(): JSX.Element {
  const navigate = useNavigate();

  const productsInCart = useSelector(selectProductsInCart);

  const numberOfProducts = ((): number => {
    let number = 0;
    productsInCart.map((item: ProductInCart) => {
      number += item.quantity;
    });

    return number;
  })();

  const handleClick = useCallback(() => {
    navigate('/cart');
  }, []);

  return (
    <Badge badgeContent={numberOfProducts} color="secondary">
      <ShoppingCartIcon sx={{ cursor: 'pointer' }} onClick={handleClick} />
    </Badge>
  );
}
