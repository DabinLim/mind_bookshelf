import React from 'react'
import {useSelector} from 'react-redux'
import styled from 'styled-components'


const CardUpdateModal = (props) => {
  const answerInfo = useSelector((state) => state.community.card_detail);

  return(
    <React.Fragment>
        <UpdateComponent detail={props.detail}>
          <ModalButtonContainer>
              <ModalSubmitBtn onClick={() =>{
                props.setAnswer(answerInfo.answerContents)
                props.setUpdateAnswer(true);
                props.setUpdateModal(false);
              }} 
                style={{borderBottom: '0.5px solid #D3D4D3'}}
              >
                수정
              </ModalSubmitBtn>
              <ModalSubmitBtn
                onClick={() => {
                  console.log('삭제')
                  props.setUpdateModal(false);
                  props.setCancelModal(true);
                }}
              >
                삭제
              </ModalSubmitBtn>
          </ModalButtonContainer>
        </UpdateComponent>
      </React.Fragment>
  )
}

const UpdateComponent = styled.div`
  position: absolute;
  top: 30px;
  right: 0px;
  width: 164px;
  height: 98px;
  background-color: white;
  z-index: 500;
  box-shadow: 0px 0px 20px #00000026;
  ${props=>props.detail === 'book' ? `@media (max-width: 750px) {
  top: 110px;
  right: 20px;
  width: 120px;
  height: 80px;
  }` : `@media (max-width: 750px) {
  top: 25px;
  right: 0px;
  width: 120px;
  height: 80px;
  }`}
`

const ModalButtonContainer = styled.div`
  box-sizing: border-box; 
  display: flex;
  height:100%;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
`

const ModalSubmitBtn = styled.button`
  width: 100%;
  border: none;
  outline: none;
  padding: 10px 0;
  height: 100%;
  font-size: 15px;
  color: black;
  cursor: pointer;
  align-self: center;
  background: transparent;
  border-radius: 4px;
  &:hover{
    font-weight: 600;
  }
  @media (max-width: 500px) {
    font: normal normal medium 14px/20px Noto Sans CJK KR;
    height: 40px;
  }
`

export default CardUpdateModal