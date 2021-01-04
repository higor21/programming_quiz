import React, { HTMLAttributes } from 'react';
import styled from 'styled-components';
import { Colors } from 'utils';

const Wrapper = styled.div`
  min-height: 100vh;
  background-color: ${Colors.darkBlue};

  & > h1 {
    color: ${Colors.white};
  }
`;

interface Props extends HTMLAttributes<HTMLDivElement> {}

const Layout: React.FC<Props> = ({ children }) => (
  <Wrapper className="d-flex flex-column align-items-center justify-content-center">
    <h1 className="mb-5">Programming Quiz</h1>
    {children}
  </Wrapper>
);

export default Layout;
