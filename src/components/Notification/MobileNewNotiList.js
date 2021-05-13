import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import MobileNoti from "./MobileNoti";

const MobileNewNotiList = (props) => {
  const new_list = useSelector((state) => state.noti.new_list);
  return (
    <>
      <NotiListFrame>
        {new_list?.map((n, idx) => {
          return <MobileNoti key={idx} {...n} setCardModal={props.setCardModal} />;
        })}
      </NotiListFrame>
    </>
  );
};

const NotiListFrame = styled.div`
  width: 100%;
`;


export default MobileNewNotiList;