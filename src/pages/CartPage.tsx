import React from 'react';
import { Button, Divider, Paper, Stack, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectProductsInCart } from '../store/cartSlice';
import { ProductInCart } from '../components/ProductInCart';
import { Box } from '@mui/system';

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
  const productsInCart = useSelector(selectProductsInCart);

  let totalAmount = 0;

  productsInCart.forEach((product) => {
    totalAmount += product.quantity * product.product.price;
  });

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
                title={item.product.title}
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
