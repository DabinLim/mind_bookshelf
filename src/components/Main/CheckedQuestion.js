import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { CheckCircleOutlined } from "@ant-design/icons";

const CheckedQuestion = (props) => {
  const { onClick } = props;

  return (
    <>
      <CardFrame onClick={onClick}>
        <CheckMarkBox>
          <HashTag>#{props.topic}</HashTag>
          <CheckMark>
            <CheckCircleOutlined />
          </CheckMark>
        </CheckMarkBox>

        <CardContent>{props.contents}</CardContent>
      </CardFrame>
    </>
  );
};

CheckedQuestion.defaultProps = {
  onClick: () => {},
};

const CardFrame = styled.div`
  width: 80%;
  border-radius: 24px;
  padding: 16px 24px;
  margin-bottom: 12px;
  background: #c4c4c4;
`;

const CheckMarkBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const HashTag = styled.span`
  padding: 6px 14px;
  background: #ececec;
  border-radius: 24px;
`;

const CheckMark = styled.span``;

const CardContent = styled.p`
  margin-top: 20px;
  font-weight: bolder;
`;

export default CheckedQuestion;
