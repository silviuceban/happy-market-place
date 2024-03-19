import React, { useCallback } from 'react';
import { Box } from '@mui/system';
import { Button, Stack, TextField, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { changeQuantity, removeProduct } from '../store/features/cartSlice';

interface Props {
  image: string;
  title: string;
  price: string;
  quantity: number;
  id: number;
}

const styles = {
  productsBox: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  imageAndTitleBox: {
    display: 'flex',
    justifyContent: 'space-between',
    mb: [1, 0],
    width: 300,
  },
  imageBox: {
    display: 'flex',
  },
  titleBox: {
    pl: 2,
    maxWidth: 200,
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    color: 'secondary.main',
    fontSize: [15, 17],
  },
  contentBox: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    pb: [1, 0],
  },
  btn: {
    fontSize: 25,
    minWidth: 0,
    width: 45,
    height: 45,
  },

  deleteBtn: {
    fontSize: 25,
    height: 45,
    ml: [2, 4, 13],
  },
  quantityInput: {
    width: 60,
    m: 1,
  },
  priceBox: {
    fontSize: [20, 23, 25],
    fontWeight: 'bold',
    color: 'secondary.main',
    display: 'flex',
    justifyContent: 'flex-end',
    width: 70,
  },
};

export function ProductInCart({
  image,
  title,
  price,
  quantity,
  id,
}: Props): JSX.Element {
  const dispatch = useDispatch();

  const deleteProduct = useCallback(() => {
    dispatch(removeProduct(id));
  }, [id]);

  const increaseQuantity = useCallback(() => {
    dispatch(changeQuantity({ id, change: 'increase' }));
  }, [quantity, id]);

  const decreaseQuantity = useCallback(() => {
    dispatch(changeQuantity({ id, change: 'decrease' }));
  }, [quantity, id]);

  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      spacing={{ xs: 1, sm: 5, md: 15 }}
    >
      <Box sx={styles.imageAndTitleBox}>
        <Box sx={styles.imageBox}>
          <img src={image} className="productInCartImage" />
        </Box>
        <Box sx={styles.titleBox}>
          <Typography sx={styles.title}>{title}</Typography>
        </Box>
      </Box>
      <Box sx={{ ...styles.contentBox, justifyContent: 'space-between' }}>
        <Button variant="contained" sx={styles.btn} onClick={decreaseQuantity}>
          -
        </Button>

        <TextField
          variant="standard"
          sx={styles.quantityInput}
          type="tel"
          inputProps={{
            min: 0,
            style: { textAlign: 'center', fontSize: 15, width: 60 },
          }}
          value={quantity}
        />

        <Button variant="contained" sx={styles.btn} onClick={increaseQuantity}>
          +
        </Button>

        <Button
          color="error"
          variant="contained"
          sx={{ ...styles.deleteBtn, fontSize: 15, fontWeight: 'bold' }}
          onClick={deleteProduct}
        >
          Delete
        </Button>
      </Box>
      <Box sx={styles.contentBox}>
        <Box sx={styles.priceBox}>
          <Typography>${Number(price).toFixed(2)}</Typography>
        </Box>
      </Box>
    </Stack>
  );
}
