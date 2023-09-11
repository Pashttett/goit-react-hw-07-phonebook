import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFilter } from '../../redux/contactsSlice';

function Filter() {
  const filter = useSelector((state) => state.contacts.filter);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(setFilter(e.target.value));
  };

  return (
    <label>
      Filter contacts by name:
      <input
        type="text"
        value={filter}
        onChange={handleChange}
      />
    </label>
  );
}

export default Filter;
