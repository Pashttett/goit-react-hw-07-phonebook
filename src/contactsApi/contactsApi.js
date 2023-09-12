import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiUrl = 'https://650058ef18c34dee0cd4c0ee.mockapi.io/contacts';

export const fetchContacts = createAsyncThunk('contacts/fetchAll', async () => {
  const response = await axios.get(apiUrl);
  return response.data;
});

export const deleteContactByName = createAsyncThunk(
  'contacts/deleteContactByName',
  async (name) => {
    if (!name) {
      throw new Error('Invalid contact name');
    }

    try {
      const existingContact = await axios.get(`${apiUrl}`);
      
      if (existingContact.data.length === 0) {
        throw new Error('Contact not found');
      }

      const contactId = existingContact.data[0].id;

      await axios.delete(`${apiUrl}/${contactId}`);

      return name;
    } catch (error) {
      throw error;
    }
  }
);

export const addContactToAPI = createAsyncThunk(
  'contacts/addContactToAPI',
  async (contactData) => {
    try {
      const response = await axios.post(apiUrl, contactData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
