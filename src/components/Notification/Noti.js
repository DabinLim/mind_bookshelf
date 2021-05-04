import React from "react";
import styled from "styled-components";
import { time } from "../../shared/Time";

const Noti = (props) => {
  let eventType = "";
  let time_data = time(`20${props.time}`);
  if (props.eventType === "like") {
    eventType = "좋아요";
  } else if (props.eventType === "comment") {
    eventType = "댓글";
  } else {
    eventType = "커스텀";
  }

  return (
    <NotiFrame>
      <NotiProfileInfo>
        <NotiProfile src={props.recentProfileImg}></NotiProfile>
        <NotiProfileName>{props.recentNickname}님</NotiProfileName>
      </NotiProfileInfo>
      <NotiContent>으로부터 {eventType} 알림이 있어요!</NotiContent>
      <NotiTime>{time_data}</NotiTime>
    </NotiFrame>
  );
};

const NotiFrame = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  border: 1px solid #ececec;
  padding: 12px 16px;
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
  font-size:14px;
`;

const NotiContent = styled.p`
  margin: 0 0 0 0px;
  font-size:14px;
`;
const NotiTime = styled.span`
  margin-left:4px;
  font-size:10px;
`;

export default Noti;
