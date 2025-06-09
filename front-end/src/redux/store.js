import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import useReducer from "./user/userSlice.js";

// combiner mes reducers :
const rootReducer = combineReducers({ user: useReducer });
// configuration de persist :
const persistConfig = {
    key: "root",
    storage,
    version: 1,
};
// persist reducers
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persistor = persistStore(store);
