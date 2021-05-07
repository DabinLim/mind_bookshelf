import React from "react";
import styled from "styled-components";
import AnswerCard from "../../shared/AnswerCard2";
// import {response} from '../redux/Mock/Answers';
import { useDispatch, useSelector } from "react-redux";
import {
  api as moreviewActions,
  resetAll,
  setView,
} from "../../redux/modules/moreview";

const QuestionDetail = (props) => {
  const dispatch = useDispatch();
  const url = window.location.href.split("/");
  const id = url[url.length - 1];
  const now_view = useSelector((state) => state.moreview.now_view);
  const question_info = useSelector((state) => state.moreview.question_info);
  console.log(question_info);
  const answers = useSelector((state) => state.moreview.answers);
  const like_answers = useSelector((state) => state.moreview.like_answers);
  const friends_answers = useSelector(
    (state) => state.moreview.friends_answers
  );

  React.useEffect(() => {
    dispatch(moreviewActions.getQuestionInfo(id));
    dispatch(moreviewActions.getAnswers(id));
    return () => {
      dispatch(resetAll());
    };
  }, []);

  let color = "";
  let topic = "";
  if (question_info?.questionTopic?.length > 0) {
    topic = question_info?.questionTopic[0];
    if (question_info?.questionTopic[0] === "나") {
      color = "#F9D9FC";
    } else if (question_info?.questionTopic[0] === "사랑") {
      color = "#FEBABA";
    } else if (question_info?.questionTopic[0] === "관계") {
      color = "#FDF1AE";
    } else if (question_info?.questionTopic[0] === "가치") {
      color = "#C2C8FD";
    } else if (question_info?.questionTopic[0] === "우정") {
      color = "#C4FCCD";
    } else if (question_info?.questionTopic[0] === "꿈") {
      color = "#C3E9FD";
    }
  }

  return (
    <React.Fragment>
      <CommunityContainer>
        <Container>
          <ContainerUpper>
            <ContainerUpperLeft>
              <HashTag style={{ background: color }}>#{topic}</HashTag>
              <QuestionTitle>
                {question_info ? question_info.questionContents : "질문 내용"}
              </QuestionTitle>
            </ContainerUpperLeft>
            <FilterBtnBox>
              <FilterBtn
                onClick={() => {
                  dispatch(moreviewActions.getAnswers(id));
                  dispatch(setView("new"));
                }}
              >
                최신순
              </FilterBtn>
              <FilterBtn
                onClick={() => {
                  dispatch(moreviewActions.getLikeAnswer(id));
                  dispatch(setView("like"));
                }}
              >
                인기순
              </FilterBtn>
              <FilterBtn
                onClick={() => {
                  dispatch(moreviewActions.getFriendsAnswer(id));
                  dispatch(setView("friends"));
                }}
              >
                팔로우
              </FilterBtn>
            </FilterBtnBox>
          </ContainerUpper>
          <AnswersBox>
            {now_view === "new" &&
              answers.length &&
              answers.map((v, idx) => {
                return <AnswerCard key={idx} {...v} />;
              })}
            {now_view === "like" &&
              like_answers.length &&
              like_answers.map((v, idx) => {
                return <AnswerCard key={idx} {...v} />;
              })}
            {now_view === "friends" &&
              friends_answers.length &&
              friends_answers.map((v, idx) => {
                return <AnswerCard key={idx} {...v} />;
              })}
          </AnswersBox>
        </Container>
      </CommunityContainer>
    </React.Fragment>
  );
};

const CommunityContainer = styled.div`
  z-index: 2;
  width: 100%;
  box-sizing: border-box;
  margin: 230px 407px 0px 272px;
  // height:100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: auto;
`;

const Container = styled.section`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  ::-webkit-scrollbar {
    width: 12px; /* width of the entire scrollbar */
  }

  ::-webkit-scrollbar-track {
    background: white; /* color of the tracking area */
  }

  ::-webkit-scrollbar-thumb {
    background-color: #d8d9dc; /* color of the scroll thumb */
    border-radius: 20px; /* roundness of the scroll thumb */
  }
`;

const ContainerUpper = styled.div`
  display: flex;
`;

const ContainerUpperLeft = styled.div`
  display: flex;
  flex-direction: column;
`;

const QuestionTitle = styled.h2`
  font: normal normal bold 30px/39px Roboto;
  letter-spacing: 0px;
  width: 60%;
  margin: 29px 0 0 0;
`;

const HashTag = styled.span`
  min-width: 72px;
  max-width: 72px;
  max-height: 31px;
  background: #ededed;
  padding: 8px 12px;
  border-radius: 24px;
  text-align: center;
  font: normal normal bold 14px/19px Roboto;
  box-shadow: 0px 0px 15px #c1c7fc;
  letter-spacing: 0px;
  color: #363636;
  font-size: 14px;
  margin-right: 10px;
  :hover {
    cursor: pointer;
  }
`;

const FilterBtnBox = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  width: 40%;
`;

const FilterBtn = styled.button`
  cursor: pointer;
  max-width: 60px;
  max-height: 17px;
  text-align: left;
  font: normal normal normal 14px/19px Roboto;
  border: none;
  outline: none;
  background: none;
  letter-spacing: -1px;
  margin-right: 5px;
  color: #333333;
`;

const AnswersBox = styled.div`
  margin: 40px 0px;
  width: 100%;
  max-height: 649px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  overflow-y: auto;
  ::-webkit-scrollbar {
    width: 12px; /* width of the entire scrollbar */
  }

  ::-webkit-scrollbar-track {
    background: white; /* color of the tracking area */
  }

  ::-webkit-scrollbar-thumb {
    background-color: #d8d9dc; /* color of the scroll thumb */
    border-radius: 20px; /* roundness of the scroll thumb */
  }
`;

export default QuestionDetail;
