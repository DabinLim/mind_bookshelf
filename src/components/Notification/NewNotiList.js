import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import Noti from "./Noti";

const NewNotiList = (props) => {
  const new_list = useSelector((state) => state.noti.new_list);
  return (
    <>
      <NotiListFrame>
        {new_list?.length > 0 ? (
          new_list?.map((n, idx) => {
            return <Noti key={idx} {...n} />;
          })
        ) : (
          <No_Noti>알림이 없습니다.</No_Noti>
        )}
      </NotiListFrame>
    </>
  );
};

const NotiListFrame = styled.div`
  width: 100%;
  max-height: 100%;
  overflow: auto;
  ::-webkit-scrollbar {
    width: 12px; /* width of the entire scrollbar */
  }

  ::-webkit-scrollbar-track {
    background: white; /* color of the tracking area */
  }

  ::-webkit-scrollbar-thumb {
    background-color: #d8d9dc; /* color of the scroll thumb */
    border-radius: 20px; /* roundness of the scroll thumb */
  }
`;

const No_Noti = styled.div``;

export default NewNotiList;
