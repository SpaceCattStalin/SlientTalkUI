// walkthroughSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WalkthroughState {
  canStartWalkthrough: boolean;
}

const initialState: WalkthroughState = { canStartWalkthrough: true };

export const walkthroughSlice = createSlice({
  name: 'walkthrough',
  initialState,
  reducers: {
    setCanStartWalkthrough: (state, action: PayloadAction<boolean>) => {
      state.canStartWalkthrough = action.payload;
    },
  },
});

export const { setCanStartWalkthrough } = walkthroughSlice.actions;
export default walkthroughSlice.reducer;
