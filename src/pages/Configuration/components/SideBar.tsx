import { Input } from 'components';
import React, { HTMLAttributes } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setMaxQuestions,
  setLevel,
  setNumAttempts,
  setPlayerName,
} from 'features/app/appSlice';
import { RootState } from 'store/store';
import styled from 'styled-components';
import { Colors } from 'utils';
import { range } from 'utils/helpers';

export const MAX_QUESTIONS = 250;
export const MIN_QUESTIONS = 1;
export const MAX_ATTEMPTS = 3;
export const MIN_ATTEMPTS = 1;

const SideBarContainer = styled.div`
  & > .ipts {
    border-left: 3px solid ${Colors.green};
    & > * {
      margin: 10px 0;
    }
  }
`;

const Label = styled.h5`
  color: ${Colors.lightBlue};
  font-weight: bold;
`;

interface Props extends HTMLAttributes<HTMLDivElement> {}

const SideBar: React.FC<Props> = ({ ...divProps }) => {
  const dispatch = useDispatch();
  const { nAttempts, maxQuestions, userName } = useSelector(
    (state: RootState) => state.app,
  );

  const IptWidth = '240px';

  const handleMaxQuestions = ({ target: { value } }: any) => {
    if (range(MIN_QUESTIONS, MAX_QUESTIONS).includes(parseInt(value, 10))) {
      dispatch(setMaxQuestions(value));
    }
  };

  const handleNAttempts = ({ target: { value } }: any) => {
    if (range(MIN_ATTEMPTS, MAX_ATTEMPTS).includes(parseInt(value, 10))) {
      dispatch(setNumAttempts(value));
    }
  };

  return (
    <SideBarContainer className="d-flex flex-column" {...divProps}>
      <Label className="mb-4 align-self-left">Configurações Iniciais</Label>
      <div className="pl-4 ipts">
        <Input
          style={{ minWidth: IptWidth }}
          label="Número de Questões"
          placeholder="No máximo 250 questões"
          type="number"
          onChange={handleMaxQuestions}
          value={maxQuestions || ''}
          min={MIN_QUESTIONS}
          max={MAX_QUESTIONS}
        />
        <Input
          style={{ minWidth: IptWidth }}
          label="Número de Tentativas"
          placeholder="No máximo 3 tentativas"
          type="number"
          onChange={handleNAttempts}
          value={nAttempts || ''}
          min={MIN_ATTEMPTS}
          max={MAX_ATTEMPTS}
        />
        <Input
          style={{ minWidth: IptWidth }}
          label="Nome do Aluno"
          placeholder="informe um nome qualquer"
          type="text"
          onChange={({ target: { value } }) => dispatch(setPlayerName(value))}
          value={userName || ''}
        />
      </div>
    </SideBarContainer>
  );
};

export default SideBar;
