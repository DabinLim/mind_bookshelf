import React, { useState, useRef } from "react";
import styled from "styled-components";
import { api as commentActions } from "../../redux/modules/comment";
import {
  api as booksActions,
  changeDate,
  setBookDetailModal,
} from "../../redux/modules/books";
import { api as communityActions } from "../../redux/modules/community";
import { useDispatch, useSelector } from "react-redux";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { CommentList, TagModal, CardUpdateModal } from "./communityindex";
import { history } from "../../redux/configStore";
import axios from "axios";
import { config } from "../../shared/config";
import _ from "lodash";
import swal from "sweetalert";
import { getCookie } from "../../shared/Cookie";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import CustomSwitch from "../../shared/CustomSwitch";
import CancelConfirm from "./CancelConfirm";
import { LeftOutlined } from "@ant-design/icons";
import ChannelService from "../../shared/ChannelService";


const CardModal = (props) => {
  const answerInfo = useSelector((state) => state.community.card_detail);
  const comment_list = useSelector((state) => state.comment.list);
  const user_info = useSelector((state) => state.user.user);
  const is_login = useSelector((state) => state.user.is_login);
  const card_loading = useSelector((state) => state.community.card_loading);
  const answerQuantity = useSelector((state) => state.books.book_detail);
  const thisMonthBooks = useSelector((state) => state.books.books);
  const nowdate = useSelector((state) => state.books.date);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [user_list, setUser_list] = useState();
  const [comments, setComments] = useState();
  const [tagModal, setTagModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [updateAnswer, setUpdateAnswer] = useState(false);
  const [answer, setAnswer] = useState();
  const [isOpen, setOpen] = useState(true);
  const [cancelModal, setCancelModal] = useState(false);
  const cmtInput = useRef();
  const ok_submit = comments ? true : false;
  const url = window.location.href.split("/");
  const id = url[url.length - 1];

  React.useEffect(() => {
    ChannelService.shutdown();
    return () => {
      ChannelService.boot({
        pluginKey: "1e06f0ed-5da8-42f4-bb69-7e215b14ec18",
      });
    };
  }, []);

  function clickOpen() {
    if (isOpen) {
      setOpen(false);
      return;
    }
    setOpen(true);
  }

  const changeAnswer = (e) => {
    if (answer.length > 1000) {
      return;
    }
    setAnswer(e.target.value);
  };

  const selectedCard = (id) => {
    dispatch(communityActions.getCardDetail(id, "book"));
    dispatch(commentActions.getCommentAX(id));
  };

  const nextDay = () => {
    const nowBook = thisMonthBooks.findIndex((v) => {
      if (v._id === nowdate.format("YYMMDD")) {
        return v;
      }
    });
    if (nowBook === thisMonthBooks.length - 1) {
      window.alert("이번달에는 작성하신 카드가 더 이상 없습니다.");
      return;
    }

    dispatch(changeDate(`20${thisMonthBooks[nowBook + 1]._id}`));
    if (id === "mybook") {
      dispatch(booksActions.getNextDetail(thisMonthBooks[nowBook + 1]._id));
    } else {
      dispatch(
        booksActions.getNextOthersBookDetail(
          thisMonthBooks[nowBook + 1]._id,
          id
        )
      );
    }
  };

  const previousDay = () => {
    const nowBook = thisMonthBooks.findIndex((v) => {
      if (v._id === nowdate.format("YYMMDD")) {
        return v;
      }
    });
    if (nowBook === 0) {
      window.alert("이번달에는 작성하신 카드가 더 이상 없습니다.");
      return;
    }

    dispatch(changeDate(`20${thisMonthBooks[nowBook - 1]._id}`));
    if (id === "mybook") {
      // 이 부분 전날로 돌아가서 첫번째 답변 띄우려고 getNext 호출입니다.
      // 혹시 수정 하실 일 있으시면 참고해 주세요.
      dispatch(booksActions.getNextDetail(thisMonthBooks[nowBook - 1]._id));
    } else {
      dispatch(
        booksActions.getNextOthersBookDetail(
          thisMonthBooks[nowBook - 1]._id,
          id
        )
      );
    }
  };

  const nextCard = () => {
    const nowindex = answerQuantity.findIndex((v) => {
      if (v.answerId === answerInfo.answerId) {
        return v;
      }
    });
    if (nowindex === answerQuantity.length - 1) {
      const nowBook = thisMonthBooks.findIndex((v) => {
        if (v._id === nowdate.format("YYMMDD")) {
          return v;
        }
      });
      if (nowBook === thisMonthBooks.length - 1) {
        window.alert("이번달에는 작성하신 카드가 더 이상 없습니다.");
        return;
      }

      dispatch(changeDate(`20${thisMonthBooks[nowBook + 1]._id}`));
      if (id === "mybook") {
        dispatch(booksActions.getNextDetail(thisMonthBooks[nowBook + 1]._id));
        dispatch(
          booksActions.getNextOthersBookDetail(
            thisMonthBooks[nowBook + 1]._id,
            id
          )
        );
      }
      return;
    }
    dispatch(
      communityActions.getCardDetail(
        answerQuantity[nowindex + 1].answerId,
        "book"
      )
    );
    dispatch(
      commentActions.getCommentAX(answerQuantity[nowindex + 1].answerId)
    );
  };

  const previousCard = () => {
    const nowindex = answerQuantity.findIndex((v) => {
      if (v.answerId === answerInfo.answerId) {
        return v;
      }
    });

    if (nowindex === 0) {
      const nowBook = thisMonthBooks.findIndex((v) => {
        if (v._id === nowdate.format("YYMMDD")) {
          return v;
        }
      });
      if (nowBook === 0) {
        window.alert("이번달에는 작성하신 카드가 더 이상 없습니다.");
        return;
      }

      dispatch(changeDate(`20${thisMonthBooks[nowBook - 1]._id}`));
      if (id === "mybook") {
        dispatch(
          booksActions.getPreviousDetail(thisMonthBooks[nowBook - 1]._id)
        );
      } else {
        dispatch(
          booksActions.getPreviousOthersBookDetail(
            thisMonthBooks[nowBook - 1]._id,
            id
          )
        );
      }
      return;
    }
    dispatch(
      communityActions.getCardDetail(
        answerQuantity[nowindex - 1].answerId,
        "book"
      )
    );
    dispatch(
      commentActions.getCommentAX(answerQuantity[nowindex - 1].answerId)
    );
  };

  const debounce = _.debounce((words) => {
    setLoading(true);
    const searchUsers = async () => {
      const result = await axios.post(`${config.api}/bookshelf/searchUser`, {
        words: words,
      });
      if (
        result.data.userInfo === "none" ||
        result.data.userInfo.length === 0
      ) {
        setUser_list();
        setLoading(false);
      } else {
        setUser_list(result.data.userInfo);
        setLoading(false);
      }
    };
    searchUsers();
  }, 500);

  const keyPress = React.useCallback(debounce, []);

  const tagSetting = (start, text) => {
    if (text[start - 1] === "@") {
      return true;
    }
    for (let i = start - 1; i >= 0; i--) {
      if (text[i] === " ") {
        return false;
      } else if (text[i] === "@") {
        return text.substring(i + 1, start);
      }
    }
    return false;
  };

  const getUserTag = (nickname) => {
    setTagModal(false);
    let start = cmtInput.current.selectionStart;
    let text = cmtInput.current.value;
    for (let i = start - 1; i >= 0; i--) {
      if (text[i] === "@") {
        let end_point = start;
        while (end_point < text.length && text[end_point] != " ") {
          end_point += 1;
        }
        let cmt =
          text.substr(0, i + 1) +
          nickname +
          text.substr(end_point, text.length);
        setComments(cmt);
        return;
      }
    }
  };

  const selectComment = (e) => {
    //100자이상부터는 막기
    if(e.target.value.length > 100){
      return
    }
    const word = tagSetting(e.target.selectionStart, e.target.value);
    if (word) {
      setTagModal(true);
      keyPress(word);
    } else {
      setTagModal(false);
    }
    setComments(e.target.value);
  };

  const CheckTagAX = async (words) => {
    const result = await axios.post(`${config.api}/bookshelf/searchUser`, {
      words: words,
    });
    if (result.data.userInfo === "none" || result.data.userInfo.length === 0) {
      return;
    } else {
      let userInfo = result.data.userInfo;
      for (let user of userInfo) {
        if (words === user.nickname) {
          return [user.nickname, user.userId];
        }
      }
      return;
    }
  };

  const CheckTag = async () => {
    let status = 0;
    let temp = "";
    let list = [];
    for (let i = 0; i < comments.length; i++) {
      if (comments[i] === "@") {
        status = 1;
      } else if (status === 1 && comments[i] !== " ") {
        temp += comments[i];
      } else if (comments[i] === " ") {
        status = 0;
        if (temp) {
          let tag = await CheckTagAX(temp);
          if (tag) {
            list.push(tag);
          }
          temp = "";
        }
      }
    }
    if (temp) {
      let tag = await CheckTagAX(temp);
      if (tag) {
        list.push(tag);
      }
    }
    return list;
  };

  const addComment = async () => {
    let tagId = await CheckTag();
    setTagModal(false);
    dispatch(
      commentActions.sendCommentAX(
        answerInfo?.answerId,
        comments,
        tagId,
        answerInfo?.questionId
      )
    );
    setComments("");
  };

  let topic = "";
  if (answerInfo?.questionTopic?.length > 0) {
    topic = answerInfo?.questionTopic[0];
  }

  const getDate = (date) => {
    let year = "20" + date.substring(0, 2);
    let month = date.substring(2, 4);
    let day = date.substring(4, 6);
    let full_date = year + "년 " + month + "월 " + day + "일";
    return full_date;
  };

  let color = "";

    if (topic === "가치") {
      color = "#7249B4";
    } else if (topic === "관계") {
      color = "#2761CC";
    } else if (topic === "우정") {
      color = "#E0692D";
    } else if (topic === "나") {
      color = "#458857";
    } else if (topic === "사랑") {
      color = "#D34242";
    } else {
      color = "#E6BA28";
    }

  return (
    <React.Fragment>
      <Component
        onClick={() => {
          props.close();
          if (answerInfo.type === "book") {
            dispatch(setBookDetailModal(nowdate.format("YYMMDD")));
          }
        }}
        />
      {card_loading ? (
        <ModalComponent book={props.book}>
          {answerInfo?.type === "book" && (
            <>
              {answerQuantity.length &&
                answerQuantity.map((v, idx) => {
                  if (v.answerId !== answerInfo.answerId && !card_loading) {
                    return (
                      <DetailContainer key={idx}>
                        <Head>
                          {v.questionTopic[0] === "사랑" && (
                            <BooksSubject
                              style={{
                                background: "#B5BDFF",
                                boxShadow: "0px 0px 15px #C3C9FE",
                              }}
                            >
                              <span>#사랑</span>
                            </BooksSubject>
                          )}
                          {v.questionTopic[0] === "우정" && (
                            <BooksSubject
                              style={{
                                background: "#B5BDFF",
                                boxShadow: "0px 0px 15px #C3C9FE",
                              }}
                            >
                              <span>#우정</span>
                            </BooksSubject>
                          )}
                          {v.questionTopic[0] === "꿈" && (
                            <BooksSubject
                              style={{
                                background: "#B5BDFF",
                                boxShadow: "0px 0px 15px #C3C9FE",
                              }}
                            >
                              <span>#꿈</span>
                            </BooksSubject>
                          )}
                          {v.questionTopic[0] === "가치" && (
                            <BooksSubject
                              style={{
                                background: "#B5BDFF",
                                boxShadow: "0px 0px 15px #C3C9FE",
                              }}
                            >
                              <span>#가치</span>
                            </BooksSubject>
                          )}
                          {v.questionTopic[0] === "관계" && (
                            <BooksSubject
                              style={{
                                background: "#B5BDFF",
                                boxShadow: "0px 0px 15px #C3C9FE",
                              }}
                            >
                              <span>#관계</span>
                            </BooksSubject>
                          )}
                          {v.questionTopic[0] === "나" && (
                            <BooksSubject
                              style={{
                                background: "#B5BDFF",
                                boxShadow: "0px 0px 15px #C3C9FE",
                              }}
                            >
                              <span>#나</span>
                            </BooksSubject>
                          )}
                          <TitleBox>
                            <Title
                              disabled={card_loading}
                              onClick={() => {
                                setUpdateAnswer(false);
                                selectedCard(v.answerId);
                              }}
                            >
                              {v.questionContents}
                            </Title>
                          </TitleBox>
                        </Head>
                        <Contents>{v.answerContents}</Contents>
                      </DetailContainer>
                    );
                  }
                })}
              <CardDate>
                <ArrowForwardIosIcon
                  disabled={card_loading}
                  onClick={() => {
                    setUpdateAnswer(false);
                    previousDay();
                  }}
                  style={{
                    cursor: "pointer",
                    transform: "rotateY(180deg)",
                    color: "white",
                    fontSize: "25px",
                  }}
                />
                <span
                  style={{
                    fontWeight: "600",
                    fontSize: "22px",
                    color: "#ffffff",
                  }}
                >
                  {nowdate.format("M")}월{nowdate.format("D")}일
                </span>
                <ArrowForwardIosIcon
                  disabled={card_loading}
                  onClick={() => {
                    setUpdateAnswer(false);
                    nextDay();
                  }}
                  style={{
                    cursor: "pointer",
                    color: "white",
                    fontSize: "25px",
                  }}
                />
              </CardDate>
              {/* <LeftArrowBtn
                disabled={card_loading}
                onClick={() => {
                  setUpdateAnswer(false);
                  previousCard();
                }}
              >
                <ArrowBackIosIcon
                  style={{
                    fontSize: "60px",
                    fontWeight: "400",
                  }}
                />
              </LeftArrowBtn>
              <RightArrowBtn
                disabled={card_loading}
                onClick={() => {
                  setUpdateAnswer(false);
                  nextCard();
                }}
              >
                <ArrowForwardIosIcon
                  style={{
                    fontSize: "60px",
                    fontWeight: "400",
                  }}
                />
              </RightArrowBtn> */}
            </>
          )}
        </ModalComponent>
      ) : (
        <ModalComponent book={props.book}>
          {answerInfo?.type === "book" && (
            <>
              <BooksDetailBox>
                {answerQuantity.length &&
                  answerQuantity.map((v, idx) => {
                    if (v.answerId !== answerInfo.answerId && !card_loading) {
                      return (
                        <DetailContainer key={idx}>
                          <Head>
                            {v.questionTopic[0] === "사랑" && (
                              <BooksSubject
                                style={{
                                  background: "#FFAAAA",
                                  boxShadow: "0px 0px 15px #FFAAAA",
                                }}
                              >
                                <span>#사랑</span>
                              </BooksSubject>
                            )}
                            {v.questionTopic[0] === "우정" && (
                              <BooksSubject
                                style={{
                                  background: "#B9FFC4",
                                  boxShadow: "0px 0px 15px #B9FFC4",
                                }}
                              >
                                <span>#우정</span>
                              </BooksSubject>
                            )}
                            {v.questionTopic[0] === "꿈" && (
                              <BooksSubject
                                style={{
                                  background: "#B7E6FF",
                                  boxShadow: "0px 0px 15px #B7E6FF",
                                }}
                              >
                                <span>#꿈</span>
                              </BooksSubject>
                            )}
                            {v.questionTopic[0] === "가치" && (
                              <BooksSubject
                                style={{
                                  background: "#B5BDFF",
                                  boxShadow: "0px 0px 15px #B5BDFF",
                                }}
                              >
                                <span>#가치</span>
                              </BooksSubject>
                            )}
                            {v.questionTopic[0] === "관계" && (
                              <BooksSubject
                                style={{
                                  background: "#FFF09D",
                                  boxShadow: "0px 0px 15px #FFF09D",
                                }}
                              >
                                <span>#관계</span>
                              </BooksSubject>
                            )}
                            {v.questionTopic[0] === "나" && (
                              <BooksSubject
                                style={{
                                  background: "#F9D1FD",
                                  boxShadow: "0px 0px 15px #F9D1FD",
                                }}
                              >
                                <span>#나</span>
                              </BooksSubject>
                            )}
                            <TitleBox>
                              <Title
                                disabled={card_loading}
                                onClick={() => {
                                  setUpdateAnswer(false);
                                  selectedCard(v.answerId);
                                }}
                              >
                                {v.questionContents}
                              </Title>
                            </TitleBox>
                          </Head>
                          <Contents>{v.answerContents}</Contents>
                        </DetailContainer>
                      );
                    }
                  })}
              </BooksDetailBox>
              <CardDate>
                <ArrowForwardIosIcon
                  disabled={card_loading}
                  onClick={() => {
                    setUpdateAnswer(false);
                    previousDay();
                  }}
                  style={{
                    cursor: "pointer",
                    transform: "rotateZ(180deg)",
                    color: "white",
                    fontSize: "25px",
                  }}
                />

                <span
                  style={{
                    fontWeight: "600",
                    fontSize: "22px",
                    color: "#ffffff",
                  }}
                >
                  {nowdate.format("M")}월{nowdate.format("D")}일
                </span>

                <ArrowForwardIosIcon
                  disabled={card_loading}
                  onClick={() => {
                    setUpdateAnswer(false);
                    nextDay();
                  }}
                  style={{
                    cursor: "pointer",
                    color: "white",
                    fontSize: "25px",
                  }}
                />
              </CardDate>
              {/* <LeftArrowBtn
                disabled={card_loading}
                onClick={() => {
                  setUpdateAnswer(false);
                  previousCard();
                }}
              >
                <ArrowBackIosIcon
                  style={{
                    fontSize: "60px",
                    fontWeight: "400",
                  }}
                />
              </LeftArrowBtn>
              <RightArrowBtn
                disabled={card_loading}
                onClick={() => {
                  setUpdateAnswer(false);
                  nextCard();
                }}
              >
                <ArrowForwardIosIcon
                  style={{
                    fontSize: "60px",
                    fontWeight: "400",
                  }}
                />
              </RightArrowBtn> */}
            </>
          )}
          <ModalContent type={answerInfo?.type}>
            <CardWriterBox>
              <CardWriterInfoLeft>
                <CardWriterLeft type={answerInfo?.type}>
                  <GoBackBtn onClick={props.close}>
                    <LeftOutlined />
                  </GoBackBtn>
                  <CardWriterProfileLeft
                    src={answerInfo?.answerUserProfileImg}
                    onClick={() => {
                      if (
                        user_info?.nickname !== "" &&
                        user_info?.nickname === answerInfo?.nickname
                      ) {
                        history.push(`/mybook`);
                        return;
                      }
                      history.push(`/others/${answerInfo?.answerUserId}`);
                    }}
                  />
                  <CardWriterNickNameLeft>
                    <span style={{ fontWeight: "bold", letterSpacing: "-1px" }}>
                      {answerInfo?.nickname}님
                    </span>
                    <span
                      style={{
                        fontSize: "20px",
                        margin: "0 5px",
                        verticalAlign: "middle",
                      }}
                    >
                      ˚
                    </span>
                    <span
                      style={{
                        letterSpacing: "-2.5px",
                      }}
                    >
                      {answerInfo?.questionCreatedUserNickname}님의 질문
                    </span>
                  </CardWriterNickNameLeft>
                </CardWriterLeft>
                <HashTag style={{color: color, border: `1px solid ${color}`}}>#{topic}</HashTag>
                {answerInfo.answerUserId === user_info.id ? (
                  <div
                    style={{
                      cursor: "pointer",
                      position: "relative",
                    }}
                  >
                    {updateModal ? (
                      <CardUpdateModal
                        setCancelModal={setCancelModal}
                        setAnswer={setAnswer}
                        setUpdateAnswer={setUpdateAnswer}
                        close={props.close}
                        setUpdateModal={setUpdateModal}
                        {...answerInfo}
                      />
                    ) : null}
                    {cancelModal ? (
                      <CancelConfirm
                        {...answerInfo}
                        setCancelModal={setCancelModal}
                        close={props.close}
                      />
                    ) : null}
                    <MoreVertIcon
                      onClick={() => {
                        if (updateModal) {
                          setUpdateModal(false);
                        } else {
                          setUpdateModal(true);
                        }
                      }}
                    />
                  </div>
                ) : null}
              </CardWriterInfoLeft>
              {/* 카드 질문 내용 */}
              <CardQuestionContent>
                {answerInfo?.questionContents}
              </CardQuestionContent>
            </CardWriterBox>
            <CardWriteLeftBody type={answerInfo?.type}>
              <SmallHashTag>{topic}</SmallHashTag>
              <SmallQuestionContent>
                {answerInfo?.questionContents}
              </SmallQuestionContent>
              {updateAnswer ? (
                <AnswerUpdateBox>
                  <CardAnswerInput value={answer} onChange={changeAnswer} />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      marginTop: "20px",
                    }}
                  >
                    <CustomSwitch isOpen={isOpen} onClick={clickOpen} />
                    <CardAnswerBtn
                      onClick={() => {
                        let _answer = {
                          answerId: answerInfo.answerId,
                          questionId: answerInfo.questionId,
                          contents: answer,
                          isOpen: isOpen,
                        };
                        dispatch(communityActions.editAnswerAX(_answer));
                        setUpdateAnswer(false);
                      }}
                    >
                      수정
                    </CardAnswerBtn>
                  </div>
                </AnswerUpdateBox>
              ) : (
                <CardAnswerContent type={answerInfo?.type} style={{ whiteSpace: "pre-wrap" }}>
                  {answerInfo?.answerContents}
                </CardAnswerContent>
              )}
              {answerInfo?.type ==='book' && <TodayCards>
                <DateBox>
                <Date>
                <ArrowForwardIosIcon
                  disabled={card_loading}
                  onClick={() => {
                    setUpdateAnswer(false);
                    previousDay();
                  }}
                  style={{
                    cursor: "pointer",
                    transform: "rotateZ(180deg)",
                    color: "#000000",
                    fontSize: "16px",
                  }}
                />
                <span
                  style={{
                    fontWeight: "600",
                    fontSize: "14px",
                    color: "#000000",
                  }}
                >
                  {nowdate.format("M")}월{nowdate.format("D")}일
                </span>
                <ArrowForwardIosIcon
                  disabled={card_loading}
                  onClick={() => {
                    setUpdateAnswer(false);
                    nextDay();
                  }}
                  style={{
                    cursor: "pointer",
                    color: "#000000",
                    fontSize: "16px",
                  }}
                />
                    </Date>
                    </DateBox>
                  <Cards>
                    {answerQuantity.length && answerQuantity.map((v,idx)=> {
                      console.log(v)
                      if(v.answerId === answerInfo.answerId){
                        return(
                          <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                            <Selected>{v.questionContents}</Selected>
                            <span style={{font:'normal normal 300 10px/15px Noto Sans KR',color:'#939393',marginLeft:'10px'}}>현재글</span>
                          </div>
                        )
                      } else{
                        return(
                          <NotSelected disabled={card_loading}
                          onClick={() => {
                            setUpdateAnswer(false);
                            selectedCard(v.answerId);
                          }}>{v.questionContents}</NotSelected>
                        )
                      }
                    })}
                  </Cards>
              </TodayCards>}
              
            </CardWriteLeftBody>
            {/* <IconContainer>
              <IconBox>
              <LikeContainer>
                {answerInfo.like ? (
                  <LikeBtn
                    style={{ color: "red" }}
              {updateAnswer ? (
                <AnswerUpdateBox>
                  <CardAnswerInput value={answer} onChange={changeAnswer} />
                  <CardAnswerBtn
                    onClick={() => {
                      let _answer = {
                        answerId: answerInfo.answerId,
                        questionId: answerInfo.questionId,
                        contents: answer,
                        isOpen: isOpen,
                      };
                      dispatch(communityActions.editAnswerAX(_answer));
                      setUpdateAnswer(false);
                    }}
                  >
                    수정
                  </CardAnswerBtn>
                  <CustomSwitch isOpen={isOpen} onClick={clickOpen} />
                </AnswerUpdateBox>
              ) : (
                <CardAnswerContent style={{ whiteSpace: "pre-wrap" }}>
                  {answerInfo?.answerContents}
                </CardAnswerContent>
              )}
            </CardWriteLeftBody> */}
            <IconContainer type={answerInfo?.type}>
              <IconBox>
                <LikeContainer>
                  {answerInfo.like ? (
                    <LikeBtn
                      style={{ color: "#061366" }}
                      onClick={() => {
                        if (!is_login) {
                          swal({
                            title: "좋아요 누르기 실패",
                            text: "로그인 후 이용 가능한 서비스입니다.",
                            icon: "error",
                          });
                          return;
                        }
                        dispatch(
                          communityActions.deleteLikeAX(
                            answerInfo.answerId,
                            answerInfo.questionId
                          )
                        );
                      }}
                    >
                      <FavoriteIcon />
                    </LikeBtn>
                  ) : (
                    <LikeBtn
                      onClick={() => {
                        if (!is_login) {
                          swal({
                            title: "좋아요 누르기 실패",
                            text: "로그인 후 이용 가능한 서비스입니다.",
                            icon: "error",
                          });
                          return;
                        }
                        dispatch(
                          communityActions.addLikeAX(
                            answerInfo.answerId,
                            answerInfo.questionId
                          )
                        );
                      }}
                    >
                      <FavoriteBorderIcon />
                    </LikeBtn>
                  )}
                  <LikeCount>{answerInfo?.likeCount}개</LikeCount>
                </LikeContainer>
                <CommentContainer>
                  <CommentBtn>
                    <ChatBubbleOutlineIcon />
                    <CommentCount>{comment_list?.length}개</CommentCount>
                  </CommentBtn>
                </CommentContainer>
              </IconBox>
              <span style={{ marginRight: "20px" }}>
                {getDate(answerInfo.answerCreatedAt)}
              </span>
            </IconContainer>
          </ModalContent>
          <ModalRightContainer>
            <CommentList />
            <ModalCmtInputBox>
              <WebModalInputBox>
            <ModalCmtInput
                  type="text"
                  placeholder="게시물에 대해 이야기를 나눠보세요."
                  onChange={selectComment}
                  value={comments}
                  ref={cmtInput}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      addComment();
                    }
                  }}
                  onKeyUp={(e) => {
                    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                      selectComment(e);
                    }
                  }}
                  onClick={selectComment}
                />
                {ok_submit ? (
                  <ModalUpload
                    onClick={() => {
                      if (!is_login) {
                        swal({
                          title: "댓글 추가 실패",
                          text: "로그인 후 이용 가능한 서비스입니다.",
                          icon: "error",
                        });
                        setComments("");
                        return;
                      }
                      addComment();
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    게시
                  </ModalUpload>
                ) : (
                  <ModalUpload style={{ opacity: "0.3" }}>게시</ModalUpload>
                )}
              </WebModalInputBox>
              <SmallInputBox>
                <ModalCmtInput
                  type="text"
                  placeholder="게시물에 대해 이야기를 나눠보세요."
                  onChange={selectComment}
                  value={comments}
                  ref={cmtInput}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      addComment();
                    }
                  }}
                  onKeyUp={(e) => {
                    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                      selectComment(e);
                    }
                  }}
                  onClick={selectComment}
                />
                {ok_submit ? (
                  <ModalUpload
                    onClick={() => {
                      if (!is_login) {
                        swal({
                          title: "댓글 추가 실패",
                          text: "로그인 후 이용 가능한 서비스입니다.",
                          icon: "error",
                        });
                        setComments("");
                        return;
                      }
                      addComment();
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    게시
                  </ModalUpload>
                ) : (
                  <ModalUpload style={{ opacity: "0.3" }}>게시</ModalUpload>
                )}
              </SmallInputBox>
            </ModalCmtInputBox>
            {tagModal ? (
              <TagModal
                loading={loading}
                user_list={user_list}
                getUserTag={getUserTag}
              />
            ) : null}
          </ModalRightContainer>
        </ModalComponent>
      )}
    </React.Fragment>
  );
};

