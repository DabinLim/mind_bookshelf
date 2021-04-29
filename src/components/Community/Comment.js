import React from "react";
import styled from "styled-components";

const Comment = (props) => {
  return (
    <>
      <CommentFrame>
        <CommentProfileInfo>
          <CommentProfile src={props.profileImg} />
          <CommentProfileName>{props.nickname}</CommentProfileName>
        </CommentProfileInfo>
        <CommentContent>{props.commentContents}</CommentContent>
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

export default Comment;
