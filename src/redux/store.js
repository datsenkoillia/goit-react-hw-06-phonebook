import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import { persistedContactsReducer } from './contactsSlice';
import { filterReducer } from './filterSlice';

// const reducer = combineReducers({
//   contacts: persistedContactsReducer,
//   filter: filterReducer,
// });

const reducer = {
  contacts: persistedContactsReducer,
  filter: filterReducer,
};

export const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
// console.log(persistor);