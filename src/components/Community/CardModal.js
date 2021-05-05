import React, { useState, useRef } from "react";
import styled from "styled-components";
import { api as commentActions, setComment } from "../../redux/modules/comment";
import { api as communityActions } from "../../redux/modules/community";
import { useDispatch, useSelector } from "react-redux";
import FavoriteIcon from "@material-ui/icons/Favorite";
import CommentList from "./CommentList";
import HideModal from "./HideModal";
import TagModal from "./TagModal"
import { MoreOutlined } from "@ant-design/icons";
import { history } from "../../redux/configStore";
import axios from 'axios'
import {config} from '../../shared/config'
import _ from "lodash";

const CardModal = (props) => {
  const answerInfo = useSelector((state) => state.comment.answer_info);
  const user_info = useSelector((state) => state.user.user);
  console.log(answerInfo)
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [user_list, setUser_list] = useState();
  const [comments, setComments] = useState();
  const [tagModal, setTagModal] = useState(false);
  const cmtInput = useRef()
  const ok_submit = comments ? true : false;
  

  const debounce = _.debounce((words) => {
    setLoading(true)
    const searchUsers = async() => {
      const result = await axios.post(`${config.api}/bookshelf/searchUser`, {words: words})
      if(result.data.userInfo === "none" || result.data.userInfo.length === 0){
        setUser_list()
        setLoading(false)
      }else{
        setUser_list(result.data.userInfo)
        setLoading(false)
      }
    }
    searchUsers()
  }, 500);

  const keyPress = React.useCallback(debounce, []);
  
  const tagSetting = (start, text) => {
    console.log(start ,text)
    if(text[start-1] === "@"){
      return(true)
    }
    for(let i = start-1; i >= 0; i--){
      console.log(i, text[i])
      if(text[i] === " "){
        return false 
      } else if(text[i] === "@"){
        return text.substring(i+1, start)
      }
    }
    return false
  }

  const getUserTag = (nickname) => {
    setTagModal(false)
    let start = cmtInput.current.selectionStart
    let text = cmtInput.current.value
    for(let i = start-1; i >= 0; i--){
      if(text[i] === "@"){
        let end_point = start;
        while(end_point < text.length && text[end_point]!=" "){
          end_point += 1;
        }
        let cmt = text.substr(0, i+1) + nickname + text.substr(end_point, text.length);
        setComments(cmt)
        return
      } 
    }
  }

  const selectComment = (e) => {
      const word = tagSetting(e.target.selectionStart, e.target.value)
      if(word){
        setTagModal(true)
        keyPress(word)
      }else{
        setTagModal(false)
      }
    setComments(e.target.value);
  };

  const CheckTagAX = async(words) => {
    const result = await axios.post(`${config.api}/bookshelf/searchUser`, {words: words})
      if(result.data.userInfo === "none" || result.data.userInfo.length === 0){
        return
      }else{
        let userInfo = result.data.userInfo;
        console.log(userInfo)
        for(let user of userInfo){
          if(words === user.nickname){
            return [user.nickname, user.userId]
          }
        }
        return
      }
  }

  const CheckTag = async () => {
    let status = 0;
    let temp  = "";
    let list = [];
    for(let i = 0; i < comments.length; i++){
      if(comments[i] === "@"){
        status = 1;
      }else if(status === 1 && comments[i] !== " "){
        temp += comments[i]
      }else if(comments[i] === " "){
        status = 0;
        if(temp){
          console.log(temp)
          let tag = await CheckTagAX(temp);
            if(tag){
              list.push(tag);
            }
          temp = "";
        }
      }
    }
    if(temp){
      console.log(temp)
      let tag = await CheckTagAX(temp);
        if(tag){
          list.push(tag);
        }
    }
    return list
  }

  const addComment = async () => {
    let tagId = await CheckTag()
    setTagModal(false)
    dispatch(commentActions.sendCommentAX(answerInfo?.answerId, comments, tagId));
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
        <CardWriterInfoLeft>
          <CardWriterLeft>
            <CardWriterProfileLeft src={answerInfo?.profileImg}/>
          </CardWriterLeft>
        </CardWriterInfoLeft>
          {answerInfo?.content}
          </ModalContent>
        <ModalRightContainer>
          <CardInfo>
            <CardWriterInfo>
              <CardWriterProfile
                src={
                  answerInfo?.profileImg
                    ? answerInfo?.profileImg
                    : "data:image/png;base64,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"
                }
                onClick={() => {
                  if (user_info?.id === answerInfo?.userId) {
                    history.push(`/mybook`);
                    return;
                  }
                  history.push(`/others/${answerInfo?.userId}`);
                }}
              ></CardWriterProfile>
              <CardWriter>
                <b>{answerInfo?.nickname ? answerInfo?.nickname : "고객"}</b>
              </CardWriter>
              {/* 더보기 아이콘 */}
            </CardWriterInfo>
            <MoreBtn onClick={openHide}>
              <MoreOutlined />
            </MoreBtn>
          </CardInfo>

          {isOpen && <HideModal close={closeHide} />}
          <CommentList />

          <LikeContainer>
            {answerInfo.like ? (
              <LikeBtn
                style={{ color: "red" }}
                onClick={() => {
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
                style={{ color: "pink" }}
                onClick={() => {
                  dispatch(
                    communityActions.addLikeAX(
                      answerInfo.answerId,
                      answerInfo.questionId
                    )
                  );
                }}
              >
                <FavoriteIcon />
              </LikeBtn>
            )}
            <LikeCount>{answerInfo.likeCount}개</LikeCount>
          </LikeContainer>
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
                  addComment();}
              }}
              onKeyUp={(e)=>{
                if (e.key === "ArrowRight" || e.key === "ArrowLeft"){
                  selectComment(e)
                }
              }}
              onClick={selectComment}
            />
            {ok_submit ? (
              <ModalUpload onClick={addComment} style={{ cursor: "pointer" }}>
                게시
              </ModalUpload>
            ) : (
              <ModalUpload style={{ opacity: "0.3" }}>게시</ModalUpload>
            )}
          </ModalCmtInputBox>
          {tagModal? 
          <TagModal loading={loading} user_list={user_list} getUserTag={getUserTag} />
          :null}
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
  background-color: black;
  z-index: 10;
`;

const ModalComponent = styled.div`
  overflow:hidden;
  border-radius:50px;
  position: fixed;
  width: 840px;
  height: 500px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: lightgray;
  z-index: 20;
  display: flex;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.12), 0 2px 5px rgba(0, 0, 0, 0.24);
  @media (max-width: 950px) {
    width: 400px;
  }
  @media (max-width: 400px) {
    width: 95%;
  }
