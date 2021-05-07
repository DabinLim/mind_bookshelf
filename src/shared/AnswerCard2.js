import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";

const AnswerCard2 = (props) => {
  return (
    <>
      <CardFrame>
        <AnswerHeader>
          <CardWriterProfile src={props.userProfileImg} />
          <CardWriter>{props.userNickname}</CardWriter>
        </AnswerHeader>
        <AnswerContents>{props.answerContents}</AnswerContents>
        <AnswerLikes>
          <IconBox>
            <LikeBox>
              {/* {a.like ? (
                <>
                  <FavoriteIcon style={{ color: "red" }} />{" "}
                </>
              ) : (
                <>
                  <FavoriteBorderIcon />
                </>
              )} */}
              <FavoriteBorderIcon />
              <LikeCount>0개</LikeCount>
            </LikeBox>
            <CommentBox>
              <ChatBubbleOutlineIcon />
              <CommentCount>0개</CommentCount>
            </CommentBox>
          </IconBox>
          <DateYMD>2020년 3월 25일</DateYMD>
        </AnswerLikes>
      </CardFrame>
    </>
  );
};

const CardFrame = styled.div`
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

const CardWriterProfile = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 40px;
  object-fit: cover;
  cursor: pointer;
`;

const AnswerNickname = styled.div`
  font-weight: 600;
  margin-left: 10px;
`;
const CardWriter = styled.span`
  margin-left: 10px;
  font-weight: 600;
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

const LikeCount = styled.span`
  font-size: 12px;
`;

const CommentCount = styled.span`
  font-size: 12px;
`;

export default AnswerCard2;
