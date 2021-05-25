import React from "react";
import styled from "styled-components";
import { history } from "../../redux/configStore";
import { useSelector, useDispatch } from "react-redux";
import Like from '../../shared/Like';

const CommunityQnA = (props) => {
  const user = useSelector((state) => state.user.user);

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
                onClick={() => {history.push(`/topic/${t}`)}}
                style={{
                  border: `1px solid ${color}`,
                  marginBottom: "5px",
                  color: color
                }}
              >
                #{t}
              </Topic>
            );
          })}
        </div>
        <QuestionBox>
          <Question
            onClick={()=>{
              history.push(`/community/${props.id}`);
            }}
          >{props.contents}</Question>
          {/* {props.answers?.length >= 4 ? ( */}
            <DetailBtn
              onClick={() => {
                history.push(`/community/${props.id}`);
              }}
            >
              더보기
            </DetailBtn>
          {/* ) : null} */}
        </QuestionBox>
        <AnswerContainer>
          {props.answers.map((a) => {
            return (
              <Answer key={a.id}>
                <AnswerHeader>
                  <div style={{display:"flex", alignItems:"center"}} 
                    onClick={() => {
                      if (a.userId === user.id) {
                        history.push("/mybook");
                        return;
                      }
                      history.push(`/others/${a.userId}`);
                    }}
                  >
                    <AnswerProfileImg src={a.profileImg} />
                    <AnswerNickname style={{cursor: "pointer"}} onClick={() => {
                      if (a.userId === user.id) {
                        history.push("/mybook");
                        return;
                      }
                      history.push(`/others/${a.userId}`);
                    }}>
                      <b>{a.nickname}</b>님
                    </AnswerNickname>
                    
                  </div>
                  <AnswerContents
                    onClick={() => {
                      props.openCard(a);
                    }}
                  >
                    {a.contents}
                  </AnswerContents>
                </AnswerHeader>
                <AnswerLikes>
                  <IconBox>
                    <LikeBox>
                    <Like currentLike={a.like} questionId={props.id} answerId={a.answerId} page='QnA'/>
                      <LikeCount>{a.likeCount}</LikeCount>
                    </LikeBox>
                    <CommentBox
                      onClick={() => {
                        props.openCard(a);
                      }}
                    >
                      <CommentIcon src="https://user-images.githubusercontent.com/77369674/118684657-5e53d400-b83d-11eb-861f-41aa269aa89e.png" />
                      <CommentCount>{a.commentCount}</CommentCount>
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
  justify-content: space-between;
`;

const Question = styled.div`
  cursor:pointer;
  font: normal normal bold 30px Nanum Myeongjo;
  width: 70%;
  @media (max-width: 750px) {
    width: 80%;
    font: normal normal bold 19px Nanum Myeongjo;
  }
`;

const DetailBtn = styled.div`
  padding-top: 5px;
  cursor: pointer;
  font: normal normal normal 14px Noto Sans CJK KR;
  :hover {
    font-weight: bold;
  }
  @media (min-width: 750px) {
    display: none;
  }
`;

const AnswerContainer = styled.div`
  display: flex;
  margin-top: 20px;
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  ::-webkit-scrollbar {
    display: none;
  }

  ::-webkit-scrollbar-track {
    display: none;
  }

  ::-webkit-scrollbar-thumb {
    display: none;
  }
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
  flex-direction: column;
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
  font-family: Noto Sans CJK KR, sans-serif;
`;

const AnswerContents = styled.div`
  margin-top: 20px;
  font: normal normal normal 12px/18px Noto Sans CJK KR;
  letter-spacing: 0px;
  color: #262626;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  text-overflow: ellipsis;
  &:hover {
    font-weight: 600;
  }
  cursor: pointer;
  @media (max-width: 750px) {
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
    min-height: 37px;
  }
`;

const IconBox = styled.div`
  display: flex;
  align-items: center;
  & > div > svg {
    margin-right: 5px;
  }
`;

const CommentIcon = styled.img`
  cursor: pointer;
  width: 16px;
  height: 15px;
  margin-right: 6px;
  @media (max-width: 500px) {
    width:13px;
    height: 12px;
    margin-right: 6px;
  }
`

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
  cursor: pointer;
  min-width: 72px;
  max-width: 72px;
  padding: 5px 0px;
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
  font: normal normal normal 16px Noto Sans CJK KR;
  @media (max-width: 500px) {
    font: normal normal normal 13px/19px Noto Sans CJK KR;
  }
`;

const CommentCount = styled.span`
  font: normal normal normal 16px Noto Sans CJK KR;
  @media (max-width: 500px) {
    font: normal normal normal 13px/19px Noto Sans CJK KR;
  }
`;

export default CommunityQnA;
