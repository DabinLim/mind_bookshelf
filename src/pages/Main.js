import React from "react";
import styled from "styled-components";
import Loader from "react-loader-spinner";
import { api as answerActions } from "../redux/modules/answer";
import { useDispatch, useSelector } from "react-redux";
import { getCookie } from "../shared/Cookie";
import { history } from "../redux/configStore";
import moment from "moment";
import Post from "../components/Main/Post";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import "../static/Card.css";

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
  const question_info = useSelector((state) => state.answer.question);
  const answer_list = useSelector((state) => state.answer.answer_list);
  const answer_id = useSelector((state) => state.answer.answer_id);
  const user_id = useSelector((state) => state.user.user.id);
  // const is_changed = useSelector((state) => state.answer.is_changed);
  const [card_1, setCard1] = React.useState("preselected");
  const [card_2, setCard2] = React.useState("selected");
  const [card_3, setCard3] = React.useState("proselected");

  const turnLeft = () => {
    if (card_1 === "selected") {
      setCard1("proselected");
      setCard2("preselected");
      setCard3("selected");
    }
    if (card_2 === "selected") {
      setCard1("selected");
      setCard2("proselected");
      setCard3("preselected");
    }
    if (card_3 === "selected") {
      setCard1("preselected");
      setCard2("selected");
      setCard3("proselected");
    }
  };

  const turnRight = () => {
    if (card_1 === "selected") {
      setCard1("preselected");
      setCard2("selected");
      setCard3("proselected");
    }
    if (card_2 === "selected") {
      setCard1("proselected");
      setCard2("preselected");
      setCard3("selected");
    }
    if (card_3 === "selected") {
      setCard1("selected");
      setCard2("proselected");
      setCard3("preselected");
    }
  };

  React.useEffect(() => {
    if (getCookie("is_login")) {
      dispatch(answerActions.getQuestionAX());
      dispatch(answerActions.getRecentAnswerAX(user_id));
      return;
    }
    dispatch(answerActions.getQuestionAX_NOTLOGIN());
  }, []);

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
          </MainUpper>
          {/* 메인 아래쪽 */}
          <MainLower>
            <SlideBox>
              <LeftArrowBtn onClick={turnLeft}>
                <LeftOutlined />
              </LeftArrowBtn>
              <RightArrowBtn onClick={turnRight}>
                <RightOutlined />
              </RightArrowBtn>
              <CardContainer>
                <EachCard className={card_1}>
                  <Post {...question_list[0]} />
                </EachCard>
                <EachCard className={card_2}>
                  <Post {...question_list[1]} />
                </EachCard>
                <EachCard className={card_3}>
                  <Post {...question_list[2]} />
                </EachCard>
              </CardContainer>
            </SlideBox>
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

const MainLower = styled.section``;

const SlideBox = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  position: relative;
`;

const EachCard = styled.div`
  width: 100%;
  border-top-left-radius: none;
`;

const CardContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const SubLeft = styled.div`
  padding: 100px 0;
`;

const LeftArrowBtn = styled.button`
  z-index: 2;
  width: 109px;
  height: 109px;
  border-radius: 50%;
  outline: none;
  border: none;
  opacity: 1;
  position: absolute;
  left: 60px;
  top: 300px;
  font-size: 30px;
  background: white;
  color: #c4c4c4;
  box-shadow: 0px 0px 20px #0000001f;
  cursor: pointer;
`;

const RightArrowBtn = styled.button`
  z-index: 2;
  width: 109px;
  height: 109px;
  border-radius: 50%;
  outline: none;
  border: none;
  opacity: 1;
  position: absolute;
  right: 60px;
  top: 300px;
  font-size: 30px;
  background: white;
  color: #c4c4c4;
  box-shadow: 0px 0px 20px #0000001f;
  cursor: pointer;
`;
export default Main;
