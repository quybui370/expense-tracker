import { configureStore } from '@reduxjs/toolkit';
import transactionReducer from 'src/features/transactions/transactionSlice';

export const store = configureStore({
  reducer: {
    transaction: transactionReducer,
  },
});
