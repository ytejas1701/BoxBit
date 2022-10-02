import { createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
    name:'Auth',
    initialState:{
        token:localStorage.getItem('token'),
        username:localStorage.getItem('username'),
        userId:localStorage.getItem('userId')},
    reducers:{
        login:(state, action)=>{
            state.token = action.payload.token;
            localStorage.setItem('token', action.payload.token);
            state.username = action.payload.username;
            localStorage.setItem('username', action.payload.username);
            state.userId = action.payload._id;
            localStorage.setItem('userId', action.payload._id);
        },
        logout:(state)=>{
            state.token = null;
            localStorage.removeItem('token');
            state.username = null;
            localStorage.removeItem('username');
            state.userId = null;
            localStorage.removeItem('userId');
        }

    }
});

export default AuthSlice;
export const { login, logout } = AuthSlice.actions;