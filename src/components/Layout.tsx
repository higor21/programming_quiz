import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
`

interface Props {
  
}

const Layout:React.FC<Props> = ({children}) => {
  return (
    <Wrapper className="d-flex align-items-center justify-content-center">
      {children}
    </Wrapper>
  )
}

export default Layout
