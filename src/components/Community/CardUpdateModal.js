import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import styled from 'styled-components'


const CardUpdateModal = (props) => {
  const answerInfo = useSelector((state) => state.community.card_detail);

  return(
    <React.Fragment>
        {/* <Background onClick={()=>{props.setUpdateModal(false)}} /> */}
        <UpdateComponent>
          <ModalButtonContainer>
              <ModalSubmitBtn onClick={() =>{
                props.setAnswer(answerInfo.answerContents)
                props.setUpdateAnswer(true);
                props.setUpdateModal(false);
              }} >
                수정
              </ModalSubmitBtn>
              <ModalSubmitBtn
                onClick={() => {
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

const Background = styled.div`
  position: fixed;
  top: 0;
  left:0;
  opacity: 0.4;
  height: 100vh;
  width: 100vw;
  background-color: black;
  z-index: 149;
`

const UpdateComponent = styled.div`
  position: absolute;
  top: 40px;
  left: 0px;
  width: 100px;
  background-color: white;
  z-index: 150;
  box-shadow: 0px 0px 14px #0000001A;
`

const ModalButtonContainer = styled.div`
  box-sizing: border-box; 
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const ModalSubmitBox = styled.div`
  display: flex;
  align-items: center;
`
const SubmitDot = styled.div`
  width: 10px;
  height: 8px;
  border-radius: 10px;
  background: #C3CAFF;
  margin: 0;
  margin-right: 5px;
  padding: 0;
`


const ModalSubmitBtn = styled.button`
  width: 100%;
  border: none;
  outline: none;
  padding: 10px 0;
  font-size: 15px;
  color: black;
  cursor: pointer;
  background: transparent;
  border-radius: 4px;
  &:hover{
    font-weight: 600;
  }
`

export default CardUpdateModal