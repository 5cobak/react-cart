import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import fetchProducts from './CartApi';

const getAsyncProducts = createAsyncThunk(
  'cart/getAsyncProducts',
  async () => {
    const response = await fetchProducts();
    // The value we return becomes the `fulfilled` action payload
    return response.json();
  }
);

const incrementQuantity = createAction<{num: number, id: number, price: number}>('incrementQuantity');
const decrementQuantity = createAction<{num: number, id: number, price: number}>('decrementQuantity');
const deleteProduct = createAction<number>('deleteProduct');

export { incrementQuantity, decrementQuantity, getAsyncProducts, deleteProduct };