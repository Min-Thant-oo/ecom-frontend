import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import amazonReducer from "./amazonSlice";
import { ThunkMiddleware } from "@reduxjs/toolkit";
import thunk from 'redux-thunk';
import { applyMiddleware } from "@reduxjs/toolkit";

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}

const persistedReducer = persistReducer(persistConfig, amazonReducer)


// The Global Store Setup
export const store = configureStore({
  reducer: {amazon: persistedReducer},
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(ThunkMiddleware),
  // applyMiddleware: [thunk]

});

export let persistor = persistStore(store)
