// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import analyticsReducer from './slices/AnalyticsSlice';

const store = configureStore({
    reducer: {
        analytics: analyticsReducer,
    },
});

export {store};
