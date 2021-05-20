import React from "react";
import styled from "styled-components";
import { time } from "../../shared/Time";
import { useDispatch } from "react-redux";
import { api as commentActions } from "../../redux/modules/comment";
import { api as communityActions } from "../../redux/modules/community";
import { history } from "../../redux/configStore";

const Noti = (props) => {
  const dispatch = useDispatch();

  let eventType = "";
  let text = "";
  let time_data = time(`20${props.time}`);
  if (props.eventType === "like") {
    eventType = "좋아요";
    text = "회원님의 글에 좋아요를 눌렀습니다.";
  } else if (props.eventType === "comment") {
    eventType = "댓글";
    text = "회원님의 글에 댓글을 남겼습니다.";
  } else if (props.eventType === "tag") {
    eventType = "태그";
    text = "회원님을 언급했습니다."
  } else if (props.eventType ==="follow"){
    eventType = "팔로우";
    text = "회원님을 팔로우하기 시작했습니다."
  } else {
    eventType = "커스텀";
    text = "회원님이 만든 질문에 답변을 남겼습니다."
  }

  const eventAction = () => {
    if(eventType === "팔로우"){
      history.push(`/others/${props.cardId}`);
    } else if(eventType ==="커스텀"){
      history.push(`/community/${props.cardId}`);
    } else{
      if(window.innerWidth <= 750){
        history.push(`/carddetail/${props.cardId}`)
        return
      }
      const type = "noti";
      props.close();
      dispatch(communityActions.getCardDetail(props.cardId, type));
      dispatch(commentActions.getCommentAX(props.cardId));
      props.setCardModal(true);
    }

  };

  if(props.type === "notiList"){
    return (
      <>
        {/* {eventType === "커스텀" ? (
          <NotiFrame
            onClick={() => {
              history.push(`/community/${props.cardId}`);
            }}
          >
            <div style={{display:'flex', alignItems: "center", cursor: 'pointer' }} >
              <NotiProfileInfo>
                <NotiProfile src={props.recentProfileImg}></NotiProfile>
                {props.countOthers >= 1? 
                <NotiProfileName><span style={{fontWeight: '600'}}>{props.recentNickname}님 외 {props.countOthers}명</span>이 {text}</NotiProfileName>
                :
                <NotiProfileName><span style={{fontWeight: '600'}}>{props.recentNickname}</span>님이 {text}</NotiProfileName>
                }
              </NotiProfileInfo>
            </div>
            <NotiTime>{time_data}</NotiTime>
          </NotiFrame>
        ) : ( */}
          <NotiFrame onClick={eventAction}>
            <div style={{display:'flex', alignItems: "center", cursor: 'pointer' }} >
              <NotiProfileInfo>
                <NotiProfile src={props.recentProfileImg}></NotiProfile>
                {props.countOthers >= 1? 
                <NotiProfileName><span style={{fontWeight: '600'}}>{props.recentNickname}님 외 {props.countOthers}명</span>이 {text}</NotiProfileName>
                :
                <NotiProfileName><span style={{fontWeight: '600'}}>{props.recentNickname}</span>님이 {text}</NotiProfileName>
                }
              </NotiProfileInfo>
            </div>
            <NotiTime>{time_data}</NotiTime>
          </NotiFrame>
        {/* )} */}
      </>
    );
  } else{
    return (
      <>
        {/* {eventType === "커스텀" ? (
          <NotiFrame
            onClick={() => {
              history.push(`/community/${props.cardId}`);
            }}
          >
            <div style={{display:'flex', alignItems: "center", cursor: 'pointer' }} >
              <NotiProfileInfo>
                <NotiProfile src={props.recentProfileImg}></NotiProfile>
                <NotiProfileName><span style={{fontWeight: '600'}}>{props.recentNickname}</span>님이 {text}</NotiProfileName>
              </NotiProfileInfo>
            </div>
            <NotiTime>{time_data}</NotiTime>
          </NotiFrame>
        ) : ( */}
          <NotiFrame onClick={eventAction}>
            <div style={{display:'flex', alignItems: "center", cursor: 'pointer' }} >
              <NotiProfileInfo>
                <NotiProfile src={props.recentProfileImg}></NotiProfile>
                <NotiProfileName><span style={{fontWeight: '600'}}>{props.recentNickname}</span>님이 {text}</NotiProfileName>
              </NotiProfileInfo>
            </div>
            <NotiTime>{time_data}</NotiTime>
          </NotiFrame>
        {/* )} */}
      </>
    );
  }
};

const NotiFrame = styled.div`
  display: flex;
  align-items: start;
  width: 100%;
  justify-content: space-between;
  padding: 10px 20px;
  
`;

const NotiProfileInfo = styled.div`
  display: flex;
  align-items: center;
`;

const NotiProfile = styled.img`
  width: 35px;
  height: 35px;
  object-fit: cover;
  border-radius: 50%;
  background: gray;
`;

const NotiProfileName = styled.span`
  margin-left: 8px;
  font-size: 14px;
  width: 250px;
  &:hover{
    font-weight: bold;
  }
  // @media (max-width: 500px){
    
  // }
`;

const NotiContent = styled.p`
  margin: 0 0 0 0px;
  font-size: 14px;
  @media (max-width: 500px){
    font-size: 13px;
  }
`;
const NotiTime = styled.span`
  margin-left: 4px;
  font-size: 10px;
`;

export default Noti;
