import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// import moment from "moment";
import { getCookie } from "../../shared/Cookie";
import swal from "sweetalert";
import { editCommentInfo } from "./community";
import { editDetailCommentInfo, editDetailLikeInfo } from "./moreview";

axios.defaults.baseURL = "https://lkj99.shop";
if (getCookie("is_login")) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${getCookie(
    "is_login"
  )}`;
}

const commentSlice = createSlice({
  name: "comment",
  initialState: {
    list: [],
    answer_info: {},
  },
  reducers: {
    setAnswerInfo: (state, action) => {
      state.answer_info = action.payload;
    },
    editAnswerInfo: (state, action) => {
      state.answer_info.likeCount = action.payload.likeCount;
      state.answer_info.like = action.payload.like;
    },
    setComment: (state, action) => {
      state.list = action.payload;
    },
    addComment: (state, action) => {
      state.list.push(action.payload);
    },
    deleteComment: (state, action) => {
      const index = state.list.findIndex((c) => c.commentId === action.payload);
      state.list.splice(index, 1);
    },
    addLike:(state, action) => {
      const index = state.list.findIndex(v => v.commentId === action.payload);
      if(index !== -1){
        state.list[index].commentLikeCount += 1;
        state.list[index].currentLike = true;
      }
    },
    subtractLike:(state, action) => {
      const index = state.list.findIndex(v => v.commentId === action.payload);
      if(index !== -1){
        state.list[index].commentLikeCount -= 1;
        state.list[index].currentLike = false;
      }
    }
  },
});

const getCommentAX = (cardId) => {
  return function (dispatch) {
    const options = {
      url: `/comment/${cardId}`,
      method: "GET",
    };
    axios(options)
      .then((response) => {
        dispatch(setComment(response.data.comments));
      })
      .catch((err) => {
        console.log(err);
        if (err.response) {
          console.log(err.response.data);
        }
      });
  };
};

const sendCommentAX = (cardId, content, tagId = [], questionId) => {
  return function (dispatch, getState) {
    let comment_data = {
      commentContents: content,
      tag: tagId,
    };
    const options = {
      url: `/comment/${cardId}`,
      method: "POST",
      data: comment_data,
    };
    axios(options)
      .then((response) => {
        dispatch(
          addComment({ ...response.data.result, commentCreatedAt: "방금전" })
        );
        if (getState().community.card_detail.type === "detail") {
          dispatch(
            editDetailCommentInfo({ answerId: cardId, decision: "add" })
          );
          return;
        }
        else if (getState().community.card_detail.type === "community"){
          dispatch(
            editCommentInfo({
              questionId: questionId,
              answerId: cardId,
              decision: 1,
            })
          );
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response) {
          console.log(err.response.data);
        }
      });
  };
};

const deleteCommentAX = (commentId, questionId, cardId) => {
  return function (dispatch, getState) {
    axios({
      method: "DELETE",
      url: `/comment/${commentId}`,
    })
      .then((res) => {
        dispatch(deleteComment(commentId));
        if (getState().community.card_detail.type === "detail") {
          dispatch(
            editDetailCommentInfo({ answerId: cardId, decision: "substract" })
          );
          return;
        } 
        else if (getState().community.card_detail.type === "community"){
          dispatch(
            editCommentInfo({
              questionId: questionId,
              answerId: cardId,
              decision: -1,
            })
          );
        }
      })
      .catch((err) => {
        swal({
          title: "코멘트 삭제 실패",
          text: "댓글을 삭제하지 못했습니다❕",
          icon: "error",
        });
      });
  };
};

const addCommentLike = (id) => {
  return function(dispatch, getState){
    const options = {
      url:`comment/like/${id}`,
      method:"POST"
    }
    axios(options).then((response) => {
      console.log(response.data);
      dispatch(addLike(id));
    }).catch(err => console.log(err));
  }
}

const deleteCommentLike = (id) => {
  return function(dispatch, getState){
    const options = {
      url:`comment/like/${id}`,
      method:"PATCH"
    }
    axios(options).then((response) => {
      console.log(response.data);
      dispatch(subtractLike(id));
    }).catch(err => console.log(err));
  }
}

export const {
  setComment,
  addComment,
  deleteComment,
  setAnswerInfo,
  editAnswerInfo,
  addLike,
  subtractLike
} = commentSlice.actions;

export const api = {
  getCommentAX,
  sendCommentAX,
  deleteCommentAX,
  addCommentLike,
  deleteCommentLike,
};

export default commentSlice.reducer;
