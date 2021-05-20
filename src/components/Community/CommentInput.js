import React from 'react';
import styled from 'styled-components';
import swal from "sweetalert";
import { config } from "../../shared/config";
import axios from "axios";
import {useDispatch, useSelector} from 'react-redux';
import _ from "lodash";
import { api as commentActions } from "../../redux/modules/comment";
import TagModal from './TagModal';

const CommentInput = (pros) => {
    const answerInfo = useSelector((state) => state.community.card_detail);
    const is_login = useSelector((state) => state.user.is_login);
    const dispatch = useDispatch();
    const [loading, setLoading] = React.useState(false);
    const [user_list, setUser_list] = React.useState();
    const [tagModal, setTagModal] = React.useState(false);
    const [comments, setComments] = React.useState();
    const ok_submit = comments ? true : false;

    const cmtInput = React.useRef();

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
    
    

    return(
        <React.Fragment>
            <Container>
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
                {tagModal ? (
              <TagModal
                mobile
                loading={loading}
                user_list={user_list}
                getUserTag={getUserTag}
              />
            ) : null}
              </SmallInputBox>
              </Container>
        </React.Fragment>
    )
}

const Container = styled.div`
  width: 100%;
  height:78px;
  position:fixed;
  bottom:0;
  left:0;
  display:flex;
  justify-content:center;
  align-items:center;
  background-color:#ffffff;
  border: 0.5px solid #D3D3D3;
  border-radius:0px 0px 16px 16px;
  box-sizing:border-box;
  padding:18px 25px;
`;

const SmallInputBox = styled.div`
  border-radius: 45px;
  background: #F5F5F5;
  display: flex;
  width: 100%;
  padding: 10px 22px;
  justify-content: space-between;
`;

const ModalCmtInput = styled.input`
  background: transparent;
  border: none;
  outline: none;
  width: 80%;
`;

const ModalUpload = styled.div`
  margin: 0px;
  font-size: 14px;
  color: #3C3C3C;
  font-weight: 600;
`;



export default CommentInput;