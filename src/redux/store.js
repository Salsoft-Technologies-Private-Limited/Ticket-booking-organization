import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import userReducer from './slice/authSlice'
import cartReducer from './slice/cartSlice'
import paymentReducer from './slice/afterPaymentSlice';
import notificationSlice from './slice/notificationSlice';

const rootReducer = combineReducers({
  user: userReducer,
  cart : cartReducer,
  data : paymentReducer,
  notification : notificationSlice  
})

const persistConfig = {
  key: 'ticket_booking_organization',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer
})

export const persistor = persistStore(store)