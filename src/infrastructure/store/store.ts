import { configureStore } from '@reduxjs/toolkit';
import categoriesSlice from './slices/categories-slice';
import productsSlice from './slices/products-slice';
import cartSlice from './slices/cart-slice';
import customerReducer from './slices/customer-slice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

const store = configureStore({
  reducer: {
    categories: categoriesSlice,
    products: productsSlice,
    carts: cartSlice,
    customer: customerReducer,  // customerSlice doğru şekilde dahil edilmeli
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
