import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../redux/configStore";

const AnswerCard = (props) => {
  const user_info = useSelector((state) => state.user.user);
  return (
    <>
      <CardFrame>
        <WriterInfo>
          <CardWriterProfile
            src={props.questionCreatedUserProfileImg}
            onClick={() => {
              if (user_info?.id === props.questionCreatedUserId) {
                history.push(`/mybook`);
                return;
              }
              history.push(`/others/${props.questionCreatedUserId}`);
            }}
          />
          <CardWriter>{props.questionCreatedUserNickname}</CardWriter>
          <span>님의 질문</span>
        </WriterInfo>
        <CardQuestion>{props.questionContents}</CardQuestion>
        <span style={{ fontWeight: "600", paddingTop: "20px" }}>
          내가 남긴 답변
        </span>
        <CardContent>{props.answerContents}</CardContent>
        <Counts>
        <AnswerCount>{props.commentCount} Comments</AnswerCount>
        <AnswerCount>{props.likeCount} Likes</AnswerCount>
        </Counts>
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
  padding: 0px 10px;
  font-weight: 600;
`;

const CardQuestion = styled.h3`
  margin-top: 10px;
  font-weight: 600;
`;

const CardContent = styled.p`
  height: auto;
  overflow-y: auto;
  margin-top: 10px;
`;

const Counts = styled.div`
  display:flex;
  flex-direction:row;
  justify-content:flex-end;
`;
const AnswerCount = styled.span`
  margin:0px 10px;
  font-weight: 600;
`;

export default AnswerCard;
