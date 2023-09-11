import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from '../../redux/contactsSlice';
import { StyledContactForm } from './ContactForm.styled';

function ContactForm() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const contacts = useSelector((state) => state.contacts.items);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !number) {
      setError('Please fill in all fields.');
      setSuccess('');
      return;
    }

    const existingContact = contacts.find(
      (contact) => contact.name === name || contact.number === number
    );

    if (existingContact) {
      setError('Contact with the same name or number already exists.');
      setSuccess('');
      return;
    }

    const id = Date.now();

    dispatch(addContact({ id, name, number }));
    setName('');
    setNumber('');
    setError('');
    setSuccess('Contact added successfully.');
  };

  return (
    <StyledContactForm onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>
        Phone Number:
        <input
          type="tel"
          name="number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
      </label>
      <button type="submit">Add Contact</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </StyledContactForm>
  );
}

export default ContactForm;
