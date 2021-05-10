import React from "react";
import styled from "styled-components";
import Loader from "react-loader-spinner";
import { api as answerActions } from "../redux/modules/answer";
import { useDispatch, useSelector } from "react-redux";
import { getCookie } from "../shared/Cookie";
import { history } from "../redux/configStore";
import moment from "moment";
import Post from "../components/Main/Post";
import { RightOutlined } from "@ant-design/icons";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import "../static/Card.css";

function Main() {
  const dispatch = useDispatch();
  // 유저 인포 확인하는 것 (아마 이 안에서 is_login 으로 확인해야할듯)
  const user_info = useSelector((state) => state.user.is_login);
  const user = useSelector((state) => state.user.user);
  // 스피너 먹이려고
  const is_loading = useSelector((state) => state.answer.is_loading);

  // 날짜 지정
  let today = moment().format("YYYY-MM-DD").split("-");
  let month = today[1];
  // 두 자리 수인데 한 자리 숫자인 경우는 04 -> 4 로 바꿔준다 & day 에도 마찬가지
  if (month.length === 2 && month[0] === "0") {
    month = month[1];
  }
  let day = today[2];

  let displayedDate = month + "월" + " " + day + "일";

  // 질문 카드 받아오기
  const question_list = useSelector((state) => state.answer.question_list);
  // 질문 카드 답변 상태 알아내기
  const checkedAvailable = question_list?.map((a) => {
    return a.available;
  });
  // allChecked 의 기본값을 false 로 두고 마지막 질문까지 작성이 되었을시에 allchecked true 로 바뀜
  let allChecked = false;
  if (checkedAvailable.reduce((a, b) => a + b, 0) === 0) {
    allChecked = true;
  }

  // 슬라이드 & 점점점 만들기 (클래스 이름을 state 변경때마다 바꿔주면서 애니메이션 준다)
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

  // 렌더링시 로그인 상태 확인하고 질문카드 뿌려주는 것
  React.useEffect(() => {
    if (getCookie("is_login")) {
      dispatch(answerActions.getQuestionAX());
      return;
    }
    dispatch(answerActions.getQuestionAX_NOTLOGIN());
  }, []);

  return (
    <MainFrame>
      <ImgLeft />
      <ImgRight />
      {is_loading ? (
        <LoaderBox></LoaderBox>
      ) : (
        <MainContainer>
          {/* 메인 위쪽 편 */}
          <MainUpper>
            <DateIndicator>{displayedDate}</DateIndicator>
            <QuestionIndicator>
              <b>{user?.nickname ? user?.nickname + "님" : "당신"}</b>의
              머리속은?
            </QuestionIndicator>
            {user_info ? (
              <ToMyBookShelf
                onClick={() => {
                  history.push("/mybook");
                }}
              >
                나의 책장으로 가기 <RightOutlined />
              </ToMyBookShelf>
            ) : null}
          </MainUpper>
          {/* 메인 아래쪽 */}
          <SlideBox>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <LeftArrowBtn onClick={turnLeft}>
                <ArrowBackIosIcon
                  style={{
                    fontSize: "60px",
                  }}
                />
              </LeftArrowBtn>
              <CardContainer>
                <EachCard className={card_1}>
                  <Post {...question_list[0]} allChecked={allChecked} />
                </EachCard>
                <EachCard className={card_2}>
                  <Post {...question_list[1]} allChecked={allChecked} />
                </EachCard>
                <EachCard className={card_3}>
                  <Post {...question_list[2]} allChecked={allChecked} />
                </EachCard>
              </CardContainer>
              <RightArrowBtn onClick={turnRight}>
                <ArrowForwardIosIcon
                  style={{
                    fontSize: "60px",
                  }}
                />
              </RightArrowBtn>
            </div>
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
          </SlideBox>
        </MainContainer>
      )}
    </MainFrame>
  );
}

const MainFrame = styled.div`
  width: 100%;
  // height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: auto;
`;

const MainContainer = styled.div`
  height: 100vh;
  margin: 120px 0px 0px 0px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow: auto;
  ::-webkit-scrollbar {
    width: 10px; /* width of the entire scrollbar */
  }

  ::-webkit-scrollbar-track {
    background: none; /* color of the tracking area */
  }

  ::-webkit-scrollbar-thumb {
    background-color: #ffffff; /* color of the scroll thumb */
    border-radius: 20px; /* roundness of the scroll thumb */
  }
`;
// LoaderBox

const LoaderBox = styled.div`
  width: 100vh;
  height: 100vh;
`;

// 메인의 위쪽 부분

const MainUpper = styled.section`
  margin-top:80px;
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

const ToMyBookShelf = styled.button`
  margin: 0;
  background: none;
  outline: none;
  border: none;
  cursor: pointer;
  font-size: 14px;
  font: normal normal medium 14px/19px Roboto;
  letter-spacing: 0px;
  color: #333333;
  opacity: 1;
`;

// 메인의 아래쪽
const SlideBox = styled.div`
  width: auto;
  // height: 100%;
  display: flex;
  position: relative;
  flex-direction: column;
  margin:120px 100px 0px 100px;
  
`;

const EachCard = styled.div`
  width: 100%;
  border-top-left-radius: none;
`;

const CardContainer = styled.div`
  width:100%;
  max-width: 900px;
  height: 470px;
  // margin-top: 200px
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LeftArrowBtn = styled.button`
  z-index: 2;
  width: 109px;
  height: 109px;
  border-radius: 50%;
  outline: none;
  border: none;
  opacity: 1;
  // position: absolute;
  // left: 15%;
  // top: 30%;
  color: #ffffff;
  cursor: pointer;
  text-align: center;
  // display: flex;
  // align-items: center;
  // justify-content: center;
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
  // position: absolute;
  // right: 15%;
  // top: 30%;
  background: none;
  color: #ffffff;
  cursor: pointer;
  // display: flex;
  // align-items: center;
  // justify-content: center;
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
  margin-top: 50px;
  margin-bottom: 80px;
`;

const ImgRight = styled.div`
  z-index: 2;
  position: fixed;
  background-image: url("https://user-images.githubusercontent.com/77574867/116996886-0c785d80-ad17-11eb-9afd-175a104b7f33.png");
  background-size: contain;
  background-repeat: no-repeat;
  right: -70px;
  bottom: -13px;
  width: 593px;
  height: 731px;
  opacity: 0.8;
  pointer-events: none;
  @media (max-width: 1400px) {
    display: none;
  }
`;

const ImgLeft = styled.div`
  z-index: 2;
  position: fixed;
  background-image: url("https://user-images.githubusercontent.com/77574867/116996878-0b473080-ad17-11eb-8910-108950e25cb8.png");
  background-size: contain;
  background-repeat: no-repeat;
  left: -20px;
  top: 249px;
  width: 365px;
  height: 341px;
  opacity: 0.8;
  pointer-events: none;
  @media (max-width: 1400px) {
    display: none;
  }
`;

export default Main;
