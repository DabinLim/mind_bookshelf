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
      </CardFrame>
    </>
  );
};

const CardFrame = styled.div`
  width: 80%;
  border-radius: 24px;
  padding: 16px 24px;
  margin-bottom: 12px;
  background: #c4c4c4;
`;

const HashTag = styled.span`
  padding: 6px 14px;
  background: #ececec;
  border-radius: 24px;
`;

const CardContent = styled.p`
  margin-top: 20px;
  font-weight: bolder;
`;

export default CardFront;
