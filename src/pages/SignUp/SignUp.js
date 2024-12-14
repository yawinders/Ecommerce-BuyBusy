import React, { useState } from 'react';
import styles from './SignUp.module.css'; // Import CSS module
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { actions } from '../../redux/reducers/authReducer';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { auth, db } from '../../firebaseConfig';

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            //saving user details tofirebase db

            await setDoc(doc(db, 'users', userCredential.user.uid), {
                name,
                email,
                uid: userCredential.user.uid
            });

            dispatch(actions.login({ name, email, uid: userCredential.user.uid }));
            toast.success("User Register Successfully")
            navigate('/')
        } catch (error) {
            console.log(error)
            toast.error("Already Registered")

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
                        Sign Up
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
