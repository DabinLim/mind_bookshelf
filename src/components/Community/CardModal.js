import React, { useState, useRef } from "react";
import styled from "styled-components";
import { api as commentActions } from "../../redux/modules/comment";
import {
  api as booksActions,
  changeDate,
  setBookDetailModal,
} from "../../redux/modules/books";
// import CommentInput from "./CommentInput"
import { api as communityActions, editLikeCardFriend, resetAll} from "../../redux/modules/community";
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
import Like from '../../shared/Like';
import Subject from '../../shared/Subject';
import { CenterFocusStrong } from "@material-ui/icons";
import {editFriendCommentInfo} from "../../redux/modules/friends";
import LikeModal from './LikeModal';


const CardModal = (props) => {
  const answerInfo = useSelector((state) => state.community.card_detail);
  const comment_list = useSelector((state) => state.comment.list);
  const user_info = useSelector((state) => state.user.user);
  const is_login = useSelector((state) => state.user.is_login);
  const card_loading = useSelector((state) => state.community.card_loading);
  const answerQuantity = useSelector((state) => state.books.book_detail);
  const bookdate = useSelector((state) => state.books.book_detail_modal);
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
  const [page, setPage] = useState(null);
  const [cancelModal, setCancelModal] = useState(false);
  const cmtInput = useRef();
  const ok_submit = comments ? true : false;
  const url = window.location.href.split("/");
  const id = url[url.length - 1];
  const others = url[url.length-2];
  const component = useSelector(state => state.books.component);
  const currentLocation = useSelector(state => state.router.location.pathname);
  const like_list = useSelector(state => state.community.like_list);
  const [likeModal, setLikeModal] = React.useState(false);
  const container = React.useRef();

  const closeModal = () => {
    setLikeModal(false);
  };


  React.useEffect(() => {
    if(component === 'myanswers' || 'othersanswers'){
      setPage('component');
    }
    if (currentLocation === "/friends") {
      setPage('friends');
    }
    ChannelService.shutdown();
    return () => {
      dispatch(resetAll());
      ChannelService.boot({
        pluginKey: "1e06f0ed-5da8-42f4-bb69-7e215b14ec18",
      });
    };
  }, []);

  const gotoMobile = () => {
    if(id ==='mybook'){
      history.push(`/bookdetail/${bookdate}/${answerInfo.answerId}`);
      return
    }
    if(others ==='others'){
      history.push(`/othersdetail/${bookdate}/${id}/${answerInfo.answerId}`);
      return
    }
    history.push(`/carddetail/${answerInfo.answerId}`);
  }

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
    dispatch(resetAll())
    dispatch(communityActions.getCardDetail(id, "book"));
    dispatch(communityActions.getLikeList(id));
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
      dispatch(resetAll())
      dispatch(booksActions.getNextDetail(thisMonthBooks[nowBook + 1]._id));
    } else {
      dispatch(resetAll())
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
      dispatch(resetAll())
      // 이 부분 전날로 돌아가서 첫번째 답변 띄우려고 getNext 호출입니다.
      // 혹시 수정 하실 일 있으시면 참고해 주세요.
      dispatch(booksActions.getNextDetail(thisMonthBooks[nowBook - 1]._id));
    } else {
      dispatch(resetAll())
      dispatch(
        booksActions.getNextOthersBookDetail(
          thisMonthBooks[nowBook - 1]._id,
          id
        )
      );
    }
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
    if (currentLocation === "/friends") {
      dispatch(editFriendCommentInfo({_id: answerInfo?.answerId, decision: "add"}))
    }
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
      <Notification>
        <NotiContent>웹 전용 페이지 입니다. 모바일 전용 페이지 버튼을 클릭해주세요.</NotiContent>
        <GotoMobile onClick={gotoMobile}>모바일 전용 페이지</GotoMobile>
      </Notification>
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
          {answerInfo?.type === "book" && component !=='myanswers' && component!== 'othersanswers' &&(
            <>
              {answerQuantity.length &&
                answerQuantity.map((v, idx) => {
                  if (!card_loading) {
                    return (
                      <DetailContainer key={idx}>
                            <Title
                              disabled={card_loading}
                              onClick={() => {
                                setUpdateAnswer(false);
                                selectedCard(v.answerId);
                              }}
                            >
                              {idx+1}.{v.questionContents}
                            </Title>
                        <Contents>{v.answerContents}</Contents>
                      </DetailContainer>
                    );
                  }
                })}
              <CardDate>
                <LeftOutlined
                  disabled={card_loading}
                  onClick={() => {
                    setUpdateAnswer(false);
                    previousDay();
                  }}
                  style={{
                    cursor: "pointer",
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
                <LeftOutlined
                  disabled={card_loading}
                  onClick={() => {
                    setUpdateAnswer(false);
                    nextDay();
                  }}
                  style={{
                    transform:'rotateZ(180deg)',
                    cursor: "pointer",
                    color: "white",
                    fontSize: "25px",
                  }}
                />
              </CardDate>
            </>
          )}
        </ModalComponent>
      ) : (
        <ModalComponent book={props.book}>
          {answerInfo?.type === "book" && component !=='myanswers' && component!== 'othersanswers'&& (
            <>
              <BooksDetailBox>
                {answerQuantity.length &&
                  answerQuantity.map((v, idx) => {
                    if (!card_loading) {
                      return (
                        <DetailContainer key={idx}>
                   
                              <Title
                                disabled={card_loading}
                                onClick={() => {
                                  setUpdateAnswer(false);
                                  selectedCard(v.answerId);
                                }}
                              >
                                {idx+1}.{v.questionContents}
                              </Title>
                          
                          <Contents>{v.answerContents}</Contents>
                        </DetailContainer>
                      );
                    }
                  })}
              </BooksDetailBox>
              <CardDate>
                <LeftOutlined
                  disabled={card_loading}
                  onClick={() => {
                    setUpdateAnswer(false);
                    previousDay();
                  }}
                  style={{
                    cursor: "pointer",
                    color: "white",
                    fontSize: "25px",
                  }}
                />

                <span
                  style={{
                    font:'normal normal bold 18px/26px Noto Sans CJK KR',
                    color: "#ffffff",
                    letterSpacing: '0px',
                    textShadow: '0px 0px 10px #00000080'
                  }}
                >
                  {nowdate.format("M")}월{nowdate.format("D")}일
                </span>

                <LeftOutlined
                  disabled={card_loading}
                  onClick={() => {
                    setUpdateAnswer(false);
                    nextDay();
                  }}
                  style={{
                    transform: "rotateZ(180deg)",
                    cursor: "pointer",
                    color: "white",
                    fontSize: "25px",
                  }}
                />
              </CardDate>
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
                    <span style={{ font: 'normal normal bold 13px/19px Noto Sans CJK KR',letterSpacing: '0px',color: '#121212',cursor: "pointer"}} onClick={() => {
                      if (
                        user_info?.nickname !== "" &&
                        user_info?.nickname === answerInfo?.nickname
                      ) {
                        history.push(`/mybook`);
                        return;
                      }
                      history.push(`/others/${answerInfo?.answerUserId}`);
                    }}>
                      {answerInfo?.nickname}님
                    </span>
                    <img alt='그냥 점'src='https://user-images.githubusercontent.com/77574867/119256677-d6831680-bbfc-11eb-8be2-11f15c7caa2b.png' style={{width:'4px',height:'4px',margin:'0px 7px 3px 7px'}}/>
                    <span
                      style={{
                        letterSpacing: "0px",
                        font: 'normal normal normal 13px/19px Noto Sans CJK KR',color: '#474747',
                      }}
                    >
                      {answerInfo?.questionCreatedUserNickname}님의 질문
                    </span>
                  </CardWriterNickNameLeft>
                </CardWriterLeft>
                <div style={{marginTop:'5px',display:'flex', alignItems: "center"}}>
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
                          type="web"
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
                </div>
              </CardWriterInfoLeft>
              {/* 카드 질문 내용 */}
              <CardQuestionContent>
              <HashTag style={{color: color, border: `1px solid ${color}`}}><span>#{topic}</span></HashTag>
              <span>
                {answerInfo?.questionContents}
              </span>
              </CardQuestionContent>
            </CardWriterBox>
            <CardWriteLeftBody type={answerInfo?.type}>
              {updateAnswer ? (
                <AnswerUpdateBox>
                  <CardAnswerInput value={answer} onChange={changeAnswer} />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems:'center',
                    }}
                  >
                    <CustomSwitch isOpen={isOpen} onClick={clickOpen} />
                    <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
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
                    <CardAnswerBtn
                      onClick={() => {
                        setUpdateAnswer(false);
                      }}
                    >
                      취소
                    </CardAnswerBtn>
                      </div>
                  </div>
                </AnswerUpdateBox>
              ) : (
                <CardAnswerContent type={answerInfo?.type} style={{ whiteSpace: "pre-wrap" }}>
                  {answerInfo?.answerContents}
                </CardAnswerContent>
              )}
            </CardWriteLeftBody>
            <IconContainer type={answerInfo?.type}>
              <IconBox>
                <LikeContainer>
                <Like page={page} width='20px' height='19px' currentLike={answerInfo?.like} answerId={answerInfo?.answerId} questionId={answerInfo?.questionId}/>
                  <LikeCount>{answerInfo?.likeCount}개</LikeCount>
                </LikeContainer>
                <CommentContainer>
                  <CommentBtn>
                  <CommentIcon src="https://user-images.githubusercontent.com/77369674/118684657-5e53d400-b83d-11eb-861f-41aa269aa89e.png" />
                    <CommentCount>{comment_list?.length}개</CommentCount>
                  </CommentBtn>
                </CommentContainer>
              </IconBox>
              {like_list.length ? 
                
                <LikeList>
                    {likeModal? <LikeModal web answerId={answerInfo.answerId} container={container} close={closeModal}/>:null}
                    {like_list.length > 1 ? 
                    <LikePeople onClick={()=>{setLikeModal(true)}}>
                        <span style={{fontWeight:'600'}}>{like_list[0].nickname}</span>님 외 <span style={{fontWeight:'600'}}>{answerInfo?.likeCount -1}</span>명이 좋아합니다.
                    </LikePeople> :
                    <LikePeople onClick={()=>{setLikeModal(true)}}>
                        <span style={{fontWeight:'600'}}>
                        {like_list[0].nickname}
                        </span>님이 좋아합니다.
                    </LikePeople>
                    }
                </LikeList>
                :''}
            </IconContainer>
          </ModalContent>
          <ModalRightContainer>
            <CommentList />
            <ModalCmtInputBox>
              <WebModalInputBox>
            <ModalCmtInput
                  type="text"
                  placeholder="댓글 달기..."
                  onChange={selectComment}
                  value={comments}
                  ref={cmtInput}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
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

const LikeList = styled.div`
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:flex-start;
`;

const LikePeople = styled.span`
    font: normal normal normal 13px/19px Noto Sans CJK KR;
    letter-spacing: 0px;
    color: #2F2F2F;
    cursor:pointer;
`;

const Component = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  opacity: 0.5;
  height: 100vh;
  width: 100vw;
  background: black;
  z-index: 120;
  @media (max-width: 750px) {
    z-index: 300;
  }
`;

const Notification = styled.div`
  padding:20px;
  position:fixed;
  width:300px;
  height:300px;
  top:50%;
  left:50%;
  transform: translate(-50%, -50%);
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  background-color:#ffffff;
  z-index:400;
  border-radius:10%;
  @media(min-width:750px){
    display:none;
  }
`;

const NotiContent = styled.span`
  font-size:18px;
  font-weight:600;
  @media(min-width:750px){
    display:none;
  }
`;

const GotoMobile = styled.button`
  margin-top:20px;
  width:150px;
  height:35px;
  border-radius:20px;
  border-style:none;
  background-color:lavender;
`;

const ModalComponent = styled.div`
  /* overflow: hidden; */
  // border-radius: 50px;
  position: fixed;
  width: 850px;
  height: 500px;
  top:50%;
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
    display:none;
  }

`;

const ModalContent = styled.div`
  box-sizing: border-box;
  padding-top:20px;
  min-width: 520px;
  height: 500px;
  border-right: 1px solid #efefef;

  @media (max-width: 750px) {
    width: 100%;
    ${props => props.type === 'book'? `height:100%`:`height:100%`};
    border: none;
    // border-radius: 20px 20px 0 0;
    background: white;
    padding: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;

const HashTag = styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  min-width: 58px;
  max-width: 58px;
  min-height:25px;
  max-height:25px;
  border-radius: 25px;
  text-align: center;
  font: normal normal bold 11px/16px Noto Sans CJK KR;
  letter-spacing: 0px;
  color: #7249B4;
  margin-right: 10px;
  cursor: pointer;
  @media (max-width: 750px) {
    display: none;
  }
`;

const GoBackBtn = styled.span`
  @media (min-width: 750px) {
    display: none;
  }
`;

const CardWriteLeftBody = styled.div`
padding:0px 25px;
  border-bottom: 1px solid #efefef;
  box-sizing: border-box;

`;

const CardWriterBox = styled.div`
  padding:0px 25px;
  border-bottom: 1px solid #efefef;
  min-height: 52px;
  max-height: 52px;
  margin-bottom:85px;

`;

const CardWriterInfoLeft = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
`;

const CardWriterLeft = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: auto;
  height: 100%;
  margin-right:20px;
  margin-bottom: 30px;
`;

const CardWriterProfileLeft = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-image: url(${(props) => props.src});
  background-size: cover;
  cursor: pointer;
`;

const CardWriterNickNameLeft = styled.span`
  margin-left: 8px;
`;

const CardQuestionContent = styled.div`
  display:flex;
  flex-direction:row;
  margin-right:20px;
  margin-bottom: 25px;
  padding: 15px 0;
  font: normal normal 800 16px/19px NanumMyeongjo;
  letter-spacing: 0px;
  color: #121212;
  opacity: 1;
`;


const CardAnswerContent = styled.div`
  margin: 20px 40px 17px 0px;
  padding: 10px 0 10px 0;
  font: normal normal normal 14px/20px Noto Sans CJK KR;
  letter-spacing: 0px;
  color: #363636;
  min-height:270px;
  max-height: 270px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  };
`;

const AnswerUpdateBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height:270px;
  max-height: 270px;
  margin-bottom:17px;
  padding-bottom:3px;
`;

const CardAnswerInput = styled.textarea`
  border: none;
  width: 100%;
  height: 175px;
  box-sizing: border-box;
  outline: none;
  line-height: 1.5;
  resize: none;
`;
const CardAnswerBtn = styled.button`
  margin-left: 10px;
  width:80px;
  height:38px;
  font-size: 16px;
  cursor: pointer;
  color: white;
  /* padding: 6px 20px; */
  background: #303685;
  border-style:none;
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
  // border-radius: 0px 50px 50px 0px;
`;

const ModalCmtInputBox = styled.div`
  width: 100%;
  min-height: 56px;
  max-height: 56px;
  padding: 10px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  border-top: 1px solid #efefef;
`;
const ModalCmtInput = styled.input`
  background: transparent;
  border: none;
  outline: none;
  width: 80%;
`;

const ModalUpload = styled.div`
  margin-right: 16px;
  font: normal normal bold 13px/19px Noto Sans CJK KR;
  letter-spacing: 0px;
  color: #363636;
  font-weight: 600;
`;

const IconContainer = styled.div`
  z-index:1;
  display: flex;
  min-height:55px;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding:0px 17px 0px 25px ;

`;

const IconBox = styled.div`
  display: flex;
  align-items: center;
`;

const LikeContainer = styled.div`
  display: flex;
  align-items:center;
  justify-content:center;
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

const CommentIcon = styled.img`
  cursor: pointer;
  width: 20px;
  height: 19px;

`

const CommentCount = styled.div`
margin-left: 5px;
  font-size: 17px;
`;

const LikeCount = styled.div`
  font-size: 17px;
`;

const CardDate = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 140px;
  height: 30px;
  position: absolute;
  top: -150px;
  left: 42%;
`;

const BooksDetailBox = styled.div`
  position: absolute;
  width: 900px;
  top: -80px;
  left: 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;

const DetailContainer = styled.div`
  width: 254px;
  height: 100%;
  margin-right:40px;
  cursor: pointer;
  & span {
    opacity:0.6;
  }
  &:hover{
    & span{
      opacity:1;
      font-weight:600;
    }
  }
`;

const Title = styled.span`
  color:#ffffff;
  height:25px;
  font: normal normal bold 17px/25px Noto Sans CJK KR;
  letter-spacing: 0px;
  text-shadow: 0px 0px 7px #000000;
  margin-bottom:8px;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Contents = styled.span`
  width: 100%;
  height: 20px;
  color: #ffffff;
  font: normal normal bold 14px/20px Noto Sans CJK KR;
  letter-spacing: 0px;
  text-shadow: 0px 0px 7px #000000;

  display: -webkit-box;
  -webkit-line-clamp: 1;
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
`;


export default CardModal;
