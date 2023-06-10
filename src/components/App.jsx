import { ContactForm } from 'components/ContactForm';
import { Filter } from 'components/Filter';
import { ContactList } from 'components/ContactList';
// import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { useSelector, useDispatch } from 'react-redux';
import { create, del, update } from 'redux/contactsSlice';
// import { update } from 'redux/filterSlice';

export function App() {
  const contacts = useSelector(state => state.contacts.contacts);
  const filter = useSelector(state => state.contacts.filter);
  console.log(filter);
  const dispatch = useDispatch();

  const createContact = ({ name, number }, resetForm) => {
    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    const isExistContact = contacts.some(contact => contact.name === name);

    if (isExistContact) {
      alert(`${name} is already in contacts`);
    } else {
      resetForm();
      dispatch(create(newContact));
    }
  };

  const deleteContact = contactId => {
    dispatch(del(contactId));
  };

  const changeFilter = event => {
    dispatch(update(event.target.value));
  };

  const filteredContacts = () => {
    // const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter)
    );
  };

  return (
    <>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={createContact} />

      <h2>Contacts</h2>
      <Filter filter={filter} changeFilter={changeFilter} />
      <ContactList
        // contactList={[contacts]}
        contactList={filteredContacts()}
        deleteContact={deleteContact}
      />
    </>
  );
}
