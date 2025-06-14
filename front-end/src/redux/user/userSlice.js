import { createSlice } from "@reduxjs/toolkit";

// on initialise l'état de l'utilisateur
export const initialState = {
    currentUser: null,
    error: null,
    loading: false,
};

// creation   de slice
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        // si tout se passe bien
        signInStart: (state) => {
            state.loading = true;
        },
        // si ca  passe bien , on revient a l'état initial
        signInSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        // échoué
        signInFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        // update nos données :
        updateUserStart: (state) => {
            state.loading = true;
            state.error = null;
        },

        updateUserSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },

        updateUserFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});
export const {
    signInStart,
    signInSuccess,
    signInFailure,
    updateUserStart,
    updateUserSuccess,
    updateUserFailure,
} = userSlice.actions;
export default userSlice.reducer;
