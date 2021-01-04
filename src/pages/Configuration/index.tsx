import React, { useEffect, useState } from 'react';
import { Layout } from 'components';
import { RouteComponentProps } from 'react-router-dom';
import { RouteNames } from 'utils/helpers';
import { setResult, setTimeIn } from 'features/app/appSlice';
import { fetchQuestions } from 'features/app/appMiddlewares';
import { DEFAULT_COUNT_BY_PAGE } from 'services/appService';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { SideBar, StartBtn } from './components';

interface Props extends RouteComponentProps {}

const ConfigurationPage: React.FC<Props> = ({ history }) => {
  const dispatch = useDispatch();
  const { maxQuestions, data, loading, nAttempts } = useSelector(
    (state: RootState) => state.app,
  );
  const [isFetchedQuestions, setIsFetchedQuestions] = useState(false);

  const hasConfigured = () => maxQuestions && nAttempts;

  const handleSubmit = () => {
    if (hasConfigured()) {
      dispatch(fetchQuestions(maxQuestions || DEFAULT_COUNT_BY_PAGE));
      setIsFetchedQuestions(true);
    }
  };

  useEffect(() => {
    if (!loading && isFetchedQuestions) {
      dispatch(setTimeIn(new Date()));
      history.push(RouteNames.questions);
    }
  }, [loading]);

  useEffect(() => {
    if (data) {
      dispatch(
        setResult(
          data.map((q, idx) => ({
            idQuestion: q?.id,
            nAttemptsToHit: 0,
            nQuestion: idx + 1,
            wasAnswered: false,
            wasRight: false,
          })),
        ),
      );
    }
  }, [data]);

  return (
    <Layout>
      <div className="d-flex align-items-center">
        <SideBar style={{ marginRight: 100 }} />
        <StartBtn disabled={!hasConfigured()} onClick={handleSubmit} />
      </div>
    </Layout>
  );
};

export default ConfigurationPage;
