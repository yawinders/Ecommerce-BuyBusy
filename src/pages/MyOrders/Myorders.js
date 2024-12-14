import React, { useEffect } from 'react'
import styles from './Myorders.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOrders, myOrderSelector } from '../../redux/reducers/myorderReducer'
import { authSelector } from '../../redux/reducers/authReducer';


export default function Myorders() {

    const { orders } = useSelector(myOrderSelector);
    const dispatch = useDispatch();
    const { user } = useSelector(authSelector);

    useEffect(() => {
        if (user) {
            dispatch(fetchOrders(user.uid))
        }
    }, [user, dispatch])

    return (
        <div className={styles.ordersContainer}>
            <h1>Your Orders</h1>
            {orders.length > 0 ? (
                orders.map((o, index) => (
                    <div className={styles.orderGroup} key={index}>
                        <h2>Ordered On: {o.date}</h2>
                        <table className={styles.ordersTable} cellPadding="2">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Total Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {o.items.map((item, idx) => (
                                    <tr key={idx}>
                                        <td>{item.title}</td>
                                        <td>₹ {item.price}</td>
                                        <td>{item.quantity}</td>
                                        <td>₹ {item.price * item.quantity}</td>
                                    </tr>
                                ))}
                                <tr className={styles.totalRow}>
                                    <td colSpan="3" className={styles.totalLabel}>Total:</td>
                                    <td>
                                        ₹{" "}
                                        {o.totalPrice}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                ))
            ) : (
                <p>No orders yet.</p>
            )}
        </div>
    )
}
