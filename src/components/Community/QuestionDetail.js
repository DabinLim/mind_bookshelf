import React, { useState } from "react";
import styled from "styled-components";
import AnswerCard from "../../shared/AnswerCard2";
// import {response} from '../redux/Mock/Answers';
import { useDispatch, useSelector } from "react-redux";
import {
  api as moreviewActions,
  resetAll,
  setView,
} from "../../redux/modules/moreview";
import InfinityScroll from "../../shared/InfinityScroll";
import { getCookie } from "../../shared/Cookie";
import swal from "sweetalert";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import CardModal from "./CardModal";
import { api as commentActions } from "../../redux/modules/comment";
import { api as communityActions } from "../../redux/modules/community";

const QuestionDetail = (props) => {
  const dispatch = useDispatch();
  const url = window.location.href.split("/");
  const id = url[url.length - 1];
  const is_login = useSelector((state) => state.user.is_login);
  const now_view = useSelector((state) => state.moreview.now_view);
  const question_info = useSelector((state) => state.moreview.question_info);
  const answers = useSelector((state) => state.moreview.answers);
  const like_answers = useSelector((state) => state.moreview.like_answers);
  const friends_answers = useSelector(
    (state) => state.moreview.friends_answers
  );
  console.log(friends_answers);
  const user_info = useSelector((state) => state.user.user);
  const next = useSelector((state) => state.moreview.next);
  const like_next = useSelector((state) => state.moreview.like_next);
  const friends_next = useSelector((state) => state.moreview.friends_next);
  const is_loading = useSelector((state) => state.moreview.is_loading);
  const like_loading = useSelector((state) => state.moreview.like_loading);
  const friends_loading = useSelector(
    (state) => state.moreview.firends_loading
  );
  const [openFilter, setOpenFilter] = React.useState(false);
  const [cardModal, setCardModal] = useState(false);
  const container = React.useRef();
  const like_container = React.useRef();
  const friends_container = React.useRef();

  const openCard = (a) => {
    const type = "detail";
    dispatch(communityActions.getCardDetail(a, type));
    dispatch(commentActions.getCommentAX(a));
    setCardModal(true);
  };

  const closeCardModal = () => {
    setCardModal(false);
  };

  React.useEffect(() => {
    dispatch(moreviewActions.getQuestionInfo(id));
    dispatch(moreviewActions.getAnswers(id));
    dispatch(moreviewActions.getLikeAnswer(id));
    dispatch(moreviewActions.getFriendsAnswer(id));
    return () => {
      dispatch(resetAll());
    };
  }, []);

  // let color = "";
  // let topic = "";
  // let boxShadow = "";
  // if (question_info?.questionTopic?.length > 0) {
  //   topic = question_info?.questionTopic[0];
  //   if (question_info?.questionTopic[0] === "나") {
  //     color = "#F9D9FC";
  //     boxShadow = "0px 0px 15px #F9D1FD";
  //   } else if (question_info?.questionTopic[0] === "사랑") {
  //     color = "#FEBABA";
  //     boxShadow = "0px 0px 15px #FFAAAA";
  //   } else if (question_info?.questionTopic[0] === "관계") {
  //     color = "#FDF1AE";
  //     boxShadow = "0px 0px 15px #FFF09D";
  //   } else if (question_info?.questionTopic[0] === "가치") {
  //     color = "#C2C8FD";
  //     boxShadow = "0px 0px 15px #B5BDFF";
  //   } else if (question_info?.questionTopic[0] === "우정") {
  //     color = "#C4FCCD";
  //     boxShadow = "0px 0px 15px #B9FFC4";
  //   } else if (question_info?.questionTopic[0] === "꿈") {
  //     color = "#C3E9FD";
  //     boxShadow = "0px 0px 15px #B7E6FF";
  //   }
  // }

  return (
    <React.Fragment>
      <Outer>
        {cardModal ? <CardModal close={closeCardModal} /> : null}
        <CommunityContainer>
          <Container>
            <ContainerUpper>
              <ContainerUpperLeft>
                <HashTag
                  style={{
                    background: "#B5BDFF",
                    boxShadow: "0px 0px 15px #C3C9FE",
                    overflow: "visible",
                  }}
                >
                  <span>#{question_info?.questionTopic[0]}</span>
                </HashTag>
                <QuestionTitle>
                  {question_info ? question_info.questionContents : "질문 내용"}
                </QuestionTitle>
              </ContainerUpperLeft>
              <FilterBtnBoxMobile>
                <FilterToggle>
                  {now_view === "new" && <span>최신순</span>}
                  {now_view === "like" && <span>인기순</span>}
                  {now_view === "friends" && <span>구독자</span>}
                  {openFilter ? (
                    <ArrowForwardIosIcon
                      onClick={() => {
                        setOpenFilter(false);
                      }}
                      style={{
                        cursor: "pointer",
                        color: "black",
                        fontSize: "12px",
                        transform: "rotateZ(270deg)",
                        marginLeft: "5px",
                      }}
                    />
                  ) : (
                    <ArrowForwardIosIcon
                      onClick={() => {
                        setOpenFilter(true);
                      }}
                      style={{
                        cursor: "pointer",
                        color: "black",
                        fontSize: "12px",
                        transform: "rotateZ(90deg)",
                        marginLeft: "5px",
                      }}
                    />
                  )}
                </FilterToggle>
                {openFilter && now_view === "new" && (
                  <>
                    <span
                      onClick={() => {
                        dispatch(setView("like"));
                      }}
                    >
                      인기순
                    </span>
                    <span
                      onClick={() => {
                        dispatch(setView("friends"));
                      }}
                    >
                      팔로우
                    </span>
                  </>
                )}
                {openFilter && now_view === "like" && (
                  <>
                    <span
                      onClick={() => {
                        dispatch(setView("new"));
                      }}
                    >
                      최신순
                    </span>
                    <span
                      onClick={() => {
                        dispatch(setView("friends"));
                      }}
                    >
                      팔로우
                    </span>
                  </>
                )}
                {openFilter && now_view === "friends" && (
                  <>
                    <span
                      onClick={() => {
                        dispatch(setView("new"));
                      }}
                    >
                      최신순
                    </span>
                    <span
                      onClick={() => {
                        dispatch(setView("like"));
                      }}
                    >
                      인기순
                    </span>
                  </>
                )}
              </FilterBtnBoxMobile>
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
                {now_view === "like" ? (
                  <FilterBtn
                    style={{ fontWeight: "bold" }}
                    onClick={() => {
                      dispatch(setView("like"));
                    }}
                  >
                    •<span style={{ marginLeft: "5px" }}>인기순</span>
                  </FilterBtn>
                ) : (
                  <FilterBtn
                    onClick={() => {
                      dispatch(setView("like"));
                    }}
                  >
                    인기순
                  </FilterBtn>
                )}
                {now_view === "friends" ? (
                  <FilterBtn
                    style={{ fontWeight: "bold" }}
                    onClick={() => {
                      if (!is_login) {
                        swal({
                          title: "접근 실패",
                          text: "로그인 후 이용 가능합니다❕",
                          icon: "info",
                        });
                        return;
                      }
                      dispatch(setView("friends"));
                    }}
                  >
                    •<span style={{ marginLeft: "5px" }}>팔로우</span>
                  </FilterBtn>
                ) : (
                  <FilterBtn
                    onClick={() => {
                      if (!is_login) {
                        swal({
                          title: "접근 실패",
                          text: "로그인 후 이용 가능합니다❕",
                          icon: "info",
                        });
                        return;
                      }
                      dispatch(setView("friends"));
                    }}
                  >
                    팔로우
                  </FilterBtn>
                )}
              </FilterBtnBox>
            </ContainerUpper>
            <AnswersBox view={now_view} ref={container}>
              {now_view === "new" && (
                <InfinityScroll
                  callNext={() => {
                    console.log("new scroooolled");
                    dispatch(moreviewActions.getAnswers(id));
                  }}
                  is_next={next ? true : false}
                  is_loading={is_loading}
                  ref_value={container.current}
                >
                  {answers.length ? (
                    answers.map((v, idx) => {
                      return (
                        <AnswerCard openCard={openCard} key={idx} {...v} />
                      );
                    })
                  ) : (
                    <h2>답변이 없습니다.</h2>
                  )}
                </InfinityScroll>
              )}
            </AnswersBox>
            <AnswersBoxLike view={now_view} ref={like_container}>
              {now_view === "like" && (
                <InfinityScroll
                  callNext={() => {
                    console.log("like scroooolled");
                    dispatch(moreviewActions.getLikeAnswer(id));
                  }}
                  is_next={like_next ? true : false}
                  is_loading={like_loading}
                  ref_value={like_container.current}
                >
                  {like_answers.length ? (
                    like_answers.map((v, idx) => {
                      return (
                        <AnswerCard openCard={openCard} key={idx} {...v} />
                      );
                    })
                  ) : (
                    <h2>답변이 없습니다. 아시겠어요?</h2>
                  )}
                </InfinityScroll>
              )}
            </AnswersBoxLike>
            <AnswersBoxFriends view={now_view} ref={friends_container}>
              {now_view === "friends" && (
                <InfinityScroll
                  callNext={() => {
                    console.log("friends scroooolled");
                    dispatch(moreviewActions.getFriendsAnswer(user_info.id));
                  }}
                  is_next={friends_next ? true : false}
                  is_loading={friends_loading}
                  ref_value={friends_container.current}
                >
                  {friends_answers.length ? (
                    friends_answers.map((v, idx) => {
                      return (
                        <AnswerCard openCard={openCard} key={idx} {...v} />
                      );
                    })
                  ) : (
                    <h2>답변이 없습니다. 아시겠어요?</h2>
                  )}
                </InfinityScroll>
              )}
            </AnswersBoxFriends>
          </Container>
        </CommunityContainer>
      </Outer>
    </React.Fragment>
  );
};

