import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// import { contactsSlice } from './contactsSlice';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: [],
  },

  reducers: {
    create: (state, { payload }) => {
      state.contacts.push(payload);
    },
    del: (state, { payload }) => {
      return state.contacts.filter(({ id }) => id !== payload);
    },
  },
});

const persistConfigContacts = {
  key: 'contacts',
  storage,
};

export const persistedContactsReducer = persistReducer(
  persistConfigContacts,
  contactsSlice.reducer
);

export const { create, del } = contactsSlice.actions;
