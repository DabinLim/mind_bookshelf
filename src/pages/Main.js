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
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
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

  const [dot_1, setDot1] = React.useState("preselectedDot");
  const [dot_2, setDot2] = React.useState("selectedDot");
  const [dot_3, setDot3] = React.useState("proselectedDot");

  const turnLeft = () => {
    if (card_1 === "selected") {
      setCard1("proselected");
      setCard2("preselected");
      setCard3("selected");

      setDot1("proselectedDot");
      setDot2("preselectedDot");
      setDot3("selectedDot");
    }
    if (card_2 === "selected") {
      setCard1("selected");
      setCard2("proselected");
      setCard3("preselected");

      setDot1("selectedDot");
      setDot2("proselectedDot");
      setDot3("preselectedDot");
    }
    if (card_3 === "selected") {
      setCard1("preselected");
      setCard2("selected");
      setCard3("proselected");

      setDot1("preselectedDot");
      setDot2("selectedDot");
      setDot3("proselectedDot");
    }
  };

  const turnRight = () => {
    if (card_1 === "selected") {
      setCard1("preselected");
      setCard2("selected");
      setCard3("proselected");

      setDot1("preselectedDot");
      setDot2("selectedDot");
      setDot3("proselectedDot");
    }
    if (card_2 === "selected") {
      setCard1("proselected");
      setCard2("preselected");
      setCard3("selected");

      setDot1("proselectedDot");
      setDot2("preselectedDot");
      setDot3("selectedDot");
    }
    if (card_3 === "selected") {
      setCard1("selected");
      setCard2("proselected");
      setCard3("preselected");

      setDot1("selectedDot");
      setDot2("proselectedDot");
      setDot3("preselectedDot");
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
            <DotQueue>
              <FiberManualRecordIcon
                style={{
                  fontSize: "20px",
                  margin: "0 5px",
                }}
                className={dot_1}
              />
              <FiberManualRecordIcon
                style={{
                  fontSize: "20px",
                  margin: "0 5px",
                }}
                className={dot_2}
              />
              <FiberManualRecordIcon
                style={{
                  fontSize: "20px",
                  margin: "0 5px",
                }}
                className={dot_3}
              />
            </DotQueue>
            <DateIndicator>{displayedDate}</DateIndicator>
            <QuestionIndicator>
              <b>{user_info?.nickname ? user_info?.nickname : "고객"}님</b>의
              머리속은?
            </QuestionIndicator>
          </MainUpper>
          {/* 메인 아래쪽 */}
          <MainLower>
            <div>
              <SlideBox>
                <LeftArrowBtn onClick={turnLeft}>
                  <ArrowBackIosIcon
                    style={{
                      fontSize: "60px",
                    }}
                  />
                </LeftArrowBtn>
                <RightArrowBtn onClick={turnRight}>
                  <ArrowForwardIosIcon
                    style={{
                      fontSize: "60px",
                    }}
                  />
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
            </div>
          </MainLower>
        </>
      )}
    </MainFrame>
  );
}

const MainFrame = styled.div`
  width: 100%;
  height: 100%;
`;

// 메인의 위쪽 부분

const MainUpper = styled.section`
  margin-top: 150px;
  text-align: center;
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
  margin-top: 300px;
  display: flex;
  position: relative;
  flex-direction: column;
`;

const EachCard = styled.div`
  width: 100%;
  border-top-left-radius: none;
`;

const CardContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
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
  left: 140px;
  top: -50px;
  color: #ffffff;
  cursor: pointer;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 20px;
  background: none;

  :hover {
    transform: scale(1.1);
    box-shadow: 0px 0px 20px #0000001f;
  }
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
  right: 140px;
  top: -50px;
  background: none;
  color: #ffffff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 20px;
  background: none;

  :hover {
    transform: scale(1.1);
    box-shadow: 0px 0px 20px #0000001f;
  }
`;

const DotQueue = styled.div`
  display: flex;
  justify-content: center;
  position:absolute;
  top:850px;
  left:45%;
`;

export default Main;
