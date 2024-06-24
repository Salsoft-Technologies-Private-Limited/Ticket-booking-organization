import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    bookingData : {},
    jumpData : {},
    orderData : {},
    giftData : {},
}

export const userSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    addData: (state, { payload }) => {
      const { type, data } = payload;
      switch (type) {
        case 'BOOKING':
          state.bookingData = data;
          break;
        case 'JUMP':
          state.jumpData = data;
          break;
        case 'ORDER':
          state.orderData = data;
          break;
        case 'GIFT':
          state.giftData = data;
          break;
        default:
          break;
      }
    },
    removeData: (state, { payload }) => {
      const { type } = payload;
      switch (type) {
        case 'booking':
          state.bookingData = {};
          break;
        case 'jump':
          state.jumpData = {};
          break;
        case 'order':
          state.orderData = {};
          break;
        case 'gift':
          state.giftData = {};
          break;
        default:
          break;
      }
    },
  },
  extraReducers: {},
});

// Action creators are generated for each case reducer function
export const { addData, removeData } = userSlice.actions

export default userSlice.reducer