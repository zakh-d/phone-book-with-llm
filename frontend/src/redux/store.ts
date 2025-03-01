import { configureStore } from "@reduxjs/toolkit";
import { contactsApi } from "../api/contacts-api";
import chatReducer from "./chatSlice";

export const store = configureStore({
    reducer: {
        // contacts: contactsApi.reducer
        [contactsApi.reducerPath]: contactsApi.reducer,
        chat: chatReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(contactsApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;