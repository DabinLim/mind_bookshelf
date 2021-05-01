import React from "react";
import styled from "styled-components"

const Noti = (props) => {
    return (<><NotiFrame>
        <NotiProfileInfo>
          <NotiProfile>프사<NotiProfile/>
          <NotiProfileName>닉넴</NotiProfileName>
        </NotiProfileInfo>
        <NotiContent>알림내용</NotiContent>
      </NotiFrame></>)
}

const NotiFrame = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
    border: 1px solid #ececec;
    border-radius: 12px;
`;

const NotiProfileInfo = styled.div`
  display: flex;
  align-items: center;
`;

const NotiProfile = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: gray;
  :hover {
    cursor: pointer;
  }
`;

const NotiProfileName = styled.span`
  margin-left: 8px;
  font-weight: bold;
`;

const NotiContent = styled.p`
  margin: 0 0 0 8px;
`;


export default Noti;