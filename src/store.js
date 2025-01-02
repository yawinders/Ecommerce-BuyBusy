import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "./redux/reducers/productReducer";
import { authReducer } from "./redux/reducers/authReducer";
import { cartReducer } from "./redux/reducers/cartReduer";
import { myOrderReducer } from "./redux/reducers/myorderReducer";
import { userProfileReducer } from "./redux/reducers/userProfileReducer";
import { filterReducer } from "./redux/reducers/filterReducer";
import { addressReducer } from "./redux/reducers/addressReducer";

export const store = configureStore({

    reducer: {
        productReducer,
        authReducer,
        cartReducer,
        myOrderReducer,
        userProfileReducer,
        filterReducer,
        addressReducer
    }
})