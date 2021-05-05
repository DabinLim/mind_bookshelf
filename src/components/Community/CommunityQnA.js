import React, { useState } from "react";
import styled from "styled-components";
import { history } from "../../redux/configStore";
import { CardModal } from "./communityindex";
import { useSelector, useDispatch } from "react-redux";
import FavoriteIcon from "@material-ui/icons/Favorite";

import { api as commentActions } from "../../redux/modules/comment";
import { setAnswerInfo } from "../../redux/modules/comment";

const CommunityQnA = (props) => {
  const dispatch = useDispatch();
  const [cardModal, setCardModal] = useState();
  const user = useSelector((state) => state.user.user);

  const closeCardModal = () => {
    setCardModal(false);
  };

  return (
    <React.Fragment>
      <QnAContainer>
        <QuestionBox>
          <Question>{props.contents}</Question>
          <DetailBtn
            onClick={() => {
              history.push(`/community/${props.id}`);
            }}
          >
            더보기
          </DetailBtn>
        </QuestionBox>
        <Topic>#{props.topic}</Topic>
        <AnswerContainer>
          {props.answers.map((a, idx) => {
            return (
              <Answer key={a.id}>
                {cardModal ? (
                  <CardModal key={idx} close={closeCardModal} />
                ) : null}
                <AnswerHeader
                  onClick={() => {
                    if (a.userId === user.id) {
                      history.push("/mybook");
                      return;
                    }
                    history.push(`/others/${a.userId}`);
                  }}
                >
                  <AnswerProfileImg src={a.profileImg} />
                  <AnswerNickname>{a.nickname}</AnswerNickname>
                </AnswerHeader>
                <AnswerContents
                  onClick={() => {
                    setCardModal(true);
                    dispatch(
                      setAnswerInfo({
                        ...a,
                        content: props.contents,
                        questionId: props.id,
                      })
                    );
                    dispatch(commentActions.getCommentAX(a.answerId));
                  }}
                >
                  {a.contents}
                </AnswerContents>
                <AnswerLikes>
                  <LikeBtn style={{ color: "#8B8B8B" }}>
                    <FavoriteIcon />{" "}
                    <span style={{ margin: "0 0 0 5px" }}>{a.likeCount}</span>
                  </LikeBtn>
                </AnswerLikes>
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

const QuestionBox = styled.div`
  display: flex;
  justify-content: space-between;

`

const Question = styled.div`
  font-size: 30px;
  font-weight: 600;
  width: 400px;
  // height: 100px;
  // display: -webkit-box;
  // -webkit-line-clamp: 2;
  // -webkit-box-orient: vertical;
  // overflow: hidden;
  // text-overflow: ellipsis;
`;

const DetailBtn = styled.div`
  cursor: pointer;


`

const AnswerContainer = styled.div`
  display: flex;
  margin-top: 50px;
`;

const Answer = styled.div`
  width: 256px;
  height: 160px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 13px;
  background-color: #ffffff;
  box-shadow: 0px 0px 15px #c1c7fc;
  border-radius: 30px;
  margin-right: 15px;
`;

const AnswerHeader = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const AnswerProfileImg = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 40px;
  object-fit: cover;
  margin-right: 8px;
`;

const AnswerNickname = styled.div`
  font-weight: 600;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
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

const AnswerLikes = styled.div`
  font-weight: 600;
  display: flex;
  justify-content: flex-end;
`;

const LikeBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  cursor: pointer;
  margin-right: 5px;
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
