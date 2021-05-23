import React from 'react'
import styled from 'styled-components' 
import {useDispatch, useSelector} from 'react-redux'
import { api as commentActions } from "../../redux/modules/comment";
import {editFriendCommentInfo} from "../../redux/modules/friends";
import swal from 'sweetalert';


const DeleteCommentComfirm = (props) => {
  const dispatch = useDispatch()
  const answerInfo = useSelector((state) => state.community.card_detail);
  const currentLocation = useSelector(state => state.router.location.pathname);
  const is_login = useSelector(state => state.user.is_login);


  const deleteComment = () => {
    if (!is_login) {
        swal({
          title: "좋아요 누르기 실패",
          text: "로그인 후 이용 가능한 서비스입니다.",
          icon: "error",
        });
        props.setDeleteComment(false)
        return;
      }
    dispatch(
      commentActions.deleteCommentAX(
        props.commentId,
        answerInfo?.questionId,
        answerInfo?.answerId
      )
    );
    if (currentLocation === "/friends") {
      dispatch(editFriendCommentInfo({_id: answerInfo?.answerId, decision: "unadd"}))
    }
    props.setDeleteComment(false)
  };

  return(
    <React.Fragment>
      <Background onClick={() => {props.setDeleteComment(false)}} />
      <WithdrawalContainer>
        <Head>댓글을 삭제하시겠습니까?</Head>
        <ButtonContainer>
          <Button 
            onClick={deleteComment}
            style={{color:"#EB5959", borderBottom: '0.5px solid #D3D4D3'}} 
          >삭제</Button>
          <Button onClick={() => {props.setDeleteComment(false)}} >취소</Button>
        </ButtonContainer>
      </WithdrawalContainer>
    </React.Fragment>
  )


}

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  opacity: 0.4;
  height: 100%;
  width: 100%;
  background-color: black;
  z-index: 350;
`;

const WithdrawalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 240px;
  height: 200px;
  transform: translate(-50%, -50%);
  background: #FFFFFF;
  z-index: 360;
`
const Head = styled.div`
  height: 106px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align:center;
  font: normal normal medium 14px/20px Noto Sans CJK KR  ;
  border-bottom: 0.5px solid #D3D4D3;
`

const ButtonContainer = styled.div`
  height: 94px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Button = styled.div`
  width: 100%;
  height: 47px;
  display: flex;
  align-items: center;
  justify-content: center;
  font: normal normal normal 14px/20px Noto Sans CJK KR;
  cursor: pointer;
`

export default DeleteCommentComfirm 