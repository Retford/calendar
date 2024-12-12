import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    isDateModalOpen: false,
  },
  reducers: {
    handleOpenDateModal: (state) => {
      state.isDateModalOpen = true;
    },
    handleCloseDateModal: (state) => {
      state.isDateModalOpen = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { handleOpenDateModal, handleCloseDateModal } = uiSlice.actions;
