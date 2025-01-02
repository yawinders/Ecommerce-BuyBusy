import { createSlice } from "@reduxjs/toolkit";
import { db } from "../../firebaseConfig";
// import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { doc, getDoc, setDoc } from "firebase/firestore";

const userProfileSlice = createSlice({
    name: 'profile',
    initialState: {
        profilePicUrl: null,
        loading: true,
        error: null
    }
    ,
    reducers: {
        setProfilePic(state, action) {
            state.profilePicUrl = action.payload
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setError(state, action) {
            state.error = action.payload;
        },
    }
})


export const uploadProfilePic = (fileUrl, userId) => async (dispatch, getState) => {

    try {
        const fileRef = doc(db, `profilePics/${userId}`)
        await setDoc(fileRef, { profilePicUrl: fileUrl });
        const docSnapshot = await getDoc(fileRef);

        if (docSnapshot.exists()) {
            const url = docSnapshot.data().profilePicUrl;
            dispatch(userProfileActions.setProfilePic(url));

            //closing the modal
            return url

        } else {
            throw new Error("Profile document does not exist.");
        }
    } catch (error) {
        console.error("Failed to upload image:", error);
        dispatch(userProfileActions.setError("Failed to upload image"));
    }
}

export const fetchProfilePic = (userId) => async (dispatch) => {
    dispatch(userProfileActions.setLoading(true)); // Set loading to true before starting the fetch

    try {
        const fileRef = doc(db, `profilePics/${userId}`);
        const docSnapshot = await getDoc(fileRef);

        if (docSnapshot.exists()) {
            const url = docSnapshot.data().profilePicUrl;
            dispatch(userProfileActions.setProfilePic(url));
        } else {
            dispatch(userProfileActions.setProfilePic(null)); // Set null if no profile pic exists
        }
    } catch (error) {
        console.error("Failed to fetch profile picture:", error);
        dispatch(userProfileActions.setProfilePic(null));
    } finally {
        dispatch(userProfileActions.setLoading(false)); // Fetch complete, set loading to false
    }
};


export const userProfileReducer = userProfileSlice.reducer
export const userProfileActions = userProfileSlice.actions

export const userProfileSelector = (state) => state.userProfileReducer;