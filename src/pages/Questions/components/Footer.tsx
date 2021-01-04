import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import styled from 'styled-components';
import { Colors } from 'utils';
import { MIN_ATTEMPTS } from 'pages/Configuration/components/SideBar';

const FooterWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  grid-column-gap: 20px;
  background-color: ${Colors.white};
  border-radius: 15px;
  padding: 15px;
  color: ${Colors.darkBlue};
  font-weight: 500;
  display: grid;
  width: 100%;
  max-width: 750px;

  & .title {
    font-size: 12px;
    margin-bottom: 5px;
  }

  & .number {
    font-size: 18px;
    font-family: Lemon, cursive;
    color: ${Colors.green};
    &.danger {
      color: ${Colors.red};
    }
  }
`;

const Footer = () => {
  const nAttempts = useSelector((state: RootState) => state.app.nAttempts);
  const result = useSelector((state: RootState) => state.app.result);
  const maxQuestions = useSelector(
    (state: RootState) => state.app.maxQuestions,
  );

  const answeredTotalQNumber = () =>
    // eslint-disable-next-line eqeqeq
    result.filter(r => r.nAttemptsToHit == nAttempts || r.wasRight).length;

  const answeredPartialQNumber = () =>
    result.filter(
      // eslint-disable-next-line eqeqeq
      r => r.wasAnswered && r.nAttemptsToHit != nAttempts && !r.wasRight,
    ).length;

  return (
    <FooterWrapper className="my-4">
      <div className="d-flex flex-column align-items-center">
        <span className="title">Nº Tentativas / Questão</span>
        <span className="number">{nAttempts || 0}</span>
      </div>
      <div className="d-flex flex-column align-items-center">
        <span className="title">Totalmente Respondidas</span>
        <span className="number">{answeredTotalQNumber()}</span>
      </div>
      {nAttempts > MIN_ATTEMPTS && (
        <div className="d-flex flex-column align-items-center">
          <span className="title">Parcialmente Respondidas</span>
          <span className={`number ${answeredPartialQNumber() && 'danger'}`}>
            {answeredPartialQNumber()}
          </span>
        </div>
      )}
      <div className="d-flex flex-column align-items-center">
        <span className="title">Total de Questões</span>
        <span className="number">{maxQuestions || 0}</span>
      </div>
    </FooterWrapper>
  );
};

export default Footer;
