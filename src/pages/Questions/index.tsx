import { Layout } from 'components';
import { setResult } from 'features/app/appSlice';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { DEFAULT_COUNT_BY_PAGE } from 'services/appService';
import { RootState } from 'store/store';
import { RouteNames } from 'utils/helpers';
import { Footer, HList, MainBtns } from './components';
import Congratulations from './components/CongratulationsModal';

interface Props extends RouteComponentProps {
  history: any;
}

const QuestionsPage = ({ history }: Props) => {
  const { maxQuestions, nAttempts, result, data } = useSelector(
    (state: RootState) => state.app,
  );

  const [visible, setVisible] = useState(false);

  const answeredQuestionsNumber = () =>
    result.filter(r => r.nAttemptsToHit === nAttempts || r.wasRight).length;

  useEffect(() => {
    // eslint-disable-next-line eqeqeq
    if (answeredQuestionsNumber() == maxQuestions) setVisible(true);
  }, [result]);

  if (!result.length) history.push(RouteNames.configuration);

  return (
    <Layout>
      <Congratulations
        history={history}
        visible={visible}
        onCloseModal={() => setVisible(false)}
      />
      <MainBtns history={history} />
      <HList list={data || []} />
      <Footer />
    </Layout>
  );
};

export default React.memo(QuestionsPage);
