import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteContactByName } from '../../contactsApi/contactsApi';
import { ContactListContainer, ContactListItem, DeleteButton } from './ContactList.styled';

function ContactList() {
  const contacts = useSelector((state) => state.contacts.items);
  const filter = useSelector((state) => state.contacts.filter);
  const dispatch = useDispatch();

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleDelete = async (name) => {
    if (name) {
      try {
        await dispatch(deleteContactByName(name)).unwrap();
        console.log(`Contact with name ${name} has been deleted.`);
      } catch (error) {
        console.error(`Error deleting contact: ${error.message}`);
      }
    } else {
      console.error('Invalid contact name');
    }
  };

  return (
    <ContactListContainer>
      {filteredContacts.length === 0 ? (
        <p>No contacts found.</p>
      ) : (
        <ul>
          {filteredContacts.map((contact) => (
            <ContactListItem key={contact.id}>
              {contact.name}: {contact.number}
              <DeleteButton onClick={() => handleDelete(contact.name)}>Delete</DeleteButton>
            </ContactListItem>
          ))}
        </ul>
      )}
    </ContactListContainer>
  );
}

export default ContactList;
