import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "./redux/reducers/productReducer";
import { authReducer } from "./redux/reducers/authReducer";
import { cartReducer } from "./redux/reducers/cartReduer";
import { myOrderReducer } from "./redux/reducers/myorderReducer";

export const store = configureStore({

    reducer: {
        productReducer,
        authReducer,
        cartReducer,
        myOrderReducer
    }
})