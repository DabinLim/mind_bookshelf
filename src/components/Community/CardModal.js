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
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CustomSwitch from '../../shared/CustomSwitch'
import CancelConfirm from './CancelConfirm'

const CardModal = (props) => {
  const answerInfo = useSelector((state) => state.community.card_detail);
  const comment_list = useSelector((state) => state.comment.list);
  const user_info = useSelector((state) => state.user.user);
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
  const [cancelModal, setCancelModal] = useState(false)
  const cmtInput = useRef();
  const ok_submit = comments ? true : false;
  const url = window.location.href.split("/");
  const id = url[url.length - 1];

  function clickOpen() {
    if (isOpen) {
      setOpen(false);
      return;
    }
    setOpen(true);
  }

  const changeAnswer = (e) => {
    if(answer.length > 1000){
      return
    }
    setAnswer(e.target.value)
  }

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

  let color = "";
  let topic = "";
  if (answerInfo?.questionTopic?.length > 0) {
    topic = answerInfo?.questionTopic[0];
    if (answerInfo?.questionTopic[0] === "나") {
      color = "#F9D9FC";
    } else if (answerInfo?.questionTopic[0] === "사랑") {
      color = "#FEBABA";
    } else if (answerInfo?.questionTopic[0] === "관계") {
      color = "#FDF1AE";
    } else if (answerInfo?.questionTopic[0] === "가치") {
      color = "#C2C8FD";
    } else if (answerInfo?.questionTopic[0] === "우정") {
      color = "#C4FCCD";
    } else if (answerInfo?.questionTopic[0] === "꿈") {
      color = "#C3E9FD";
    }
  }

  return (
    <React.Fragment>
      {cancelModal ? 
      <CancelConfirm {...answerInfo} setCancelModal={setCancelModal} close={props.close} />
      :null}
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
              <LeftArrowBtn
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
              </RightArrowBtn>
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
              <LeftArrowBtn
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
              </RightArrowBtn>
            </>
          )}
          <ModalContent>
            <CardWriterBox>
              <CardWriterInfoLeft>
                <CardWriterLeft>
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
                <HashTag style={{ background: color }}>{topic}</HashTag>
                {answerInfo.answerUserId === user_info.id ? 
                <div style={{marginRight:"10px", cursor: "pointer", position:"relative"}} >
                  {updateModal? 
                  <CardUpdateModal setCancelModal={setCancelModal} setAnswer={setAnswer} setUpdateAnswer={setUpdateAnswer}  close={props.close} setUpdateModal={setUpdateModal} {...answerInfo} />
                  :null}
                  <MoreVertIcon onClick={()=>{
                    if(updateModal){
                      setUpdateModal(false)
                    }else{
                      setUpdateModal(true)}} 
                    }/>
                </div>
              :null}
              </CardWriterInfoLeft>
              <SmallHashTag style={{ background: color }}>{topic}</SmallHashTag>
              {/* 카드 질문 내용 */}
              <CardQuestionContent>
                {answerInfo?.questionContents}
              </CardQuestionContent>
            </CardWriterBox>
            <CardWriteLeftBody>
              {updateAnswer?
              <AnswerUpdateBox>
                <CardAnswerInput value={answer} onChange={changeAnswer} />
                <div style={{display:"flex", justifyContent:'flex-end', marginTop:"20px"}} >
                  <CustomSwitch isOpen={isOpen} onClick={clickOpen}/>
                  <CardAnswerBtn onClick={()=>{
                    let _answer = {
                      answerId: answerInfo.answerId,
                      questionId: answerInfo.questionId,
                      contents: answer,
                      isOpen: isOpen,
                    }
                    dispatch(communityActions.editAnswerAX(_answer))
                    setUpdateAnswer(false)
                  }} >수정</CardAnswerBtn>
                </div>
              </AnswerUpdateBox>
              :
              <CardAnswerContent style={{ whiteSpace: "pre-wrap" }}>
                {answerInfo?.answerContents}
              </CardAnswerContent>
              }
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
            <IconContainer>
              <IconBox>
                <LikeContainer>
                  {answerInfo.like ? (
                    <LikeBtn
                      style={{ color: "red" }}
                      onClick={() => {
                        if (!getCookie("is_login")) {
                          swal({
                            title: "좋아요 누르기 실패 😥",
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
                        if (!getCookie("is_login")) {
                          swal({
                            title: "좋아요 누르기 실패 😥",
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
              {answerInfo.answerUserId === user_info.id ? (
                <div style={{ marginRight: "10px", cursor: "pointer" }}>
                  <MoreVertIcon
                    onClick={() => {
                      setUpdateModal(true);
                    }}
                  />
                </div>
              ) : null}
            </IconContainer>
          </ModalContent>
          <ModalRightContainer>
            <CommentList />
            <ModalCmtInputBox>
              <ModalCmtInput
                type="text"
                placeholder="댓글달기..."
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
                    if (!getCookie("is_login")) {
                      swal({
                        title: "댓글 추가 실패 😥",
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
    width: 400px;
  }

  @media (max-width: 500px) {
    top: 0%;
    left: 0%;
    width: 100%;
    height: 100%;
    flex-direction: column;
    align-items: center;
    background: none;
    transform: translate(0%, 0%);
    margin: 58.33px 0 0 0;
    z-index: 120;
  }
`;

const ModalContent = styled.div`
  box-sizing: border-box;
  padding: 40px 0 0 0;
  width: 500px;
  height: 500px;
  border-right: 1px solid #efefef;
  @media (max-width: 950px) {
    width: 375px;
    height: 412px;
    border: none;
    margin-bottom: 10px;
    border-radius: 20px;
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

  @media (max-width: 500px) {
    display: none;
  }
`;

const GoBackBtn = styled.span`
  @media (min-width: 500px) {
    display: none;
  }
`;

const SmallHashTag = styled.div`
  min-width: 58px;
  max-width: 58px;
  background: #ededed;
  padding: 8px 12px;
  border-radius: 24px;
  text-align: center;
  font: normal normal bold 14px/19px Roboto;
  box-shadow: 0px 0px 15px #c1c7fc;
  letter-spacing: 0px;
  color: #363636;
  font-size: 11px;
  margin: 0px 20px 10px 20px;
  :hover {
    cursor: pointer;
  }

  @media (min-width: 500px) {
    display: none;
  }
`;

const CardWriteLeftBody = styled.div`
  min-height: 50%;
  max-height: 50%;
  border-bottom: 1px solid #efefef;
  box-sizing: border-box;

  @media (max-width: 500px) {
    min-height: 150px;
    max-height: 150px;
    padding: 0 29px 0 20px;
    margin-top: 30px;
  }
`;

const CardWriterBox = styled.div`
  border-bottom: 1px solid #efefef;
  min-height: 30%;
  max-height: 30%;
`;

const CardWriterInfoLeft = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  @media (max-width: 500px) {
    padding: 20px 29px 20px 20px;
  }
`;

const CardWriterLeft = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: auto;
  height: 100%;
  margin: 0 40px;

  @media (max-width: 500px) {
    margin: 0;
    border-bottom: 1px solid #efefef;
  }
`;

const CardWriterProfileLeft = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-image: url(${(props) => props.src});
  background-size: cover;
  cursor: pointer;

  @media (max-width: 500px) {
    display: none;
  }
`;

const CardWriterNickNameLeft = styled.span`
  margin-left: 8px;
`;

const CardQuestionContent = styled.p`
  margin: 0px 40px;
  padding: 15px 0;
  font: normal normal bold 17px/23px Roboto;
  letter-spacing: 0px;
  color: #363636;
  opacity: 1;
  @media (max-width: 500px) {
    margin: 0;
    font-size: 21px;
    padding: 0 29px 0 20px;
  }
`;

const CardAnswerContent = styled.div`
  margin: 0 40px 0;
  padding: 30px 0 0 0;
  @media (max-width: 500px) {
    margin: 0;
  }
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
  @media (max-width: 500px) {
    width: 375px;
    height: 412px;
    padding: 0;
    border-radius: 20px;
    justify-content: flex-start;
  }
`;

const CardInfo = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CardWriterInfo = styled.div`
  display: flex;
  align-items: center;
`;

const CardWriterProfile = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: gray;
  :hover {
    cursor: pointer;
  }
`;


const ModalCmtInputBox = styled.div`
  width: 100%;
  min-height: 92px;
  max-height: 92px;
  padding: 0px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  border-top: 1px solid #efefef;

  @media (max-width: 500px) {
    min-height: 80px;
    max-height: 80px;
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
`;

const IconContainer = styled.div`
  display: flex;
  min-height: 20%;
  max-height: 20%;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  margin: 0 0 0 40px;

  @media (max-width: 500px) {
    margin: 0 0 0 20px;
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
  cursor: pointer;
  margin-right: 5px;
`;

const CommentCount = styled.div`
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

// const MoreBtn = styled.button`
//   font-size: 20px;
//   outline: none;
//   border: none;
//   background: none;
//   cursor: pointer;

//   :hover {
//     background: #c4c4c4;
//     border-radius: 50%;
//   }
// `;

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

export default CardModal;
