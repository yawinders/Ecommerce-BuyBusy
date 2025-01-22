import React, { useState } from 'react';
import styles from './SignUp.module.css'; // Import CSS module
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { actions } from '../../redux/reducers/authReducer';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { auth, db } from '../../firebaseConfig';
import Loader from '../../components/Loader';

const SignUp = () => {
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        // Input validation
        setLoading(true)
        if (!name || !email || !password) {
            toast.error("All fields are required.");
            setLoading(false)
            return;
        }

        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error("Please enter a valid email address.");
            setLoading(false)
            return;
        }

        // Password strength validation
        if (password.length < 6) {
            toast.error("Password must be at least 6 characters long.");
            setLoading(false)
            return;
        }
        try {

            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            //saving user details tofirebase db

            await setDoc(doc(db, 'users', userCredential.user.uid), {
                name,
                email,
                uid: userCredential.user.uid
            });

            dispatch(actions.login({ name, email, uid: userCredential.user.uid }));
            setLoading(false)
            toast.success("User Register Successfully")
            navigate('/')
        } catch (error) {
            console.log(error)
            toast.error("Already Registered")
            setLoading(false)

        }
    }


    return (
        <div className={styles.container}>
            <div className={styles.card}>

                <h2 className={styles.title}>Sign Up</h2>
                <form className={styles.form}>
                    <input
                        type="name"
                        placeholder="Enter Name"
                        className={styles.input}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
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
                        onClick={handleSignUp}
                    >
                        {loading ? (<div style={{ display: "flex", justifyContent: "center" }}><Loader /></div>) : "Sign Up"}
                    </button>
                </form>
                <p className={styles.footer}>
                    Or <Link to="/login" className={styles.link}>SignIn instead</Link>
                </p>
            </div>
        </div>
    );
};

export default SignUp;
