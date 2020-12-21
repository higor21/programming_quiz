import { createSlice } from '@reduxjs/toolkit';

interface IState {
  loading: boolean;
  error: any;
}

const initialState: IState = {
  loading: false,
  error: null,
};

const appSlice = createSlice({
  initialState,
  name: 'constants',
  reducers: {
    appLoading: (state, { payload = true }) => ({
      ...state,
      loading: payload,
    }),
    appError: (state, { payload }) => ({ ...state, error: payload }),
  },
});

const { actions, reducer } = appSlice;
export const { appLoading, appError } = actions;
export default reducer;
