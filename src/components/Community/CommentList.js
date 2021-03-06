import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Comment } from "./communityindex";

const CommentList = (props) => {
  const comment_list = useSelector((state) => state.comment.list);

  return (
    <CommentContainer mobile={props.mobile}>
      {comment_list?.map((c, idx) => {
        return (
          <>
            <Comment mobile={props.mobile} key={idx} {...c} />
          </>
        );
      })}
    </CommentContainer>
  );
};

const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  height:408px;
  ${props => props.mobile ? ``:`overflow-y: scroll`};
  ::-webkit-scrollbar {
    display: none;
  }
  @media (max-width: 750px) {
    height: auto;
    border-top-right-radius: 0px;
  }
`;

export default CommentList;
