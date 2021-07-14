import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store';
import { decrementQuantity, deleteProduct, getAsyncProducts, incrementQuantity } from './cartActions';

export interface CartState {
	status: 'idle' | 'loading',
  products: {
		title: string,
		price: number,
		quantity: number,
		id: number,
		totalPrice: number,
		
	}[]
}

const initialState: CartState = {
	products: [],
	status: 'loading'
};

type ProductPayload = {
	id: number,
	title: string,
	price: number,
	quantity: number,
	totalPrice: number
}

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addProduct: (state, action: PayloadAction<ProductPayload>) =>{
			state.products = [action.payload, ...state.products];
		}
	},
	extraReducers: (builder) =>{
		builder
			.addCase(getAsyncProducts.pending, (state) => {
				state.status = 'loading';
      })
			.addCase(getAsyncProducts.fulfilled, (state,action) => {
        state.products = action.payload;
				state.products.forEach(product => {
					product.quantity = 1;
					product.totalPrice = product.quantity * product.price;
				})
				state.status = 'idle';
      })
			.addCase(incrementQuantity, (state, action)=>{
				const { id, num } = action.payload;
				state.products.forEach(product => {
					if(product.id === id) {
						product.quantity += num;
						product.totalPrice = Number((product.price * product.quantity).toFixed(2));
					}
				})
			})
			.addCase(decrementQuantity, (state, action)=>{
				const { id, num } = action.payload;
				state.products.forEach(product => {
					if(product.id === id) {
						product.quantity -= num;
						product.totalPrice = Number((product.price * product.quantity).toFixed(2));
					}
				})
			})
			.addCase(deleteProduct, (state, action)=>{
				const  id = action.payload;
				state.products.forEach((product, index) => {
					if(product.id === id) {
						state.products.splice(index, 1)
					}
				})
			})
	}
});

const cartSelector = (state: RootState) => state.cart;

export const { addProduct } = cartSlice.actions

export { cartSelector };

export default cartSlice.reducer;