import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const fetchUser = createAsyncThunk(
    'user/fetchUser',
    async ({token, userId})=>{
        try{const response = await fetch(process.env.REACT_APP_BACKEND_URL+'/user/'+ userId, {
            method:'GET',
            headers:{
                'Authorization':'Bearer ' + token
            },
        });
        if(response.ok){
            const responseObject = await response.json();
            return responseObject;
        }else throw new Error();
    }catch(error){console.log(error)}
    }
)

const UserSlice = createSlice({
    name:'User',
    initialState:{user:{}},
    extraReducers:(builder)=>{
        builder.addCase(fetchUser.fulfilled, (state, {payload})=>{state.user=[payload]});
    }
});

export default UserSlice;
export {fetchUser};