import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store';
import { getAsyncProducts } from './cartActions';

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

type ProductPayload = {
	id: number,
	title: string,
	price: number,
	quantity: number,
	totalPrice: number
}

type IncrementPayload = {
	id: number,
	num: number,
	price: number
}

const initialState: CartState = {
	products: [],
	status: 'loading'
};

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		// action for add product by use form
		addProduct: (state, action: PayloadAction<ProductPayload>) =>{
			state.products = [action.payload, ...state.products];
		},
		// increment quantity of product by click on increment button
		incrementQuantity: (state, action: PayloadAction<IncrementPayload>) => {
			const { id, num } = action.payload;
			state.products.forEach(product => {
				if ( product.id === id ) {
					product.quantity += num;
					product.totalPrice = Number((product.price * product.quantity).toFixed(2));
				}
			})
		},
		// the same action as one above, only for click decrement button
		decrementQuantity: (state, action: PayloadAction<IncrementPayload>) => {
			const { id, num } = action.payload;
			state.products.forEach(product => {
				if ( product.id === id ) {
					product.quantity -= num;
					product.totalPrice = Number((product.price * product.quantity).toFixed(2));
				}
			})
		},
		// action for delete product from cart by click remove button at CartProduct component
		deleteProduct: (state, action: PayloadAction<number>) => {
			const id = action.payload;
			state.products.forEach((product, index) => {
				if ( product.id === id ) {
					state.products.splice(index, 1)
				}
			})
		}
	},
	extraReducers: (builder) => {
		builder
			// set loading status when fetching products from fake store api
			.addCase(getAsyncProducts.pending, (state) => {
				state.status = 'loading';
      })
			// set products at state
			.addCase(getAsyncProducts.fulfilled, (state,action) => {
        state.products = action.payload;
				state.products.forEach(product => {
					product.quantity = 1;
					product.totalPrice = product.quantity * product.price;
				})
				state.status = 'idle';
      })
	}
});

const cartSelector = (state: RootState) => state.cart;

export const { addProduct, incrementQuantity, decrementQuantity, deleteProduct } = cartSlice.actions
export { cartSelector };

export default cartSlice.reducer;