import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { api as commentActions } from "../../redux/modules/comment";
const Comment = (props) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.user);

  const deleteComment = () => {
    dispatch(commentActions.deleteCommentAX(props.commentId));
  };

  return (
    <>
      <CommentFrame>
        <CommentProfileInfo>
          <CommentProfile src={props.profileImg} />
          <CommentProfileName>{props.nickname}</CommentProfileName>
        </CommentProfileInfo>
        <CommentContent>{props.commentContents}</CommentContent>
        {userInfo?.id === props.userId ? (
          <DeleteBtn onClick={deleteComment}>삭제</DeleteBtn>
        ) : null}
      </CommentFrame>
    </>
  );
};

const CommentFrame = styled.div`
  display: flex;
`;

const CommentProfileInfo = styled.div`
  display: flex;
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
`;

const CommentContent = styled.p``;

const DeleteBtn = styled.button``;

export default Comment;
