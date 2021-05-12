import React from 'react' 
import styled from 'styled-components'
import {useDispatch} from 'react-redux'
import {api as communityActions} from '../../redux/modules/community'

const CancelConfirm = (props) => {
  const dispatch = useDispatch()
  return(
    <React.Fragment>
      <Background onClick={()=>{props.setCancelModal(false)}} />
      <ConfirmBox>
        <Question>
          정말로 삭제하시겠습니까?
        </Question>
        <BtnBox>
          <ConfirmBtn style={{marginRight:"20px"}}
            onClick={()=>{
              props.close();
              dispatch(communityActions.deleteAnswerAX(props.answerId, props.questionId))
            }}
          >
            삭제
          </ConfirmBtn>
          <ConfirmBtn onClick={()=>{props.setCancelModal(false)}} >
            취소
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
  z-index: 151;
`

const ConfirmBox = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width:  300px;
  height: 200px;
  border-radius: 10px;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 30px 30px;
  z-index: 152;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
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

export default CancelConfirm