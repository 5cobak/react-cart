import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { Provider } from 'react-redux';
import store from '../../../redux/store';
import CartProduct, { CartProductTypeProps } from './CartProduct';

import classes from './CartProduct.module.scss';

describe('test CartProduct component', () => {
	let container: any = null;

	beforeEach(() => {
		// подготавливаем DOM-элемент, куда будем рендерить
		container = document.createElement("div");
		document.body.appendChild(container);
	});

	afterEach(() => {
		// подчищаем после завершения
		unmountComponentAtNode(container);
		container.remove();
		container = null;
	});

	it('should be in document', () => {
		const fakeProduct: CartProductTypeProps = {
			title: 'Clock',
			price: 1000,
			quantity: 1,
			id: 1,
			totalPrice: 1000
		}
	
		act(() => {
			render(
			<Provider store={store}>
				<CartProduct {...fakeProduct}/>
			</Provider>
			
			, container);
		});
		
		const expectedTitleElement = container.querySelector('div span');

		expect(expectedTitleElement.textContent).toBe('Clock');
	})
})