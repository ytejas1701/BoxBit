import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const createBit = createAsyncThunk(
    'bit/createBit',
    async ({token, data})=>{
        const response = await fetch(process.env.REACT_APP_BACKEND_URL+'/bit/', {
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization':'Bearer '+token
            },
            body:data,
        });
        const responseObject = await response.json();
        return responseObject;
    }
)

const fetchBitById = createAsyncThunk(
    'bit/fetchBitById',
    async ({token, bitId})=>{
        try{
            const response = await fetch(process.env.REACT_APP_BACKEND_URL+'/bit/'+bitId, {
                method:'GET',
                headers:{
                    'Authorization':'Bearer '+token
                },
            });
            
            if(response.ok){
                const responseObject = await response.json();
                return responseObject;
            }else throw new Error("This bit does not exist.");
        }catch(error){}
    }
)

const fetchBits = createAsyncThunk(
    'bit/fetchBits',
    async ({token, boxId, filter})=>{
        const bits = await fetch(process.env.REACT_APP_BACKEND_URL+'/box/'+ boxId + '/bit?filter='+filter, {
                method:'GET',
                headers:{
                    'Authorization':'Bearer '+ token
                },
            });
            const bitsObject = await bits.json();
            return bitsObject;
    }
)

const fetchBitsOfUser = createAsyncThunk(
    'bit/fetchBitsOfUser',
    async ({token, userId, filter})=>{
        const bits = await fetch(process.env.REACT_APP_BACKEND_URL+'/user/'+ userId + '/bit?filter=' + filter, {
                method:'GET',
                headers:{
                    'Authorization':'Bearer '+ token
                },
            });
            const bitsObject = await bits.json();
            return bitsObject;
    }
)

const BitSlice = createSlice({
    name:'Bit',
    initialState:{bits:[], bit:{}},
    reducers:{

    },
    extraReducers:(builder)=>{
        builder.addCase(fetchBits.fulfilled, (state, {payload})=>{
            state.bits = payload;
        });
        builder.addCase(fetchBitById.fulfilled, (state, {payload})=>{
            state.bit = payload;
        });
        builder.addCase(createBit.fulfilled, ()=>{});
        builder.addCase(fetchBitsOfUser.fulfilled, ()=>{});
    }
});

export default BitSlice;
export {fetchBits, fetchBitById, createBit, fetchBitsOfUser};