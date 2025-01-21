import React, { useEffect, useState } from "react";
import styles from "./ProfileCard.module.css";
import UploadPicModal from "./UploadPicModal";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfilePic, userProfileSelector } from "../../redux/reducers/userProfileReducer";
import { authSelector } from "../../redux/reducers/authReducer";

const ProfileCard = ({ name = "Guest User", location = "Unknown Location" }) => {
    const [showUploadPicModal, setShowUploadPicModal] = useState(false);
    const { profilePicUrl, loading } = useSelector(userProfileSelector);
    const { user } = useSelector(authSelector);
    const dispatch = useDispatch();

    const defaultProfileImage = "https://via.placeholder.com/150";
    console.log(profilePicUrl)

    useEffect(() => {
        if (user) {
            dispatch(fetchProfilePic(user.uid));
        }
    }, [user, dispatch]);

    const profileImageSrc = user
        ? loading
            ? defaultProfileImage // Show placeholder while loading
            : profilePicUrl || defaultProfileImage // Show profile pic or fallback to placeholder
        : defaultProfileImage;

    return (
        <>
            <div className={styles.profileCard}>
                <div className={styles.headerBackground}></div>
                <div className={styles.profileImageContainer}>
                    <img
                        src={profileImageSrc || defaultProfileImage}
                        alt={`${user?.name || "Guest User"}'s profile`}
                        className={styles.profileImage}
                        onError={(e) => {
                            e.target.onerror = null; // Prevent infinite fallback loop
                            e.target.src = defaultProfileImage; // Fallback to placeholder
                        }}
                    />
                    {user && (
                        <div
                            onClick={() => setShowUploadPicModal(true)}
                            className={styles.addIcon}
                        >
                            +
                        </div>
                    )}
                </div>
                <div className={styles.profileDetails}>
                    <h3 className={styles.name}>
                        {user?.name || "Guest User"}
                    </h3>
                    {/* <p className={styles.location}>{location}</p> */}
                </div>
            </div>
            {showUploadPicModal && <UploadPicModal toggelUploadPicModal={() => setShowUploadPicModal(false)} />}
        </>
    );
};

export default ProfileCard;
