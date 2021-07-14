import { createAsyncThunk } from '@reduxjs/toolkit';
import fetchProducts from './CartApi';


// async action for get products
const getAsyncProducts = createAsyncThunk(
  // type of action
  'cart/getAsyncProducts',
  // function for return payload(products)
  async () => {
    const response = await fetchProducts();
    // The value we return becomes the `fulfilled` action payload
    return response.json();
  }
);

export { getAsyncProducts };