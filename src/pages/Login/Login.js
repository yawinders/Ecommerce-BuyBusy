import React, { useState } from 'react';
import styles from './Login.module.css'; // Import CSS module
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../firebaseConfig';
import { useDispatch } from 'react-redux';
import { actions } from '../../redux/reducers/authReducer';
import { toast } from "react-toastify"
import { doc, getDoc } from 'firebase/firestore';
import { fetchCartItems } from '../../redux/reducers/cartReduer';


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogIn = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            toast.error("Please enter email and password.");
            return;
        }
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            //fetching userdetails from firebase
            const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid))
            if (userDoc.exists()) {
                const userData = userDoc.data();
                dispatch(actions.login({ name: userData.name, email: userData.email, uid: userData.uid }))
                dispatch(fetchCartItems(userData.uid))
            } else {
                console.log("userData not found in fireStore");
                toast.error("User don't exist")
                return
            }

            toast.success("LogIn Successfuly")
            navigate('/')
        } catch (error) {
            toast.error("Login failed. Please check your credentials.")
        }

    }


    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h2 className={styles.title}>Login</h2>
                <form className={styles.form}>
                    <input
                        type="email"
                        placeholder="Enter Email"
                        className={styles.input}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Enter Password"
                        className={styles.input}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit" className={styles.button}
                        onClick={handleLogIn}
                    >
                        Login
                    </button>
                </form>
                <p className={styles.footer}>
                    or<Link to="/signup" className={styles.link}>SignUp instead</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
