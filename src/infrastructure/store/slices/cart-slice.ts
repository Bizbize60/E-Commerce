import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import Endpoints from '../../helpers/api-endpoints';
import { Result } from '../../shared/Result';
import ApiState from '../../enums/ApiState';
import { CartDto } from '../../dtos/CartDto';

export interface CartState {
    data: Result<CartDto> | null; // Sepet verisi
    state: ApiState; // API durumu (Idle, Pending, Fulfilled, Rejected)
    error: string | null; // Hata mesajı
}

const initialState: CartState = {
    data: null,
    state: ApiState.Idle,
    error: null,
};

// Sepet verilerini yükleyen async thunk
export const loadCarts = createAsyncThunk<
    Result<CartDto>, // Beklenen dönüş türü
    { customerId: string }, // Girdi parametresi
    { rejectValue: string } // Hata durumunda dönecek değer
>(
    'carts/loadCarts',
    async ({ customerId }, { rejectWithValue }) => {
        try {
            console.log('loadCarts - Backend Çağrısı Başladı:', customerId);
            const response = await axios.get<Result<CartDto>>(
                `${Endpoints.Carts.GetCartOfCustomer}?customerId=${customerId}`
            );
            console.log('loadCarts - Backend Yanıtı:', response.data);
            return response.data; // Backend'den alınan veri
        } catch (error: any) {
            console.error('loadCarts - Hata:', error.response?.data);
            return rejectWithValue(error.response?.data || 'Sepet yüklenemedi.');
        }
    }
);


// Sepete ürün eklemek için async thunk
export const addProductToCart = createAsyncThunk(
    'carts/addProductToCart',
    async ({ productId, customerId, quantity }: { productId: number, customerId: number, quantity: number }, { rejectWithValue }) => {
        try {
            // Sepete ürün eklemek için API'ye POST isteği gönder
            const response = await axios.post(Endpoints.Carts.AddProduct, { productId, customerId, quantity });

            return response.data; // Yanıtı geri döndür
        } catch (error) {
            console.error('Error adding product to cart:', error);
            return rejectWithValue(error.response?.data || 'Bir hata oluştu.');
        }
    }
);
// Sepet slice'ı
const cartsSlice = createSlice({
    name: 'carts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(loadCarts.pending, (state) => {
            state.state = ApiState.Pending;
            state.error = null;
        });
        builder.addCase(loadCarts.fulfilled, (state, action) => {
            console.log('Redux Store Güncelleniyor:', action.payload);
            state.data = action.payload; // Redux Store'a veri yazılıyor
            state.state = ApiState.Fulfilled;
        });
        builder.addCase(loadCarts.rejected, (state, action) => {
            console.error('loadCarts Rejected:', action.payload);
            state.state = ApiState.Rejected;
            state.error = action.payload as string;
        });
    },
});

export default cartsSlice.reducer;
