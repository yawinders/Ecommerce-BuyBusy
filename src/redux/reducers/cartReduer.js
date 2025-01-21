import { createSlice } from "@reduxjs/toolkit";
import { db } from "../../firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";



const initialState = {
    items: []
}
const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setToCart: (state, action) => {
            state.items = action.payload;  //loading cart item from firebase
        },
        addToCart: (state, action) => {
            const item = action.payload;
            const existingItem = state.items.find((i) => i.id === item.id)

            if (existingItem) {
                existingItem.quantity += 1;
            }
            else {
                state.items.push({ ...item, quantity: 1 })
            }
        },
        incrementItem: (state, action) => {
            const itemId = action.payload;
            const item = state.items.find((i) => i.id === itemId)
            if (item) {
                item.quantity += 1;
            }
        },
        decrementItem: (state, action) => {
            const itemId = action.payload;
            const item = state.items.find((i) => i.id === itemId)
            if (item && item.quantity > 1) {
                item.quantity -= 1;
            }
        },
        removeItem: (state, action) => {
            const itemId = action.payload;
            state.items = state.items.filter((i) => i.id !== itemId)

        },

    }
})


export const addCartItemToFirebase = (item, userId) => async (dispatch, getState) => {
    try {

        const cartRef = doc(db, 'carts', userId);
        const cartSnap = await getDoc(cartRef);

        let currentCart = []  //cheking if cartSnap exists means there is some prevus carti item belong to user
        if (cartSnap.exists()) {
            currentCart = cartSnap.data().items || [];
        }

        const updatedCart = [...currentCart];  //in this cart new item will add before that we need to check if that item already exits or not
        const existingItem = updatedCart.find((i) => i.id === item.id)
        if (existingItem) {
            existingItem.quantity += 1;
            toast.info(`Item count for "${item.title}" increased to ${existingItem.quantity}.`);
        } else {
            updatedCart.push({ ...item, quantity: 1 });
            toast.success(`"${item.title}" added to cart successfully!`);
        }
        await setDoc(cartRef, { items: updatedCart });
        dispatch(actionsCart.addToCart(item))
    } catch (error) {
        console.error("Failed to update cart in Firebase:", error);
        toast.error("Failed to update cart. Please try again.");
    }


}
//fetching cart item from firebase during login
export const fetchCartItems = (userId) => async (dispatch) => {
    try {
        const cartRef = doc(db, 'carts', userId)
        const cartSnap = await getDoc(cartRef);
        if (cartSnap.exists()) {
            dispatch(actionsCart.setToCart(cartSnap.data().items || []))
        }
    } catch (error) {
        console.error("Failed to fetch cart items:", error);
    }
}

//updating cart item in fire base of varius action like increment adecrement an remove from cart actions
export const updateCartInFirebase = (userId, updatedItems) => async () => {
    try {
        const cartRef = doc(db, 'carts', userId)
        await setDoc(cartRef, { items: updatedItems });
    } catch (error) {
        console.error("Failed to update Firebase cart:", error);
    }
}

export const incrementCartItems = (itemId, userId) => (dispatch, getState) => {
    dispatch(actionsCart.incrementItem(itemId));
    const updatedItems = getState().cartReducer.items;
    dispatch(updateCartInFirebase(userId, updatedItems))
}
export const decrementCartItem = (itemId, userId) => (dispatch, getState) => {
    dispatch(actionsCart.decrementItem(itemId));
    const updatedItems = getState().cartReducer.items;
    dispatch(updateCartInFirebase(userId, updatedItems));
};

export const removeCartItem = (itemId, userId) => (dispatch, getState) => {
    dispatch(actionsCart.removeItem(itemId));
    const updatedItems = getState().cartReducer.items;
    dispatch(updateCartInFirebase(userId, updatedItems));
    toast.success("Item Removed Successfuly")
};

export const cartReducer = cartSlice.reducer;
export const actionsCart = cartSlice.actions;
export const cartSelector = (state) => state.cartReducer;