import React from 'react' 
import styled from 'styled-components'

const CardModal = (props) => {

  return(
    <React.Fragment>
      <Component  onClick={props.close} />
        <ModalComponent>
          {/* 형석님 여기는 예시로 이미지를 넣었어요 마음대로 수정하시면될꺼같아요ㅎㅎ */}
          <ModalImg src="https://t1.daumcdn.net/cfile/tistory/213E554D58E120D71C" />
          <ModalRightContainer>
            형석님 홧팅!
          </ModalRightContainer>
        </ModalComponent>
    </React.Fragment>
  )

}

const Component = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  opacity: 0.4;
  height: 100vh;
  width: 100vw;
  background-color: black;
  z-index: 10;
`

const ModalComponent = styled.div`
  position: fixed;
  width: 950px;
  height: 600px;
  top:50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  z-index: 20;
  display:flex;
  box-shadow: 0 3px 6px rgba(0,0,0,0.12), 0 2px 5px rgba(0,0,0,0.24);
  @media (max-width: 950px){
    width:400px;
  }
  @media (max-width: 400px){
    width: 95%
  }
`

const ModalImg = styled.img`
  width: 550px;
  height: 600px;
  @media (max-width: 950px){
    display:none;
  }
`


const ModalRightContainer = styled.div`
  width: 400px;
  height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-left: 1px solid #EFEFEF;
`


export default CardModal