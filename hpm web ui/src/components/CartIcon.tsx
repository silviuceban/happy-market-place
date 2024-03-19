import React, { useCallback } from 'react';
import { Badge } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';
import {
  ProductInCart,
  selectProductsInCart,
} from '../store/features/cartSlice';
import { useSelector } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';

export function CartIcon(): JSX.Element {
  const navigate = useNavigate();

  const { isAuthenticated, loginWithRedirect } = useAuth0();

  const productsInCart = useSelector(selectProductsInCart);

  const numberOfProducts = ((): number => {
    let number = 0;
    productsInCart.map((item: ProductInCart) => {
      number += item.quantity;
    });

    return number;
  })();

  const handleClick = useCallback(() => {
    if (isAuthenticated) {
      navigate('/cart');
    } else {
      loginWithRedirect();
    }
  }, [navigate, isAuthenticated, loginWithRedirect]);

  return (
    <Badge badgeContent={numberOfProducts} color="secondary">
      <ShoppingCartIcon sx={{ cursor: 'pointer' }} onClick={handleClick} />
    </Badge>
  );
}
