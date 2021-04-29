import React from "react";
import styled from "styled-components";

import { useSelector } from "react-redux";
import {Comment} from "./communityindex";

const CommentList = (props) => {
  const comment_list = useSelector((state) => state.comment.list);
  return (
    <>
      {comment_list?.map((c, idx) => {
        return (
          <>
            <Comment {...c} />
          </>
        );
      })}
    </>
  );
};

export default CommentList;
