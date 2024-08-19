import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const fetchComments = createAsyncThunk(
    'comment/fetchComments',
    async ({token, bitId, filter})=>{
        const comments = await fetch(process.env.BACKEND_URL+'/bit/'+ bitId + '/comment?filter='+filter, {
                method:'GET',
                headers:{
                    'Authorization':'Bearer '+ token
                },
            });
            const commentsObject = await comments.json();
            return commentsObject;
    });

const CommentSlice = createSlice({
    name:'Comment',
    initialState:{comments:[]},
    extraReducers:(builder)=>{
        builder.addCase(fetchComments.fulfilled, (state, {payload})=>{
            state.comments = payload;
        });
    }
});

export default CommentSlice;
export {fetchComments};