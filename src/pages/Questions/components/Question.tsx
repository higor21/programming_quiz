/* eslint-disable react/prop-types */
import { setResult } from 'features/app/appSlice';
import { QResultParams } from 'features/app/appTypes';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AlternativesType } from 'shared/types';
import { RootState } from 'store/store';
import styled from 'styled-components';
import { Colors } from 'utils';
import { BsCodeSlash } from 'react-icons/bs';
import CodeModal from './CodeModal';

const Alt = styled.div`
  & .pretty {
    margin-right: 8px;
  }
`;

const Header = styled.div`
  & > div {
    &.main {
      font-family: Lemon, cursive;
      color: ${Colors.darkBlue};
      & > h1 {
        font-size: 16px;
      }
      & > .cod {
        font-size: 12px;
        color: ${Colors.green};
      }
    }
    &.secondary {
      & > small {
        font-weight: 500;
        color: ${Colors.darkBlue};
        & > span {
          color: ${Colors.blue};
          font-weight: normal;
        }
      }
    }
  }
`;

const Asking = styled.p`
  font-size: 14px;
`;

const Alternatives = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-row-gap: 10px;
  grid-column-gap: 20px;
`;

const QuestionWrapper = styled.div<{ disabled?: boolean }>`
  border-radius: 15px;
  padding: 20px;
  background-color: ${Colors.white};
  width: 600px;
  display: ${props => (props.disabled ? 'none' : 'block')};
`;

const CodeViewBtn = styled.button`
  background: none;
  border: none;
  color: ${Colors.blue};
  font-weight: 500;
  font-size: 12px;
  transition-duration: 0.3s;

  &:focus {
    outline: none;
  }

  &:hover > * {
    filter: drop-shadow(0 0 1px ${Colors.blue});
    transition-duration: 0.3s;
  }
`;
interface Props {
  id: number | string;
  qNumber: number;
  pergunta: string;
  codigo?: string;
  showQ?: boolean;
  correta: string;
  resA: string;
  resB: string;
  resC: string;
  resD: string;
  resE?: string;
  topico: string;
  nivel: string;
}

const Question = ({
  id,
  qNumber,
  showQ,
  topico,
  codigo,
  correta,
  nivel,
  pergunta,
  ...qProps
}: Props) => {
  const dispatch = useDispatch();
  const nAttempts = useSelector((state: RootState) => state.app.nAttempts);
  const result = useSelector((state: RootState) => state.app.result);
  const [visible, setVisible] = useState<boolean>(false);
  const [alternatives, setAlternatives] = useState<AlternativesType | null>(
    null,
  );

  const hasAlreadyHit = (passedAlts = alternatives) => {
    const altPairsArr = (passedAlts && Object.entries(passedAlts)) || [];

    const alreadyHit = altPairsArr.findIndex(
      ([k, v]) => k === correta && v?.wasMarked,
    );
    return alreadyHit !== -1;
  };

  const handleSaveResult = (newAlternatives: any) => {
    const altBoolValuesArr = (
      newAlternatives && Object.values(newAlternatives)
    )?.map((v: any) => v?.wasMarked);
    const updatedQuestion = {
      wasRight: hasAlreadyHit(newAlternatives),
      nAttemptsToHit: altBoolValuesArr?.filter((a: any) => a).length,
      wasAnswered: altBoolValuesArr?.findIndex((a: any) => a) !== -1,
      idQuestion: id,
      nQuestion: qNumber,
    };
    const oldQuestionIndex = result.findIndex(
      (q: QResultParams) => q.idQuestion === id,
    );
    const newResultArr = [...result];
    newResultArr.splice(oldQuestionIndex, 1, updatedQuestion);
    dispatch(setResult(newResultArr));
  };

  const handleChangeAltCkb = (letter: string) => {
    const newValue = {
      ...(alternatives as any | null)[letter],
      wasMarked: true,
    };

    const altValuesArr = (alternatives && Object.values(alternatives)) || [];
    const nAttNotReached =
      altValuesArr.filter(alt => alt?.wasMarked).length < (nAttempts || 1);

    if (nAttNotReached && !hasAlreadyHit()) {
      const newAlternatives = { ...alternatives, [letter]: newValue };
      setAlternatives(newAlternatives);
      handleSaveResult(newAlternatives);
    }
  };

  const Alternative = ({ altLetter, value, isMarked }: any) => (
    <Alt className="d-flex align-items-center">
      <span className="mr-2">{altLetter})</span>
      <div className="pretty p-default p-curve p-thick p-pulse">
        <input
          type="checkbox"
          checked={isMarked}
          onChange={() => handleChangeAltCkb(altLetter)}
        />
        <div
          className={`state p-${
            altLetter === correta ? 'success' : 'danger'
          }-o`}
        >
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label />
        </div>
      </div>
      <span>{value}</span>
    </Alt>
  );

  useEffect(() => {
    const { resA, resB, resC, resD, resE } = qProps;
    setAlternatives({
      A: { text: resA, wasMarked: false },
      B: { text: resB, wasMarked: false },
      C: { text: resC, wasMarked: false },
      D: { text: resD, wasMarked: false },
      E: { text: resE, wasMarked: false },
    });
    return () => setAlternatives(null);
  }, [id]);

  if (!alternatives) return null;

  return (
    <QuestionWrapper disabled={!showQ}>
      <CodeModal
        code={codigo}
        visible={visible}
        onCloseModal={() => setVisible(false)}
      />
      <Header className="d-flex justify-content-between aling-items-start mb-3">
        <div className="main">
          <h1 className="d-inline mr-2">Questão {qNumber}</h1>
          <span className="cod">(cod. {id})</span>
        </div>
        <div className="secondary d-flex flex-column align-items-end">
          <small>
            Tópico: <span>{topico}</span>
          </small>
          <small>
            Nível: <span>{nivel}</span>
          </small>
        </div>
      </Header>
      <Asking className="mb-3">{pergunta}</Asking>
      {codigo && (
        <CodeViewBtn
          className="mb-3 px-0 d-flex align-items-center"
          type="button"
          onClick={() => setVisible(true)}
        >
          <span className="mr-2">Visualizar código</span>
          <BsCodeSlash size={20} color={Colors.blue} />
        </CodeViewBtn>
      )}
      <Alternatives>
        {Object.entries(alternatives).map(([key, value]) => (
          <Alternative
            key={key}
            altLetter={key}
            value={value?.text}
            isMarked={value?.wasMarked}
          />
        ))}
      </Alternatives>
    </QuestionWrapper>
  );
};

export default Question;
