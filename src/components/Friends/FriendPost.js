import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { history } from "../../redux/configStore";
import swal from "sweetalert";
import { api as commentActions } from "../../redux/modules/comment";
import { api as communityActions } from "../../redux/modules/community";
import Like from '../../shared/Like';

const FriendPost = (props) => {
  const user_info = useSelector((state) => state.user.user);
  const is_login = useSelector(state => state.user.is_login);
  const dispatch = useDispatch();


  const getDate = (date) => {
    let unformatted = date.split("-");
    let year = unformatted[0];
    let month = unformatted[1];
    if (month[0] === "0") {
      month = month[1];
    }
    let day = unformatted[2];
    let full_date = month + "월 " + day + "일";
    return full_date;
  };

  return (
    <>
      <CardFrame>
        <AnswerHeader>
          <div style={{display:"flex", alignItems:"center"}}>
            <CardWriterProfile
              src={props.profileImg}
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
              }}><b>{props.nickname}</b>님</CardWriter>
          </div>
          <QuestionContents onClick={() => {
            props.openCard(props._id);
          }}>{props.questionTitle}</QuestionContents>
        <AnswerContents
          onClick={() => {
            props.openCard(props._id);
          }}
        >
          {props.contents}
        </AnswerContents>
        </AnswerHeader>
        <AnswerLikes>
          <IconBox>
            <LikeBox>
            <Like currentLike={props.like} answerId={props._id} page='friends'/>
              <LikeCount>{props.likeCount}</LikeCount>
            </LikeBox>
            <CommentBox>
              <CommentIcon onClick={() => {
            props.openCard(props._id);
          }} src="https://user-images.githubusercontent.com/77369674/118684657-5e53d400-b83d-11eb-861f-41aa269aa89e.png"/>
              <CommentCount>{props.commentCount}</CommentCount>
            </CommentBox>
          </IconBox>
          <DateYMD>{getDate(props.createdAt?.split("T")[0])}</DateYMD>
        </AnswerLikes>
      </CardFrame>
    </>
  );
};

const CardFrame = styled.div`
  width: 100%;
  min-height: 210px;
  display: flex;
  margin-bottom: 40px;
  flex-direction: column;
  justify-content: space-between;
  background-color: #ffffff;
  margin: 0px 20px 20px 0px;
  box-shadow: 0px 0px 20px #0000001a;
  @media(max-width:750px){
    margin: 20px 20px 20px 0px;
    width:100%;
  }
`;

const AnswerHeader = styled.div`
  display: flex;
  flex-direction: column;
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

const LikeIcon = styled.img`
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

const CardWriter = styled.span`
  margin-left: 10px;
  font-family: Noto Sans CJK KR;
  @media(max-width:750px){
    font: normal normal normal 11px/17px Noto Sans CJK KR;
    margin-left:6px;
  }
`;

const QuestionContents = styled.div`
text-align: left;
padding-top: 12px;
font: normal normal bold 14px/20px Noto Sans CJK KR;
letter-spacing: 0px;
color: #262626;
opacity: 1;
@media(max-width:650px){
display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
`;

const AnswerContents = styled.div`
  // max-height: 63px;
  // min-height: 63px;
  margin: 15px 0;
  font: normal normal normal 13px/19px Noto Sans CJK KR;
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
`;

const IconBox = styled.div`
min-height: 50px;
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
font: normal normal normal 13px/19px Noto Sans CJK KR;
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

export default FriendPost;
