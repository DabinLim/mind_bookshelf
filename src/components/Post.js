import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import swal from "sweetalert";

import { api as answerActions } from "../redux/modules/answer";

const Post = (props) => {
  const dispatch = useDispatch();
  const user_info = useSelector((state) => state.user.user);
  // contents upload
  const [contents, setContents] = React.useState("");
  const changeContents = (e) => {
    setContents(e.target.value);
  };

  const addAnswer = () => {
    if (contents === "") {
      swal({
        title: "업로드에 실패하였습니다 😥",
        text: "답변이 공란입니다.",
        icon: "error",
      });
      return;
    }
    console.log(props.cardId, contents);
    dispatch(answerActions.sendAnswerAX(props.cardId, contents));
    setContents("");
  };
  // 유효성 체크
  return (
    <>
      <CardFrame>
        {/* 질문 정보 (작성자 정보 포함) */}
        <CardInfo>
          <CardWriterInfo>
            <CardWriterProfile src={user_info?.profileImg}></CardWriterProfile>
            <CardWriter>
              <b>{user_info?.nickname}</b>님의 질문
            </CardWriter>
          </CardWriterInfo>
          <HashTag>#{props.topic}</HashTag>
        </CardInfo>
        {/* 질문 보여주는 곳 */}
        <CardContent>{props.contents}</CardContent>
        {/*  포스트 작성하는 곳 */}
        <PostBox>
          <ElTextarea
            rows={8}
            onChange={changeContents}
            value={contents}
          ></ElTextarea>
          <BtnGroup>
            <SubmitBtn onClick={addAnswer}>답변하기</SubmitBtn>
          </BtnGroup>
        </PostBox>
      </CardFrame>
    </>
  );
};

const CardFrame = styled.div`
  border-radius: 24px;
  padding: 16px 24px;
  background: #ececec;
  text-align: center;
`;

const CardInfo = styled.div`
  display: flex;
  justify-content: space-between;
`;

const HashTag = styled.span`
  padding: 6px 14px;
  background: #c4c4c4;
  border-radius: 24px;
  :hover {
    cursor: pointer;
  }
`;

const CardContent = styled.p`
  margin-top: 20px;
  font-size: 20px;
  font-weight: bolder;
`;

const CardWriterInfo = styled.div`
  display: flex;
  align-items: center;
`;

const CardWriterProfile = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: gray;
  :hover {
    cursor: pointer;
  }
`;

const CardWriter = styled.span`
  margin-left: 8px;
`;

const PostBox = styled.div``;

const ElTextarea = styled.textarea`
  padding: 0 16px 40px;
  box-sizing: border-box;
  width: 100%;
  font-size: 20px;
  border: none;
  overflow: auto;
  outline: none;

  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;

  resize: none; /*remove the resize handle on the bottom right*/

  & :focus {
    border: none;
  }
`;

const BtnGroup = styled.div`
  width: 90%;
  margin: auto;
  & > button {
    cursor: pointer;
  }
`;
const SubmitBtn = styled.button`
  width: 100%;
  padding: 8px 12px;
  border: none;
  outline: none;
  border-radius: 24px;
  color: white;
  background: gray;
`;

export default Post;
