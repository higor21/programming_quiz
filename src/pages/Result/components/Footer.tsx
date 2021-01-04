import React, { useState } from 'react';
import { RouteNames } from 'utils/helpers';
import styled from 'styled-components';
import { Colors } from 'utils';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { addResult } from 'features/app/appMiddlewares';

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

const Footer: React.FC<Props> = ({ history }) => {
  const dispatch = useDispatch();
  const { result, userName: user } = useSelector(
    (state: RootState) => state.app,
  );
  const [disableSubmitBtn, setDisableSubmitBtn] = useState(false);

  const handleSubmitResult = () => {
    setDisableSubmitBtn(true);
    dispatch(
      addResult({
        user,
        result,
      }),
    );
  };

  return (
    <BtnsWrapper className="d-flex justify-content-around align-items-center mb-3">
      <Btn
        color={Colors.veryLightBlue}
        onClick={() => history.push(RouteNames.configuration)}
      >
        Refazer Teste
      </Btn>
      <Btn onClick={handleSubmitResult} disabled={disableSubmitBtn}>
        Salvar Resultado
      </Btn>
    </BtnsWrapper>
  );
};

export default Footer;
