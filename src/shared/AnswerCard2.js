import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { history } from "../redux/configStore";
import swal from "sweetalert";
import { api as communityActions } from "../redux/modules/community"; 

const AnswerCard2 = (props) => {
  const user_info = useSelector((state) => state.user.user);
  const is_login = useSelector(state => state.user.is_login);
  const dispatch = useDispatch();


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
          <CardWriterProfile
            src={props.userProfileImg}
            onClick={() => {
              if (props.userId === user_info?.id) {
                history.push("/mybook");
              }
              history.push(`/others/${props.userId}`);
            }}
          />
          <CardWriter>{props.userNickname}</CardWriter>
        </AnswerHeader>
        <AnswerContents
          onClick={() => {
            props.openCard(props.answerId);
          }}
        >
          {props.answerContents}
        </AnswerContents>
        <AnswerLikes>
          <IconBox>
            <LikeBox>
              {props.like ? (
                <>
                  <FavoriteIcon style={{ color: "red" }} fontSize='small'
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
                        communityActions.deleteLikeDetail(
                          props.answerId,
                        )
                      );
                    }}
                  />
                  <LikeCount>{props.answerLikes}개</LikeCount>
                </>
              ) : (
                <>
                  <FavoriteBorderIcon fontSize='small'
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
                        communityActions.addLikeDetail(
                          props.answerId,
                        )
                      );
                    }}
                  />
                  <LikeCount>{props.answerLikes}개</LikeCount>
                </>
              )}
            </LikeBox>
            <CommentBox>
              <ChatBubbleOutlineIcon fontSize='small'/>
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
  min-width: 272px;
  max-width: 272px;
  height: 189px;
  display: flex;
  margin-bottom: 40px;
  flex-direction: column;
  justify-content: space-between;
  background-color: #ffffff;
  border-radius: 20px;
  margin: 0px 20px 20px 0px;
  @media(max-width:650px){
    width:100%;
    min-width:100%;
    max-width:100%;
  }
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
  @media(max-width:650px){
    width:22px;
    height:22px;
  }
`;

const AnswerNickname = styled.div`
  font-weight: 600;
  margin-left: 10px;
`;
const CardWriter = styled.span`
  margin-left: 10px;
  font-weight: 600;
  @media(max-width:650px){
    font-size:12px;
    margin-left:6px;
  }
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
  @media(max-width:650px){
    font-size:12px;
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
  font-size: 11px;
`;

const CommentCount = styled.span`
  font-size: 11px;
`;

export default AnswerCard2;
