import React, { useState } from "react";
import styled from "styled-components";
import { history } from "../../redux/configStore";
import { CardModal } from "./communityindex";
import { useSelector, useDispatch } from "react-redux";
import { api as commentActions } from "../../redux/modules/comment";
import {api as communityActions} from '../../redux/modules/community';
import { setAnswerInfo } from "../../redux/modules/comment";

const CommunityQnA = (props) => {
  const dispatch = useDispatch();
  const [cardModal, setCardModal] = useState();
  const user = useSelector((state) => state.user.user);
  console.log(props.topic)
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
        <div>
          {props.topic.map((t) => {
            
            return(
              <Topic>#{t}</Topic>
            )
          })}
        </div>
        <AnswerContainer>
          {props.answers.map((a) => {
            return (
              <Answer key={a.id}>
                {cardModal ? <CardModal close={closeCardModal} /> : null}
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
                    dispatch(communityActions.getCardDetail(a.answerId))
                    dispatch(commentActions.getCommentAX(a.answerId));
                  }}
                >
                  {a.contents}
                </AnswerContents>
                <AnswerLikes>
                  <LikeIcon src="https://uxwing.com/wp-content/themes/uxwing/download/15-healthcare-and-medical/heart-black.png" />
                  {a.likeCount}
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
  width: 940px;
  display: flex;
  flex-direction: column;
  align-items: start;
  margin-bottom: 60px;
  margin-top: 40px;

`;

const QuestionBox = styled.div`
  width: 100%;
  display: flex;
  // align-items: center;
  justify-content: space-between;
`

const Question = styled.div`
  font-size: 30px;
  font-weight: 600;
  width: 500px;
`;

const DetailBtn = styled.div`
  cursor: pointer;
  font-size: 16px;
`

const AnswerContainer = styled.div`
  display: flex;
  margin-top: 50px;
`;

const Answer = styled.div`
  width: 220px;
  height: 140px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 15px;
  background-color: #FFFFFF;
  border-radius: 20px;
  margin-right: 20px;
`;

const AnswerHeader = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const AnswerProfileImg = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 40px;
  object-fit: cover;
`;

const AnswerNickname = styled.div`
  font-weight: 600;
  margin-left: 10px;
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
  text-align: right;
  font-weight: 600;
  font-size: 16px;
`;

const LikeIcon = styled.img`
  width: 15px;
  height: 13px;
  background-size: cover;
  margin-right: 5px;
  vertical-align: middle;
`

const Topic = styled.div`
  margin-top: 30px;
  margin-right: 10px;
  display: inline-block;
  background-color: #e5e5e5;
  padding: 5px 14px;
  border-radius: 18px;
  font-weight: 600;
`;

export default CommunityQnA;