const Component = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  opacity: 0.4;
  height: 100vh;
  width: 100vw;
  background: black;
  z-index: 120;
  @media (max-width: 750px) {
    z-index: 300;
  }
`;

const ModalComponent = styled.div`
  /* overflow: hidden; */
  border-radius: 50px;
  position: fixed;
  width: 840px;
  height: 500px;
  ${(props) => (props.book ? `top:47%` : `top:50%`)};
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  z-index: 130;
  display: flex;
  /* box-shadow: 0px 0px 15px #c1c7fc; */
  @media (max-width: 950px) {
    width: 750px;
  }

  @media (max-width: 750px) {
    overflow-y:auto;
    border-radius: 16px;
    top: 0%;
    left: 0%;
    width: 100%;
    height: 100%;
    flex-direction: column;
    align-items: center;
    background: none;
    transform: translate(0%, 0%);
    z-index: 350;
  }

`;

const ModalContent = styled.div`
  box-sizing: border-box;
  padding: 40px 0 0 0;
  width: 500px;
  height: 500px;
  border-right: 1px solid #efefef;

  @media (max-width: 750px) {
    width: 100%;
    ${props => props.type === 'book'? `height:100%`:`height:100%`};
    border: none;
    border-radius: 20px 20px 0 0;
    background: white;
    padding: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;

const HashTag = styled.span`
  min-width: 72px;
  max-width: 72px;
  padding: 8px 12px;
  border-radius: 24px;
  text-align: center;
  font: normal normal bold 14px/19px Noto Sans CJK KR;
  letter-spacing: 0px;
  color: #363636;
  font-size: 14px;
  margin-right: 10px;
  :hover {
    cursor: pointer;
  }

  @media (max-width: 750px) {
    display: none;
  }
`;

const GoBackBtn = styled.span`
  @media (min-width: 750px) {
    display: none;
  }
`;

const SmallHashTag = styled.div`
  min-width: 58px;
  max-width: 58px;
  background: #c3c9fe;
  padding: 8px 12px;
  border-radius: 24px;
  text-align: center;
  font: normal normal bold 14px/19px Roboto;
  box-shadow: 0px 0px 15px #c1c7fc;
  letter-spacing: 0px;
  color: #363636;
  font-size: 11px;
  :hover {
    cursor: pointer;
  }

  @media (min-width: 750px) {
    display: none;
  }
`;

const CardWriteLeftBody = styled.div`
  min-height: 50%;
  max-height: 50%;
  border-bottom: 1px solid #efefef;
  box-sizing: border-box;

  @media (max-width: 750px) {
    margin-top:30px;
    min-height: 180px;
    ${props => props.type === 'book' ? `max-height: 360px` :`max-height: 360px`};
    ${props => props.type === 'book' ? `padding: 20px 29px 0px 20px` :`padding: 20px 29px 150px 20px`};
    /* padding: 20px 29px 0 20px; */
    border-bottom: none;
    display: flex;
    width: 100%;
    flex-direction: column;
  }
`;

const CardWriterBox = styled.div`
  border-bottom: 1px solid #efefef;
  min-height: 30%;
  max-height: 30%;

  @media (max-width: 750px) {
    border: none;
    min-height: 33px;
    max-height: 33px;
  }
`;

const CardWriterInfoLeft = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  @media (max-width: 750px) {
    padding: 20px 29px 10px 20px;
    border-bottom: 1px solid #d3d3d3;
  }
`;

const CardWriterLeft = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: auto;
  height: 100%;
  margin: 0 40px;
  @media (max-width: 750px) {
    margin: 0;
  }
`;

const CardWriterProfileLeft = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-image: url(${(props) => props.src});
  background-size: cover;
  cursor: pointer;

  @media (max-width: 750px) {
    display: none;
  }
`;

const CardWriterNickNameLeft = styled.span`
  margin-left: 8px;
`;

const CardQuestionContent = styled.div`
  margin: 0px 40px;
  padding: 15px 0;
  font: normal normal bold 17px/23px Nanum Myeongjo;
  letter-spacing: 0px;
  color: #363636;
  opacity: 1;
  @media (max-width: 750px) {
    display: none;
  }
`;

const SmallQuestionContent = styled.div`
  
  font: normal normal bold 19px/27px Noto Sans KR;
  padding: 0;
  font-weight: bold;
  margin: 10px 0;

  @media (min-width: 750px) {
    display: none;
  }
`;

const CardAnswerContent = styled.div`
  margin: 20px 40px 0;
  padding: 10px 0 10px 0;
  max-height: 210px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  };
  @media (max-width: 750px) {
    margin: 0;
    padding: 0;
    width: 100%;
    overflow-y: scroll;
    ${props => props.type === 'book' ? `min-height:160px`:'min-height:110px'};
  };
