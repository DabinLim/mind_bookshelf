import React, { useState, useRef } from "react";
import styled from "styled-components";
import { api as commentActions, setComment } from "../../redux/modules/comment";
import { api as communityActions } from "../../redux/modules/community";
import { useDispatch, useSelector } from "react-redux";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import CommentList from "./CommentList";
import HideModal from "./HideModal";
import TagModal from "./TagModal";
import { MoreOutlined } from "@ant-design/icons";
import { history } from "../../redux/configStore";
import axios from "axios";
import { config } from "../../shared/config";
import _ from "lodash";
import swal from "sweetalert";
import { getCookie } from "../../shared/Cookie";

const CardModal = (props) => {
  const answerInfo = useSelector((state) => state.comment.answer_info);
  const comment_list = useSelector((state) => state.comment.list);
  const user_info = useSelector((state) => state.user.user);
  console.log(user_info);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [user_list, setUser_list] = useState();
  const [comments, setComments] = useState();
  const [tagModal, setTagModal] = useState(false);
  const cmtInput = useRef();
  const ok_submit = comments ? true : false;

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
    console.log(start, text);
    if (text[start - 1] === "@") {
      return true;
    }
    for (let i = start - 1; i >= 0; i--) {
      console.log(i, text[i]);
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
      console.log(userInfo);
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
          console.log(temp);
          let tag = await CheckTagAX(temp);
          if (tag) {
            list.push(tag);
          }
          temp = "";
        }
      }
    }
    if (temp) {
      console.log(temp);
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
      commentActions.sendCommentAX(answerInfo?.answerId, comments, tagId)
    );
    setComments("");
  };

  // HideModal function
  const [isOpen, setOpen] = useState(false);

  const openHide = () => {
    setOpen(true);
  };

  const closeHide = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Component onClick={props.close} />
      <ModalComponent>
        <ModalContent>
          <CardWriterBox>
            <CardWriterInfoLeft>
              <CardWriterLeft>
                <CardWriterProfileLeft src={answerInfo?.profileImg} />
                <CardWriterNickNameLeft>
                  생각낙서님의 질문
                </CardWriterNickNameLeft>
              </CardWriterLeft>
            </CardWriterInfoLeft>

            {/* 카드 질문 내용 */}
            <CardQuestionContent>{answerInfo?.content}</CardQuestionContent>
          </CardWriterBox>
          <CardWriteLeftBody>
            <CardAnswerContent>{answerInfo?.contents}</CardAnswerContent>
          </CardWriteLeftBody>
          <IconContainer>
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
                  <FavoriteBorderIcon />
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
              <LikeCount>{answerInfo.likeCount}개</LikeCount>
            </LikeContainer>
            <CommentContainer>
              <CommentBtn>
                <ChatBubbleOutlineIcon />
                <CommentCount>{comment_list?.length}개</CommentCount>
              </CommentBtn>
            </CommentContainer>
          </IconContainer>
        </ModalContent>
        <ModalRightContainer>
          <CommentList />
          <ModalCmtInputBox>
            <ModalCmtInput
              type="text"
              placeholder="댓글달기..."
              onChange={selectComment}
              value
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
  z-index: 10;
`;

const ModalComponent = styled.div`
  overflow: hidden;
  border-radius: 50px;
  position: fixed;
  width: 840px;
  height: 500px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  z-index: 20;
  display: flex;
  /* box-shadow: 0px 0px 15px #c1c7fc; */
  @media (max-width: 950px) {
    width: 400px;
  }
  @media (max-width: 400px) {
    width: 95%;
  }
`;

const ModalContent = styled.div`
  box-sizing: border-box;
  padding: 40px 0 0 0;
  width: 500px;
  height: 500px;
  border-right: 1px solid #efefef;
  @media (max-width: 950px) {
    display: none;
  }
`;

const CardWriteLeftBody = styled.div`
  min-height: 50%;
  max-height: 50%;
  border-bottom: 1px solid #efefef;
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
`;

const CardWriterLeft = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: auto;
  height: 100%;
  margin: 0 40px;
`;

const CardWriterProfileLeft = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-image: url(${(props) => props.src});
  background-size: cover;
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
`;

const CardAnswerContent = styled.div`
  margin: 0 40px 0;
  padding: 30px 0 0 0;
`;

const ModalRightContainerInner = styled.div`
  width: 100%;
  min-height: 15%;
  max-height: 15%;
  padding: 20px 20px;
  border-bottom: 1px solid #efefef;
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

const CardWriter = styled.span`
  margin-left: 8px;
`;

const CommentListBox = styled.div`
  max-height: 300px;
  overflow: auto;
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
  justify-content: flex-start;
  align-items: center;
  box-sizing: border-box;
  margin: 0 0 0 40px;
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

const MoreBtn = styled.button`
  font-size: 20px;
  outline: none;
  border: none;
  background: none;
  cursor: pointer;

  :hover {
    background: #c4c4c4;
    border-radius: 50%;
  }
`;
export default CardModal;
