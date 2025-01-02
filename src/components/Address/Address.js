import React, { useState } from 'react';

import styles from './Address.module.css';
import { useDispatch } from 'react-redux';
import { actionAddress } from '../../redux/reducers/addressReducer';
import RazorpayButton from '../RazorPayButton';

const Address = ({ address, setAddress }) => {
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [showPayButton, setShowPayButton] = useState(false);
    const dispatch = useDispatch()

    const handleAddressSubmit = (e) => {
        e.preventDefault();
        const newAddress = e.target.address.value;
        setAddress(newAddress);
        dispatch(actionAddress.setExistingAddress(newAddress))
        setIsConfirmed(true);
    };
    const handleProceedToPayment = () => {
        setShowPayButton(true); // Show the "Pay Fees" button
    };

    return (
        <div className={styles.addressContainer}>
            {!address || !isConfirmed ? (
                <form onSubmit={handleAddressSubmit} className={styles.addressForm}>
                    <textarea
                        name="address"
                        placeholder="Enter your address"
                        defaultValue={address || ''}
                        required
                    />
                    <button type="submit" className={styles.confirmButton}>
                        Confirm Address
                    </button>
                </form>
            ) : (
                <div className={styles.confirmedAddress}>
                    <p>Address: {address}</p>
                    {!showPayButton ? (
                        <button
                            className={styles.proceedButton}
                            onClick={handleProceedToPayment}
                        >
                            Proceed to Payment
                        </button>
                    ) : (
                        <RazorpayButton /> // Render the Razorpay payment button
                    )}
                </div>
            )}
        </div>
    );
};

export default Address;
