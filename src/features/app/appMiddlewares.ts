import { AppDispatch } from 'store/store';
import { AppService } from 'services';
import { appLoading, appError } from 'features/app/appSlice';

const appSrv = new AppService();

export const fetchConstants = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(appLoading(true));
    // const { data } = await appSrv.fetchConstants();
    // dispatch(setUpConstants(data));
  } catch (err) {
    // show toast error
    dispatch(appError(err));
    dispatch(appLoading(false));
  }
};
