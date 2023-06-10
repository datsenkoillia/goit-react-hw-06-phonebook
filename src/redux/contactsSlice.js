import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: [],
    filter: '',
  },

  reducers: {
    create: (state, { payload }) => {
      state.contacts.push(payload);
    },
    del: (state, { payload }) => {
      state.contacts = state.contacts.filter(({ id }) => id !== payload);
    },
    filtered: (state, { payload }) => {
      state.filter = payload.toLowerCase();
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

export const { create, del, filtered } = contactsSlice.actions;
export const contactsSelector = state => state.contacts.contacts;
export const filterSelector = state => state.contacts.filter;