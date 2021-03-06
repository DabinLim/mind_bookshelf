import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { api as commentActions } from "../../redux/modules/comment";
import { history } from "../../redux/configStore";
import reactStringReplace from "react-string-replace";
import { DeleteOutlined } from "@ant-design/icons";
import swal from 'sweetalert';
import { time } from "../../shared/Time";
import DeleteCommentComfirm from './DeleteCommentConfirm';
import useSound from 'use-sound';
import boopSfx from "../../static/sounds/DDALGGAK.mp3";

const Comment = (props) => {
  const dispatch = useDispatch();
  const is_login = useSelector(state => state.user.is_login);
  const userInfo = useSelector((state) => state.user.user);
  const [deleteCommentModal, setDeleteComment] = useState(false);
  const [play] = useSound(boopSfx);
  
  const addLike = () => {
    if (!is_login) {
      swal({
        title: "좋아요 누르기 실패",
        text: "로그인 후 이용 가능한 서비스입니다.",
        icon: "error",
      });
      return;
    }
    dispatch(commentActions.addCommentLike(props.commentId));
    play();
  }

  const deleteLike = () => {
    if (!is_login) {
      swal({
        title: "좋아요 누르기 실패",
        text: "로그인 후 이용 가능한 서비스입니다.",
        icon: "error",
      });
      return;
    }
    dispatch(commentActions.deleteCommentLike(props.commentId));
    play();
  }

  let timeFormat =
    props.commentCreatedAt !== "방금전"
      ? time(props.commentCreatedAt)
      : "방금 전";

  //reactStringReplace라는 외부 라이브러리를 사용해서 구현했습니다.
  //commentContents안에서 태그값을 찾고 style과 onClick이벤트를 입혀주는 작업입니다.
  //한 댓글안에 태그가 두개 이상일 때도  map을 돌려서 해결했습니다.
  let contents = props.commentContents;
  props.tag.map((t) => {
    contents = reactStringReplace(contents, `@${t[0]}`, (match, i) => (
      <span
        key={t[1]}
        style={{ color: "#37628B", cursor: "pointer" }}
        onClick={() => {
          history.push(`/others/${t[1]}`);
        }}
      >
        {match}
      </span>
    ));
  });

  return (
    <CommentFrame>
      {deleteCommentModal? 
        <DeleteCommentComfirm commentId={props.commentId} setDeleteComment={setDeleteComment} />
      :null}
      <CommentProfileInfo>
        <div>
          <CommentProfile
            src={props.profileImg}
            onClick={() => {
              if (userInfo?.id === props.userId) {
                history.push(`/mybook`);
                return;
              }
              history.push(`/others/${props.userId}`);
            }}
          />
          <CommentProfileName style={{cursor: "pointer"}} onClick={() => {
              if (userInfo?.id === props.userId) {
                history.push(`/mybook`);
                return;
              }
              history.push(`/others/${props.userId}`);
            }}>{props.nickname}</CommentProfileName>
        </div>
        <div>
        {props.currentLike? <LikeBtn src="https://user-images.githubusercontent.com/77369674/118684666-5f850100-b83d-11eb-884e-cb0ffbb34dca.png" 
        onClick={deleteLike}
        />:<LikeBtn src="https://user-images.githubusercontent.com/77369674/118684661-5eec6a80-b83d-11eb-8eba-7ad33f5a05e2.png"
        onClick={addLike}
        />}
        {userInfo?.id === props.userId ? (
          <DeleteBtn onClick={()=>{setDeleteComment(true)}}>
            <DeleteOutlined />
          </DeleteBtn>
        ) : null}
        </div>
      </CommentProfileInfo>
      <CommentContent>{contents}</CommentContent>
      <CommentBottom>
        <TimeIndicator>{timeFormat}</TimeIndicator>
        <LikeCount>좋아요 {props.commentLikeCount}개</LikeCount>
      </CommentBottom>
    </CommentFrame>
  );
};

const CommentFrame = styled.div`
  width: 100%;
  padding: 10px 29px 5px 20px;
  margin-bottom: 5px;
`;

const CommentProfileInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CommentProfile = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: gray;
  :hover {
    cursor: pointer;
  }
`;

const CommentProfileName = styled.span`
  margin-left: 8px;
  font: normal normal bold 13px/18px Noto Sans CJK KR;
  letter-spacing: 0px;
`;

const CommentContent = styled.p`
  margin: 0 0 0 38px;
  font: normal normal normal 13px/18px Noto Sans CJK KR;
  letter-spacing: 0px;
  color: #000000;
`;

const TimeIndicator = styled.span`
  margin:0 0 0 38px;
  font: normal normal normal 12px/16px Noto Sans CJK KR;
  letter-spacing: 0px;
  color: #c4c4c4;
`;

const LikeCount = styled.span`
  margin-left:10px;
  font: normal normal bold 12px/16px Noto Sans CJK KR;
  letter-spacing: 0px;
  color: #c4c4c4;
`;

const CommentBottom = styled.div`
  margin-top:9px;
  display: flex;
  justify-content: flex-start;
  align-items:center;
`;

const LikeBtn = styled.img`
  cursor:pointer;
  width:13px;
  height:12px;
  margin-right:5px;
  margin-bottom:2px;
`;

const DeleteBtn = styled.button`
  outline: none;
  border: none;
  background: none;
  cursor: pointer;
  :hover {
    transform: scale(1.2);
    transition: 200ms ease-in-out;
  }
`;

export default Comment;
