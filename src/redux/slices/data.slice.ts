// redux/slices/data.slice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface DataState {
  postedData: any | null;
  storyData: any | null;
}

const initialState: DataState = {
  postedData: null,
  storyData:  null
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setPostedData: (state, action: PayloadAction<any>) => {
      state.postedData = action.payload;
    },
    clearPostedData: (state) => {
      state.postedData = null;
    },
    setStoryData: (state, action: PayloadAction<any>) => {  // New action to set storyData
      state.storyData = action.payload;
    },
    clearStoryData: (state) => {  // New action to clear storyData
      state.storyData = null;
    },
  },
});

export const { setPostedData, clearPostedData, setStoryData, clearStoryData } = dataSlice.actions;
export const selectPostedData = (state: RootState) => state.data.postedData;
export const selectStoryData = (state: RootState) => state.data.storyData;  


export default dataSlice.reducer;
