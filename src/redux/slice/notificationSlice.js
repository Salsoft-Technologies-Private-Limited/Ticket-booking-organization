import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  count: 0,
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    incrementCount: (state) => {
      state.count += 1;
    },
    decrementCount: (state) => {
      state.count -= 1;
    },
    resetCount: (state) => {
      state.count = 0;
    },
    setCount: (state, action) => {
      state.count = action.payload;
    },
    
  }
});

export const { incrementCount, decrementCount, resetCount, setCount } = notificationsSlice.actions;

export default notificationsSlice.reducer;
