import React from 'react' 
import styled from 'styled-components'
import {useDispatch} from 'react-redux'
import {api as communityActions} from '../../redux/modules/community'
import {history} from '../../redux/configStore'

const CancelConfirm = (props) => {
  const dispatch = useDispatch()
  return(
    <React.Fragment>
      <Background onClick={()=>{props.setCancelModal(false)}} />
      <ConfirmBox>
        <Question>
          게시물을 삭제하시겠어요?
        </Question>
        <BtnBox>
          <ConfirmBtn style={{color:"#EB5959", borderBottom: '0.5px solid #D3D4D3'}}
            onClick={()=>{
              if(props.type === "mobile"){
                history.goBack();
                dispatch(communityActions.deleteAnswerAX(props.answerId, props.questionId))
              }else{
                props.close();
                dispatch(communityActions.deleteAnswerAX(props.answerId, props.questionId))
              }
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
  height: 100%;
  width: 100%;
  background-color: black;
  z-index: 151;
  @media (max-width: 750px) {
    }
`

const ConfirmBox = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 240px;
  height: 200px;
  transform: translate(-50%, -50%);
  background-color: white;
  z-index: 152;
`
const Question = styled.div`
  height: 106px;
  display: flex;
  align-items: center;
  justify-content: center;
  font: normal normal bold 14px/20px Noto Sans CJK KR  ;
  border-bottom: 0.5px solid #D3D4D3;
`

const BtnBox = styled.div`
height: 94px;
display: flex;
flex-direction: column;
align-items: center;
`

const ConfirmBtn = styled.div`
  width: 100%;
  height: 47px;
  display: flex;
  align-items: center;
  justify-content: center;
  font: normal normal normal 14px/20px Noto Sans CJK KR;
`

export default CancelConfirm