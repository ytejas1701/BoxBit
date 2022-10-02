import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./AuthSlice";
import BitSlice from "./BitSlice";
import BoxSlice from "./BoxSlice";
import CommentSlice from "./CommentSlice";
import UserSlice from "./UserSlice";

const store = configureStore({
    reducer:{
        Auth: AuthSlice.reducer,
        Bit: BitSlice.reducer,
        Box: BoxSlice.reducer,
        Comment:CommentSlice.reducer,
        User:UserSlice.reducer,
    }
});

export default store;