import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { api as commentActions } from "../../redux/modules/comment";
import { history } from "../../redux/configStore";
import reactStringReplace from "react-string-replace";
import { DeleteOutlined } from "@ant-design/icons";
import { time } from "../../shared/Time";

const Comment = (props) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.user);
  const answerInfo = useSelector((state) => state.community.card_detail);
  // let contents = props.CommentContent
  // const comment = props.commentContents.replace(``)
  // console.log(props.comment)

  const deleteComment = () => {
    dispatch(
      commentActions.deleteCommentAX(
        props.commentId,
        answerInfo?.questionId,
        answerInfo?.answerId
      )
    );
  };

  //   let test = reactStringReplace('내 이름은 이대호', '이대호', (match, i)=> (
  //     <span key={i} style={{color: "blue", cursor: "pointer"}} onClick={() => {history.push('/')}}>{match}</span>
  // ));

  // {reactStringReplace(props.conmmentContents, /\@[a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣0-9~!@#$%^&*()_]*/g, (match, i)=>(
  //   <span key={i} style={{color: "blue", cursor: "pointer"}} onClick={() => {history.push(`/others/${props.tag[i-1][1]}`)}}>{match}</span>
  // ))}

  let timeFormat =
    props.commentCreatedAt !== "방금전"
      ? time(props.commentCreatedAt)
      : "방금 전";

  let contents = props.commentContents;
  props.tag.map((t) => {
    contents = reactStringReplace(contents, `@${t[0]}`, (match, i) => (
      <span
        key={t[1]}
        style={{ color: "#37628B", cursor: "pointer" }}
        onClick={() => {
          history.push(`/others/${t[1]}`);
        }}
      >
        {match}
      </span>
    ));
  });

  // let contents;
  //   props.tag.map((t, idx)=> {
  //     contents = props.commentContents.replace(`@${t[0]}`,<span style={{color:'blue'}} onClick={()=>{
  //       history.push(`/others/${t[1]}`)}}>{t[0]}</span>)
  //   })
  // console.log(JSON.stringify(contents))
  // console.log(contents)
  // console.log(props.commentContents, contents)
  console.log(props.commentContents);

  return (
    <CommentFrame>
      <CommentProfileInfo>
        <div>
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
        </div>
        {userInfo?.id === props.userId ? (
          <DeleteBtn onClick={deleteComment}>
            <DeleteOutlined />
          </DeleteBtn>
        ) : null}
      </CommentProfileInfo>
      <CommentContent>{contents}</CommentContent>
      <CommentBottom>
        <TimeIndicator>{timeFormat}</TimeIndicator>
      </CommentBottom>
    </CommentFrame>
  );
};

const CommentFrame = styled.div`
  width: 100%;
  padding: 10px 29px 5px 20px;
  margin-bottom: 5px;
  :hover {
    background: #fef2f4;
  }
`;

const CommentProfileInfo = styled.div`
  display: flex;
  justify-content: space-between;
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
  font: normal normal bold 13px/18px Roboto;
  letter-spacing: 0px;
`;

const CommentContent = styled.p`
  margin: 0 0 0 38px;
  font: normal normal normal 13px/18px Roboto;
  letter-spacing: 0px;
  color: #939393;
`;

const TimeIndicator = styled.span`
  margin: 9px 0 0 38px;
  font: normal normal normal 12px/16px Roboto;
  letter-spacing: 0px;
  color: #c4c4c4;
`;

const CommentBottom = styled.div`
  display: flex;
  justify-content: space-between;
`;

const DeleteBtn = styled.button`
  outline: none;
  border: none;
  background: none;
  cursor: pointer;
  :hover {
    transform: scale(1.2);
    transition: 200ms ease-in-out;
  }
`;

export default Comment;
