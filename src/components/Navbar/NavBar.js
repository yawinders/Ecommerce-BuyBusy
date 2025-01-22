import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { actions, authSelector } from '../../redux/reducers/authReducer'
import { signOut } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import { toast } from 'react-toastify';
import styles from './NavBar.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faSignOutAlt, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { cartSelector } from '../../redux/reducers/cartReduer';
import { productSelector } from '../../redux/reducers/productReducer';
import { actionFilter, filterProducts, filterSelector } from '../../redux/reducers/filterReducer';

export default function NavBar() {

    const [searchInput, setSearchInput] = useState('')
    const { isAuthenticated } = useSelector(authSelector);
    const { user } = useSelector(authSelector)
    const { items } = useSelector(cartSelector)
    const { items: products } = useSelector(productSelector)

    const { suggestionList, searchQuery, price, selectedCategory } = useSelector(filterSelector)

    const dispatch = useDispatch();
    const handleLogout = async (e) => {
        // console.log("Logout handler triggered");
        const confirmation = window.confirm("Are you sure you want to log out?");
        // console.log(confirmation)
        if (!confirmation) return; // Exit if the user cancels the logout

        try {
            await signOut(auth); // Logs out the user from Firebase
            dispatch(actions.logout()); // Clears the Redux state
            toast.success('Logout successfully');
        } catch (error) {
            console.error("Logout failed:", error.message);
            toast.error("Failed to log out");
        }
    }
    const handleSearch = (e) => {
        const searchInp = e.target.value.toLowerCase(); // Convert input to lowercase for 
        // case-insensitive search
        setSearchInput(searchInp)

        dispatch(actionFilter.setSearchQuery(searchInp))

    }

    useEffect(() => {

        dispatch(filterProducts());
    }, [dispatch, searchQuery, selectedCategory, price]);

    return (
        <>
            <nav>
                <div className={styles.header}>
                    <a href="/" className={styles.logo}>
                        BUYBUSY

                    </a>

                    <span className={styles.welcome}>
                        {user ? `Welcomes You` : 'Welcomes You'}
                        <div className={styles.flag}>

                            <img src="https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg" alt="India Flag" />
                        </div>
                    </span>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            width: "100%",
                            maxWidth: "400px",
                            margin: "0 auto",
                            position: "relative", // Important for suggestion list alignment
                        }}
                    >
                        {/* Search Bar */}
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                border: "1px solid #ccc",
                                borderRadius: "4px",
                                padding: "5px",
                                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                            }}
                        >
                            <input
                                type="text"
                                placeholder="Search By Name"
                                value={searchInput}
                                onChange={handleSearch}
                                style={{
                                    flex: 1,
                                    border: "none",
                                    outline: "none",
                                    padding: "5px 10px",
                                    fontSize: "16px",
                                    borderRadius: "4px",
                                }}
                            />
                            <span
                                onClick={() => {
                                    setSearchInput("");
                                    dispatch(actionFilter.setSuggestionList([]));
                                    dispatch(actionFilter.setFilteredProducts(products));
                                }}
                                style={{
                                    cursor: "pointer",
                                    marginLeft: "10px",
                                    color: "#999",
                                    fontWeight: "bold",
                                    fontSize: "18px",
                                }}
                            >
                                ×
                            </span>
                        </div>

                        {/* Suggestion List */}
                        <div
                            style={{
                                color: 'black',
                                position: "absolute", // Positioned relative to the parent div
                                top: "100%", // Align just below the input box
                                left: 0,
                                width: "100%", // Matches the width of the parent div
                                backgroundColor: "white",
                                border: "1px solid #ccc",
                                borderRadius: "4px",
                                marginTop: "5px",
                                zIndex: 1000,
                                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                                display: suggestionList.length > 0 && searchInput ? "block" : "none",
                                maxHeight: "200px",
                                overflowY: "auto",
                            }}
                        >
                            {suggestionList &&
                                suggestionList.map((list) => (
                                    <p
                                        key={list.id}
                                        onClick={() => {
                                            setSearchInput(list);
                                            dispatch(actionFilter.setSuggestionList([]));
                                            window.scrollTo(0, 400);
                                        }}
                                        style={{
                                            padding: "10px",
                                            margin: 0,
                                            cursor: "pointer",
                                            backgroundColor: "#fff",
                                            borderBottom: "1px solid #eee",
                                            transition: "background-color 0.2s",
                                        }}
                                        onMouseEnter={(e) => (e.target.style.backgroundColor = "#f5f5f5")}
                                        onMouseLeave={(e) => (e.target.style.backgroundColor = "#fff")}
                                    >
                                        {list}
                                    </p>
                                ))}
                        </div>
                    </div>

                    <div className={styles.navItem}>
                        <ul>
                            <li>
                                <Link to="/">
                                    Home
                                </Link>
                            </li>
                            {isAuthenticated && (
                                <li>
                                    <Link to="/myorders">
                                        My Orders
                                    </Link>
                                </li>
                            )}
                            {isAuthenticated && (
                                <li className={styles.cartIcon}>
                                    <Link to="/cart">
                                        Cart
                                        <FontAwesomeIcon icon={faCartShopping} style={{ marginLeft: '8px' }} />
                                    </Link>
                                    <span>{items.length}</span> {/* Example cart count */}
                                </li>
                            )}
                            {isAuthenticated ? (
                                <li>
                                    <Link to="#" onClick={handleLogout}>
                                        Logout <FontAwesomeIcon icon={faSignOutAlt} />
                                    </Link>
                                </li>
                            ) : (
                                <li>
                                    <Link to="/login">
                                        Login <FontAwesomeIcon icon={faSignInAlt} />
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>


        </>
    )
}