const Outer = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 150px;
  @media (max-width: 650px) {
    margin-top: 100px;
  }
  @media (max-width: 500px) {
    margin: 50px 0px 0px 0px;
    background-size: cover;
    background-repeat: no-repeat;
    background-image: url("https://user-images.githubusercontent.com/67696504/117994109-4088f980-b37b-11eb-8f2c-9d42c93fd0a3.png");
  }
`;

const CommunityContainer = styled.div`
  z-index: 2;
  width: 100%;
  max-width: 1200px;
  height: 100%;
  box-sizing: border-box;
  // height:100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  overflow-y: auto;
`;

const Container = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
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

const ContainerUpper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 80px;
  padding: 15px 20px;
  @media (max-width: 500px) {
    margin-top: 10px;
  }
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
  @media (max-width: 750px) {
    font: normal normal bold 22px/24px Roboto;
    width: 80%;
  }
  @media (max-width: 650px) {
    margin: 12px 0 0 0;
    width: 226;
    font: normal normal bold 18px/22px Roboto;
  }
`;

const HashTag = styled.div`
  min-width: 72px;
  max-width: 72px;
  max-height: 31px;
  background: #ededed;
  padding: 8px 12px;
  border-radius: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  font: normal normal bold 14px/19px Roboto;
  box-shadow: 0px 0px 5px #ffffff;
  letter-spacing: 0px;
  color: #363636;
  font-size: 14px;
  margin-right: 10px;
  cursor: pointer;
  @media (max-width: 650px) {
    min-width: 63px;
    max-width: 63px;
    max-height: 30px;
  }
`;

