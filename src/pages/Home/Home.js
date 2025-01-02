import React, { useEffect, useState } from 'react'
import styles from './Home.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts, productSelector } from '../../redux/reducers/productReducer'
import { authSelector } from '../../redux/reducers/authReducer';
import { addCartItemToFirebase } from '../../redux/reducers/cartReduer';
import { FaShoppingCart } from 'react-icons/fa';
import ProfileCard from '../../components/userProfile/ProfileCard';
import { Filter } from '../../components/Filter/Filter';
import Caraousel from '../../components/Caraousel/Caraousel';
import { filterProducts, filterSelector } from '../../redux/reducers/filterReducer';
import ProductDetail from '../ProductDetails/ProductDetail';
import { useNavigate } from 'react-router-dom';

let price = 0;
export default function Home() {

    const [page, setPage] = useState(1)

    const dispatch = useDispatch();
    const { items: products, filteredItems, status, error } = useSelector(productSelector)
    let al = products.length;
    const { user } = useSelector(authSelector)
    const { filteredProducts } = useSelector(filterSelector);

    const navigate = useNavigate()


    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchProducts())
            // dispatch(filterProducts());
        }
    }, [status, dispatch])


    useEffect(() => {

        if (products) { dispatch(filterProducts()) }
    }, [dispatch, products]);



    if (status === "loading") {
        return <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Loading...</div>;
    }

    if (status === "failed") {
        return <p>Error: {error}</p>;
    }

    const handleAddToCart = (product) => {

        if (!user) {
            alert('Please log in to add items to your cart');
            return;
        }
        dispatch(addCartItemToFirebase(product, user.uid));
    }

    const handleProductClick = (product) => {
        navigate(`/product/${product.id}`, { state: { product } });
    };



    return (
        <div className={styles.FeaturesAndHome}>
            {/* Left Sidebar */}
            <aside className={styles.ProfileAndFilter}>
                <ProfileCard />
                <Filter />
            </aside>

            {/* Right Content */}
            <main className={styles.HomeAndPagination}>
                {/* caraousel section */}
                <Caraousel />

                {/* Products Section */}

                {/* ---- */}
                <div className={styles.cardDad}>
                    {filteredProducts.slice(page * 8 - 8, page * 8).map((product, i) => (
                        <div className={styles.card} key={i} >
                            <img onClick={() => handleProductClick(product)} src={product.image} alt={product.title} className={styles.image} />
                            <h3 className={styles.title}>{product.title}</h3>
                            <p className={styles.price}>₹ {product.price}</p>
                            <button
                                className={styles.addToCartButton}
                                onClick={() => handleAddToCart(product)}
                            >
                                <FaShoppingCart className={styles.icon} /> Add to Cart
                            </button>
                        </div>
                    ))}
                </div>
                {/* ---- */}

                {/* Pagination Section */}
                <div className={styles.paginationn}>
                    <button
                        onClick={() => setPage(page - 1)}
                        disabled={page === 1}
                        className={styles.paginationButton}
                    >
                        {"<"}
                    </button>
                    {Array(Math.floor(al / 6))
                        .fill(0)
                        .map((_, i) => (
                            <span
                                className={styles.pageno}
                                key={i}
                                style={{
                                    fontSize: "1.2rem",
                                    cursor: "pointer",
                                    backgroundColor: i + 1 === page ? "gray" : "",
                                }}
                                onClick={() => setPage(i + 1)}
                            >
                                {i + 1}
                            </span>
                        ))}
                    <button
                        onClick={() => {
                            setPage(page + 1)
                            if (page === Math.floor(al / 6)) {
                                setPage(1)
                            }
                        }}
                        disabled={page === Math.ceil(al / 4)}
                        className={styles.paginationButton}
                    >
                        {">"}
                    </button>
                </div>
            </main>
        </div>
    )
}
