import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";

const Question = (props) => {
  const { onClick } = props;

  return (
    <>
      <CardFrame onClick={onClick}>
        <HashTag>#{props.topic}</HashTag>

        <CardContent>{props.contents}</CardContent>
      </CardFrame>
    </>
  );
};

Question.defaultProps = {
  onClick: () => {},
};

const CardFrame = styled.div`
  width: 80%;
  border-radius: 24px;
  padding: 16px 24px;
  margin-bottom: 12px;
  background: #c4c4c4;
`;

const HashTag = styled.span`
  padding: 6px 14px;
  background: #ececec;
  border-radius: 24px;
`;

const CardContent = styled.p`
  margin-top: 20px;
  font-weight: bolder;
`;

export default Question;
