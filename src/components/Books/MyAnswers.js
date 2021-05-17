import React from "react";
import styled from "styled-components";
import { NewQuestion } from "./booksindex";
import { useDispatch, useSelector } from "react-redux";
import {
  api as customActions,
  resetAll,
  setView,
} from "../../redux/modules/custom";
import { setComponent } from "../../redux/modules/books";
import InfinityScroll from "../../shared/InfinityScroll";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { CardModal } from "../Community/communityindex";
import { api as commentActions } from "../../redux/modules/comment";
import { api as communityActions } from "../../redux/modules/community";

const MyAnswers = (props) => {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = React.useState(false);
  const [cardModal, setCardModal] = React.useState(false);
  const answer_list = useSelector((state) => state.custom.custom_question);
  const pop_list = useSelector((state) => state.custom.pop_list);
  const user_info = useSelector((state) => state.user.user);
  const is_loading = useSelector((state) => state.custom.loading);
  const pop_loading = useSelector((state) => state.custom.pop_loading);
  const is_next = useSelector((state) => state.custom.next);
  const pop_next = useSelector((state) => state.custom.pop_next);
  const now_view = useSelector((state) => state.custom.now_view);
  const container = React.useRef();
  const pop_container = React.useRef();
  const [openFilter, setOpenFilter] = React.useState(false);

  const openCard = (a) => {
    const type = "community";
    setCardModal(true);
    dispatch(communityActions.getCardDetail(a.answerId, type));
    dispatch(commentActions.getCommentAX(a.answerId));
  };

  const closeCardModal = () => {
    setCardModal(false);
  };

  React.useEffect(() => {
    dispatch(customActions.getMyAnswers());
    dispatch(customActions.getMyPopAnswers());

    return () => {
      dispatch(resetAll());
    };
  }, []);

  return (
    <React.Fragment>
      <Container>
        <Background />
        {cardModal && <CardModal close={closeCardModal}/>}
        <TitleContainerMobile>
          <ArrowForwardIosIcon
            onClick={() => {
              dispatch(setComponent(""));
            }}
            style={{ transform: "rotateZ(180deg)" }}
          />
          <TitleMobile>{user_info?.nickname}님의 낙서</TitleMobile>
          <EmptyDiv />
        </TitleContainerMobile>
        <FilterBtnBoxMobile>
          <FilterToggle>
            {now_view === "new" && <span>최신순</span>}
            {now_view === "pop" && <span>인기순</span>}
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
            <span
              onClick={() => {
                dispatch(setView("pop"));
              }}
            >
              인기순
            </span>
          )}
          {openFilter && now_view === "pop" && (
            <span
              onClick={() => {
                dispatch(setView("new"));
              }}
            >
              최신순
            </span>
          )}
        </FilterBtnBoxMobile>
        <TitleContainer>
          <Title>
            <span style={{ fontWeight: "600" }}>{user_info?.nickname}</span>님이
            남긴 낙서는{" "}
            <span style={{ fontWeight: "600" }}>
              {user_info?.myAnswerCount}개
            </span>
            입니다.
          </Title>
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
                •<span style={{ marginLeft: "5px" }}>인기순</span>
              </FilterBtn>
            ) : (
              <FilterBtn
                onClick={() => {
                  dispatch(setView("pop"));
                }}
              >
                인기순
              </FilterBtn>
            )}
          </FilterBtnBox>
        </TitleContainer>
        <CardContainer view={now_view} ref={container}>
          {now_view === "new" && (
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
                        <SubjectBox>
                          {v.questiontopic?.length &&
                            v.questiontopic[0] === "사랑" && (
                              <Subject
                                style={{
                                  background: "#FFAAAA",
                                  boxShadow: "0px 0px 15px #FFAAAA",
                                }}
                              >
                                <span>#사랑</span>
                              </Subject>
                            )}
                          {v.questiontopic?.length &&
                            v.questiontopic[0] === "우정" && (
                              <Subject
                                key={idx}
                                style={{
                                  background: "#B9FFC4",
                                  boxShadow: "0px 0px 15px #B9FFC4",
                                }}
                              >
                                <span>#우정</span>
                              </Subject>
                            )}
                          {v.questiontopic?.length &&
                            v.questiontopic[0] === "꿈" && (
                              <Subject
                                key={idx}
                                style={{
                                  background: "#B7E6FF",
                                  boxShadow: "0px 0px 15px #B7E6FF",
                                }}
                              >
                                <span>#꿈</span>
                              </Subject>
                            )}
                          {v.questiontopic?.length &&
                            v.questiontopic[0] === "가치" && (
                              <Subject
                                key={idx}
                                style={{
                                  background: "#B5BDFF",
                                  boxShadow: "0px 0px 15px #B5BDFF",
                                }}
                              >
                                <span>#가치</span>
                              </Subject>
                            )}
                          {v.questiontopic?.length &&
                            v.questiontopic[0] === "관계" && (
                              <Subject
                                key={idx}
                                style={{
                                  background: "#FFF09D",
                                  boxShadow: "0px 0px 15px #FFF09D",
                                }}
                              >
                                <span>#관계</span>
                              </Subject>
                            )}
                          {v.questiontopic?.length &&
                            v.questiontopic[0] === "나" && (
                              <Subject
                                key={idx}
                                style={{
                                  background: "#F9D1FD",
                                  boxShadow: "0px 0px 15px #F9D1FD",
                                }}
                              >
                                <span>#나</span>
                              </Subject>
                            )}
                        </SubjectBox>
                        <div
                          style={{
                            marginLeft: "10px",
                            fontWeight: "600",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <span>{v.questionCreatedUserNickname}님의 질문</span>
                        </div>
                      </Head>
                      <QuestionContents>{v.questionContents}</QuestionContents>
                      <AnswerContents onClick={()=>{openCard(v)}}>{v.answerContents}</AnswerContents>
                      <Footer>
                        <IconBox>
                          <LikeBox>
                            {v.currentLike ? (
                              <>
                                <FavoriteIcon
                                  fontSize="small"
                                  fontWeight='200'
                                  style={{ color: "#061366" }}
                                />{" "}
                              </>
                            ) : (
                              <>
                                <FavoriteBorderIcon fontWeight='200' fontSize='small' style={{fontWeight:'200'}} />{" "}
                              </>
                            )}
                            <LikeCount>{v.likeCount}개</LikeCount>
                          </LikeBox>
                          <CommentBox>
                            <ChatBubbleOutlineIcon style={{fontWeight:'200'}} fontWeight='200' fontSize="small" />
                            <CommentCount>{v.commentCount}개</CommentCount>
                          </CommentBox>
                        </IconBox>
                        <CreatedAt>
                          20{v.answerCreatedAt?.charAt(0)}
                          {v.answerCreatedAt?.charAt(1)}년{" "}
                          {v.answerCreatedAt?.charAt(2)}
                          {v.answerCreatedAt?.charAt(3)}월{" "}
                          {v.answerCreatedAt?.charAt(4)}
                          {v.answerCreatedAt?.charAt(5)}일
                        </CreatedAt>
                      </Footer>
                    </Card>
                  );
                })}
            </InfinityScroll>
          )}
        </CardContainer>
        <CardContainerPop view={now_view} ref={pop_container}>
          {now_view === "pop" && (
            <InfinityScroll
              callNext={() => {
                console.log("scroooolled!");
                dispatch(customActions.getMyPopAnswers());
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
                          {v.questiontopic?.length &&
                            v.questiontopic[0] === "사랑" && (
                              <Subject
                                style={{
                                  background: "#FFAAAA",
                                  boxShadow: "0px 0px 15px #FFAAAA",
                                }}
                              >
                                <span>#사랑</span>
                              </Subject>
                            )}
                          {v.questiontopic?.length &&
                            v.questiontopic[0] === "우정" && (
                              <Subject
                                key={idx}
                                style={{
                                  background: "#B9FFC4",
                                  boxShadow: "0px 0px 15px #B9FFC4",
                                }}
                              >
                                <span>#우정</span>
                              </Subject>
                            )}
                          {v.questiontopic?.length &&
                            v.questiontopic[0] === "꿈" && (
                              <Subject
                                key={idx}
                                style={{
                                  background: "#B7E6FF",
                                  boxShadow: "0px 0px 15px #B7E6FF",
                                }}
                              >
                                <span>#꿈</span>
                              </Subject>
                            )}
                          {v.questiontopic?.length &&
                            v.questiontopic[0] === "가치" && (
                              <Subject
                                key={idx}
                                style={{
                                  background: "#B5BDFF",
                                  boxShadow: "0px 0px 15px #B5BDFF",
                                }}
                              >
                                <span>#가치</span>
                              </Subject>
                            )}
                          {v.questiontopic?.length &&
                            v.questiontopic[0] === "관계" && (
                              <Subject
                                key={idx}
                                style={{
                                  background: "#FFF09D",
                                  boxShadow: "0px 0px 15px #FFF09D",
                                }}
                              >
                                <span>#관계</span>
                              </Subject>
                            )}
                          {v.questiontopic?.length &&
                            v.questiontopic[0] === "나" && (
                              <Subject
                                key={idx}
                                style={{
                                  background: "#F9D1FD",
                                  boxShadow: "0px 0px 15px #F9D1FD",
                                }}
                              >
                                <span>#나</span>
                              </Subject>
                            )}
                        </SubjectBox>
                        <div
                          style={{
                            marginLeft: "10px",
                            fontWeight: "600",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <span>{v.questionCreatedUserNickname}님의 질문</span>
                        </div>
                      </Head>
                      <QuestionContents>{v.questionContents}</QuestionContents>
                      <AnswerContents onClick={()=>{openCard(v)}}>{v.answerContents}</AnswerContents>
                      <Footer>
                        <IconBox>
                          <LikeBox>
                            {v.currentLike ? (
                              <>
                                <FavoriteIcon style={{ color: "red" }} />{" "}
                              </>
                            ) : (
                              <>
                                <FavoriteBorderIcon fontSize="small" />{" "}
                              </>
                            )}
                            <LikeCount>{v.likeCount}개</LikeCount>
                          </LikeBox>
                          <CommentBox>
                            <ChatBubbleOutlineIcon fontSize="small" />
                            <CommentCount>{v.commentCount}개</CommentCount>
                          </CommentBox>
                        </IconBox>
                        <CreatedAt>
                          20{v.answerCreatedAt?.charAt(0)}
                          {v.answerCreatedAt?.charAt(1)}년{" "}
                          {v.answerCreatedAt?.charAt(2)}
                          {v.answerCreatedAt?.charAt(3)}월{" "}
                          {v.answerCreatedAt?.charAt(4)}
                          {v.answerCreatedAt?.charAt(5)}일
                        </CreatedAt>
                      </Footer>
                    </Card>
                  );
                })}
            </InfinityScroll>
          )}
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
  margin: 50px auto;
  border-radius: 20px;
  overflow: hidden;
  @media (max-width: 750px) {
    margin-top: 30px;
    margin-bottom: 0px;
    padding: 20px 25px 20px 25px;
    max-height: 100%;
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
  @media (max-width: 750px) {
    display: none;
  }
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
  @media (max-width: 750px) {
    display: none;
  }
`;

const Title = styled.span`
  width: 230px;
  min-width: 230px;
  height: 60px;
  font-size: 22px;
  font-weight: 400;
  @media (max-width: 750px) {
    font-size: 18px;
    width: 200px;
    min-width: 200px;
    font-size: 18px;
  }
`;

const TitleContainerMobile = styled.div`
  width: 100%;
  height: 25px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  @media (min-width: 750px) {
    display: none;
  }
`;

const TitleMobile = styled.span`
  width: auto;
  text-align: center;
  font: normal normal bold 15px/22px Noto Sans KR;
`;

const EmptyDiv = styled.div`
  width: 24px;
  height: 100%;
`;

const CardContainer = styled.section`
  box-sizing: border-box;
  padding-right: 50px;
  ${(props) => (props.view === "new" ? `width:100%` : `width:0`)};
  ${(props) => (props.view === "new" ? `height:100%` : `height:0`)};
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  overflow: auto;
  ${(props) =>
    props.view === "new" ? `padding-bottom:60px` : `padding-bottom:0px`};
  @media (max-width: 750px) {
    padding-right: 0px;
    flex-direction: column;
    flex-wrap: nowrap;
  }
`;

const CardContainerPop = styled.section`
  box-sizing: border-box;
  padding-right: 50px;
  ${(props) => (props.view === "pop" ? `width:100%` : `width:0`)};
  ${(props) => (props.view === "pop" ? `height:100%` : `height:0`)};
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  overflow: auto;
  ${(props) =>
    props.view === "pop" ? `padding-bottom:60px` : `padding-bottom:0px`};
  @media (max-width: 750px) {
    padding-right: 0px;
    flex-direction: column;
    flex-wrap: nowrap;
  }
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  max-width: 410px;
  max-height: 230px;
  min-height: 180px;
  margin: 0px 20px 25px 0px;
  background: #ffffff;
  box-shadow: 0px 0px 20px #0000001a;
  border-radius: 20px;
  box-sizing: border-box;
  padding: 18px;
  @media (max-width: 750px) {
    box-shadow: 0px 0px 10px #0000001a;
    padding: 14px 14px 10px 14px;
    margin: 0px 0px 15px 0px;
    min-height: 150px;
    max-height: 150px;
    border-radius: 16px;
  }
`;

const Head = styled.div`
  width: 100%;
  height: 26px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  @media (max-width: 750px) {
    display: none;
  }
`;

const SubjectBox = styled.div`
  display: flex;
  flex-direction: row;
  width: auto;
  height: 100%;
  @media (max-width: 750px) {
    display: none;
  }
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

const QuestionContents = styled.span`
  font-size: 15px;
  font-weight: 600;
  width: 100%;
  height: 55px;
  margin-top: 17px;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  @media (max-width: 750px) {
    height: 25px;
    margin-top: 0px;
    font-size: 13px;
  }
`;

const AnswerContents = styled.span`
  font-size: 15px;
  width: 100%;
  height: 100%;
  margin-top: 13px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor:pointer;
  &:hover{
    font-weight:600;
  }
  @media (max-width: 750px) {
    height: 60px;
    margin-top: 6px;
    margin-bottom: 20px;
    font-size: 13px;
  }
`;

const Footer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  border-top: 1px solid #bbbbbb;
  padding-top: 13px;
  margin-top: 10px;
  @media (max-width: 750px) {
    margin-top: 0px;
    padding-top: 10px;
  }
`;

const IconBox = styled.div`
  display: flex;
  & > div > svg {
    margin-right: 5px;
  }
`;

const LikeBox = styled.div`
  display: flex;
  align-items: center;
  margin-right: 8px;
`;
const CommentBox = styled.div`
  display: flex;
  align-items: center;
`;

const LikeCount = styled.span`
  font-size: 12px;
`;

const CommentCount = styled.span`
  font-size: 12px;
`;

const CreatedAt = styled.span`
  font-size: 11px;
`;

const FilterBtnBoxMobile = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  font-size: 12px;
  margin-right: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
  box-sizing: border-box;
  @media (min-width: 750px) {
    display: none;
  }
`;

const FilterToggle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-weight: 600;
  justify-content: flex-end;
  margin-right: -17px;
`;

const FilterBtnBox = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  width: 50%;
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
  margin-left: 5px;
  color: #333333;
  :hover {
    font-weight: bold;
  }
`;

export default MyAnswers;
