import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchContacts = createAsyncThunk('contacts/fetchAll', async () => {
  const response = await axios.get('https://64fef25bf8b9eeca9e295429.mockapi.io/contacts/api/rc/');
  return response.data;
});

export const deleteContactByName = createAsyncThunk(
  'contacts/deleteContactByName',
  async (name) => {
    if (!name) {
      throw new Error('Invalid contact name');
    }
    return name;
  }
);

const initialState = {
  items: [],
  isLoading: false,
  error: null,
  filter: '',
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact: (state, action) => {
      state.items.push(action.payload);
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(deleteContactByName.fulfilled, (state, action) => {
        state.items = state.items.filter((contact) => contact.name !== action.payload);
      });
  },
});

export const { addContact, setFilter } = contactsSlice.actions;

export default contactsSlice.reducer;
