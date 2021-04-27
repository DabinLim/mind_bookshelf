import React from "react";
import styled, { keyframes } from "styled-components";
import Typewriter from "typewriter-effect";

import Question from "./Question";
import Post from "./Post";

import { Switch } from "antd";
import moment from "moment";

function Main() {
  function onChange(checked) {
    console.log(`switch to ${checked}`);
  }

  let today = moment().format("YYYY-MM-DD").split("-");
  let month = today[1];
  // 두 자리 수인데 한 자리 숫자인 경우는 04 -> 4 로 바꿔준다 & day 에도 마찬가지
  if (month.length === 2 && month[0] === "0") {
    month = month[1];
  }
  let day = today[2];
  if (day.length === 2 && day[0] === "0") {
    day = day[1];
  }

  let displayedDate = month + "월" + " " + day + "일";

  return (
    <MainFrame>
      {/* 메인 왼쪽 편 */}
      <MainLeft>
        <ToggleBox>
          <Switch />
        </ToggleBox>
        <DateIndicator>{displayedDate}</DateIndicator>
        <QuestionIndicator>User의 머리속은?</QuestionIndicator>
        {/* 메인 카드 박스 */}
        <QuestionBox>
          <Question />
          <Question />
          <Question />
        </QuestionBox>
      </MainLeft>
      {/* 메인 오른쪽 편 */}
      <MainRight>
        <SubLeft>
          <Post />
        </SubLeft>
        <SubRight>
          <AnsweringInfo>
            <AnsweringUsers>75명이 낙서중</AnsweringUsers>
            <ToCommunityBtn>더보기</ToCommunityBtn>
          </AnsweringInfo>
          <CommunitySeductor>
            <Question />
            <Question />
            <Question />
          </CommunitySeductor>
        </SubRight>
      </MainRight>
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
    </MainFrame>
  );
}

const MainFrame = styled.div`
  padding-top: 10px;
  width: 100%;
  height: 100%;
  display: flex;
`;

// 메인의 왼쪽 부분

const MainLeft = styled.section`
  flex-basis: 30%;
  padding-left: 16px;
`;

const ToggleBox = styled.div``;

// 토글버튼 있어야한다..

const DateIndicator = styled.h2``;

const QuestionIndicator = styled.h3``;

const QuestionBox = styled.section`
  & > div {
    :hover {
      background: yellow;
      cursor: pointer;
    }
  }
`;

// 메인의 오른쪽

const MainRight = styled.section`
  flex-basis: 70%;
  display: flex;
`;

const SubLeft = styled.div`
  flex-basis: 50%;
`;

const SubRight = styled.div`
  flex-basis: 50%;
  padding-left: 16px;
`;

const CommunitySeductor = styled.div`
  display: flex;
  & > div {
    margin-right: 8px;
  }

  & > div > span:hover {
    cursor: pointer;
  }
`;

const AnsweringInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 8px;
`;

const AnsweringUsers = styled.div``;

const ToCommunityBtn = styled.button`
  border: none;
  outline: none;
  background: none;
  cursor: pointer;
`;

// const bounce = keyframes`
//  from {
//     margin-left: 100%;
//   }

//   /* 60% {
//     font-size: 150%;
//     margin-left: 25%;
//   }

//   90% {
//     font-size: 100%;
//     margin-left: 10%;
//     transform: scale(1.1);
//   } */

//   90% {
//     transform: scale(1.1);
//   }

//   to {
//     margin-left: 0%;
//   }
//   /* 0% {
//     left: 0;
//     transform: scale(0)
//   }
//   50% {
//     transform: scale(.7)
//   }

//   100% {
//     transform: scale(1)
//   } */
// `;

// const CardFrame = styled.div`
//   animation: ${bounce} 2s;
// `;

export default Main;
