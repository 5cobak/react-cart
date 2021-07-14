import React from 'react';
import { useAppDispatch } from '../../../redux/hooks';
import { addProduct } from '../cartSlice';
import classes from './CartForm.module.scss';

const CartForm = () => {
	const dispatch = useAppDispatch();
	const [name, setName] = React.useState<string>('');
	const [price, setPrice]  = React.useState<string>('');
	const [isFormValid, setIsFormValid] = React.useState<boolean>(true);
	const isPriceValid = !isNaN(Number(price));

	const handlerChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
		setIsFormValid(true);
		setName(e.target.value.trim());
	}

	const handlerChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
		setIsFormValid(true);
		setPrice(e.target.value.trim());
	}

	const handlerClickButton = () => {
		const quantity = 1;
		setIsFormValid(
			Boolean(name) && Boolean(price) && isPriceValid
		)

		if ( !name || !price ) return;

		if ( !isPriceValid ) {
			setPrice('');
			return;
		};

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