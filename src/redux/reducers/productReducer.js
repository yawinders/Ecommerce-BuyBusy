import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'


//fetching the products

export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    async (_, thunkAPI) => {

        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        return data;
    }
)

const productSlice = createSlice({
    name: "products",
    initialState: {
        items: [],
        filteredItems: [],
        status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
        error: null,
    },
    reducers: {
        setFilteredItems: (state, action) => {
            state.filteredItems = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state) => {
            state.status = "loading"
        })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = action.payload;
                state.filteredItems = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
    }
});

export const productReducer = productSlice.reducer;
export const actionProduct = productSlice.actions
export const productSelector = (state) => state.productReducer;