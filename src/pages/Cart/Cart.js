import React from 'react'
import styles from './Cart.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { actionsCart, cartSelector, decrementCartItem, incrementCartItems, removeCartItem, updateCartInFirebase } from '../../redux/reducers/cartReduer';
import { authSelector } from '../../redux/reducers/authReducer';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { placeOrder } from '../../redux/reducers/myorderReducer';

export default function Cart() {
    const { items } = useSelector(cartSelector);
    const { user } = useSelector(authSelector);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handlePlus = (itemId) => {
        if (user) {
            dispatch(incrementCartItems(itemId, user.uid))
        }
    }
    const handleMinus = (itemId) => {
        if (user) {
            dispatch(decrementCartItem(itemId, user.uid));
        }
    }
    const handleRemoveFromCart = (itemId) => {
        if (user) {
            dispatch(removeCartItem(itemId, user.uid))
        }
    }

    const handlePurchase = () => {
        if (!user) {
            toast.error("Please login to place an order.");
            return;
        }
        const orderData = {
            date: new Date().toISOString(),
            items: items.map(item => {
                const id = item.id;
                const title = item.title;
                const quantity = item.quantity;
                const price = item.price;
                return { id, title, quantity, price };
            }),
            totalPrice: items.reduce((acc, item) => acc + item.price * item.quantity, 0),
        }
        //placing order
        dispatch(placeOrder(orderData, user.uid))

        //clearing the cart in redux and fireStore
        dispatch(actionsCart.setToCart([]))
        dispatch(updateCartInFirebase(user.uid, []))
        navigate('/myorders')
    }

    return (
        <div className={styles.cartAndPurchase}>
            <div className={styles.items}>
                {
                    items.length === 0 ?
                        <h3>Your Cart is Empty</h3>
                        :
                        (
                            items.map((product) => {

                                return (
                                    <div className={styles.itemCard} key={product.id}>
                                        <img src={product.image} alt={product.title} className={styles.productImage} />
                                        <h3 className={styles.itemTitle}>{product.title}</h3>
                                        <p className={styles.itemPrice}>₹ {product.price}</p>
                                        <p><span className={styles.addSubBtn}
                                            onClick={() => handlePlus(product.id)}
                                        >+</span><span>{product.quantity}</span>
                                            <span className={styles.addSubBtn}
                                                onClick={() => handleMinus(product.id)}
                                            >-</span></p>
                                        <button className={styles.addToCart}
                                            onClick={() => handleRemoveFromCart(product.id)}
                                        >Remove Form Cart</button>
                                    </div>
                                );

                            }))}
            </div>
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
            </div>
        </div>
    )
}
