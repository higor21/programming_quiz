import React from 'react';
import Modal from 'react-bootstrap/Modal';
import styled from 'styled-components';
import { Colors } from 'utils';

const ModalHeader = styled(Modal.Header)`
  & > h3 {
    font-size: 1.1rem;
    color: ${Colors.darkBlue};
  }
  & > button {
    & > span[aria-hidden='true'] {
      color: ${Colors.red};
    }
    &:focus {
      outline: none;
    }
  }
`;

const Code = styled.div`
  & code {
    color: ${Colors.blue};
  }
`;

interface Props {
  code?: string | undefined;
  onCloseModal: () => void;
  visible: boolean;
}

const CodeModal = ({ code, onCloseModal, visible }: Props) => (
  <Modal show={visible} onHide={onCloseModal}>
    <ModalHeader
      className="d-flex justify-content-between align-items-center"
      closeButton
    >
      <h3>Código da Questão 03</h3>
    </ModalHeader>
    <Modal.Body>
      <Code dangerouslySetInnerHTML={{ __html: code || '' }} />
    </Modal.Body>
  </Modal>
);

export default CodeModal;
