import React from "react";
import styled from "styled-components";

import PastAnswer from "./PastAnswer";

const CardBack = (props) => {
  return (
    <>
      <CardFrame>
        <AnswerList>
          <PastAnswer />
          <PastAnswer />
          <PastAnswer />
          <PastAnswer />
        </AnswerList>
        <GotoSubmit onClick={props.onClick}>답변하기</GotoSubmit>
      </CardFrame>
    </>
  );
};

const CardFrame = styled.div`
  width: 500px;
  height: 500px;
  border-radius: 24px;
  padding: 16px 24px;
  background: #c4c4c4;
  text-align: center;
`;

const AnswerList = styled.div`
  width: 100%;
  height: 400px;
  margin-bottom: 20px;
  overflow-y: scroll;
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

const GotoSubmit = styled.button`
  font-size: 16px;
  padding: 6px 14px;
  background: #ececec;
  border-radius: 24px;
  cursor: pointer;
`;

export default CardBack;
