import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    currentUser:null,
    loading:false,
    error:null
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        signInStart:(state)=>{
            state.loading = true;
        },
        signInSucess:(state,action)=>{
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        signInFailure:(state,action)=>{
            state.error = action.payload;
            state.loading = false;
        },
        updateUserStart:(state)=>{
            state.loading = true;
        },
        updateUserSuccess:(state,action)=>{
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        updateUserFailure:(state,action)=>{
            state.error = action.payload;
            state.loading = false;
        },
        deleteUserSet:(state)=>{
            state.loading = false;
        },
        deleteUserSuccess:(state)=>{
            state.currentUser = null;
            state.loading = false;
            state.error = null;
        },
        deleteUserFailure:(state,action)=>{
            state.error = action.payload;
            state.loading = false;
        },
        signOutSet:(state)=>{
            state.loading = false;
        },
        signOutSuccess:(state)=>{
            state.currentUser = null;
            state.loading = false;
            state.error = null;
        },
        signOutFailure:(state,action)=>{
            state.error = action.payload;
            state.loading = false;
        },
    }
})

export const {
    signInStart,
    signInSucess,
    signInFailure,
    updateUserStart,
    updateUserSuccess,
    updateUserFailure,
    deleteUserSet,
    deleteUserSuccess,
    deleteUserFailure,
    signOutSet,
    signOutSuccess,
    signOutFailure,
} = userSlice.actions;

export default userSlice.reducer;