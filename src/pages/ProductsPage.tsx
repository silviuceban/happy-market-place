import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Box } from '@mui/system';
import { ProductCard } from '../components/ProductCard';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { useSelector } from 'react-redux';
import {
  productsThunk,
  selectIsLoading,
  selectProducts,
  selectProductsToDisplay,
} from '../store/productsSlice';
import { Product } from '../models/product';
import { CircularProgress, Typography } from '@mui/material';

const styles = {
  topLevelBox: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    m: 2,
  },
  productsBox: {
    width: '100%',
    maxWidth: '1500px',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  loadingBox: {
    display: 'flex',
    width: '50vw',
    height: '50vh',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

const maxAvailableProducts = 20;

export default function ProductsPage(): JSX.Element {
  const productsToDisplay = useSelector(selectProductsToDisplay);

  const [productsCount, setProductsCount] = useState(productsToDisplay);

  const loader = useRef(null);

  const dispatch: AppDispatch = useDispatch();

  const products = useSelector(selectProducts);

  const isLoading = useSelector(selectIsLoading);

  const handleObserver = useCallback(
    (entries) => {
      const [target] = entries;

      if (target.isIntersecting && productsCount <= 20 && !isLoading) {
        setProductsCount((prev) => prev + 6);
      }
    },
    [productsCount, isLoading]
  );

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    };

    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [handleObserver]);

  useEffect(() => {
    if (productsCount) {
      dispatch(productsThunk(productsCount));
    }
  }, [productsCount]);

  return (
    <Box sx={styles.topLevelBox}>
      <Box sx={styles.productsBox}>
        {products.map((product: Product) => {
          return (
            <ProductCard
              img={product.image}
              title={product.title}
              description={product.description}
              price={product.price}
              rating={product.rating}
              id={product.id}
              category={product.category}
              key={product.id}
            />
          );
        })}
        <Box
          sx={{
            mt: 2,
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {!isLoading ? (
            products.length !== maxAvailableProducts && (
              <Typography sx={{ pl: 5, pr: 5, mb: 1, color: 'primary.main' }}>
                Show more
              </Typography>
            )
          ) : (
            <CircularProgress />
          )}
        </Box>

        <div ref={loader}></div>
      </Box>
    </Box>
  );
}
