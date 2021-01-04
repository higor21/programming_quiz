import { QResultParams } from 'features/app/appTypes';
import React, { useState } from 'react';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import styled from 'styled-components';
import { Colors } from 'utils';
import Question from './Question';

const DEFAULT_QUESTION_N = 1;

const Btn = styled.button`
  border: none;
  background: none;
  transition-duration: 0.3s;

  &:focus {
    outline: none;
  }
  ${props =>
    !props.disabled &&
    `
      &:hover svg {
        filter: drop-shadow(0 0 3px ${Colors.green});
        transition-duration: 0.3s;
      }
  `}
`;

interface Props {
  list: any[];
}

const HList = ({ list: qList }: Props) => {
  const [selectedQ, setSelectedQ] = useState(DEFAULT_QUESTION_N);

  const arrow = (side: 'left' | 'right', isDisabled = false) => {
    const styleConfig = {
      size: 50,
      color: isDisabled ? Colors.gray : Colors.green,
    };
    return side === 'left' ? (
      <BsChevronLeft {...styleConfig} />
    ) : (
      <BsChevronRight {...styleConfig} />
    );
  };

  return (
    <div className="d-flex align-items-center">
      <Btn
        onClick={() => setSelectedQ(selectedQ - 1)}
        disabled={selectedQ === 1}
      >
        {arrow('left', selectedQ === 1)}
      </Btn>
      {qList.map((q, idx) => (
        <Question
          key={q.idQuestion}
          showQ={idx + 1 === selectedQ}
          qNumber={idx + 1}
          {...q}
        />
      ))}
      <Btn
        onClick={() => setSelectedQ(selectedQ + 1)}
        disabled={selectedQ === qList.length}
      >
        {arrow('right', selectedQ === qList.length)}
      </Btn>
    </div>
  );
};

export default HList;
