import React from "react";
import styled from "styled-components";
import { time } from "../../shared/Time";
import { useDispatch } from "react-redux";
import { api as commentActions } from "../../redux/modules/comment";
import { api as communityActions } from "../../redux/modules/community";
import { history } from "../../redux/configStore";

const MobileNoti = (props) => {
  const dispatch = useDispatch();

  let eventType = "";
  let time_data = time(`20${props.time}`);
  if (props.eventType === "like") {
    eventType = "좋아요";
  } else if (props.eventType === "comment") {
    eventType = "댓글";
  } else if (props.eventType === "tag") {
    eventType = "태그";
  } else {
    eventType = "커스텀";
  }

  const openCard = () => {
    const type = "noti";
    dispatch(communityActions.getCardDetail(props.cardId, type));
    dispatch(commentActions.getCommentAX(props.cardId));
    props.setCardModal(true);
  };

  return (
    <>
      {eventType === "커스텀" ? (
        <NotiFrame
          onClick={() => {
            history.push(`/community/${props.cardId}`);
          }}
        >
          <NotiProfileInfo>
            <NotiProfile src={props.recentProfileImg}></NotiProfile>
            <NotiProfileName>{props.recentNickname}님</NotiProfileName>
          </NotiProfileInfo>
          <NotiContent>으로부터 {eventType} 알림이 있어요!</NotiContent>
          <NotiTime>{time_data}</NotiTime>
        </NotiFrame>
      ) : (
        <NotiFrame onClick={openCard}>
          <NotiProfileInfo>
            <NotiProfile src={props.recentProfileImg}></NotiProfile>
            <NotiProfileName>{props.recentNickname}님</NotiProfileName>
          </NotiProfileInfo>
          <NotiContent>으로부터 {eventType} 알림이 있어요!</NotiContent>
          <NotiTime>{time_data}</NotiTime>
        </NotiFrame>
      )}
    </>
  );
};

const NotiFrame = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  border: 1px solid #ececec;
  padding: 12px 16px;
  cursor: pointer;
  @media (max-width: 500px){
    padding: 10px 12px;
  }
`;

const NotiProfileInfo = styled.div`
  display: flex;
  align-items: center;
`;

const NotiProfile = styled.img`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: gray;
  :hover {
    cursor: pointer;
  }
`;

const NotiProfileName = styled.span`
  margin-left: 8px;
  font-weight: bold;
  font-size: 14px;
  @media (max-width: 500px){
    font-size: 13px;
  }
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

export default MobileNoti;