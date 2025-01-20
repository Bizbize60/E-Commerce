import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import ApiState from '../../enums/ApiState';
import Endpoints from '../../helpers/api-endpoints';
import { Result } from '../../shared/Result';
import { CategoryDto } from '../../dtos/CategoryDto';

export interface CategoryState {
  data: Result<Array<CategoryDto>>;
  activeCategory: number | null;
  state: ApiState;
}

const initialState = { state: ApiState.Idle, activeCategory: null } as CategoryState;

// Yeni Thunk: Kategori ID'sini Backend'e Gönder
export const sendCategoryIdToBackend: AsyncThunk<any, number | null, CategoryState> = createAsyncThunk(
  'categories/sendCategoryId',
  async (categoryId) => {
    if (categoryId === null) return; // Eğer kategori ID'si null ise, işlem yapma.
    const response = await axios.post('http://localhost:5021/api/selected-category', { id: categoryId });
    return response.data; // Backend'den gelen veriyi döndürüyoruz
  }
);

export const loadCategories: AsyncThunk<Result<Array<CategoryDto>>, void, CategoryState> = createAsyncThunk(
  'categories/getAll',
  async () => {
    const response = await axios.get<Result<Array<CategoryDto>>>(Endpoints.Categories.List);
    return response.data;
  }
);

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(loadCategories.pending, (state) => {
      state.state = ApiState.Pending;
    });
    builder.addCase(loadCategories.fulfilled, (state, action) => {
      state.data = action.payload;
      state.state = ApiState.Fulfilled;
    });
    builder.addCase(loadCategories.rejected, (state) => {
      state.state = ApiState.Rejected;
    });
    builder.addCase(sendCategoryIdToBackend.fulfilled, (state, action) => {
      // API çağrısı başarılı olduğunda yapılacak işlemler
      console.log('Backend yanıtı:', action.payload);
    });
  },
  reducers: {
    setActiveCategory: (state, action) => {
      state.activeCategory = action.payload;
    },
  },
});

export const { setActiveCategory } = categoriesSlice.actions;

export default categoriesSlice.reducer;
