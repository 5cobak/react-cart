import { useAppDispatch } from '../../../redux/hooks';
import { decrementQuantity, deleteProduct, incrementQuantity } from '../cartSlice';

import classes from './CartProduct.module.scss';

type CartProductTypeProps = {
	title: string,
	price: number,
	quantity: number;
	id: number;
	totalPrice: number;
}
// component for render product
const CartProduct = ({ title, price, quantity, id, totalPrice }: CartProductTypeProps) => {
	const dispatch = useAppDispatch();
	// changed styles for button decrement depending on quantity
	// If quantity is equal to 1 - set class buttonNotActive
	const clsIncrementButton = [
		classes.button,
		quantity === 1 ? classes.buttonNotActive : ''
	].join(' ');

	// dispatch the action that increment quantity
	const handlerButtonIncrementClick = () => {
		dispatch( incrementQuantity({
			num: 1,
			id: id,
			price: quantity * price
		}))
	}
	// dispatch the action that decrement quantity
	const handlerButtonDecrementClick = () => {
		// if quantity is equal to 1 - stop decrement
		if ( quantity === 1 ) return;

		dispatch(decrementQuantity({
			num: 1,
			id: id,
			price: quantity * price
		}))
	}

	// remove product by click on remove button
	const handlerButtonRemoveClick = () => {
		dispatch(deleteProduct(id));
	}

	return (
		<div className={classes.Product}>
			<span className={classes.title}>{ title }</span>
			<span className={classes.price}>{ totalPrice }$</span>

			<div className={classes.quantityWrap}>
				<button 
					type="button" 
					className={clsIncrementButton} 
					onClick={handlerButtonDecrementClick}
				>
					-
				</button>
				<span className={classes.quantity}>&nbsp;Quantity:&nbsp;{ quantity }&nbsp;</span>
				<button 
					type="button" 
					className={classes.button} 
					onClick={handlerButtonIncrementClick}
				>
					+
				</button>
			</div>
			<button 
				type="button" 
				className={classes.buttonRemove}
				onClick={handlerButtonRemoveClick}
			>
				Remove
			</button>
		</div>
	)
}

export type { CartProductTypeProps };

export default CartProduct;