`;

const AnswerUpdateBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const CardAnswerInput = styled.textarea`
  margin: 0 40px 0;
  padding: 30px 0 0 0;
  border: none;
  width: 85%;
  height: 155px;
  box-sizing: border-box;
  outline: none;
  line-height: 1.5;
  resize: none;
`;
const CardAnswerBtn = styled.div`
  margin-right: 20px;
  margin-left: 20px;
  font-size: 16px;
  cursor: pointer;
  color: white;
  padding: 6px 20px;
  background: #303685;
  border-radius: 20px;
  &:hover {
    font-weight: 600;
  }
`;

const ModalRightContainer = styled.div`
  box-sizing: border-box;
  position: relative;
  width: 400px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: white;
  padding: 25px 0 0 0;
  border-radius: 0px 50px 50px 0px;
  @media (max-width: 750px) {
    width: 100%;
    padding: 0;
    border-radius: 0 0 20px 20px;
    height: 43%;
  }
`;

const ModalCmtInputBox = styled.div`
  width: 100%;
  min-height: 74px;
  max-height: 74px;
  padding: 10px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  border-top: 1px solid #efefef;

  @media (max-width: 750px) {
    min-height: 80px;
    max-height: 80px;
    border-top: 1px solid #d3d3d3;
  }
`;
const ModalCmtInput = styled.input`
  background: transparent;
  border: none;
  outline: none;
  width: 80%;
