import { createSlice } from '@reduxjs/toolkit';

interface CustomerState {
    customerId: number | null;
}

const initialState: CustomerState = {
    customerId: null,  // Müşteri ID'si başlangıçta null olabilir
};

const customerSlice = createSlice({
    name: 'customer',
    initialState,
    reducers: {
        setCustomerId(state, action) {
            state.customerId = action.payload;
        },
    },
});

export const { setCustomerId } = customerSlice.actions;
export default customerSlice.reducer;
