import React from "react";
import styled from "styled-components";
import Typewriter from "typewriter-effect";

function Main() {
  return (
    <MainFrame>
      <Typewriter
        onInit={(typewriter) => {
          typewriter
            .typeString(
              "이번 생애 마지막 사랑을 만난다면 꼭 결혼을 해야할까요?"
            )
            .pauseFor(4000)
            .deleteAll()
            .typeString("당신의 생각은 무엇인가요?")
            .start();
        }}
      />
    </MainFrame>
  );
}

const MainFrame = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
`;

export default Main;
