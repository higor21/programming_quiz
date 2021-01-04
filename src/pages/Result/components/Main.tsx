import { Card } from 'components';
import { Pie } from 'react-chartjs-2';
import React from 'react';
import { Colors } from 'utils';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import 'chartjs-plugin-datalabels';
import { secToHHMMSS } from 'utils/helpers';

import ClockImg from 'assets/images/clock-icon.png';
import styled from 'styled-components';

const ClockContainer = styled.div`
  & > span {
    font-family: 'Lemon', cursive;
    color: ${Colors.blue};
    &.legend {
      font-family: unset;
      font-size: 14px;
      color: ${Colors.darkGray};
    }
  }
`;

const CardHeader = styled.span`
  display: block;
  border-bottom: 1px solid ${Colors.green};
`;

const MainInfo = styled.div`
  display: grid;
  grid-template-columns: 70% 30%;
  height: 250px;
`;

const Main = () => {
  const { result, maxQuestions, startTime, endTime, userName } = useSelector(
    (state: RootState) => state.app,
  );

  const rightQsNumber = () => result.filter(r => r.wasRight).length;
  const emptyQsNumber = () => result.filter(r => !r.wasAnswered).length;
  const wrongQsNumber = () =>
    result.filter(r => r.wasAnswered && !r.wasRight).length;

  const datalabels = {
    display: true,
    anchor: 'center',
    clamp: true,
    color: Colors.white,
    font: {
      size: 15,
      weight: 'bold',
      family: 'Montserrat',
    },
    formatter: (value: any) => {
      const percentage = `${((value * 100) / maxQuestions).toFixed(2)}%`;
      return percentage;
    },
  };

  return (
    <Card>
      <CardHeader>
        Resultados de <strong>{userName}</strong>
      </CardHeader>
      <MainInfo>
        <div className="d-flex flex-column align-items-center justify-content-center">
          <Pie
            data={{
              labels: ['Acertos', 'Erros', 'Em Branco'],
              datasets: [
                {
                  datalabels,
                  data: [rightQsNumber(), wrongQsNumber(), emptyQsNumber()],
                  backgroundColor: [Colors.green, Colors.red, Colors.darkGray],
                },
              ],
            }}
          />
        </div>
        <ClockContainer className="d-flex flex-column align-items-center justify-content-center">
          <img src={ClockImg} width={100} alt="clock" />
          <span className="clock">
            {secToHHMMSS((endTime - startTime) / 1000.0)}
          </span>
          <span className="mt-3 legend text-center">
            Tempo usado para finalizar o teste
          </span>
        </ClockContainer>
      </MainInfo>
    </Card>
  );
};

export default Main;
