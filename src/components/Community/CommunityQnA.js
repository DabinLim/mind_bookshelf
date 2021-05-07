import React, { useState } from "react";
import styled from "styled-components";
import { history } from "../../redux/configStore";
import { CardModal } from "./communityindex";
import { useSelector, useDispatch } from "react-redux";
import { api as commentActions } from "../../redux/modules/comment";
import { api as communityActions } from "../../redux/modules/community";
import { setAnswerInfo } from "../../redux/modules/comment";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

const CommunityQnA = (props) => {
  const dispatch = useDispatch();
  const [cardModal, setCardModal] = useState(false);
  const user = useSelector((state) => state.user.user);
  console.log(props.topic);
  console.log(cardModal);
  const closeCardModal = () => {
    console.log("close");
    setCardModal(false);
  };

  const openCard = (a) => {
    const type = "community";
    setCardModal(true);
    console.log("open");
    dispatch(communityActions.getCardDetail(a.answerId, type));
    dispatch(commentActions.getCommentAX(a.answerId));
  };

  const getDate = (date) => {
    let year = "20" + date.substring(0, 2);
    let month = date.substring(2, 4);
    let day = date.substring(4, 6);
    let full_date = year + "년 " + month + "월 " + day + "일";
    return full_date;
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
            let color = "";
            let background = "";
            if (t === "나") {
              color = "#F9D9FC";
              background = "#F9D1FD";
            } else if (t === "사랑") {
              color = "#FEBABA";
              background = "#FFAAAA";
            } else if (t === "관계") {
              color = "#FDF1AE";
              background = "#FFF09D";
            } else if (t === "가치") {
              color = "#C2C8FD";
              background = "#B5BDFF";
            } else if (t === "우정") {
              color = "#C4FCCD";
              background = "#B9FFC4";
            } else if (t === "꿈") {
              color = "#C3E9FD";
              background = "#B7E6FF";
            }
            return <Topic style={{ background: color, boxShadow: `0px 0px 5px ${background}` }}>#{t}</Topic>;
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
                    openCard(a);
                  }}
                >
                  {a.contents}
                </AnswerContents>
                <AnswerLikes>
                  <IconBox>
                    <LikeBox>
                      {a.like? 
                      <>
                      <FavoriteBorderIcon style={{ color: "red" }} />{" "}
                      </>
                      :
                      <>
                      <FavoriteBorderIcon />{" "}
                      </>
                      }
                      <LikeCount>{a.likeCount}개</LikeCount>
                    </LikeBox>
                    <CommentBox>
                      <ChatBubbleOutlineIcon />
                      <CommentCount>{a.commentCount}개</CommentCount>
                    </CommentBox>
                  </IconBox>
                  <DateYMD>{getDate(a.answerCreated)}</DateYMD>
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
`;

const Question = styled.div`
  font-size: 30px;
  font-weight: 600;
  width: 500px;
`;

const DetailBtn = styled.div`
  cursor: pointer;
  font-size: 16px;
`;

const AnswerContainer = styled.div`
  display: flex;
  margin-top: 50px;
`;

const Answer = styled.div`
  width: 272px;
  height: 189px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #ffffff;
  border-radius: 20px;
  margin-right: 20px;
`;

const AnswerHeader = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 17px 18px 0;
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
  max-height: 63px;
  min-height: 63px;
  padding: 0px 18px;
  font: normal normal medium 15px/20px Roboto;
  letter-spacing: 0px;
  color: #262626;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  &:hover {
    font-weight: 600;
  }
  cursor: pointer;
`;

const AnswerLikes = styled.div`
  padding: 0px 18px;
  border-top: 1px solid #efefef;
  min-height: 50px;
  font-weight: 600;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const IconBox = styled.div`
  display: flex;
  & > div > svg {
    margin-right: 5px;
  }
`;

const LikeBox = styled.div`
  display: flex;
  align-items: center;
  margin-right: 8px;
`;
const CommentBox = styled.div`
  display: flex;
  align-items: center;
`;

const DateYMD = styled.div`
  font-size: 11px;
`;

const Topic = styled.div`
  margin-top: 30px;
  margin-right: 10px;
  display: inline-block;
  padding: 5px 14px;
  border-radius: 18px;
  font-weight: 600;
`;

const LikeCount = styled.span`
  font-size: 12px;
`;

const CommentCount = styled.span`
  font-size: 12px;
`;

export default CommunityQnA;
