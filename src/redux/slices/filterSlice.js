import { createSlice } from '@reduxjs/toolkit';
import { act } from 'react-dom/test-utils';

const initialState = {
  categoryId: 0,
  currentPage: 1,
  sort: {
    name: 'популярности',
    sortProperty: 'rating'
  }
};

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategotyId(state, action){
      state.categoryId = action.payload
    },
    setSort(state, action){
      state.sort = action.payload
    },
    setCurrentPage(state, action){
      state.currentPage = action.payload
    },
    setFilters(state, action){
      state.sort = action.payload.sort
      state.currentPage = Number(action.payload.currentPage)
      state.categoryId = Number(action.payload.categoryId)
    }
  },
});

// Action creators are generated for each case reducer function
export const { setCategotyId, setSort, setCurrentPage, setCurrentSort, setFilters } = filterSlice.actions;

export default filterSlice.reducer; 
