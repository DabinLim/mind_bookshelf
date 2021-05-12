import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import styled from 'styled-components'
import {api as communityActions} from '../../redux/modules/community'


const CardUpdateModal = (props) => {
  const dispatch = useDispatch()
  const answerInfo = useSelector((state) => state.community.card_detail);

  return(
    <React.Fragment>
        <Component onClick={()=> {props.setUpdateModal(false)}} />
        <UpdateComponent>
          <ModalHeader>
            {props.nickname} <ModalHeaderSpan>님의 답변</ModalHeaderSpan>
          </ModalHeader>
          <ModalButtonContainer>
            <ModalSubmitBtn onClick={() =>{
              props.setAnswer(answerInfo.answerContents)
              props.setUpdateAnswer(true);
              props.setUpdateModal(false);
            }} >
              수정하기
            </ModalSubmitBtn>
            <ModalSubmitBtn
              onClick={() => {
                console.log(props.answerId, props.questionId)
                dispatch(communityActions.deleteAnswerAX(props.answerId, props.questionId))
                props.close()
              }}
            >
              삭제하기
            </ModalSubmitBtn>
          </ModalButtonContainer>
        </UpdateComponent>
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
  z-index: 140;
`

const UpdateComponent = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 400px;
  height: 250px;
  transform: translate(-50%, -50%);
  background-color: white;
  z-index: 150;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`

const ModalHeader = styled.div`
  margin-top: 30px;
  font-weight: 600;
  font-size: 18px;
`
const ModalHeaderSpan = styled.span`
  color: #999;
  font-size: 17px;
`

const ModalButtonContainer = styled.div`
  box-sizing: border-box; 
  width: 50%;
  margin-bottom: 10px;
`
const ModalSubmitBtn = styled.button`
  width: 100%;
  background-color: #303685;
  border: none;
  outline: none;
  padding: 10px 0;
  cursor: pointer;
  font-weight: 600;
  font-size: 15px;
  color: white;
  border-radius: 4px;
  &:hover {
    opacity: 0.7;
  }
  margin-bottom: 20px;
`

export default CardUpdateModal