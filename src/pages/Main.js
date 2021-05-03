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

  React.useEffect(() => {
    if (getCookie("is_login")) {
      dispatch(answerActions.getQuestionAX());
      return;
    }
    dispatch(answerActions.getQuestionAX_NOTLOGIN());
  }, []);

  React.useEffect(() => {
    dispatch(answerActions.getRecentAnswerAX(answer_id));
  }, [answer_id]);

  const [current, setCurrent] = useState(0);
  const length = question_list?.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

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
            <SubRight>
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
            </SubRight>
          </MainUpper>
          {/* 메인 아래쪽 */}
          <MainLower>
            <Slider className="slider">
              <LeftArrow>
                <FaArrowAltCircleLeft
                  className="left-arrow"
                  onClick={prevSlide}
                />
              </LeftArrow>
              <RightArrow>
                <FaArrowAltCircleRight
                  className="rightt-arrow"
                  onClick={nextSlide}
                />
              </RightArrow>
              {/* 메인 카드 박스 */}

              {question_list?.map((q, idx) => {
                return (
                  <PostBox
                    className={idx === current ? "slide active" : "slide"}
                  >
                    {idx === current && (
                      <Post
                        key={idx + "msg"}
                        {...q}
                        // onClick={() => {
                        //   dispatch(changeQ(q));
                        // }}
                      />
                    )}
                  </PostBox>
                );
              })}
              {/* 디자인 용
            <Post {...question_list[0]} /> */}
            </Slider>
          </MainLower>
        </>
      )}
    </MainFrame>
  );
}

const Slider = styled.section`
  position: relative;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PostBox = styled.div``;

const RightArrow = styled.button`
  position: absolute;
  top: 50%;
  right: 32px;
  font-size: 3rem;
  z-index: 10;
  cursor: pointer;
  user-select: none;
`;
const LeftArrow = styled.button`
  position: absolute;
  top: 50%;
  left: 32px;
  font-size: 3rem;
  z-index: 10;
  cursor: pointer;
  user-select: none;
`;

const MainFrame = styled.div`
  padding-top: 10px;
  width: 100%;
  height: 100%;
`;

// 메인의 왼쪽 부분

const MainUpper = styled.section`
  display: flex;
  padding-left: 16px;
`;

const ToggleBox = styled.div``;

// 토글버튼 있어야한다..

const DateIndicator = styled.h2``;

const QuestionIndicator = styled.h3`
  margin: 20px 0;
`;

// const QuestionBox = styled.section`
//   & > div {
//     :hover {
//       background: yellow;
//       cursor: pointer;
//     }
//   }
// `;

// 메인의 오른쪽

const MainLower = styled.section`
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
