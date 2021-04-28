import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import Typewriter from "typewriter-effect";

import Question from "./Question";
import RecentQuestion from "./RecentQuestion";
import Post from "./Post";
import answer, { api as answerActions } from "../redux/modules/answer";
import { changeQ } from "../redux/modules/answer";
import { useDispatch, useSelector } from "react-redux";

import { Switch } from "antd";
import moment from "moment";

function Main() {
  const dispatch = useDispatch();
  const user_info = useSelector((state) => state.user.user);
  // function onChange(checked) {
  //   console.log(`switch to ${checked}`);
  // }

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

  const question_list = useSelector((state) => state.answer.question_list);
  const question_info = useSelector((state) => state.answer.question);
  const answer_list = useSelector((state) => state.answer.answer_list);
  const answer_id = useSelector((state) => state.answer.answer_id);

  React.useEffect(() => {
    dispatch(answerActions.getQuestionAX());
  }, []);

  React.useEffect(() => {
    dispatch(answerActions.getRecentAnswerAX(answer_id));
  }, [answer_id]);

  return (
    <MainFrame>
      {/* 메인 왼쪽 편 */}
      <MainLeft>
        <ToggleBox>
          <Switch />
        </ToggleBox>
        <DateIndicator>{displayedDate}</DateIndicator>
        <QuestionIndicator>
          <b>{user_info?.nickname}님</b>의 머리속은?
        </QuestionIndicator>
        {/* 메인 카드 박스 */}
        <QuestionBox>
          {question_list?.map((q, idx) => {
            return (
              <>
                <Question
                  key={idx + "msg"}
                  {...q}
                  onClick={() => {
                    dispatch(changeQ(q));
                  }}
                />
              </>
            );
          })}
        </QuestionBox>
      </MainLeft>
      {/* 메인 오른쪽 편 */}
      <MainRight>
        <SubLeft>
          <Post {...question_info} />
        </SubLeft>
        <SubRight>
          <AnsweringInfo>
            <AnsweringUsers>
              <b>{question_info?.answerCount}</b>명이 낙서중
            </AnsweringUsers>
            <ToCommunityBtn>더보기</ToCommunityBtn>
          </AnsweringInfo>
          <CommunitySeductor>
            {answer_list?.map((a, idx) => {
              return (
                <>
                  <RecentQuestion key={idx + "msg"} {...a} />
                </>
              );
            })}
          </CommunitySeductor>
        </SubRight>
      </MainRight>
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

const QuestionIndicator = styled.h3`
  margin: 40px 0;
`;

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
  flex-direction: column;
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

export default Main;
