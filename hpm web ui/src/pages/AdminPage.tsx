import React, { useCallback } from 'react';
import { Paper, Slider, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {
  changeDisplayedProducts,
  selectProductsToDisplay,
} from '../store/productsSlice';

export default function AdminPage(): JSX.Element {
  const dispatch = useDispatch();

  const productsToDisplay = useSelector(selectProductsToDisplay);

  const handleChange = useCallback(
    (event: Event, newValue: number | number[]) => {
      dispatch(changeDisplayedProducts(newValue as number));
    },
    [productsToDisplay]
  );

  return (
    <Paper sx={{ display: 'flex', flexDirection: 'column', p: 5, m: 2 }}>
      <Typography>Display products:</Typography>
      <Slider
        sx={{ width: 250, mt: 4 }}
        value={productsToDisplay}
        valueLabelDisplay="on"
        marks
        step={1}
        min={2}
        max={20}
        onChange={handleChange}
      />
    </Paper>
  );
}
