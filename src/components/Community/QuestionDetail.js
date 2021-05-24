import React, { useState } from "react";
import styled from "styled-components";
import AnswerCard from "../../shared/AnswerCard3";
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
import { api as communityActions,resetAll as LikeReset } from "../../redux/modules/community";
import {history} from '../../redux/configStore';
import {CheckOutlined} from "@ant-design/icons";
import Loader from "react-loader-spinner";
import GoBack from '../../elements/GoBack'

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
  const is_initialLoading = useSelector((state) => state.moreview.is_initialLoading);

  const openCard = (a) => {
    if(window.innerWidth <= 750){
      dispatch(LikeReset())
      history.push(`/carddetail/${a}`)
      return
    }
    const type = "detail";
    dispatch(LikeReset());
    dispatch(communityActions.getCardDetail(a, type));
    dispatch(communityActions.getLikeList(a));
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

  let color = "";
  let border = "";
  if (question_info?.questionTopic?.length > 0) {
    if (question_info?.questionTopic[0] === "나") {
      color = "#458857";
      border = `1px solid ${color}`;
    } else if (question_info?.questionTopic[0] === "사랑") {
      color = "#D34242";
      border = `1px solid ${color}`;
    } else if (question_info?.questionTopic[0] === "관계") {
      color = "#2761CC";
      border = `1px solid ${color}`;
    } else if (question_info?.questionTopic[0] === "가치") {
      color = "#7249B4";
      border = `1px solid ${color}`;
    } else if (question_info?.questionTopic[0] === "우정") {
      color = "#E0692D";
      border = `1px solid ${color}`;
    } else if (question_info?.questionTopic[0] === "꿈") {
      color = "#E6BA28";
      border = `1px solid ${color}`;
    }
  }

  return (
    <React.Fragment>
      <Outer>
        {cardModal ? <CardModal close={closeCardModal} /> : null}
        {is_initialLoading ?  <LoadingDiv>
            <Loader type="Oval" color="#000000" height={100} width={100} />
          </LoadingDiv>: <>
        <CommunityContainer>
          <Container>
            <ContainerHead style={{margin:"0px 0px 29px 20px"}}>
              <GoBack/>
            </ContainerHead>
            <ContainerUpper>
              <ContainerUpperLeft>
                <HashTag
                  onClick={() => {history.push(`/topic/${question_info.questionTopic}`)}}
                  style={{
                    color: color,
                    border: border,
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
                  {now_view === "new" && 
                        <span onClick={() => {if(openFilter){
                          setOpenFilter(false);
                        } else{
                          setOpenFilter(true);
                        }}}>최신순</span>}
                  {now_view === "like" && 
                        <span onClick={() => {if(openFilter){
                          setOpenFilter(false);
                        } else{
                          setOpenFilter(true);
                        }}}>인기순</span>}
                  {now_view === "friends" && 
                        <span onClick={() => {if(openFilter){
                          setOpenFilter(false);
                        } else{
                          setOpenFilter(true);
                        }}}>팔로우</span>}
                  {openFilter ? (
                    <>
                    <Component onClick={()=> {setOpenFilter(false)}}/>
                    <ArrowForwardIosIcon
                      onClick={() => {
                        if(openFilter){
                          setOpenFilter(false);
                        } else{
                          setOpenFilter(true);
                        }
                      }}
                      style={{
                        cursor: "pointer",
                        color: "black",
                        fontSize: "12px",
                        transform: "rotateZ(270deg)",
                        marginLeft: "5px",
                      }}
                    />
                    </>
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
                  {openFilter && now_view === "new" && (
                  <FilterWhiteBox>
                    <div
                      style={{height:"40px"}}
                      onClick={() => {
                        dispatch(setView("new"));
                      }}
                    >최신순 <span><CheckOutlined /></span></div>
                    <div
                      style={{height:"40px"}}
                      onClick={() => {
                        dispatch(setView("like"));
                      }}
                    >
                      인기순
                    </div>
                    <div
                      style={{height:"40px"}}
                      onClick={() => {
                        dispatch(setView("friends"));
                      }}
                    >
                      팔로우
                    </div>
                  </FilterWhiteBox>
                )}
                {openFilter && now_view === "like" && (
                  <FilterWhiteBox>
                    <div
                      style={{height:"40px"}}
                      onClick={() => {
                        dispatch(setView("new"));
                      }}
                    >
                      최신순
                    </div>
                    <div
                      style={{height:"40px"}}
                      onClick={() => {
                        dispatch(setView("like"));
                      }}
                    >인기순<span><CheckOutlined /></span></div>
                    <div
                      style={{height:"40px"}}
                      onClick={() => {
                        dispatch(setView("friends"));
                      }}
                    >
                      팔로우
                    </div>
                  </FilterWhiteBox>
                )}
                {openFilter && now_view === "friends" && (
                  <FilterWhiteBox>
                    <div
                      style={{height:"40px"}}
                      onClick={() => {
                        dispatch(setView("new"));
                      }}
                    >
                      최신순
                    </div>
                    <div
                      style={{height:"40px"}}
                      onClick={() => {
                        dispatch(setView("like"));
                      }}
                    >
                      인기순
                    </div>
                    <div
                      style={{height:"40px"}}
                      onClick={() => {
                        dispatch(setView("friends"));
                      }}
                    >팔로우 <span><CheckOutlined /></span></div>
                  </FilterWhiteBox>
                )}
                </FilterToggle>
                
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
                        <AnswerCard questionContents={question_info.questionContents} openCard={openCard} key={idx} {...v} />
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
                        <AnswerCard questionContents={question_info.questionContents} openCard={openCard} key={idx} {...v} />
                      );
                    })
                  ) : (
                    <h2>답변이 없습니다.</h2>
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
                        <AnswerCard questionContents={question_info.questionContents} openCard={openCard} key={idx} {...v} />
                      );
                    })
                  ) : (
                    <h2>답변이 없습니다.</h2>
                  )}
                </InfinityScroll>
              )}
            </AnswersBoxFriends>
          </Container>
        </CommunityContainer>
        </>}
      </Outer>
    </React.Fragment>
  );
};

