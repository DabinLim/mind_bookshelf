import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import Typewriter from "typewriter-effect";
import Loader from "react-loader-spinner";
import { Question, RecentQuestion, Post } from "../components/Main/mainindex";
import { api as answerActions } from "../redux/modules/answer";
import { changeQ, setLoading } from "../redux/modules/answer";
import { useDispatch, useSelector } from "react-redux";
import { getCookie } from "../shared/Cookie";
import { history } from "../redux/configStore";
import moment from "moment";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import { Carousel } from "3d-react-carousal";
import '../static/Card.css'

function Main() {
  const dispatch = useDispatch();
  const user_info = useSelector((state) => state.user.user);
  const is_loading = useSelector((state) => state.answer.is_loading);

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
  console.log(question_list);
  const question_info = useSelector((state) => state.answer.question);
  const answer_list = useSelector((state) => state.answer.answer_list);
  const answer_id = useSelector((state) => state.answer.answer_id);
  const isChanged = useSelector((state) => state.answer.isChanged);
  const [card_1, setCard1 ] = React.useState('preselected');
  const [card_2, setCard2 ] = React.useState('selected');
  const [card_3, setCard3 ] = React.useState('proselected');

  const turnLeft = () => {
    if(card_1 === 'selected'){
      setCard1('proselected');
      setCard2('preselected');
      setCard3('selected');
    }
    if(card_2 === 'selected'){
      setCard1('selected');
      setCard2('proselected');
      setCard3('preselected');
    }
    if(card_3 === 'selected'){
      setCard1('preselected');
      setCard2('selected');
      setCard3('proselected');
    }
  }

  const turnRight = () => {
    
  }

  React.useEffect(() => {
    if (getCookie("is_login")) {
      dispatch(answerActions.getQuestionAX());
      return;
    }
    dispatch(answerActions.getQuestionAX_NOTLOGIN());
  }, [isChanged]);

  React.useEffect(() => {
    dispatch(answerActions.getRecentAnswerAX(answer_id));
  }, [answer_id]);

  let slides = question_list?.map((q) => {
    return <Post {...q} />;
  });

  const num = [1,2,3];

  return (
    <MainFrame>
      {is_loading ? (
        <Loader type="Oval" color="#3d66ba" height={20} width={20} />
      ) : (
        <>
          {/* 메인 위쪽 편 */}
          <MainUpper>
            <SubLeft>
              <DateIndicator>{displayedDate}</DateIndicator>
              <QuestionIndicator>
                <b>{user_info?.nickname ? user_info?.nickname : "고객"}님</b>의
                머리속은?
              </QuestionIndicator>
            </SubLeft>
            {/* <SubRight>
              <AnsweringInfo>
                <AnsweringUsers>
                  <b>{question_info?.answerCount}</b>명이 낙서중
                </AnsweringUsers>
                <ToCommunityBtn
                  onClick={() => {
                    history.push(`/community/${answer_id}`);
                  }}
                >
                  더보기
                </ToCommunityBtn>
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
            </SubRight> */}
          </MainUpper>
          {/* 메인 아래쪽 */}
          <MainLower>
            {/* <Carousel slides={slides} autoplay={false} /> */}
            <Fuck>
              <button onClick={turnLeft}>left</button>
            <CardContainer>
              <div className={card_1}>1</div>
              <div className={card_2}>2</div>
              <div className={card_3}>3</div>
            </CardContainer>
              <button onClick={turnRight}>right</button>
            </Fuck>
          </MainLower>
        </>
      )}
    </MainFrame>
  );
}

const MainFrame = styled.div`
  padding-top: 10px;
  width: 100%;
  height: 100%;
`;

// 메인의 위쪽 부분

const MainUpper = styled.section`
  display: flex;
  justify-content: center;
`;

// 토글버튼 있어야한다..

const DateIndicator = styled.h2`
  text-align: center;
  text-align: center;
  font: normal normal bold 20px/26px Roboto;
  letter-spacing: 0px;
  color: #262626;
  opacity: 1;
`;

const QuestionIndicator = styled.h3`
  text-align: center;
  font: normal normal normal 46px/60px Roboto;
  letter-spacing: 0px;
  color: #262626;
`;

// 메인의 아래쪽

const MainLower = styled.section`
  display: flex;
  flex-direction: column;
`;

const Fuck = styled.div`
  width:100%;
  height:100%;
  display:flex;
  flex-direction:row;
`;

const CardContainer = styled.div`
  width:1000px;
  height:100vh;
  display:flex;
  flex-direction:row;
  justify-content:center;
  align-items:center;
`;


const SubLeft = styled.div`
  padding: 100px 0;
`;
export default Main;
