import { combineReducers, configureStore } from "@reduxjs/toolkit";
import jobReducer from "./slices/jobSlice.jsx";
import userReducer from "./slices/userSlice.jsx"
// import applicationReducer from "./slices/applicationSlice.jsx"
// import updateProfileReducer from "./slices/upadteProfileSlice.jsx"
// import themeReducer from "./slices/darktheme.jsx"
import { persistReducer, persistStore } from "redux-persist"; 
import storage from "redux-persist/lib/storage"; 





const persistConfig = {
    key: "root",
    version: 1,
    storage, // ✅ Use storage here
};


const rootreducer=combineReducers({
        user:userReducer,
        job:jobReducer,
})



const persistedReducer = persistReducer(persistConfig,rootreducer);




const appStore = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // ✅ Ignore non-serializable warnings for redux-persist
        }),
});


const persistor = persistStore(appStore);



export { appStore, persistor };
