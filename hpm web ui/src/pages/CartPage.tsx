import React, { useCallback, useMemo } from 'react';
import { Button, Divider, Paper, Stack, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectProductsInCart } from '../store/features/cartSlice';
import { ProductInCart } from '../components/ProductInCart';
import { Box } from '@mui/system';
import { useAuth0 } from '@auth0/auth0-react';
import { postOrder } from '../services/api/ordersService';
import { selectUser } from '../store/features/userSlice';
import { useAppSelector } from '../store/hooks';
import { OrderParams } from '../models/orders';

const styles = {
  topLevelBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    // maxWidth: '1200px',
  },
  itemsStack: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    // maxWidth: '1500px',
    m: 3,
  },
  totalBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: [300, 750, 970],
    m: 2,
    p: 2,
  },
};
export default function CartPage(): JSX.Element {
  const productsInCart = useAppSelector(selectProductsInCart);

  const user = useAppSelector(selectUser);

  console.log(user);

  let totalAmount = 0;

  productsInCart.forEach((product) => {
    totalAmount += product.quantity * Number(product.product.price);
  });

  //   customerId: string;
  //   shippmentAddres: string;
  //   paymentMethod: string;
  //   productId: string;
  //   unitPrice: number;
  //   quantity: number;
  // }

  const orderData: any = useMemo(() => {
    if (user?.sub) {
      const data = productsInCart.map((prod) => {
        return {
          productId: prod.product.id,
          quantity: prod.quantity,
          unitPrice: Number(prod.product.price),
          shippmentAddress: 'Strada Sperantei nr.1',
          paymentMethod: 'card',
          customerId: user.sub,
        };
      });

      return data;
    } else {
      return null;
    }
  }, [productsInCart, user]);

  console.log(orderData);

  const handleOrder = useCallback(() => {
    if (orderData) {
      postOrder(orderData)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [postOrder, orderData]);

  return (
    <Box sx={styles.topLevelBox}>
      <Stack
        divider={<Divider orientation="horizontal" flexItem />}
        spacing={3}
        sx={styles.itemsStack}
      >
        {productsInCart.length ? (
          productsInCart.map((item) => {
            return (
              <ProductInCart
                image={item.product.image}
                title={item.product.name}
                price={item.product.price}
                quantity={item.quantity}
                id={item.product.id}
                key={item.product.id}
              />
            );
          })
        ) : (
          <Typography sx={{ color: 'secondary.main' }}>No items</Typography>
        )}
      </Stack>
      {productsInCart.length ? (
        <>
          <Paper elevation={4} sx={styles.totalBox}>
            <Typography sx={{ fontWeight: 'bold' }}>Total</Typography>
            <Typography sx={{ fontWeight: 'bold' }}>
              ${totalAmount.toFixed(2)}
            </Typography>
          </Paper>
          <Button
            color="success"
            variant="contained"
            size="large"
            sx={{ width: 330, fontWeight: 'bold', mb: 5 }}
            onClick={handleOrder}
          >
            Buy
          </Button>
        </>
      ) : (
        <></>
      )}
    </Box>
  );
}