`;

const ModalContent = styled.div`
    box-sizing:border-box;
  padding:40px;
  width: 500px;
  height: 500px;
  @media (max-width: 950px) {
    display: none;
  }
`;

const CardWriterInfoLeft = styled.div`
  display:flex;
  flex-direction:row;
  justify-content:space-between;
  align-items:center;
  width:100%;
  height:36px;
`;

const CardWriterLeft = styled.div`
  display: flex;
  flex-direction:row;
  justify-content:flex-start;
  align-items:center;
  width:auto;
  height:100%;
`;

const CardWriterProfileLeft = styled.div`
  width:36px;
  height:36px;
  border-radius:50%;
  background-image:url(${props => props.src});
  background-size: cover;
`;

const CardWriterNicknameLeft = styled.span`

`;

const ModalRightContainer = styled.div`
  box-sizing:border-box;
  padding:15px 0px 0px 0px;
  position: relative;
  width: 400px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color:white;
`;

const CardInfo = styled.div`
  margin: 0px 15px;
  display: flex;
  justify-content: space-between;
  padding-bottom:15px;
  border-bottom: 1px solid #efefef;
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
  height: 56px;
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
  margin-right:20px;
  font-size: 14px;
  color: #3897f0;
  font-weight: 600;
`;

const LikeContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items:center;
  box-sizing:border-box;
  padding: 10px;
  border-top: 1px solid #efefef;
`;
const LikeBtn = styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  font-size: 18px;
  cursor: pointer;
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
