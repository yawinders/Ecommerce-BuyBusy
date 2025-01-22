import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionsCart, cartSelector, updateCartInFirebase } from '../redux/reducers/cartReduer';
import { authSelector } from '../redux/reducers/authReducer';
import { useNavigate } from 'react-router-dom';
import { placeOrder } from '../redux/reducers/myorderReducer';


const RazorpayButton = ({ total }) => {

    const { items } = useSelector(cartSelector);
    const { user } = useSelector(authSelector)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handlePayment = async () => {
        try {

            const options = {
                key: "rzp_test_i4TlJDpTfr1GZS", // Replace with your Razorpay Key ID
                amount: Math.floor(items.reduce((acc, item) => acc + item.price * item.quantity, 0) * 100),
                currency: "INR",
                name: "Buy Busy ShoppingMart",
                description: "Shopping Items Payment",
                handler: function (response) {
                    console.log("Payment Success:", response);
                    alert("Payment successful!");
                    const orderData = {
                        date: new Date().toISOString(),
                        items: items.map(item => ({
                            id: item.id,
                            title: item.title,
                            quantity: item.quantity,
                            price: Math.floor(item.price),
                        })),
                        totalPrice: Math.floor(
                            items.reduce((acc, item) => acc + item.price * item.quantity, 0)
                        ),
                    };

                    // Place the order
                    dispatch(placeOrder(orderData, user.uid));

                    // Clear the cart
                    dispatch(actionsCart.setToCart([]));
                    dispatch(updateCartInFirebase(user.uid, []));

                    // Navigate to My Orders page
                    navigate('/myorders');
                },
                prefill: {
                    name: "Student Name",
                    email: "student@example.com",
                    contact: "9999999999",
                },
                theme: {
                    color: "#3399cc",
                },
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
        } catch (error) {
            console.error("Error during payment:", error);
        }
    };

    return (
        <button onClick={handlePayment}>
            {`Pay Amount ${total}`}
        </button>
    );
};

export default RazorpayButton;
