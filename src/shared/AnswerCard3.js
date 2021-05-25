import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { history } from "../redux/configStore";
import Like from './Like';

const AnswerCard3 = (props) => {
  const user_info = useSelector((state) => state.user.user);

  const getDate = (date) => {
    let unformatted = date.split("-");
    let year = unformatted[0];
    let month = unformatted[1];
    let day = unformatted[2];
    let full_date = year + "년 " + month + "월 " + day + "일";
    return full_date;
  };

  return (
    <>
      <CardFrame>
        <AnswerHeader>
          <HeaderUser>
            <CardWriterProfile
              src={props.userProfileImg}
              onClick={() => {
                if (props.userId === user_info?.id) {
                  history.push("/mybook");
                }
                history.push(`/others/${props.userId}`);
              }}
            />
            <CardWriter onClick={() => {
                if (props.userId === user_info?.id) {
                  history.push("/mybook");
                }
                history.push(`/others/${props.userId}`);
              }}><b>{props.userNickname}</b>님</CardWriter>
          </HeaderUser>
          <QuestionContents>
            {props.questionContents}
          </QuestionContents>
          <AnswerContents
            onClick={() => {
              props.openCard(props.answerId);
            }}
          >
            {props.answerContents}
          </AnswerContents>
        </AnswerHeader>
        <AnswerLikes>
          <IconBox>
            <LikeBox>
            <Like width="14px" height="13px" currentLike={props.like} answerId={props.answerId} page='detail'/>
              <Count>{props.answerLikes}</Count>
            </LikeBox>
            <CommentBox>
              <CommentIcon src="https://user-images.githubusercontent.com/77369674/118684657-5e53d400-b83d-11eb-861f-41aa269aa89e.png"/>
              <Count>{props.commentCount}</Count>
            </CommentBox>
          </IconBox>
          <DateYMD>{getDate(props.createdAt?.split("T")[0]).split(' ')[1]} {getDate(props.createdAt?.split("T")[0]).split(' ')[2]}</DateYMD>
        </AnswerLikes>
      </CardFrame>
    </>
  );
};

const CardFrame = styled.div`
  min-width: 750px;
  max-width: 750px;
  display: flex;
  margin-bottom: 20px;
  flex-direction: column;
  background-color: #ffffff;
  box-shadow: 0px 0px 20px #0000001a;
  @media(max-width:500px){
    justify-content: space-between;
    margin: 0px 0px 20px 0px;
    min-width: 326px;
    max-width: 326px;
    min-height:160px;
    max-height:160px;
  }
`;

const AnswerHeader = styled.div`
  display: flex;
  flex-direction: column;
  padding: 14px 15px 13px 15px;
`;

const HeaderUser = styled.div`
  display: flex;
  align-items: center;
`

const CardWriterProfile = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 40px;
  object-fit: cover;
  cursor: pointer;
  @media(max-width:500px){
    width:20px;
    height:20px;
  }
`;

const CommentIcon = styled.img`
  cursor: pointer;
  width: 14px;
  height: 13px;
  margin-right: 6px;
  @media (max-width: 500px) {
    width:13px;
    height: 12px;
    margin-right: 6px;
  }
`

const CardWriter = styled.span`
  cursor: pointer;
  margin-left: 10px;
  font: normal normal medium 12px/17px Noto Sans CJK KR;
  @media(max-width:500px){
    font: normal normal normal 11px/17px Noto Sans CJK KR;
    margin-left:6px;
  }
`;

const QuestionContents = styled.div`
  margin-top: 10px;
  font: normal normal bold 14px/20px Noto Sans CJK KR;
  @media(max-width:500px){
    display: none;
  }

`

const AnswerContents = styled.div`
  cursor: pointer;
  margin-top: 8px;
  font: normal normal normal 13px/19px Noto Sans CJK KR;
  letter-spacing: 0px;
  color: #262626;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  &:hover {
    font-weight: 600;
  }
  cursor: pointer;
  @media(max-width:500px){
    font: normal normal normal 12px/17px Noto Sans CJK KR;
  }
`;

const AnswerLikes = styled.div`
  padding: 0px 18px;
  border-top: 1px solid #efefef;
  height: 39px;
  font-weight: 600;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const IconBox = styled.div`
  display: flex;
  & > div > svg {
    margin-right: 6px;
  }
`;

const LikeBox = styled.div`
  display: flex;
  align-items: center;
  margin-right: 13px;
`;
const CommentBox = styled.div`
  display: flex;
  align-items: center;
`;

const DateYMD = styled.div`
  font: normal normal normal 11px/16px Noto Sans CJK KR;
  color: #8B8B8B;
`;

const Count = styled.span`
  font: normal normal normal 14px/20px Noto Sans CJK KR;  
  @media (max-width: 500px) {
    font: normal normal normal 13px/19px Noto Sans CJK KR;
  }
`;



export default AnswerCard3;