`;

const ModalUpload = styled.div`
  margin-right: 20px;
  font-size: 14px;
  color: #3897f0;
  font-weight: 600;

  @media (max-width: 750px) {
    margin: 0;
  }
`;

const IconContainer = styled.div`
  z-index:1;
  display: flex;
  min-height: 16%;
  max-height: 20%;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  margin: 0 0 0 40px;

  @media (max-width: 750px) {
    min-height: 50px;
    max-height: 50px;
    padding: 0 0 0 20px;
    ${props => props.type === 'book' ? `margin: 160px 0px 0px 0px`:`margin: 0px 0px 0px 0px`};
    border-top: 1px solid #d3d3d3;
    border-bottom: 1px solid #d3d3d3;
  }
`;

const IconBox = styled.div`
  display: flex;
  align-items: center;
`;

const LikeContainer = styled.div`
  display: flex;
`;

const CommentContainer = styled.div`
  display: flex;
  margin: 0 0 0 8px;
`;

const CommentBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  margin-right: 5px;
`;

const CommentCount = styled.div`
margin-left: 5px;
  font-size: 17px;
`;

const LikeBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  cursor: pointer;
  margin-right: 5px;
`;

const LikeCount = styled.div`
  font-size: 17px;
`;

const CardDate = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 150px;
  height: 30px;
  position: absolute;
  top: -60px;
  left: 42%;
  @media(max-width:750px){
    display:none;
  }
`;

