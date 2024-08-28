import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const fetchBoxByName = createAsyncThunk(
    'box/fetchBoxByName',
    async ({token, boxName})=>{
        try{
        const responseBox = await fetch(process.env.REACT_APP_BACKEND_URL+'/box/'+boxName, {
            method:'GET',
            headers:{
                'Authorization':'Bearer ' + token
            },
        });
        if(responseBox.ok){
            const responseBoxObject = await responseBox.json();
            return responseBoxObject;
        }else throw new Error("This Box does not exist.");}catch(error){}
    }
)

const createBox = createAsyncThunk(
    'box/createBox',
    async ({token, data})=>{
        try{
            const response = await fetch(process.env.REACT_APP_BACKEND_URL+'/box/', {
                method:'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization':'Bearer '+ token
                },
                body:data,
            });
            if(response.ok){
                const responseObject = await response.json();
                return responseObject;
            }else throw new Error();;
        }catch(error){}
    }
)

const BoxSlice = createSlice({
    name:'Box',
    initialState:{box:{}},
    extraReducers:(builder)=>{
        builder.addCase(createBox.fulfilled, ()=>{});
        builder.addCase(fetchBoxByName.fulfilled, (state, {payload})=>{
            state.box = payload;
        });
    }
});

export default BoxSlice;
export {createBox, fetchBoxByName};