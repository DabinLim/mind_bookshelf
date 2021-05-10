import React, { useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import CardModal from "../components/Community/CardModal";
import { api as commentActions } from "../redux/modules/comment";
import { api as communityActions } from "../redux/modules/community";

const AnswerCard2 = (props) => {
  const dispatch = useDispatch();
  const [cardModal, setCardModal] = useState(false);
  const closeCardModal = () => {
    setCardModal(false);
  };

  const openCard = (a) => {
    const type = "community";
    setCardModal(true);
    dispatch(communityActions.getCardDetail(a, type));
    console.log("걸렸다");
    dispatch(commentActions.getCommentAX(a));
  };

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
        {cardModal ? <CardModal close={closeCardModal} /> : null}
        <AnswerHeader>
          <CardWriterProfile src={props.userProfileImg} />
          <CardWriter>{props.userNickname}</CardWriter>
        </AnswerHeader>
        <AnswerContents
          onClick={() => {
            openCard(props.answerId);
          }}
        >
          {props.answerContents}
        </AnswerContents>
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
              <LikeCount>{props.answerLikes}개</LikeCount>
            </LikeBox>
            <CommentBox>
              <ChatBubbleOutlineIcon />
              <CommentCount>{props.commentCount}개</CommentCount>
            </CommentBox>
          </IconBox>
          <DateYMD>{getDate(props.createdAt?.split("T")[0])}</DateYMD>
        </AnswerLikes>
      </CardFrame>
    </>
  );
};

const CardFrame = styled.div`
  width: 272px;
  height: 189px;
  display: flex;
  margin-bottom: 40px;
  flex-direction: column;
  justify-content: space-between;
  background-color: #ffffff;
  border-radius: 20px;
  margin: 0px 20px 20px 0px;
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
