import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Outlet } from 'react-router-dom'
import { actions, authSelector } from '../../redux/reducers/authReducer'
import { signOut } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import { toast } from 'react-toastify';

export default function NavBar() {

    const { isAuthenticated } = useSelector(authSelector);
    const { user } = useSelector(authSelector)
    const dispatch = useDispatch();
    const handleLogout = async (e) => {
        console.log("Logout handler triggered");
        const confirmation = window.confirm("Are you sure you want to log out?");
        console.log(confirmation)
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

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">
                        BUYBUSY
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/myorders">
                                    {isAuthenticated && "MyOrders"}
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to='/cart'>
                                    {isAuthenticated && 'Cart'}
                                </Link>
                            </li>
                            {isAuthenticated ? (<li className="nav-item">
                                <Link className="nav-link" onClick={handleLogout}>
                                    logout
                                </Link>
                            </li>) : (<li className="nav-item">
                                <a className="nav-link" href="/login">
                                    Login
                                </a>
                            </li>)}
                            <li className="nav-item">
                                <p className="nav-link active" aria-current="page" style={{ color: "green" }}>
                                    {user ? `Welcome ${user.name}` : 'Welcome to BuyBusy'}
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

        </>
    )
}
