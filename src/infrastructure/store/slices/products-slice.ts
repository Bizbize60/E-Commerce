// products-slice.ts
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Endpoints from '../../helpers/api-endpoints';
import axios from 'axios';
import { Result } from '../../shared/Result';
import ApiState from '../../enums/ApiState';
import { ProductDto } from '../../dtos/ProductDto';

export interface ProductState {
    data: Result<Array<ProductDto>>;
    state: ApiState;
}

const initialState = { state: ApiState.Idle } as ProductState;

export const loadProducts = createAsyncThunk(
    'products/getAll',
    async ({ activeCategory, searchQuery }: { activeCategory: number | null, searchQuery: string }) => {
        let url = Endpoints.Products.List;
        if (activeCategory) {
            url += `?categoryId=${activeCategory}`;
        }
        if (searchQuery) {
            url += url.includes('?') ? `&search=${searchQuery}` : `?search=${searchQuery}`;
        }

        console.log("API URL:", url);  // Hangi URL çağrılıyor, kontrol edin
        const response = await axios.get<Result<Array<ProductDto>>>(url);
        return response.data;
    }
);

const productsSlice = createSlice({
    name: 'products',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(loadProducts.pending, (state) => {
            state.state = ApiState.Pending;
        });
        builder.addCase(loadProducts.fulfilled, (state, action) => {
            state.data = action.payload.value; // Yalnızca value kısmını al
            state.state = ApiState.Fulfilled;
        });
        
        builder.addCase(loadProducts.rejected, (state) => {
            state.state = ApiState.Rejected;
        });
    },
    reducers: {},
});

export default productsSlice.reducer;
