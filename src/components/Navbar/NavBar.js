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
                        {user ? `Welcome ${user.name}` : 'Welcome to BUYBUSY'}
                        <div className={styles.flag}>

                            <img src="https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg" alt="India Flag" />
                        </div>
                    </span>

                    <div className={styles.searchBar}>

                        <input
                            type="text"
                            placeholder="Search By Name"
                            value={searchInput}
                            className={styles.searchInput}
                            onChange={handleSearch}
                        />
                        <icon onClick={() => {
                            setSearchInput("")
                            dispatch(actionFilter.setSuggestionList([]))
                            dispatch(actionFilter.setFilteredProducts(products))
                        }}>X</icon>
                        <div className={`${styles.suggestionList} ${(suggestionList.length > 0 && searchInput) ? styles.visible : ''}`} >
                            {suggestionList && suggestionList.map((list) => {
                                return <p className={styles.list} key={list.id} onClick={() => {
                                    setSearchInput(list)
                                    dispatch(actionFilter.setSuggestionList([]))
                                    window.scrollTo(0, 500)

                                }} >{list}</p>
                            })}
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
