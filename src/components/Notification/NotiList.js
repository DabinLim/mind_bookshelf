import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import Noti from "./Noti";

const NotiList = (props) => {
  const noti_list = useSelector((state) => state.noti.noti_list);
  return (
    <>
      <NotiListFrame>
        {noti_list?.map((n, idx) => {
          return <Noti key={idx} {...n} type="notiList" setCardModal={props.setCardModal} close={props.close} />;
        })}
      </NotiListFrame>
    </>
  );
};

const NotiListFrame = styled.div`
  width: 100%;
`;

export default NotiList;
