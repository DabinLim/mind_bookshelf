import React from "react";
import styled from "styled-components";
import { NewQuestion } from "./booksindex";
import { useDispatch, useSelector } from "react-redux";
import {
  api as customActions,
  setPage,
  setNext,
  resetCustomQuestion,
  setLoading,
} from "../../redux/modules/custom";
import InfinityScroll from "../../shared/InfinityScroll";
const MyAnswers = (props) => {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = React.useState(false);
  const answer_list = useSelector((state) => state.custom.custom_question);
  const answer_count = useSelector((state) => state.custom.custom_count);
  const user_info = useSelector((state) => state.user.user);
  const is_loading = useSelector((state) => state.custom.loading);
  const is_next = useSelector((state) => state.custom.next);
  const container = React.useRef();
  console.log(answer_list);
  React.useEffect(() => {
    dispatch(customActions.getMyAnswers());

    return () => {
      dispatch(resetCustomQuestion());
      dispatch(setPage(1));
      dispatch(setNext(true));
      dispatch(setLoading(true));
    };
  }, []);

  return (
    <React.Fragment>
      <Container>
        <Background />
        <TitleContainer>
          <Title>
            <span style={{ fontWeight: "600" }}>{user_info?.nickname}</span>님이 남긴 낙서는{" "}
            <span style={{ fontWeight: "600" }}>{user_info?.myAnswerCount}개</span>입니다.
          </Title>
        </TitleContainer>
        <CardContainer ref={container}>
          <InfinityScroll
            callNext={() => {
              console.log("scroooolled!");
              dispatch(customActions.getMyAnswers());
            }}
            is_next={is_next ? true : false}
            is_loading={is_loading}
            ref_value={container.current}
          >
            {answer_list &&
              answer_list.map((v, idx) => {
                return (
                  <Card key={idx} {...v}>
                    <Head>
                    </Head>
                    <QuestionContents>{v.contents}</QuestionContents>
                    <CreatedAtBox>
                      <CreatedAt>20{v.YYMMDD}</CreatedAt>
                    </CreatedAtBox>
                  </Card>
                );
              })}
          </InfinityScroll>
        </CardContainer>
      </Container>
      {modalVisible ? <NewQuestion setModalVisible={setModalVisible} /> : null}
    </React.Fragment>
  );
};

const Container = styled.section`
  position: relative;
  box-sizing: border-box;
  padding: 45px 10px 45px 45px;
  width: 100%;
  height: 100%;
  max-width: 988px;
  max-height: 632px;
  margin:50px auto;
  border-radius: 20px;
  overflow: hidden;
  @media (max-width: 500px) {
    padding: 20px;
    min-height: 300px;
  }
`;
const Background = styled.div`
  z-index: -1;
  position: absolute;
  top: 0;
  left: 0;
  max-width: 988px;
  width: 100%;
  padding: 100%;
  background-color: #ffffff;
  box-shadow: 0px 0px 20px;
  opacity: 0.3;
`;

const TitleContainer = styled.div`
  box-sizing: border-box;
  padding-right: 70px;
  width: 100%;
  height: 60px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 38px;
  @media (max-width: 500px) {
    padding-right: 10px;
    height: 30px;
  }
`;

const Title = styled.span`
  width: 230px;
  min-width: 230px;
  height: 60px;
  font-size: 22px;
  font-weight: 400;
  @media (max-width: 500px) {
    width: 200px;
    min-width: 200px;
    font-size: 18px;
  }
`;

const AddQuestion = styled.span`
  font-size: 16px;
  color: #061366;
  cursor: pointer;
  @media (max-width: 500px) {
    min-width: 40px;
    min-height: 40px;
    border-radius: 50%;
    background-color: lavender;
    text-align: center;
  }
`;

const AddText = styled.span`
  @media (max-width: 500px) {
    display: none;
  }
`;

const CardContainer = styled.section`
  box-sizing: border-box;
  padding-right: 50px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  overflow: auto;
  padding-bottom: 60px;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  max-width: 272px;
  max-height: 189px;
  margin: 0px 20px 25px 0px;
  background: #ffffff;
  box-shadow: 0px 0px 20px #0000001a;
  border-radius: 20px;
  box-sizing: border-box;
  padding: 18px;
`;

const Head = styled.div`
  width: 100%;
  height: 26px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const SubjectBox = styled.div`
  display: flex;
  flex-direction: row;
  width: 50%;
  height: 100%;
`;

const Subject = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 63px;
  height: 26px;
  opacity: 0.8;
  border-radius: 45px;
  font-size: 14px;
  font-weight: 600;
`;

const AnswerCount = styled.span`
  font-size: 11px;
`;

const QuestionContents = styled.span`
  font-size: 15px;
  font-weight: 600;
  width: 100%;
  height: 100%;
  margin-top: 17px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CreatedAtBox = styled.div`
  box-sizing: border-box;
  border-top: 1px solid #bbbbbb;
  padding-top: 13px;
`;

const CreatedAt = styled.span`
  font-size: 11px;
`;

export default MyAnswers;
