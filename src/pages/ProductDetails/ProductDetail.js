import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './ProductDetail.module.css';
import { FaStar, FaShoppingCart } from 'react-icons/fa';
import { addCartItemToFirebase } from '../../redux/reducers/cartReduer';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector } from '../../redux/reducers/authReducer';

const ProductDetail = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const product = location.state?.product;
    // console.log(product);
    const dispatch = useDispatch()
    const { user } = useSelector(authSelector)
    if (!product) {
        // Redirect or show an error if no product data is available
        navigate('/');
        return null;
    }

    const handleAddToCart = (product) => {

        if (!user) {
            alert('Please log in to add items to your cart');
            return;
        }
        dispatch(addCartItemToFirebase(product, user.uid));
    }


    const handleBackToHome = () => {
        navigate('/');
    };

    return (
        <div className={styles.productDetailContainer}>
            <button className={styles.backButton} onClick={handleBackToHome}>
                ⬅ Back to Home
            </button>
            <div className={styles.productCard}>
                <div className={styles.imageSection}>
                    <img src={product.image} alt={product.title} className={styles.productImage} />
                </div>
                <div className={styles.detailsSection}>
                    <h1 className={styles.title}>{product.title}</h1>
                    <p className={styles.category}>Category: {product.category}</p>
                    <p className={styles.description}>{product.description}</p>
                    <div className={styles.priceRating}>
                        <p className={styles.price}>Price: ₹{product.price}</p>
                        <div className={styles.rating}>
                            <FaStar className={styles.starIcon} />
                            <span>{product.rating.rate} ({product.rating.count} reviews)</span>
                        </div>
                    </div>
                    <button className={styles.cartButton}
                        onClick={() => handleAddToCart(product)}
                    >
                        <FaShoppingCart className={styles.cartIcon} /> Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
