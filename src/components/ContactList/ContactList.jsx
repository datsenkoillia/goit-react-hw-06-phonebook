import { ContactElement } from 'components/ContactElement';
import { useSelector, useDispatch } from 'react-redux';
import { del, contactsSelector, filterSelector } from 'redux/contactsSlice';

export const ContactList = () => {
  const contacts = useSelector(contactsSelector);
  const filter = useSelector(filterSelector);
  const dispatch = useDispatch();

  const deleteContact = contactId => {
    dispatch(del(contactId));
  };

  const filteredContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter)
    );
  };

  const contactList = filteredContacts();

  return (
    <ul>
      {contactList.map(({ id, name, number }) => (
        <ContactElement
          key={id}
          id={id}
          name={name}
          number={number}
          deleteContact={deleteContact}
        />
      ))}
    </ul>
  );
};
