import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import Noti from "./Noti";

const NewNotiList = (props) => {
  const new_list = useSelector((state) => state.noti.new_list);
  return (
    <>
      <NotiListFrame>
        {new_list?.map((n, idx) => {
          return <Noti key={idx} {...n} setCardModal={props.setCardModal} close={props.close} />;
        })}
      </NotiListFrame>
    </>
  );
};

const NotiListFrame = styled.div`
  width: 100%;
`;

const No_Noti = styled.div``;

export default NewNotiList;
