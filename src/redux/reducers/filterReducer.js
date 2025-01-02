import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { productSelector } from "./productReducer";




const filterSlice = createSlice({
    name: 'filter',
    initialState: {
        searchQuery: '',
        price: 0,
        selectedCategory: [],
        filteredProducts: [],
        suggestionList: [],
    },
    reducers: {
        setSearchQuery(state, action) {
            state.searchQuery = action.payload;
        },
        setPrice(state, action) {
            state.price = action.payload
        },
        setSelectedCategory(state, action) {
            state.selectedCategory = action.payload
        },
        setFilteredProducts(state, action) {
            state.filteredProducts = action.payload;
        },
        setSuggestionList(state, action) {
            state.suggestionList = action.payload;
        },
    }
})

export const filterProducts = () => async (dispatch, getState) => {
    const { items } = getState().productReducer;



    const { searchQuery, price, selectedCategory } = getState().filterReducer;

    // Apply filters
    const filteredProducts = items.filter((product) => {
        const matchesSearch = product.title
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        const matchesPrice = price === 0 || product.price <= price;
        const matchesCategory =
            selectedCategory.length === 0 ||
            selectedCategory.includes(product.category);

        return matchesSearch && matchesPrice && matchesCategory;
    });

    const suggestionList =
        searchQuery.length >= 2
            ? items
                .map((product) => product.title)
                .filter((title) =>
                    title.toLowerCase().includes(searchQuery.toLowerCase())
                )
            : [];

    // Dispatch results
    dispatch(actionFilter.setFilteredProducts(filteredProducts));
    dispatch(actionFilter.setSuggestionList(suggestionList));
}


export const filterReducer = filterSlice.reducer;
export const actionFilter = filterSlice.actions;
export const filterSelector = (state) => state.filterReducer;