import React, { useCallback } from 'react';
import '../App.css';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { RatingType } from '../models/product';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useDispatch } from 'react-redux';
import { addProduct } from '../store/features/cartSlice';

interface Props {
  img: string;
  name: string;
  description?: string;
  price: string;
  id: number;
  // category: string;
  rating: RatingType;
}

const styles = {
  card: {
    maxWidth: 300,
    m: 1,
    backgroundColor: 'ffe5d4',
    // display: 'flex',
    // flexDirection: 'column',
    // justifyContent: 'space-between',
  },
  media: {
    height: 300,
    maxWidth: 345,
    justifyContent: 'center',

    display: 'flex',
    m: 2,
  },
};

export function ProductCard(props: Props): JSX.Element {
  const { id, img, name, description = 'desc', price, rating } = props;
  const dispatch = useDispatch();

  const addToCart = useCallback(() => {
    dispatch(
      addProduct({
        product: {
          id,
          image: img,
          name,
          description,
          price,

          rating,
        },
        quantity: 1,
      })
    );
  }, [props]);

  return (
    <Card sx={styles.card}>
      <CardMedia sx={styles.media}>
        <img src={img} alt="some img" className="productImage" />
      </CardMedia>
      <Box>
        <CardContent sx={{ backgroundColor: 'secondary.light' }}>
          <Typography gutterBottom component="div" sx={{ fontSize: 20 }}>
            {`${name.slice(0, 23)}...`}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            {`${description.slice(0, 100)}...`}
          </Typography>
          {/* <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Rating
              name="read-only"
              value={rating.rate}
              precision={0.5}
              readOnly
            />
            <Typography
              sx={{
                ml: 1,
                fontSize: 12,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              ({rating.count})
            </Typography>
          </Box> */}
          <Typography sx={{ fontWeight: 'bold', ml: 0.6 }}>
            Price: {price}
          </Typography>
        </CardContent>

        <CardActions
          sx={{ backgroundColor: 'secondary.light', pt: 0, pl: 1.5 }}
        >
          <Button
            size="small"
            variant="contained"
            sx={{ fontWeight: 'bold', pt: 1, pb: 1, pl: 1, pr: 1.5, mb: 1 }}
            onClick={addToCart}
          >
            <ShoppingCartIcon sx={{ color: 'white', mr: 0.5 }} />
            Add to Cart
          </Button>
        </CardActions>
      </Box>
    </Card>
  );
}
