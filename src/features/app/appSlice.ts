import { createSlice } from '@reduxjs/toolkit';
import { QResultParams } from './appTypes';

interface IState {
  userName?: string;
  loading: boolean;
  maxQuestions: number;
  data: any[];
  result: QResultParams[];
  level?: 'basico' | 'medio' | 'dificil' | null;
  nAttempts: 1 | 2 | 3;
  startTime: any;
  endTime: any;
  error: any;
}

const initialState: IState = {
  userName: 'Anônimo',
  loading: false,
  nAttempts: 1,
  data: [],
  result: [],
  maxQuestions: 40,
  level: null,
  startTime: null,
  endTime: null,
  error: null,
};

const appSlice = createSlice({
  initialState,
  name: 'constants',
  reducers: {
    appLoading: (state, { payload = true }): IState => ({
      ...state,
      loading: payload,
    }),
    setNumAttempts: (state, { payload }): IState => ({
      ...state,
      nAttempts: payload,
    }),
    setMaxQuestions: (state, { payload }): IState => ({
      ...state,
      maxQuestions: payload,
    }),
    setTimeIn: (state, { payload }): IState => ({
      ...state,
      startTime: payload,
    }),
    setTimeOut: (state, { payload }): IState => ({
      ...state,
      endTime: payload,
    }),
    setLevel: (state, { payload }): IState => ({ ...state, level: payload }),
    appError: (state, { payload }): IState => ({ ...state, error: payload }),
    setData: (state, { payload }): IState => ({ ...state, data: payload }),
    setPlayerName: (state, { payload }): IState => ({
      ...state,
      userName: payload,
    }),
    setResult: (state, { payload }): IState => ({ ...state, result: payload }),
    clear: (): IState => initialState,
  },
});

const { actions, reducer } = appSlice;
export const {
  appLoading,
  setPlayerName,
  appError,
  setLevel,
  setMaxQuestions,
  setNumAttempts,
  setData,
  setResult,
  setTimeIn,
  setTimeOut,
  clear,
} = actions;
export default reducer;
