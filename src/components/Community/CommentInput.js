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
    const [loading, setLoading] = React.useState(true);
    const [user_list, setUser_list] = React.useState();
    const [tagModal, setTagModal] = React.useState(false);
    const [comments, setComments] = React.useState();
    const ok_submit = comments ? true : false;

    const cmtInput = React.useRef();

    //input caret과 cursor사이에 있는 값이 실제 있는 nickname인지 확인합니다.
    const debounce = _.debounce((words) => {
        const searchUsers = async () => {
          const result = await axios.post(`${config.api}/bookshelf/searchUser`, {
            words: words,
          });
          //없는 유저 닉네임이면 setUser_list()에 빈 값을 넣습니다.
          if (
            result.data.userInfo === "none" ||
            result.data.userInfo.length === 0
          ) {
            setUser_list();
            setLoading(false);
          }
          // 닉네임이 있으면 setUser_list에 해당 닉네임 유저 정보를 넣습니다.) 
          else {
            setUser_list(result.data.userInfo);
            setLoading(false);
          }
        };
        searchUsers();
      }, 500);
    
      const keyPress = React.useCallback(debounce, []);
      
      //start = input caret위치, text = input value
      const tagSetting = (start, text) => {
        //@가 input caret 바로 앞에 있을 경우
        if (text[start - 1] === "@") {
          // return true해서 tagModal을 띄웁니다.
          return true;
        }
        for (let i = start - 1; i >= 0; i--) {
          // input caret 앞에 @보다 " "가 먼저 나오면 return false 
          if (text[i] === " ") {
            return false;
            
          }
          // input caret 앞에 @가 나오면 @와 input caret사이에 있는 값을 return 합니다. 
          else if (text[i] === "@") {
            return text.substring(i + 1, start);
          }
        }
        // input caret 앞으로 @가 나오지 않으면 false를 return합니다.
        return false;
      };
      
      //tagModal에서 원하는 유저 닉네임을 클릭했을 때 
      //그 닉네임을 input값에 포함시킵니다.
      const getUserTag = (nickname) => {
        setTagModal(false);
        //useRef를 사용해서 input caret위치를 알아내고 
        //input value 값을 알아냅니다.
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
        //input caret위치와 @사이에 띄어쓰기가 없으면 word값이 생긴다. 
        const word = tagSetting(e.target.selectionStart, e.target.value);
        if (word) {
          //tag모달을 띄웁니다.
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
                  //input 값이 바뀔 때마다 tag값이 있는지 확인했습니다.
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
                  //Input에서 키보드를 왼쪽 오른쪽으로 움직일 때도 태그 event를 주기위함입니다.
                  onKeyUp={(e) => {
                    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                      selectComment(e);
                    }
                  }}
                  //Input이 클릭 되었을 때도 태그 event를 주었습니다.
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
  border-top: 0.5px solid #D3D3D3;
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