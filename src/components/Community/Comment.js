import React, {useState, useEffect} from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { api as commentActions } from "../../redux/modules/comment";
import { history } from "../../redux/configStore";
import reactStringReplace from "react-string-replace"

const Comment = (props) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.user);
  // let contents = props.CommentContent
  // const comment = props.commentContents.replace(``)
  // console.log(props.comment)


  const deleteComment = () => {
    dispatch(commentActions.deleteCommentAX(props.commentId));
  };

//   let test = reactStringReplace('내 이름은 이대호', '이대호', (match, i)=> (
//     <span key={i} style={{color: "blue", cursor: "pointer"}} onClick={() => {history.push('/')}}>{match}</span>
// ));

  // {reactStringReplace(props.conmmentContents, /\@[a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣0-9~!@#$%^&*()_]*/g, (match, i)=>(
  //   <span key={i} style={{color: "blue", cursor: "pointer"}} onClick={() => {history.push(`/others/${props.tag[i-1][1]}`)}}>{match}</span>
  // ))}

  let contents = props.commentContents;
  props.tag.map((t) => {
    contents = reactStringReplace(contents, `@${t[0]}`, (match, i) => (
      <span key={t[1]} style={{color: "#37628B", cursor: "pointer"}} onClick={() => {history.push(`/others/${t[1]}`)}}>{match}</span>
    ))
  });

  
  // let contents;
  //   props.tag.map((t, idx)=> {
  //     contents = props.commentContents.replace(`@${t[0]}`,<span style={{color:'blue'}} onClick={()=>{
  //       history.push(`/others/${t[1]}`)}}>{t[0]}</span>)
  //   })
  // console.log(JSON.stringify(contents))
  // console.log(contents)
  // console.log(props.commentContents, contents)
  console.log(props.commentContents)

  return (
      <CommentFrame>
        <CommentProfileInfo>
          <CommentProfile
            src={props.profileImg}
            onClick={() => {
              if (userInfo?.id === props.userId) {
                history.push(`/mybook`);
                return;
              }
              history.push(`/others/${props.userId}`);
            }}
          />
          <CommentProfileName>{props.nickname}</CommentProfileName>
        </CommentProfileInfo>
        <CommentContent>
          {contents}
        </CommentContent>
        {userInfo?.id === props.userId ? (
          <DeleteBtn onClick={deleteComment}>삭제</DeleteBtn>
        ) : null}
      </CommentFrame>
  );
};

const CommentFrame = styled.div`
  margin-bottom:15px;
  display: flex;
  align-items: center;
`;

const CommentProfileInfo = styled.div`
  display: flex;
  align-items: center;
`;

const CommentProfile = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: gray;
  :hover {
    cursor: pointer;
  }
`;

const CommentProfileName = styled.span`
  margin-left: 8px;
  font-weight: bold;
`;

const CommentContent = styled.p`
  margin: 0 0 0 8px;
`;

const DeleteBtn = styled.button``;

export default Comment;
