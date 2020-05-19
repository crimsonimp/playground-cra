import { createSlice } from '@reduxjs/toolkit';

export const listSlice = createSlice({
  name: 'list',
  initialState: [],
  reducers: {
    ADD: (state, { payload }) => {
      console.log('ADD', payload);
      const newState = state.filter(item => item.id !== payload.id);
      state = [...newState, payload];
    },
    REMOVE: (state, { payload }) => {
      console.log('REMOVE', payload);
      const newState = state.filter(item => item.id !== payload.id);
      state = newState;
    }
  }
});

export default listSlice.reducer;