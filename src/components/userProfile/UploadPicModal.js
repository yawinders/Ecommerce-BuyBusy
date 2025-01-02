import React, { useEffect, useState } from 'react'
import styles from './UploadPicModal.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { authSelector } from '../../redux/reducers/authReducer';
import { uploadProfilePic, userProfileActions, userProfileSelector } from '../../redux/reducers/userProfileReducer';
import { toast } from 'react-toastify';

const UploadPicModal = ({ toggelUploadPicModal }) => {
    const [profilePic, setProfilePic] = useState(null)
    const [previewUrl, setPreviewUrl] = useState(null);
    // const { profilePicUrl } = useSelector(userProfileSelector)
    // console.log(profilePicUrl);

    const { user } = useSelector(authSelector)
    const dispatch = useDispatch();

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfilePic(file)
            const fileUrl = URL.createObjectURL(file);
            setPreviewUrl(fileUrl);
        }
    }

    const handleNegativeClose = (e) => {
        // console.log(e.target.className);
        if (e.target.className === 'UploadPicModal_modal__6X0ze') {
            toggelUploadPicModal()
        }

    }

    const handleUpload = () => {
        if (!user) {
            alert("Please Login to Update Profile")
            return
        }
        if (!profilePic) {
            alert("Must Selelct Something")
            return
        }
        dispatch(uploadProfilePic(previewUrl, user.uid))
        toggelUploadPicModal()
        toast.success("Image Uploaded Successfully")

    }

    const handleDelete = () => {
        // setProfilePic(null)
        dispatch(userProfileActions.setProfilePic(null))
    }
    return (
        <div onClick={handleNegativeClose} className={styles.modal}>
            <div className={styles.innerModal}>
                <button className={styles.Close} onClick={toggelUploadPicModal}>X</button>
                <h2>Upload Profile Picture</h2>
                <input type='file' accept="image/*"
                    onChange={handleFileChange}
                />
                <button onClick={handleUpload}>Upload</button>
                <button onClick={handleDelete}>Delete</button>
                {/* && typeof profilePic === "object" */}
                {profilePic && (<div>
                    <h3>Preview</h3>
                    <img
                        src={previewUrl}
                        alt="Profile"
                        style={{ width: "150px", height: "150px", borderRadius: "50%" }}
                    />
                </div>)
                }
            </div>

        </div>
    )
}

export default UploadPicModal