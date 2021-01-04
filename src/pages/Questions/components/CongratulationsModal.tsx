import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import styled from 'styled-components';
import { Colors } from 'utils';
import { RouteNames } from 'utils/helpers';

const RedirectBtn = styled.button`
  border: none;
  background-color: ${Colors.blue};
  border-radius: 25px;
  transition-duration: 0.5s;
  padding: 5px 30px;
  font-family: 'Lemon', cursive;
  color: ${Colors.white};

  &:focus {
    outline: none;
  }

  &:hover {
    box-shadow: 0 0 5px;
    transition-duration: 0.5s;
  }
`;

interface Props {
  history: any;
  onCloseModal: () => void;
  visible: boolean;
}

const Congratulations = ({ history, onCloseModal, visible }: Props) => {
  const { maxQuestions, userName } = useSelector(
    (state: RootState) => state.app,
  );

  const handleClick = () => {
    history.push(RouteNames.result);
    onCloseModal();
  };

  return (
    <Modal show={visible}>
      <Modal.Body className="d-flex flex-column justify-content-center align-items-center">
        <h3 style={{ color: Colors.green }}>Parabéns {userName}!</h3>
        <p>Você acaba de finalizar as {maxQuestions} questões.</p>
      </Modal.Body>
      <Modal.Footer>
        <RedirectBtn onClick={handleClick}>Ver Resultado</RedirectBtn>
      </Modal.Footer>
    </Modal>
  );
};

export default Congratulations;