const FilterBtnBoxMobile = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
  font-size: 12px;
  margin-right: 20px;
  padding-top: 35px;
  box-sizing: border-box;
  @media (min-width: 650px) {
    display: none;
  }
`;

const FilterToggle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-weight: 600;
  justify-content: flex-end;
  margin-right: -18px;
`;

const FilterBtnBox = styled.div`
  display: flex;
  height: 100%;
  justify-content: flex-end;
  align-items: flex-end;
  width: 40%;
  @media (max-width: 650px) {
    flex-direction: column;
    min-width: 80px;
    justify-content: center;
    margin-top: 100px;
    display: none;
  }
`;

const FilterBtn = styled.button`
  cursor: pointer;
  max-width: 80px;
  max-height: 17px;
  text-align: left;
  font: normal normal normal 14px/19px Roboto;
  border: none;
  outline: none;
  background: none;
  letter-spacing: -1px;
  margin-right: 5px;
  color: #333333;
  :hover {
    font-weight: bold;
  }
  @media (max-width: 650px) {
    margin-bottom: 10px;
  }
`;

const AnswersBox = styled.div`
  padding: 0px 20px;
  box-sizing: border-box;
  ${(props) => (props.view === "new" ? `margin: 140px 0px` : ` margin: 0px`)};
  width: 100%;
  max-height: 649px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  overflow-y: auto;
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
  @media (max-width: 650px) {
    ::-webkit-scrollbar {
      display: none;
    }

    ::-webkit-scrollbar-track {
      background: none; /* color of the tracking area */
    }

    ::-webkit-scrollbar-thumb {
      display: none;
    }
    ${(props) => (props.view === "new" ? `margin: 80px 0px` : ` margin: 0px`)};
  }
`;

const AnswersBoxLike = styled.div`
  padding: 0px 20px;
  box-sizing: border-box;
  ${(props) => (props.view === "like" ? `margin: 140px 0px` : ` margin: 0px`)};
  width: 100%;
  max-height: 649px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  overflow-y: auto;
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
  @media (max-width: 650px) {
    ::-webkit-scrollbar {
      display: none;
    }

    ::-webkit-scrollbar-track {
      background: none; /* color of the tracking area */
    }

    ::-webkit-scrollbar-thumb {
      display: none;
    }
    ${(props) => (props.view === "like" ? `margin: 80px 0px` : ` margin: 0px`)};
  }
`;

const AnswersBoxFriends = styled.div`
  padding: 0px 20px;
  box-sizing: border-box;
  ${(props) =>
    props.view === "friends" ? `margin: 140px 0px` : ` margin: 0px`};
  width: 100%;
  max-height: 649px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  overflow-y: auto;
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
  @media (max-width: 650px) {
    ::-webkit-scrollbar {
      display: none;
    }

    ::-webkit-scrollbar-track {
      background: none; /* color of the tracking area */
    }

    ::-webkit-scrollbar-thumb {
      display: none;
    }

    ${(props) =>
      props.view === "friends" ? `margin: 80px 0px` : ` margin: 0px`};
  }
`;

export default QuestionDetail;
