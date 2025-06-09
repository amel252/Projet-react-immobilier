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
        signInSucces: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        // échoué
        signInFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
    },
});
export const { signInStart, signInSucces, signInFailure } = userSlice.actions;
export default userSlice.reducer;
