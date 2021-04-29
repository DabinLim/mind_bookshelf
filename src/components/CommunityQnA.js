import React, { useState } from "react";
import styled from "styled-components";
import { history } from "../redux/configStore";
import CardModal from "./CardModal";

const CommunityQnA = (props) => {
  const [cardModal, setCardModal] = useState();

  const closeCardModal = () => {
    setCardModal(false);
  };

  return (
    <React.Fragment>
      <QnAContainer>
        <Question>{props.contents}</Question>
        <button
          onClick={() => {
            history.push(`/community/${props.id}`);
          }}
        >
          더보기
        </button>
        <Topic>#{props.topic}</Topic>
        <AnswerContainer>
          {props.answers.map((a) => {
            return (
              <Answer>
                {cardModal ? (
                  <CardModal
                    close={closeCardModal}
                    {...a}
                    post={props.contents}
                  />
                ) : null}
                <AnswerHeader
                  onClick={() => {
                    history.push(`/others/${a.userId}`);
                  }}
                >
                  <AnswerProfileImg src={a.profileImg} />
                  <AnswerNickname>{a.nickname}</AnswerNickname>
                </AnswerHeader>
                <AnswerContents
                  onClick={() => {
                    setCardModal(true);
                  }}
                >
                  {a.contents}
                </AnswerContents>
              </Answer>
            );
          })}
        </AnswerContainer>
      </QnAContainer>
    </React.Fragment>
  );
};

const QnAContainer = styled.div`
  width: 650px;
  display: flex;
  flex-direction: column;
  align-items: start;
  @media (max-width: 1800px) {
    margin-bottom: 60px;
  }
`;
const Question = styled.div`
  font-size: 30px;
  font-weight: 600;
  width: 400px;
  height: 100px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const AnswerContainer = styled.div`
  display: flex;
  margin-top: 50px;
`;

const Answer = styled.div`
  width: 150px;
  height: 150px;
  display: flex;
  flex-direction: column;
  padding: 13px;
  background-color: #c4c4c4;
  border-radius: 30px;
  margin-right: 15px;
`;

const AnswerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const AnswerProfileImg = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 40px;
  object-fit: cover;
`;

const AnswerNickname = styled.div`
  font-weight: 600;
`;

const AnswerContents = styled.div`
  margin-top: 10px;
  font-size: 15px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  &:hover {
    font-weight: 600;
  }
  cursor: pointer;
`;

const Topic = styled.div`
  margin-top: 30px;
  display: inline-block;
  background-color: #e5e5e5;
  padding: 5px 14px;
  border-radius: 18px;
  font-weight: 600;
`;

export default CommunityQnA;
