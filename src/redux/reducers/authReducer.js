import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    user: null,
    isAuthenticated: false,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        logout: (state, action) => {
            state.isAuthenticated = false;
            state.user = null;
        }
    }
});

export const authReducer = authSlice.reducer;
export const actions = authSlice.actions;
export const authSelector = (state) => state.authReducer;