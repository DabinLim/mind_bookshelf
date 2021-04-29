import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";

const AnswerCard = (props) => {
  return (
    <>
      <CardFrame>
        <WriterInfo>
          <CardWriterProfile src={props.questionCreatedUserProfileImg} />
          <CardWriter>{props.questionCreatedUserNickname}</CardWriter>
          <span>님의 질문</span>
        </WriterInfo>
        <CardQuestion>{props.questionContents}</CardQuestion>
        <span style={{fontWeight:'600', paddingTop:'20px'}}>내가 남긴 답변</span>
        <CardContent>{props.answerContents}</CardContent>
      </CardFrame>
    </>
  );
};

AnswerCard.defaultProps = {
  onClick: () => {},
};

const CardFrame = styled.div`
  width: 100%;
  border-radius: 24px;
  padding: 16px 24px;
  margin-bottom: 12px;
  background: #c4c4c4;
`;

const WriterInfo = styled.div`
  display: flex;
  align-items: center;
`;

const CardWriterProfile = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: gray;
    cursor: pointer;

`;

const CardWriter = styled.span`
  padding:0px 10px;
  font-weight:600;
`;

const CardQuestion = styled.h3`
    margin-top:10px;
    font-weight:600;
`;

const CardContent = styled.p`
    height:100%;
    overflow-y:auto;
  margin-top: 10px;
`;

export default AnswerCard;
