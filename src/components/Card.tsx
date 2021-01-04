import React, { HTMLAttributes } from 'react';
import styled from 'styled-components';
import { Colors } from 'utils';

const CardWrapper = styled.div<{ disabled?: boolean }>`
  border-radius: 15px;
  padding: 20px;
  background-color: ${Colors.white};
  width: 600px;
  display: ${props => (props.disabled ? 'none' : 'block')};
`;

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: any;
  show?: boolean;
}

const Card = ({ children, show = true, ...divProps }: Props) => (
  <CardWrapper {...divProps} disabled={!show}>
    {children}
  </CardWrapper>
);

export default Card;
