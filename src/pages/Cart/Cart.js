import React from 'react'
import styles from './Cart.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { cartSelector, decrementCartItem, incrementCartItems, removeCartItem } from '../../redux/reducers/cartReduer';
import { authSelector } from '../../redux/reducers/authReducer';



import ProfileCard from '../../components/userProfile/ProfileCard';
import { Total } from '../../components/Total/Total';

import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';

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

    const handleShopNow = () => {
        navigate('/'); // Adjust this path to your shop route
    };
    return (
        <>
            <div className={styles.cartAndPurchase}>
                <ProfileCard />
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div className={styles.items}>
                        {
                            items.length === 0 ?
                                <div className={styles.emptyBagContainer}>
                                    <div className={styles.contentBox}>
                                        <img
                                            src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
                                            alt="Empty Bag"
                                            className={styles.emptyBagImage}
                                        />
                                        <h1 className={styles.title}>Your Bag is Feeling Light</h1>
                                        <p className={styles.message}>
                                            You haven’t added anything to your bag yet. Let’s fix that!
                                        </p>
                                        <button className={styles.shopButton} onClick={handleShopNow}>
                                            Shop Now
                                        </button>
                                    </div>
                                </div>
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
                    {items.length === 0 ? <></> : (<Total />)}
                </div>

            </div>
            <Footer />
        </>
    )
}
