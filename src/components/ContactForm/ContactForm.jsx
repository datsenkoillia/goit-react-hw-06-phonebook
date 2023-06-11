import { useState } from 'react';
import { InputLabel, InputField, SubmitButton, Form } from './styled';

import { nanoid } from 'nanoid';
import { useSelector, useDispatch } from 'react-redux';
import { create, contactsSelector } from 'redux/contactsSlice';

export function ContactForm() {
  const contacts = useSelector(contactsSelector);
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleNameChange = event => {
    setName(event.target.value);
  };

  const handleNumberChange = event => {
    setNumber(event.target.value);
  };

  const resetForm = () => {
    setName('');
    setNumber('');
  };

  const createContact = (name, number) => {
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

  const handleSubmit = e => {
    e.preventDefault();
    createContact(name, number);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <InputLabel>
        Name
        <InputField
          type="text"
          name="name"
          value={name}
          onChange={handleNameChange}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </InputLabel>
      <InputLabel>
        Number
        <InputField
          type="tel"
          name="number"
          value={number}
          onChange={handleNumberChange}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </InputLabel>
      <SubmitButton type="submit">Add contact</SubmitButton>
    </Form>
  );
}
