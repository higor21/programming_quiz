import React, { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';
import { Colors } from 'utils';
import { BsPlay } from 'react-icons/bs';

const Btn = styled.button<{ allowed: boolean }>`
  border-radius: 25px;
  border: none;
  background: ${props => (props.allowed ? Colors.green : Colors.gray)};
  color: ${Colors.white};
  font-size: 25px;
  padding: 0.5rem 1.5rem;
  font-weight: 500;
  transition-duration: 0.5s;

  &:focus {
    outline: none;
  }

  &:hover {
    box-shadow: ${props =>
      !props.allowed ? 'none' : `0 0 10px ${Colors.green}`};
    transform: translate(20px, 0);
    transition-duration: 0.5s;
  }
`;

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

const StartBtn: React.FC<Props> = ({ ...btnProps }) => {
  const { disabled } = btnProps;

  return (
    <Btn
      allowed={!disabled}
      className="d-flex align-items-center"
      {...btnProps}
    >
      <span className="mr-3">Iniciar</span>
      <BsPlay size={40} color={Colors.white} />
    </Btn>
  );
};

export default StartBtn;
