import { createSlice } from '@reduxjs/toolkit';

const savedLocation = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem("user_location")) : null;

const locationSlice = createSlice({
  name: 'location',
  initialState: {
    currentLocation: savedLocation || {
      address: "Select Location",
      lat: null,
      lng: null,
      pincode: ""
    },
    workingHours: null, 
    isOpen: true, 
    isChecking: true, 
    errorPopup: null, 
    globalError: false, 
  },
  reducers: {
    setLocation: (state, action) => {
      const data = action.payload;
      const { workingHours, isOpen, ...locationData } = data;
      
      state.currentLocation = { ...state.currentLocation, ...locationData };
      if (workingHours) state.workingHours = workingHours;
      if (isOpen !== undefined) state.isOpen = isOpen;
      
      state.isChecking = false;
      state.errorPopup = null;
      state.globalError = false;
      
      localStorage.setItem("user_location", JSON.stringify(state.currentLocation));
    },
    setChecking: (state, action) => {
      state.isChecking = action.payload;
    },
    setErrorPopup: (state, action) => {
      if (typeof action.payload === 'object' && action.payload.workingHours) {
          state.workingHours = action.payload.workingHours;
          state.errorPopup = action.payload.message;
          if (action.payload.isOpen !== undefined) state.isOpen = action.payload.isOpen;
      } else {
          state.errorPopup = action.payload;
      }
      state.isChecking = false;
    },
    clearError: (state) => {
      state.errorPopup = null;
    },
    setGlobalError: (state, action) => {
      state.globalError = action.payload;
      state.isChecking = false; 
    }
  }
});

export const { setLocation, setChecking, setErrorPopup, clearError, setGlobalError } = locationSlice.actions;
export default locationSlice.reducer;