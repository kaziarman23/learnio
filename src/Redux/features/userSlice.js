import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import auth from "../../Firebase/Firebase.Config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

const initialState = {
  userName: "",
  userEmail: "",
  userPhoto: "",
  isLoading: true,
  isError: false,
  error: "",
};

// creating user
export const createUser = createAsyncThunk(
  "userSlice/createUser",
  async ({ userName, userPhoto, userEmail, userPassword }) => {
    const data = await createUserWithEmailAndPassword(
      auth,
      userEmail,
      userPassword
    );
    await updateProfile(auth.currentUser, {
      displayName: userName,
      photoURL: userPhoto,
    });
    console.log(data);

    return {
      userName: data.user.displayName,
      userPhoto: data.user.photoURL,
      userEmail: data.user.email,
    };
  }
);

// login user
export const loginUser = createAsyncThunk(
  "userSlice/loginUser",
  async ({ userEmail, userPassword }) => {
    const data = await signInWithEmailAndPassword(
      auth,
      userEmail,
      userPassword
    );
    console.log(data);

    return {
      userName: data.user.displayName,
      userPhoto: data.user.photoURL,
      userEmail: data.user.email,
    };
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.userName = payload.userName;
      state.userPhoto = payload.userPhoto;
      state.userEmail = payload.userEmail;
    },
    toggleLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    logoutUser: (state) => {
      state.userName = "";
      state.userPhoto = "";
      state.userEmail = "";
    },
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.userName = "";
        state.userPhoto = "";
        state.userEmail = "";
        state.isLoading = true;
        state.isError = false;
        state.error = "";
      })
      .addCase(createUser.fulfilled, (state, { payload }) => {
        state.userName = payload.userName;
        state.userPhoto = payload.userPhoto;
        state.userEmail = payload.userEmail;
        state.isLoading = false;
        state.isError = false;
        state.error = false;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.userName = "";
        state.userPhoto = "";
        state.userEmail = "";
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      });
  },
});

export const { setUser, toggleLoading, logoutUser } = userSlice.actions;

export default userSlice.reducer;
