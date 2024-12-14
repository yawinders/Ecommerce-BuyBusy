import { createSlice } from "@reduxjs/toolkit"
import { addDoc, collection, getDocs } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../../firebaseConfig";



const initialState = {
    orders: []
}

const myOrderSlice = createSlice({
    name: "myOrders",
    initialState,
    reducers: {
        setOrders: (state, action) => {
            state.orders = action.payload;
        },
        addOrder: (state, action) => {
            state.orders.push(action.payload);
        }
    }
});

//storing order to firebase
export const placeOrder = (orderData, userId) => async (dispatch, getState) => {
    try {
        const orderRef = collection(db, 'orders', userId, 'userOrders');
        await addDoc(orderRef, orderData);
        dispatch(myOrderActions.addOrder(orderData));
        toast.success("Order Placed successfully")
    } catch (error) {
        console.error("Failed to place order:", error);
        toast.error("Failed to place order. Please try again.");
    }
}
//fetching order from firebase

export const fetchOrders = (userId) => async (dispatch, getState) => {
    try {
        const orderRef = collection(db, 'orders', userId, 'userOrders');
        const ordersSnap = await getDocs(orderRef);
        const orders = [];
        ordersSnap.forEach((doc) => {
            orders.push({ id: doc.id, ...doc.data() }); // Combine document ID with its data
        });

        dispatch(myOrderActions.setOrders(orders));
    } catch (error) {
        console.error("Failed to fetch orders:", error);
        dispatch(myOrderActions.setOrders([]));
    }
}

export const myOrderReducer = myOrderSlice.reducer;
export const myOrderActions = myOrderSlice.actions;
export const myOrderSelector = (state) => state.myOrderReducer;