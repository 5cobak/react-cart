import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import cartSlice from '../components/Cart/cartSlice';

const store = configureStore({
  reducer: {
		cart: cartSlice
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;
