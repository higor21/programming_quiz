import { Layout } from 'components';
import { clear, setTimeOut } from 'features/app/appSlice';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { RouteNames } from 'utils/helpers';
import { Footer, Main, Table } from './components';

interface Props {
  history: any;
}

const ResultPage = ({ history }: Props) => {
  const dispatch = useDispatch();
  const { result } = useSelector((state: RootState) => state.app);

  if (!result.length) history.push(RouteNames.configuration);

  useEffect(() => {
    dispatch(setTimeOut(new Date()));
    return () => {
      dispatch(clear());
    };
  }, []);

  return (
    <Layout>
      <Main />
      <Table />
      <Footer history={history} />
    </Layout>
  );
};

export default ResultPage;