const LeftArrowBtn = styled.button`
  z-index: 40;
  width: 109px;
  height: 109px;
  border-radius: 50%;
  outline: none;
  border: none;
  opacity: 1;
  position: absolute;
  left: -20%;
  top: 40%;
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
    box-shadow: 0px 0px 20px #ffffff;
  }
  @media(max-width:1100px){
    top:-100px;
    left:25%;
  }
  @media(max-width:750px){
    display:none;
  }
`;

const RightArrowBtn = styled.button`
  z-index: 40;
  width: 109px;
  height: 109px;
  border-radius: 50%;
  outline: none;
  border: none;
  opacity: 1;
  position: absolute;
  right: -20%;
  top: 40%;
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
    box-shadow: 0px 0px 20px #ffffff;
  }
  @media(max-width:1100px){
    top:-100px;
    left:65%;
  }
  @media(max-width:750px){
    display:none;
  }
`;

const BooksDetailBox = styled.div`
  position: absolute;
  width: 100%;
  top: 550px;
  left: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const DetailContainer = styled.div`
  width: 50%;
  height: 100%;
  margin: 0px 45px 0px 10px;
  @media(max-width:750px){
    display:none;
  }
`;

const Head = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-bottom: 17px;
`;

const BooksSubject = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 72px;
  height: 31px;
  background-color: #a2acff;
  box-shadow: 0px 3px 15px #c3c9fe;
  opacity: 0.8;
  border-radius: 45px;
  font-size: 14px;
  font-weight: 600;
