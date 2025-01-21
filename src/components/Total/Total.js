import React from 'react'
import styles from './Total.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { cartSelector } from '../../redux/reducers/cartReduer'
import { authSelector } from '../../redux/reducers/authReducer'
import { toast } from 'react-toastify';

import { useNavigate } from 'react-router-dom'
import Caraousel from '../Caraousel/Caraousel'
export const Total = () => {
    const { items } = useSelector(cartSelector)
    const { user } = useSelector(authSelector)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handlePurchase = () => {
        if (!user) {
            toast.error("Please login to place an order.");
            return;
        }
        console.log(items);

        if (items.length === 0) {
            alert("Purchase Something to buy")
            return
        }
        const orderData = {
            date: new Date().toISOString(),
            items: items.map(item => {
                const id = item.id;
                const title = item.title;
                const quantity = item.quantity;
                const price = Math.floor(item.price);
                return { id, title, quantity, price };
            }),
            totalPrice: Math.floor(items.reduce((acc, item) => acc + item.price * item.quantity, 0)),
        }

        //placing order
        // dispatch(placeOrder(orderData, user.uid))

        //clearing the cart in redux and fireStore
        // dispatch(actionsCart.setToCart([]))
        // dispatch(updateCartInFirebase(user.uid, []))
        navigate('/cart/bill')
    }
    return (
        <div className={styles.filterContainer}>

            {/* <h3 className={styles.title}>Filter</h3> */}
            <div className={styles.priceFilter}>
                <label>TotalPrice:
                    {items.reduce((acc, i) => acc + i.price * i.quantity, 0)}
                </label>

            </div>
            <div className={styles.categoryFilter}>
                {/* <h4>Category</h4> */}
                <button onClick={handlePurchase}> Purchase</button>
            </div>
            <Caraousel />
        </div>
    )
}
