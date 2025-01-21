import React, { useState } from 'react';
import styles from './BillComponent.module.css';

import { useSelector } from 'react-redux';
import { cartSelector } from '../../redux/reducers/cartReduer';
import { addressSelector } from '../../redux/reducers/addressReducer';
import Address from '../Address/Address';

const BillComponent = () => {
    const { existingAddress } = useSelector(addressSelector);
    const { items } = useSelector(cartSelector)
    console.log(items);

    const [isConfirmed, setIsConfirmed] = useState(false);
    const [address, setAddress] = useState(existingAddress || null);
    const [proceedToPayment, setProceedToPayment] = useState(false);

    const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const deliveryCharge = subtotal < 500 ? 50 : 0;
    const total = subtotal + deliveryCharge;

    const handleCheckbox = (e) => {
        setIsConfirmed(e.target.checked);
    };

    const handleProceed = () => {
        setProceedToPayment(true);
    };

    return (
        <div className={styles.billContainer}>
            <h2 className={styles.title}>Bill Summary</h2>
            <div className={styles.billDetails}>
                {items.map((item, index) => (
                    <div key={index} className={styles.itemRow}>
                        {/* <span>{item.title}</span> */}
                        <span className={styles.itemName}>{item.title}</span>
                        <span className={styles.itemQuantity}>x{item.quantity}</span>
                        <span className={styles.itemPrice}>₹{item.price * item.quantity}</span>
                    </div>
                ))}
                <hr />
                <div className={styles.charges}>
                    <div className={styles.row}>
                        <span>Subtotal</span>
                        <span>₹{subtotal}</span>
                    </div>
                    <div className={styles.row}>
                        <span>Delivery Charge</span>
                        <span>₹{deliveryCharge}</span>
                    </div>
                    <div className={styles.row}>
                        <span>Total</span>
                        <span>₹{total}</span>
                    </div>
                </div>
                <div className={styles.confirmation}>
                    <input
                        type="checkbox"
                        id="confirm"
                        checked={isConfirmed}
                        onChange={handleCheckbox}
                    />
                    <label htmlFor="confirm">I confirm the details</label>
                </div>
                <button
                    className={styles.proceedButton}
                    onClick={handleProceed}
                    disabled={!isConfirmed}
                >
                    Proceed
                </button>
            </div>
            {proceedToPayment && (
                <Address address={address} setAddress={setAddress} />
            )}
        </div>
    );
};

export default BillComponent;
