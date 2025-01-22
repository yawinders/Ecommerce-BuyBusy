import React, { useState } from 'react'
import styles from './UploadPicModal.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { authSelector } from '../../redux/reducers/authReducer';
import { uploadProfilePic, userProfileActions } from '../../redux/reducers/userProfileReducer';
import { toast } from 'react-toastify';

const UploadPicModal = ({ toggelUploadPicModal }) => {
    const [profilePic, setProfilePic] = useState(null)
    const [previewUrl, setPreviewUrl] = useState(null);
    // const { profilePicUrl } = useSelector(userProfileSelector)
    // console.log(profilePicUrl);
    const [cloudImage, setCloudImage] = useState("")

    const { user } = useSelector(authSelector)
    const dispatch = useDispatch();

    const handleFileChange = (e) => {
        const pics = e.target.files[0];
        if (pics === undefined) {
            toast.error("Please Select an Image")
        }
        if (pics.type === "image/jpeg" || pics.type === "image/png") {
            const data = new FormData();
            data.append("file", pics)
            data.append("upload_preset", "buy-busy")

            fetch("https://api.cloudinary.com/v1_1/deuein9wj/image/upload", {
                method: "post",
                body: data,
            }).then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    setCloudImage(data.url)

                })


        }
        // const file = e.target.files[0];
        // if (file) {
        //     setProfilePic(file)
        //     const fileUrl = URL.createObjectURL(file);
        //     setPreviewUrl(fileUrl);



        //     const reader = new FileReader();
        //     reader.onloadend = () => {

        //         const base64Imagee = reader.result;
        //         setBase64Image(base64Imagee)
        //         console.log("Base64 Image: ", base64Image);


        //     };
        //     reader.readAsDataURL(file);
        // }
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
        if (!cloudImage) {
            alert("Must Selelct Something")
            return
        }
        // if (cloudImage) {
        //     dispatch(userProfileActions.setProfilePic(cloudImage))
        // }
        dispatch(uploadProfilePic(cloudImage, user.uid))
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