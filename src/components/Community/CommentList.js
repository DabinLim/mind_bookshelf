import React from "react";
import styled from "styled-components";
import axios from 'axios';
import {config} from '../../shared/config'
import {history} from '../../redux/configStore'
import { useSelector } from "react-redux";
import { Comment } from "./communityindex";
import reactStringReplace from "react-string-replace"

const CommentList = (props) => {
  const comment_list = useSelector((state) => state.comment.list);
  const contents = ""
  // const CheckTagAX = async(words) => {
  //   const result = await axios.post(`${config.api}/bookshelf/searchUser`, {words: words})
  //     if(result.data.userInfo === "none" || result.data.userInfo.length === 0){
  //       return
  //     }else{
  //       let userInfo = result.data.userInfo;
  //       console.log(userInfo)
  //       for(let user of userInfo){
  //         if(words === user.nickname){
  //           return user.userId
  //         }
  //       }
  //       return
  //     }
  // }

  // const CheckTag = async (comments) => {
  //   let status = 0;
  //   let temp  = "";
  //   let contents = "";
  //   for(let i = 0; i < comments.length; i++){
  //     if(comments[i] === "@"){
  //       status = 1;
  //       contents += comments[i]
  //     }else if(status === 1 && comments[i] !== " "){
  //       temp += comments[i]
  //     }else if(comments[i] === " "){
  //       status = 0;
  //       if(temp){
  //         console.log(temp)
  //         let id = await CheckTagAX(temp);
  //           if(id){
  //             contents += `<span style={{color:'blue'}} onClick={()=>{
  //               history.push('/others/${id}')
  //             }}>${temp}</span>`
  //           }else{
  //             contents += temp;
  //           }
  //         temp = "";
  //       }
  //     }else if(status === 0){
  //       contents += comments[i]
  //     }
  //   }
  //   if(temp){
  //     let id = await CheckTagAX(temp);
  //     if(id){
  //       contents += `<span style={{color:'blue'}} onClick={()=>{
  //         history.push('/others/${id}')
  //       }}>${temp}</span>`
  //     }else{
  //       contents += temp;
  //     }
  //   }
  //   return contents
  // }



  return (
    <CommentContainer>
      {comment_list?.map((c, idx) => {
        // console.log(c)
        //   c.tag?.map((t)=>{
        //   let contents = reactStringReplace(c.commentContents, `@${t[0]}`, (match, i)=> (
        //       <span key={i} style={{color: "blue", cursor: "pointer"}} onClick={() => {history.push(`/others/${t[1]}`)}}>{match}</span>
        //     ))
        //   })
        return (
          <>
            <Comment key={idx} {...c} contents = {contents}/>
          </>
        );
      })}
    </CommentContainer>
  );
};

const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 400px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export default CommentList;
