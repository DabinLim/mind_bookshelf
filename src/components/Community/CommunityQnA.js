import React, { useState } from "react";
import styled from "styled-components";
import { history } from "../../redux/configStore";
import { CardModal } from "./communityindex";
import { useSelector, useDispatch } from "react-redux";
import { api as commentActions } from "../../redux/modules/comment";
import { api as communityActions } from "../../redux/modules/community";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";

const CommunityQnA = (props) => {
  const dispatch = useDispatch();
  const [cardModal, setCardModal] = useState(false);
  const user = useSelector((state) => state.user.user);
  const closeCardModal = () => {
    setCardModal(false);
  };

  const openCard = (a) => {
    const type = "community";
    setCardModal(true);
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
        <div style={{ display: "flex" }}>
          {props.topic.map((t) => {
            return (
              <Topic
                style={{
                  background: "#B5BDFF",
                  boxShadow: `0px 0px 15px #C3C9FE`,
                  marginBottom: "5px",
                }}
              >
                <span>#{t}</span>
              </Topic>
            );
          })}
        </div>
        <QuestionBox>
          <Question>{props.contents}</Question>
          {props.answers?.length >= 1 ? (
            <DetailBtn
              onClick={() => {
                history.push(`/community/${props.id}`);
              }}
            >
              더보기
            </DetailBtn>
          ) : null}
        </QuestionBox>
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
                      {a.like ? (
                        <>
                          <FavoriteIcon style={{ color: "#061366" }} />{" "}
                        </>
                      ) : (
                        <>
                          <FavoriteBorderIcon onClick={() => {}} />{" "}
                        </>
                      )}
                      <LikeCount>{a.likeCount}개</LikeCount>
                    </LikeBox>
                    <CommentBox
                      onClick={() => {
                        openCard(a);
                      }}
                    >
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
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: start;
  margin-bottom: 60px;
  @media (max-width: 500px) {
    margin-top: 20px;
    margin-bottom: 30px;
  }
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
  @media (max-width: 500px) {
    font-size: 20px;
    width: 270px;
  }
`;

const DetailBtn = styled.div`
  padding-top: 5px;
  cursor: pointer;
  font-size: 14px;
  :hover {
    font-weight: bold;
  }
`;

const AnswerContainer = styled.div`
  display: flex;
  margin-top: 20px;
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  @media (max-width: 500px) {
    margin-top: 20px;
  }
`;

const Answer = styled.div`
  min-width: 272px;
  max-width: 272px;
  height: 189px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #ffffff;
  border-radius: 20px;
  margin-right: 20px;
  @media (max-width: 500px) {
    min-width: 200px;
    max-width: 200px;
    height: 160px;
  }
  box-shadow: 0px 0px 20px #0000001a;
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
  @media (max-width: 500px) {
    max-height: 40px;
    min-height: 40px;
  }
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
  @media (max-width: 500px) {
    min-height: 40px;
  }
`;

const IconBox = styled.div`
  display: flex;
  align-items: center;
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
  @media (max-width: 500px) {
    display: none;
  }
`;

const Topic = styled.div`
  margin-top: 30px;
  margin-right: 10px;
  display: inline-block;
  min-width: 72px;
  max-width: 72px;
  max-height: 31px;
  padding: 8px 12px;
  letter-spacing: 0px;
  border-radius: 18px;
  font-weight: 600;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 500px) {
    margin-top: 0px;
    min-width: 63px;
    max-width: 63px;
    max-height: 30px;
  }
`;

const LikeCount = styled.span`
  font-size: 12px;
`;

const CommentCount = styled.span`
  font-size: 12px;
`;

export default CommunityQnA;
