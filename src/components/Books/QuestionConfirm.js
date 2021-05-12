import React from 'react';
import styled from 'styled-components'
import {useDispatch} from 'react-redux'
import {api as booksActions} from '../../redux/modules/books';

const QuestionConfirm = (props) => {
  const dispatch = useDispatch()
  return(
    <React.Fragment>
      <Background onClick={()=>{props.setConfirmModal(false)}} />
      <ConfirmBox>
        <Question>
          {props.question}
        </Question>
        <Info>
          등록하시는 질문은 <b>삭제 수정</b>이 불가능해요.<br/>
          질문이 제대로 작성되었는지 다시한번 확인해주세요!
        </Info>
        <BtnBox>
          <ConfirmBtn style={{marginRight:"20px"}} 
            onClick={() => {
              dispatch(booksActions.addQuest(props.topic, props.question))
              props.setModalVisible(false)
            }}
          >확인</ConfirmBtn>
          <ConfirmBtn onClick={()=>{props.setConfirmModal(false)}} >취소</ConfirmBtn>
        </BtnBox>
      </ConfirmBox>
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
  z-index: 101;
`

const ConfirmBox = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width:  400px;
  height: 300px;
  border-radius: 10px;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 30px 30px;
  z-index: 102;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 500px){
    width: 90%;
  };
`
const Question = styled.div`
  font-size: 16px;
  font-weight: 600;
`
const Info = styled.div`
  line-height: 1.6;
  font-size:14px;
`

const BtnBox = styled.div`
  display: flex;
`

const ConfirmBtn = styled.div`
font-size: 15px;
cursor: pointer;
text-align: center;
border: 1px solid #707070;
border-radius: 45px;
padding: 5px 0;
width: 73px;
margin: auto;
&:hover{
  border:1px solid #303685;
  background: #303685;
  color: white;
  font-weight: 600;
}
`
export default QuestionConfirm

