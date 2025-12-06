import deviceReducer from "@/device/slices";
import storage from "redux-persist/lib/storage";
import sidebarReducer from "@/shared/slices/sidebar";
import subscriptionReducer from "@/subscription/slices";

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const devicePersistConfig = {
  key: "devices",
  storage,
};

const sidebarPersistConfig = {
  key: "sidebar",
  storage,
};

const subscriptionPersistConfig = {
  key: "subscription",
  storage,
};

const persistedRootReducer = combineReducers({
  device: persistReducer(devicePersistConfig, deviceReducer),
  sidebar: persistReducer(sidebarPersistConfig, sidebarReducer),
  subscription: persistReducer(subscriptionPersistConfig, subscriptionReducer),
});
export const store = configureStore({
  reducer: persistedRootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
