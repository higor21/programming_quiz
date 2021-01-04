import React from 'react';
import { RouteNames } from 'utils/helpers';
import styled from 'styled-components';
import { Colors } from 'utils';

const BtnsWrapper = styled.div`
  width: 400px;
`;

const Btn = styled.button`
  border: none;
  background: none;
  font-weight: bold;
  color: ${props => props.color || Colors.green};

  &:focus {
    outline: none;
  }
`;

interface Props {
  history: any;
}

const MainBtns: React.FC<Props> = ({ history }) => (
  <BtnsWrapper className="d-flex justify-content-around align-items-center mb-3">
    <Btn
      color={Colors.red}
      onClick={() => history.push(RouteNames.configuration)}
    >
      Desistir
    </Btn>
    <Btn onClick={() => history.push(RouteNames.result)}>Finalizar</Btn>
  </BtnsWrapper>
);

export default MainBtns;
