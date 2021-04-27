import React from "react";
import styled, { keyframes } from "styled-components";
import Typewriter from "typewriter-effect";
import CardFlipper from "./CardFlipper";

function Main() {
  return (
    <MainFrame>
      <>
        {/* <Typewriter
          onInit={(typewriter) => {
            typewriter
              .typeString("하고 싶은 일과 잘하고 싶은 일, 무엇을 해야 할까요?")
              .pauseFor(4000)
              .deleteAll()
              .typeString("당신의 생각은 무엇인가요?")
              .start();
          }}
        /> */}
        <CardFrame>
          <CardFlipper />
        </CardFrame>
      </>
    </MainFrame>
  );
}

const MainFrame = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 40px;
  align-items: center;
  justify-content: space-between;
  font-size: 24px;
`;

const bounce = keyframes`
 from {
    margin-left: 100%;
  }

  /* 60% {
    font-size: 150%;
    margin-left: 25%;
  }

  90% {
    font-size: 100%;
    margin-left: 10%;
    transform: scale(1.1);
  } */

  90% {
    transform: scale(1.1);
  }

  to {
    margin-left: 0%;
  }
  /* 0% {
    left: 0;
    transform: scale(0)
  }
  50% {
    transform: scale(.7)
  }

  100% {
    transform: scale(1)
  } */
`;

const CardFrame = styled.div`
  animation: ${bounce} 2s;
`;

export default Main;
