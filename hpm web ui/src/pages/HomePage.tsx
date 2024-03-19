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
} from '../store/features/productsSlice';
import { Product } from '../models/product';
import { CircularProgress, Typography } from '@mui/material';
import {
  getData,
  getLogin,
  getProd,
  getProducts,
} from '../services/api/productsService';
import { useAppDispatch } from '../store/hooks';
import { postOrder } from '../services/api/ordersService';

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

export default function HomePage(): JSX.Element {
  const productsToDisplay = useSelector(selectProductsToDisplay);

  const [productsCount, setProductsCount] = useState(productsToDisplay);

  const loader = useRef(null);

  const dispatch: AppDispatch = useAppDispatch();

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

  const handleGetData = useCallback(() => {
    // postOrder(['asd', 'asasjhb'])
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }, []);

  const handleGetProducts = useCallback(() => {
    getProducts({})
      .then(() => {
        console.log('hit');
      })
      .catch((err) => {
        console.log(err);
      });
  }, [getProd]);

  // useEffect(() => {
  //   const option = {
  //     root: null,
  //     rootMargin: '0px',
  //     threshold: 1.0,
  //   };

  //   const observer = new IntersectionObserver(handleObserver, option);
  //   if (loader.current) {
  //     observer.observe(loader.current);
  //   }

  //   return () => {
  //     observer.disconnect();
  //   };
  // }, [handleObserver]);

  // useEffect(() => {
  //   if (productsCount) {
  //     dispatch(productsThunk(productsCount));
  //   }
  // }, [productsCount]);

  useEffect(() => {
    dispatch(productsThunk({}));
  }, [dispatch, productsThunk]);

  return (
    <Box sx={styles.topLevelBox}>
      <button onClick={handleGetData}>get data</button>
      <button onClick={handleGetProducts}>get products</button>

      <Box sx={styles.productsBox}>
        {products.map((product: Product) => {
          return (
            <ProductCard
              img={product.image}
              name={product.name}
              description={product.description}
              price={product.price}
              rating={product.rating}
              id={product.id}
              // category={product.category}
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
