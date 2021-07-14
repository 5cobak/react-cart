import { createAsyncThunk } from '@reduxjs/toolkit';
import fetchProducts from './CartApi';

const getAsyncProducts = createAsyncThunk(
  'cart/getAsyncProducts',
  async () => {
    const response = await fetchProducts();
    // The value we return becomes the `fulfilled` action payload
    return response.json();
  }
);

export { getAsyncProducts };