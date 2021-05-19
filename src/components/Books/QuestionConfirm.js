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
          등록하시는 질문은<br/> 
          삭제와 수정이 불가능해요.<br/>
          질문이 제대로 작성되었는지 확인해주세요!
        </Info>
        <BtnBox>
          <ConfirmBtn
            onClick={() => {
              dispatch(booksActions.addQuest(props.topic, props.question))
              props.setModalVisible(false)
          }}>
            <span>확인</span>
          </ConfirmBtn>
          <ConfirmBtn 
            onClick={()=>{props.setConfirmModal(false)}} 
            style={{color:"#BEBEBE"}}
          >
            <span>취소</span> 
          </ConfirmBtn>
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
  transform: translate(-50%, -50%);
  background-color: white;
  z-index: 102;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 500px){
    width: 250px;
    height: 302px;
  };
`
const Question = styled.div`
  margin: 30px 20px 0 20px;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  @media (max-width: 500px){
    font: normal normal bold 13px/19px Noto Sans CJK KR;
  };
`
const Info = styled.div`
  line-height: 1.6;
  font: normal normal normal 12px/18px Noto Sans CJK KR;
  text-align: center;
`

const BtnBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const ConfirmBtn = styled.div`
display: flex;
align-items: center;
justify-content: center;
font-size: 15px;
cursor: pointer;
text-align: center;
border-top: 0.5px solid #D3D4D3;
width: 100%;
height: 53px;
margin: auto;
@media (max-width: 500px){
  font: normal normal normal 14px/20px Noto Sans CJK KR;
};
`
export default QuestionConfirm

