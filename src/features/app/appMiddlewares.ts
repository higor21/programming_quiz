import { AppDispatch } from 'store/store';
import { AppService } from 'services';
import { appLoading, appError, setData, setResult } from 'features/app/appSlice';
import { QResultParams, UserResultParams } from './appTypes';

const appSrv = new AppService();

export const fetchQuestions = (pageSize: number) => async (dispatch: AppDispatch) => {
  try {
    dispatch(appLoading(true));
    const data: any = await appSrv.fetchQuestions({ pageSize });
    dispatch(setData(data?.slice()?.sort((_a: any, _b: any) => 0.5 - Math.random())));
    dispatch(appLoading(false));
  } catch (err) {
    dispatch(appError(err));
    dispatch(appLoading(false));
  }
};

// eslint-disable-next-line max-len
export const updateResult = (id: number | string, body: QResultParams) => async (dispatch: AppDispatch) => {
  try {
    dispatch(appLoading(true));
    await appSrv.updateQuestion(id, body);
    dispatch(appLoading(false));
  } catch (err) {
    dispatch(appError(err));
    dispatch(appLoading(false));
  }
};

export const getResult = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(appLoading(true));
    const data = await appSrv.getResult();
    dispatch(setResult(data));
    dispatch(appLoading(false));
  } catch (err) {
    dispatch(appError(err));
    dispatch(appLoading(false));
  }
};

export const addResult = (body: UserResultParams) => async (dispatch: AppDispatch) => {
  try {
    await appSrv.addResult(body);
  } catch (err) {
    dispatch(appError(err));
    dispatch(appLoading(false));
  }
};
