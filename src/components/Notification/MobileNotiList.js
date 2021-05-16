import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import MobileNoti from "./MobileNoti";

const MobileNotiList = (props) => {
  const noti_list = useSelector((state) => state.noti.noti_list);
  return (
    <>
      <NotiListFrame>
        {noti_list?.map((n, idx) => {
          return <MobileNoti key={idx} type="notiList" {...n} setCardModal={props.setCardModal} />;
        })}
      </NotiListFrame>
    </>
  );
};

const NotiListFrame = styled.div`
  width: 100%;
`;

export default MobileNotiList;