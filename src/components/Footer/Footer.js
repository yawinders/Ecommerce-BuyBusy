import React from "react";
import { FaHome, FaShoppingCart, FaSignOutAlt, FaListAlt } from "react-icons/fa";
import { AiFillFacebook, AiFillTwitterCircle, AiFillInstagram } from "react-icons/ai";
import styles from "./Footer.module.css"; // Import the CSS module

const Footer = () => {
    return (
        <footer className={styles.footer}>
            {/* Quick Links Section */}
            <div className={styles.links}>
                <a href="/home" className={styles.link}>
                    <FaHome className={styles.icon} />
                    Home
                </a>
                <a href="/orders" className={styles.link}>
                    <FaListAlt className={styles.icon} />
                    My Orders
                </a>
                <a href="/cart" className={styles.link}>
                    <FaShoppingCart className={styles.icon} />
                    Cart
                </a>
                <a href="/logout" className={styles.link}>
                    <FaSignOutAlt className={styles.icon} />
                    Logout
                </a>
            </div>

            {/* Social Media Section */}
            <div className={styles.social}>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                    <AiFillFacebook className={styles.socialIcon} />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                    <AiFillTwitterCircle className={styles.socialIcon} />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                    <AiFillInstagram className={styles.socialIcon} />
                </a>
            </div>

            {/* Branding Section */}
            <div className={styles.branding}>
                <p>&copy; 2024 BuyBusy. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
