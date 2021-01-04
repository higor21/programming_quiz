import React, { InputHTMLAttributes } from 'react';
import styled from 'styled-components';
import { Colors } from 'utils';

const Ipt = styled.input`
  border-radius: 25px;
  border: none;
  padding: 0.5rem 1rem;
  color: ${Colors.darkGray};
  font-weight: bold;

  &:focus {
    outline: none;
  }
`;

const Label = styled.label`
  color: ${Colors.lightBlue};
  font-size: 14px;
  font-weight: 500;
`;

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input: React.FC<Props> = ({ label, ...inputProps }) => (
  <div className="d-flex flex-column">
    {label && <Label className="mb-0">{label}</Label>}
    <Ipt {...inputProps} />
  </div>
);

export default Input;
