import cartReducer, { addProduct, CartState, decrementQuantity, deleteProduct, incrementQuantity } from './Cart/cartSlice';

describe('cart reducer', () => {
	

	test('should handle add product', () => {

		const initialState: CartState = {
			products: [],
			status: 'idle'
		}

		const quantity = 3;
		const price = 1000;

		expect(cartReducer(initialState, addProduct({
			title: 'clock',
			price: 1000,
			quantity,
			id: 24,
			totalPrice: quantity * price
		}))).toEqual({
			status: 'idle',
			products: [{
				title: 'clock',
				price: 1000,
				quantity: 3,
				id: 24,
				totalPrice: 3000
			}]
		})
	})

	it('should handle increment', () => {
		const quantity = 3;
		const price = 1000;

		const initialState: CartState = {
			products: [{
				title: 'clock',
				price: 1000,
				quantity,
				id: 24,
				totalPrice: quantity * price
			}],
			status: 'idle'
		}

    const incrementedState = cartReducer(initialState, incrementQuantity({
			num: 1,
			id: 24,
			price: 1000
		}))

		expect(incrementedState.products[0]).toEqual({
			title: 'clock',
			price: 1000,
			quantity: 4,
			id: 24,
			totalPrice: 4000
		})
  });

	it('should handle decrement', () => {
		const quantity = 3;
		const price = 1000;

		const initialState: CartState = {
			products: [{
				title: 'clock',
				price: 1000,
				quantity,
				id: 24,
				totalPrice: quantity * price
			}],
			status: 'idle'
		}

    const decrementedState = cartReducer(initialState, decrementQuantity({
			num: 1,
			id: 24,
			price: 1000
		}))

		expect(decrementedState.products[0]).toEqual({
			title: 'clock',
			price: 1000,
			quantity: 2,
			id: 24,
			totalPrice: 2000
		})
  });

	it('should deleted the product', () => {
		const quantity = 3;
		const price = 1000;

		const initialState: CartState = {
			products: [{
				title: 'clock',
				price: 1000,
				quantity,
				id: 24,
				totalPrice: quantity * price
			}],
			status: 'idle'
		}

		const stateWithoutProduct = cartReducer(initialState, deleteProduct(24));

		expect(stateWithoutProduct.products.length).toBe(0);
	})

	it('should add the product', () => {
		const quantity = 3;
		const price = 1000;

		const initialState: CartState = {
			products: [],
			status: 'idle'
		}

		const stateWithOneProduct = cartReducer(initialState, addProduct({
			title: 'clock',
			price: 1000,
			quantity,
			id: 24,
			totalPrice: quantity * price
		}));

		expect(stateWithOneProduct.products.length).toBe(1);
	})
})