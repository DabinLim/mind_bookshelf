import React from "react";
import styled from "styled-components";
import swal from "sweetalert";

const CardFront = (props) => {
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
  };
  // 유효성 체크

  return (
    <>
      <CardFrame>
        <HashTag>#사랑</HashTag>

        <CardContent>
          하고 싶은 일과 잘하고 싶은 일, 무엇을 해야 할까요?
        </CardContent>

        <CardWriterInfo>
          <CardWriterProfile></CardWriterProfile>
          <CardWriters> 74명이 작성 중</CardWriters>
        </CardWriterInfo>

        <ElTextarea
          rows={3}
          wrap="hard"
          placeholder="무슨 생각을 하고 계시나요?"
          onChange={changeContents}
          value={contents}
        />
        <BtnGroup>
          <PastMe onClick={props.onClick}>과거의 나</PastMe>
          <SubmitBtn onClick={addAnswer}>답변하기</SubmitBtn>
        </BtnGroup>
      </CardFrame>
    </>
  );
};

const CardFrame = styled.div`
  width: 500px;
  border-radius: 24px;
  padding: 16px 24px;
  background: #c4c4c4;
`;

const HashTag = styled.span`
  padding: 6px 14px;
  background: #ececec;
  border-radius: 24px;
`;

const CardContent = styled.p`
  font-size: 36px;
  font-weight: bolder;
  margin: 60px 0;
`;

const CardWriterInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 50px;
`;

const CardWriterProfile = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: gray;
`;

const CardWriters = styled.span``;

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
  width: 100%;
  display: flex;
  justify-content: space-between;
  & > button {
    cursor: pointer;
  }
`;

const PastMe = styled.button`
  font-size: 16px;
  padding: 6px 14px;
  background: #ececec;
  border-radius: 24px;
`;

const SubmitBtn = styled.button`
  font-size: 16px;
  padding: 6px 14px;
  background: #ececec;
  border-radius: 24px;
`;

export default CardFront;
