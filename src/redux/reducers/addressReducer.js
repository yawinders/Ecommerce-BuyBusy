import { createSlice } from "@reduxjs/toolkit";




const addressSlice = createSlice({
    name: 'address',
    initialState: {
        existingAddress: ''
    },
    reducers: {
        setExistingAddress(state, action) {
            state.existingAddress = action.payload;
        }
    }
})


export const addressReducer = addressSlice.reducer;
export const actionAddress = addressSlice.actions;
export const addressSelector = (state) => state.addressReducer;