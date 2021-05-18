import React, { useState } from "react";
import styled from "styled-components";
import { history } from "../../redux/configStore";
import { CardModal } from "./communityindex";
import { useSelector, useDispatch } from "react-redux";
import swal from "sweetalert";
import { api as communityActions } from "../../redux/modules/community";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";

const CommunityQnA = (props) => {
  const user = useSelector((state) => state.user.user);
  const is_login = useSelector(state => state.user.is_login);
  const dispatch = useDispatch();

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
        <div style={{ display: "flex", marginBottom: "12px" }}>
          {props.topic?.map((t) => {
            let topic = "";
            let color = "";
            topic = t;
            if (topic === "가치") {
              color = "#7249B4";
            } else if (topic === "관계") {
              color = "#2761CC";
            } else if (topic === "우정") {
              color = "#E0692D";
            } else if (topic === "나") {
              color = "#458857";
            } else if (topic === "사랑") {
              color = "#D34242";
            } else {
              color = "#E6BA28";
            }
            return (
              <Topic
                style={{
                  border: `1px solid ${color}`,
                  marginBottom: "5px",
                }}
              >
                <span style={{ color: color }}>#{t}</span>
              </Topic>
            );
          })}
        </div>
        <QuestionBox>
          <Question>{props.contents}</Question>
          {props.answers?.length >= 4 ? (
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
                  <AnswerNickname>
                    <b>{a.nickname}</b>님
                  </AnswerNickname>
                </AnswerHeader>
                <AnswerContents
                  onClick={() => {
                    props.openCard(a);
                  }}
                >
                  {a.contents}
                </AnswerContents>
                <AnswerLikes>
                  <IconBox>
                    <LikeBox>
                      {a.like ? (
                        <>
                          <FavoriteIcon style={{ color: "#061366" }} 
                            onClick={()=>{
                              if (!is_login) {
                                swal({
                                  title: "좋아요 누르기 실패",
                                  text: "로그인 후 이용 가능한 서비스입니다.",
                                  icon: "error",
                                });
                                return;
                              }
                              dispatch(
                                communityActions.deleteLikeQnA(
                                  a.answerId,
                                  props.id,
                                )
                              );
                            }}
                          />{" "}
                        </>
                      ) : (
                        <>
                          <FavoriteBorderIcon onClick={() => {
                            if (!is_login) {
                              swal({
                                title: "좋아요 누르기 실패",
                                text: "로그인 후 이용 가능한 서비스입니다.",
                                icon: "error",
                              });
                              return;
                            }
                            dispatch(
                              communityActions.addLikeQnA(
                                a.answerId,
                                props.id,
                              )
                            );
                          }} />{" "}
                        </>
                      )}
                      <LikeCount>{a.likeCount}개</LikeCount>
                    </LikeBox>
                    <CommentBox
                      onClick={() => {
                        props.openCard(a);
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
  @media (max-width: 750px) {
    width: 270px;
    font: normal normal bold 19px Nanum Myeongjo;
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
  margin-left: 10px;
  font-family: Sans KR, sans-serif;
`;

const AnswerContents = styled.div`
  max-height: 63px;
  min-height: 63px;
  padding: 0px 18px;
  font: normal normal normal 12px/18px Noto Sans CJK KR;
  font-family: Sans KR, sans-serif;
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
  @media (max-width: 750px) {
    max-height: 40px;
    min-height: auto;
    -webkit-line-clamp: 2;
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
  color: #7249b4;
  @media (max-width: 500px) {
    margin-top: 0px;
    min-width: 63px;
    max-width: 63px;
    max-height: 30px;
  }
`;

const LikeCount = styled.span`
font: normal normal normal 13px/19px Noto Sans CJK KR;
`;

const CommentCount = styled.span`
font: normal normal normal 13px/19px Noto Sans CJK KR;
`;

export default CommunityQnA;
