import React from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import classes from './Cart.module.scss';
import { getAsyncProducts } from './cartActions';
import { cartSelector } from './cartSlice';
import CartProduct from './CartProduct/CartProduct';
import CartForm from './CartForm/CarForm';

const Cart = ()=> {
	const { products, status } = useAppSelector(cartSelector);
	const dispatch = useAppDispatch();

	React.useEffect(()=>{
		dispatch(getAsyncProducts())
	// eslint-disable-next-line react-hooks/exhaustive-deps
	},[])

	return (
		<div className={classes.CartWrap}>
			<div className={classes.Cart}>
				<h1>Cart</h1>
				{ status === 'idle' 
					? 
						products.map(productData => <CartProduct key={productData.id} {...productData}/>) 
					: "Loading your goods..."
				}
			</div>
			<CartForm/>
		</div>
	)
}

export default Cart;