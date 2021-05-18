import React from 'react';
import styled from 'styled-components'

const UnfollowConfirmModal = () => {

  return(
    <React.Fragment>
      <Background/>
      <Container>

      </Container>
    </React.Fragment>
  )
}

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  opacity: 0.4;
  height: 100vh;
  width: 100vw;
  background-color: black;
  z-index: 80;
`

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 240px;
  height: 200px;
  transform: translate(-50%, -50%);
  background: #FFFFFF;
  z-index: 81;
`

export default UnfollowConfirmModal