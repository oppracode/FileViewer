
import { createSlice } from '@reduxjs/toolkit';

const loadingSlice = createSlice({
  name: 'loading',
  initialState: { value: false },
  reducers: {
    setLoading: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setLoading } = loadingSlice.actions;
export const selectLoading = (state) => state.loading.value;

export default loadingSlice;
