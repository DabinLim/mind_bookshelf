import React from "react";
import styled from "styled-components";
import { NewQuestion } from "./booksindex";
import { useDispatch, useSelector } from "react-redux";
import {
  api as customActions,
  resetAll,
  setView
} from "../../redux/modules/custom";
import InfinityScroll from "../../shared/InfinityScroll";
import {history} from '../../redux/configStore';

const MyQuestion = (props) => {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = React.useState(false);
  const custom_question = useSelector((state) => state.custom.custom_question);
  const pop_list = useSelector(state => state.custom.pop_list);
  const custom_count = useSelector((state) => state.custom.custom_count);
  const user_info = useSelector((state) => state.user.user);
  const is_loading = useSelector((state) => state.custom.loading);
  const pop_loading = useSelector(state => state.custom.pop_loading);
  const is_next = useSelector((state) => state.custom.next);
  const pop_next = useSelector(state => state.custom.pop_next);
  const now_view = useSelector(state => state.custom.now_view);
  const container = React.useRef();
  const pop_container = React.useRef();
  React.useEffect(() => {

    dispatch(customActions.getMyQuest());
    dispatch(customActions.getMyPopQuest());

    return () => {
      dispatch(resetAll());
    };
  }, []);

  return (
    <React.Fragment>
      <Container>
        <Background />
        <TitleContainer>
          <Title>
            <span style={{ fontWeight: "600" }}>{user_info?.nickname}</span>님의
            질문카드는{" "}
            <span style={{ fontWeight: "600" }}>{custom_count}개</span>입니다.
          </Title>
          <div style={{display:'flex',flexDirection:'column'}}>
          <AddQuestion
            onClick={() => {
              setModalVisible(true);
            }}
          >
            {" "}
            <AddBtn>
            <span style={{ fontSize: "24px" }}> + </span>
            <AddText> 질문 등록하기</AddText>
            <AddTextMobile>질문등록</AddTextMobile>
            </AddBtn>
          </AddQuestion>
          <FilterBtnBox>
          {now_view === "new" ? (
                  <FilterBtn
                    style={{ fontWeight: "bold" }}
                    onClick={() => {
                      dispatch(setView("new"));
                    }}
                  >
                    •<span style={{ marginLeft: "5px" }}>최신순</span>
                  </FilterBtn>
                ) : (
                  <FilterBtn
                    onClick={() => {
                      dispatch(setView("new"));
                    }}
                  >
                    최신순
                  </FilterBtn>
                )}
                {now_view === "pop" ? (
                  <FilterBtn
                    style={{ fontWeight: "bold" }}
                    onClick={() => {
                      dispatch(setView("pop"));
                    }}
                  >
                    •<span style={{ marginLeft: "5px" }}>답변순</span>
                  </FilterBtn>
                ) : (
                  <FilterBtn
                    onClick={() => {
                      dispatch(setView("pop"));
                    }}
                  >
                    답변순
                  </FilterBtn>
                )}
                </FilterBtnBox>
          </div>
        </TitleContainer>
        <CardContainer view={now_view} ref={container}>
          {now_view ==='new' && <InfinityScroll
            callNext={() => {
              
              console.log("scroooolled!");
              dispatch(customActions.getMyQuest());
            }}
            is_next={is_next ? true : false}
            is_loading={is_loading}
            ref_value={container.current}
          >
            {custom_question &&
              custom_question.map((v, idx) => {
                return (
                  <Card key={idx} {...v}>
                    <Head>
                      <SubjectBox>
                        {v.questionTopic?.length &&
                          v.questionTopic.map((v, idx) => {
                            
                            if (v === "사랑") {
                              return (
                                <Subject
                                  key={idx}
                                  style={{
                                    background: "#FFAAAA",
                                    boxShadow: "0px 0px 15px #FFAAAA",
                                  }}
                                >
                                  <span>#사랑</span>
                                </Subject>
                              );
                            }
                            if (v === "우정") {
                              return (
                                <Subject
                                  key={idx}
                                  style={{
                                    background: "#B9FFC4",
                                    boxShadow: "0px 0px 15px #B9FFC4",
                                  }}
                                >
                                  <span>#우정</span>
                                </Subject>
                              );
                            }
                            if (v === "꿈") {
                              return (
                                <Subject
                                  key={idx}
                                  style={{
                                    background: "#B7E6FF",
                                    boxShadow: "0px 0px 15px #B7E6FF",
                                  }}
                                >
                                  <span>#꿈</span>
                                </Subject>
                              );
                            }
                            if (v === "가치") {
                              return (
                                <Subject
                                  key={idx}
                                  style={{
                                    background: "#B5BDFF",
                                    boxShadow: "0px 0px 15px #B5BDFF",
                                  }}
                                >
                                  <span>#가치</span>
                                </Subject>
                              );
                            }
                            if (v === "관계") {
                              return (
                                <Subject
                                  key={idx}
                                  style={{
                                    background: "#FFF09D",
                                    boxShadow: "0px 0px 15px #FFF09D",
                                  }}
                                >
                                  <span>#관계</span>
                                </Subject>
                              );
                            }
                            if (v === "나") {
                              return (
                                <Subject
                                  key={idx}
                                  style={{
                                    background: "#F9D1FD",
                                    boxShadow: "0px 0px 15px #F9D1FD",
                                  }}
                                >
                                  <span>#나</span>
                                </Subject>
                              );
                            }
                          })}
                      </SubjectBox>
                      <AnswerCount>{v.answerCount}명 낙서중</AnswerCount>
                    </Head>
                    <QuestionContents onClick={() => {history.push(`/community/${v.questionId}`)}}>{v.questionContents}</QuestionContents>
                    <CreatedAtBox>
                      <CreatedAt >{v.questionCreatedAt}</CreatedAt>
                    </CreatedAtBox>
                  </Card>
                );
              })}
          </InfinityScroll>}
        </CardContainer>
        <CardContainerPop view={now_view} ref={pop_container}>
          {now_view ==='pop' && <InfinityScroll
            callNext={() => {
              
              console.log("scroooolled!");
              dispatch(customActions.getMyPopQuest());
            }}
            is_next={pop_next ? true : false}
            is_loading={pop_loading}
            ref_value={pop_container.current}
          >
            {pop_list &&
              pop_list.map((v, idx) => {
                return (
                  <Card key={idx} {...v}>
                    <Head>
                      <SubjectBox>
                        {v.questionTopic?.length &&
                          v.questionTopic.map((v, idx) => {
                            console.log(v);
                            if (v === "사랑") {
                              return (
                                <Subject
                                  key={idx}
                                  style={{
                                    background: "#FFAAAA",
                                    boxShadow: "0px 0px 15px #FFAAAA",
                                  }}
                                >
                                  <span>#사랑</span>
                                </Subject>
                              );
                            }
                            if (v === "우정") {
                              return (
                                <Subject
                                  key={idx}
                                  style={{
                                    background: "#B9FFC4",
                                    boxShadow: "0px 0px 15px #B9FFC4",
                                  }}
                                >
                                  <span>#우정</span>
                                </Subject>
                              );
                            }
                            if (v === "꿈") {
                              return (
                                <Subject
                                  key={idx}
                                  style={{
                                    background: "#B7E6FF",
                                    boxShadow: "0px 0px 15px #B7E6FF",
                                  }}
                                >
                                  <span>#꿈</span>
                                </Subject>
                              );
                            }
                            if (v === "가치") {
                              return (
                                <Subject
                                  key={idx}
                                  style={{
                                    background: "#B5BDFF",
                                    boxShadow: "0px 0px 15px #B5BDFF",
                                  }}
                                >
                                  <span>#가치</span>
                                </Subject>
                              );
                            }
                            if (v === "관계") {
                              return (
                                <Subject
                                  key={idx}
                                  style={{
                                    background: "#FFF09D",
                                    boxShadow: "0px 0px 15px #FFF09D",
                                  }}
                                >
                                  <span>#관계</span>
                                </Subject>
                              );
                            }
                            if (v === "나") {
                              return (
                                <Subject
                                  key={idx}
                                  style={{
                                    background: "#F9D1FD",
                                    boxShadow: "0px 0px 15px #F9D1FD",
                                  }}
                                >
                                  <span>#나</span>
                                </Subject>
                              );
                            }
                          })}
                      </SubjectBox>
                      <AnswerCount>{v.answerCount}명 낙서중</AnswerCount>
                    </Head>
                    <QuestionContents onClick={() => {history.push(`/community/${v.questionId}`)}}>{v.questionContents}</QuestionContents>
                    <CreatedAtBox>
                      <CreatedAt >{v.questionCreatedAt}</CreatedAt>
                    </CreatedAtBox>
                  </Card>
                );
              })}
          </InfinityScroll>}
        </CardContainerPop>
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
    width: 180px;
    min-width: 180px;
    font-size: 18px;
  }
`;

const AddBtn = styled.div`
  display:flex;
  flex-direction:row;
  align-items:center;
`;

const AddQuestion = styled.div`
  display:flex;
  flex-direction:column;
  font-size: 16px;
  color: #061366;
  cursor: pointer;
  min-width:100px;
  @media (max-width: 500px) {
    font-size:14px;
    align-items:flex-end;
  }
`;

const AddText = styled.span`
  @media (max-width: 500px) {
    display: none;
  }
`;
const AddTextMobile = styled.span`
  @media (min-width: 500px) {
    display: none;
  }
`;

const CardContainer = styled.section`
  box-sizing: border-box;
  padding-right: 50px;
  ${props => props.view === 'new' ? `width:100%`: `width:0`};
  ${props => props.view === 'new' ? `height:100%`: `height:0`};
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  overflow: auto;
  ${props => props.view === 'new' ? `padding-bottom:60px`: `padding-bottom:0px`};
`;

const CardContainerPop = styled.section`
  box-sizing: border-box;
  padding-right: 50px;
  ${props => props.view === 'pop' ? `width:100%`: `width:0`};
  ${props => props.view === 'pop' ? `height:100%`: `height:0`};
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  overflow: auto;
  ${props => props.view === 'pop' ? `padding-bottom:60px`: `padding-bottom:0px`};
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
  cursor:pointer;
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
  &:hover {
    font-weight:800;
    font-size:16px;
  }
`;

const CreatedAtBox = styled.div`
  box-sizing: border-box;
  border-top: 1px solid #bbbbbb;
  padding-top: 13px;
`;

const CreatedAt = styled.span`
  font-size: 11px;
`;

const FilterBtnBox = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  width: 100%;
  
`;

const FilterBtn = styled.button`
  cursor: pointer;
  max-width:80px;
  max-height: 17px;
  text-align: left;
  font: normal normal normal 14px/19px Roboto;
  border: none;
  outline: none;
  background: none;
  letter-spacing: -1px;
  margin-left: 5px;
  color: #333333;
  :hover {
    font-weight: bold;
  }
  
`;

export default MyQuestion;