`;

const TitleBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.span`
  font-size: 17px;
  margin-left: 16px;
  color: #ffffff;
  font-weight: 400;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  &:hover {
    font-weight: 800;
  }
`;

const Contents = styled.span`
  width: 100%;
  height: 100%;
  font-size: 14px;
  color: #ffffff;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const WebModalInputBox = styled.div`
width:100%;
display: flex;
  justify-content: space-between;
  flex-direction:row;
  align-items: center;
  @media(max-width:750px){
    display:none;
  }
`;

const SmallInputBox = styled.div`
  border-radius: 45px;
  background: #f5f5f5;
  display: flex;
  width: 100%;
  padding: 8px 12px;
  justify-content: space-between;
  @media (min-width: 750px) {
    display: none;
  }
`;

const TodayCards = styled.div`
  width:100%;
  min-height:160px;
  border: 0.5px solid #D9D9D9;
  box-sizing:border-box;
  padding:15px;
  @media(min-width:750px){
    display:none;
  }
`;

const DateBox = styled.div`
  display:flex;
  flex-direction:row;
  justify-content: flex-start;
  margin-bottom:10px;
`;

const Date = styled.div`
  display:flex;
  flex-direction:row;
  align-items:center;
  justify-content:space-between;
`;

const Cards = styled.div`
  display:flex;
  flex-direction:column;
  width:100%;
`;

const Selected = styled.span`
  width:80%;
  margin-bottom:10px;
  max-height:24px;
  font:normal normal normal 12px/30px Noto Sans KR;
  color:#000000;
  opacity:0.9;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const NotSelected = styled.span`
width:80%;
margin-bottom:10px;
max-height:24px;
  font:normal normal normal 12px/30px Noto Sans KR;
  color:#D3D3D3;
  opacity:0.9;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;


export default CardModal;
