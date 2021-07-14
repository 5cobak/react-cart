import React from 'react';
import { useAppDispatch } from '../../../redux/hooks';
import { addProduct } from '../cartSlice';
import classes from './CartForm.module.scss';

// component for adding product
const CartForm = () => {
	const dispatch = useAppDispatch();
	// set local state for name and price
	const [name, setName] = React.useState<string>('');
	const [price, setPrice]  = React.useState<string>('');
	const [isFormValid, setIsFormValid] = React.useState<boolean>(true);
	const isPriceValid = !isNaN(Number(price));

	const handlerChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
		// unmount error message from form
		setIsFormValid(true);
		// added change local name state
		setName(e.target.value.trim());
	}

	const handlerChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
		// unmount error message from form
		setIsFormValid(true);
		// added change local price state
		setPrice(e.target.value.trim());
	}

	const handlerClickButton = () => {
		// added quantity for product, not handled at form
		const quantity = 1;
		// check form validation and set local isFormValid state
		setIsFormValid(
			Boolean(name) && Boolean(price) && isPriceValid
		)
		// check empty field and stop to execute the handler, if one is empty at least
		if ( !name || !price ) return;
		// clear price field and stop to execute handler, if price is NaN
		if ( !isPriceValid ) {
			setPrice('');
			return;
		};
		// else everything is ok, add the product
		dispatch(addProduct({
			title: name,
			price: Number(price),
			quantity,
			id: Math.random(),
			totalPrice: quantity * Number(price)
		}))

		setName('');
		setPrice('');

	}
	// prevent submit form
	const handlerSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	}

	return (
		<form className={classes.CartForm} onSubmit={handlerSubmit}>
			<h2 className={classes.title}>Add the product</h2>
			<div className={classes.inputWrap}>
				<input 
					className={classes.input} 
					type="text" 
					placeholder="Name"
					onChange={handlerChangeName}
					value={name}
				/>
			</div>
			<div className={classes.inputWrap}>
				<input 
					className={classes.input} 
					type="text" 
					placeholder="Price"
					onChange={handlerChangePrice}
					value={price}
				/>
			</div>
			{/* render error, if is form not a valid, else render nothing */}
			{!isFormValid ?  <span className={classes.error}>введите корректные данные</span> : null}
			<button 
				type="submit" 
				className={classes.button}
				onClick={handlerClickButton}
			>
				Add
			</button>
		</form>
	)
}

export default CartForm;