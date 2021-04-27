import React from "react";
import styled from "styled-components";
import Typewriter from "typewriter-effect";
import CardFlipper from "./CardFlipper";

function Main() {
  return (
    <MainFrame>
      {/* <Typewriter
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
      /> */}
      <CardFlipper />
    </MainFrame>
  );
}

const MainFrame = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 50px;
  align-items: center;
  justify-content: space-between;
  font-size: 24px;
`;

export default Main;
