import { createSlice } from "@reduxjs/toolkit";

// on initialise l'état de l'utilisateur
export const initialState = {
    currentUser: null,
    error: null,
    loading: false,
};

// creation   de slice:
// Signin :
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
        // update le profile  :
        updateUserStart: (state) => {
            state.loading = true;
        },
        updateUserSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        updateUserFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        // supprimer le compte
        deleteUserStart: (state) => {
            state.loading = true;
        },
        deleteUserSuccess: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = null;
        },
        deleteUserFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        // déconnexion  compte
        signOutUserStart: (state) => {
            state.loading = true;
        },

        signOutUserSuccess: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = null;
        },
        signOutUserFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        //
    },
});
export const {
    signInStart,
    signInSuccess,
    signInFailure,
    updateUserFailure,
    updateUserSuccess,
    updateUserStart,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailure,
    signOutUserStart,
    signOutUserSuccess,
    signOutUserFailure,
} = userSlice.actions;
export default userSlice.reducer;
