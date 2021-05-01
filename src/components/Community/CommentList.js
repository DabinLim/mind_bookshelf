import React from "react";
import styled from "styled-components";

import { useSelector } from "react-redux";
import { Comment } from "./communityindex";

const CommentList = (props) => {
  const comment_list = useSelector((state) => state.comment.list);
  return (
    <CommentContainer>
      {comment_list?.map((c, idx) => {
        return (
          <>
            <Comment key={idx} {...c} />
          </>
        );
      })}
    </CommentContainer>
  );
};

const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 400px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export default CommentList;
