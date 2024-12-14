import React, { useEffect } from 'react'
import styles from './Home.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { actionProduct, fetchProducts, productSelector } from '../../redux/reducers/productReducer'
import { authSelector } from '../../redux/reducers/authReducer';
import { addCartItemToFirebase } from '../../redux/reducers/cartReduer';

let price = 0;
export default function Home() {
    const categoriesList = [
        "men's clothing",
        "women's clothing",
        'jewelery',
        'electronics',
    ];
    const dispatch = useDispatch();
    const { items: products, filteredItems, status, error } = useSelector(productSelector)

    const { user } = useSelector(authSelector)

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchProducts())
        }
    }, [status, dispatch])

    if (status === "loading") {
        return <p>Loading...</p>;
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

    const handlePriceChange = (e) => {
        price = Number(e.target.value); // Convert to a number for accurate comparison
        const filteredItem = products.filter((p) => p.price <= price); // Filter products by price

        // Dispatch the filtered items to update the Redux state
        dispatch(actionProduct.setFilteredItems(filteredItem));

    }

    const handleCategoryChange = (category) => {

        const filteredItem = products.filter((p) => p.category === category); // Filter products by price

        // Dispatch the filtered items to update the Redux state
        dispatch(actionProduct.setFilteredItems(filteredItem));

    }
    const handleSearch = (e) => {
        const searchInput = e.target.value.toLowerCase(); // Convert input to lowercase for case-insensitive search
        const filteredItems = products.filter((p) =>
            p.title.toLowerCase().includes(searchInput) // Check if the product title includes the search input
        );

        dispatch(actionProduct.setFilteredItems(filteredItems));
    }
    return (
        <div className={styles.filterAndHome}>
            <div className={styles.filterContainer}>
                <h3 className={styles.title}>Filter</h3>
                <div className={styles.priceFilter}>
                    <label>Price:
                        {price}
                    </label>
                    <input
                        type="range"
                        min="0"
                        max="1000"
                        value={price}
                        onChange={handlePriceChange}
                        className={styles.slider}
                    />
                </div>
                <div className={styles.categoryFilter}>
                    <h4>Category</h4>
                    {categoriesList.map((category) => (
                        <div key={category} className={styles.checkboxContainer}>
                            <input
                                type="checkbox"
                                id={category}
                                value={category}
                                onChange={() => handleCategoryChange(category)}
                            />
                            <label htmlFor={category}>{category}</label>
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.seacrhAndItem}>
                <div className={styles.searchBar}>
                    <input
                        type="text"
                        placeholder="Search By Name"
                        className={styles.searchInput}
                        onChange={handleSearch}
                    />
                </div>
                <div className={styles.items}>
                    {filteredItems.map((product) => {
                        return (

                            <div className={styles.itemCard} key={product.id}>
                                <img src={product.image} alt={product.name} className={styles.productImage} />
                                <h3 className={styles.itemTitle}>{product.title}</h3>
                                <p className={styles.itemPrice}>₹ {product.price}</p>
                                <button className={styles.addToCart}
                                    onClick={() => handleAddToCart(product)}
                                >Add To Cart</button>
                            </div>

                        )
                    })}
                </div>

            </div>
        </div>
    )
}
