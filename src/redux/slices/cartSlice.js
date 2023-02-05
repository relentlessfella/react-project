import { createSlice } from '@reduxjs/toolkit';
import { act } from 'react-dom/test-utils';

const initialState = {
  totalPrice: 0,
  items: [],
};

export const filterSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action){
      state.items.push(action.payload);
    },
    removeItem(state, action){
        state.items.push(action.payload);
    },
    addItem(state, action){
        state.items.push(action.payload);
      },
  },
});

// Action creators are generated for each case reducer function
export const { setCategotyId, setSort, setCurrentPage, setCurrentSort, setFilters } = filterSlice.actions;

export default filterSlice.reducer; 
