import React from "react";
import styled from "styled-components";

const PastAnswer = (props) => {
  return (
    <CardFrame>
      <p>날짜</p>
      <p>답변내용</p>
    </CardFrame>
  );
};

const CardFrame = styled.div`
  width: 80%;
  border-radius: 24px;
  padding: 16px 24px;
  margin-bottom: 10px;
  background: #ececec;
`;

export default PastAnswer;