const Outer = styled.section`
  width: 100%;
  margin-top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url("https://user-images.githubusercontent.com/77369674/118811425-f73f2980-b8e7-11eb-919a-d4421378e117.png");
  @media (max-width: 500px) {
    background-image: url("https://user-images.githubusercontent.com/67696504/118986623-7b61e180-b9ba-11eb-9719-f898c5c5b7a2.png");
    margin: 50px 0px 0px 0px;
  };
`;

const LoadingDiv = styled.div`
  margin: auto;
`;

const Component = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  z-index: 3;`;

const CommunityContainer = styled.div`
  z-index: 2;
  width: 100%;
  max-width: 1200px;
  box-sizing: border-box;
  height:100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  overflow-y: auto;
`;

const Container = styled.section`
  padding: 50px 0 40px 0;
  width: 800px;
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
  @media (max-width: 500px) {
    width: 360px;
    padding: 25px 0 30px 0;
  }
`;

const ContainerHead = styled.div`
margin:0px 0px 29px 20px;
  @media (min-width: 500px) {
    display: none;
  }

`

const ContainerUpper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 15px 20px;
  @media (max-width: 500px) {
    padding: 0px 20px;
  }
`;

const ContainerUpperLeft = styled.div`
  display: flex;
  flex-direction: column;
`;

const QuestionTitle = styled.h2`
  font: normal normal 800 26px/38px NanumMyeongjo;
  letter-spacing: 0px;
  // width: 60%;
  margin: 18px 0 0 0;
  @media (max-width: 500px) {
    text-align: left;
    font: normal normal 800 19px/27px NanumMyeongjo;
    letter-spacing: 0px;
    opacity: 0.9;
  }
`;

const HashTag = styled.div`
  min-width: 72px;
  max-width: 72px;
  max-height: 31px;
  padding: 8px 12px;
  border-radius: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  font: normal normal bold 14px/19px Noto Sans CJK KR;
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
  box-sizing: border-box;
  @media (min-width: 650px) {
    display: none;
  }
`;

const FilterToggle = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  font: normal normal medium 11px/17px Noto Sans CJK KR;
  justify-content: flex-end;
  margin-right: -20px;
`;

const FilterBtnBox = styled.div`
  display: flex;
  height: 100%;
  justify-content: flex-end;
  align-items: flex-end;
  width: 50%;
  @media (max-width: 500px) {
    flex-direction: column;
    min-width: 80px;
    justify-content: center;
    margin-top: 100px;
    display: none;
  }
`;

const FilterBtn = styled.button`
  cursor: pointer;
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
  @media (max-width: 500px) {
    margin-bottom: 10px;
  }
`;

const FilterWhiteBox = styled.div`
z-index: 5;
position: absolute;
top: 25px;
right: 10px;
width: 120px;
min-height: 120px;
max-height: 120px;
display: flex;
flex-direction: column;
background: #FFFFFF 0% 0% no-repeat padding-box;
box-shadow: 0px 0px 20px #00000026;
margin: 0 -18px 0 0;
& > div {
  display: flex;
  justify-content: center;
  padding: 8px 12px;
  height: 33.333%;
  align-items: center;
  font: normal normal medium 14px/20px Noto Sans CJK KR;
letter-spacing: 0px;
color: #121212;
}

& > div > span {
  margin-left: 8px;
}

& > div:nth-child(2) {
  border-top: 1px solid #00000026;
  border-bottom: 1px solid #00000026;
}
`;

const AnswersBox = styled.div`
  padding: 0px 20px;
  box-sizing: border-box;
  ${(props) => (props.view === "new" ? `margin-top:33px` : ` margin: 0px`)};
  width: 100%;
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
  @media (max-width: 500px) {
    ::-webkit-scrollbar {
      display: none;
    }

    ::-webkit-scrollbar-track {
      background: none; /* color of the tracking area */
    }

    ::-webkit-scrollbar-thumb {
      display: none;
    }
    ${(props) => (props.view === "new" ? `margin-top: 25px` : ` margin: 0px`)};
  }
`;

const AnswersBoxLike = styled.div`
  padding: 0px 20px;
  box-sizing: border-box;
  ${(props) => (props.view === "like" ? `margin-top:33px` : ` margin: 0px`)};
  width: 100%;
  max-height:800px;
  display: flex;
  flex-direction: row;
  align-content:flex-start;
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
  @media (max-width: 500px) {
    ::-webkit-scrollbar {
      display: none;
    }

    ::-webkit-scrollbar-track {
      background: none; /* color of the tracking area */
    }

    ::-webkit-scrollbar-thumb {
      display: none;
    }
    ${(props) => (props.view === "like" ? `margin-top: 25px` : ` margin: 0px`)};
  }
`;

const AnswersBoxFriends = styled.div`
  padding: 0px 20px;
  box-sizing: border-box;
  ${(props) =>
    props.view === "friends" ? `margin-top:33px` : ` margin: 0px`};
  width: 100%;
  max-height:800px;
  display: flex;
  flex-direction: row;
  align-content: flex-start;
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
  @media (max-width: 500px) {
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
      props.view === "friends" ? `margin-top: 25px` : ` margin: 0px`};
  }
`;

export default QuestionDetail;
