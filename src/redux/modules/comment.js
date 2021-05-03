import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// import moment from "moment";
import { getCookie, deleteCookie } from "../../shared/Cookie";
import swal from "sweetalert";

axios.defaults.baseURL = "http://lkj99.shop";
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
      state.list.unshift(action.payload);
    },
    deleteComment: (state, action) => {
      const index = state.list.findIndex((c) => c.commentId === action.payload);
      state.list.splice(index, 1);
    },
  },
});

const getCommentAX = (cardId) => {
  return function (dispatch) {
    console.log(cardId);
    const options = {
      url: `/comment/${cardId}`,
      method: "GET",
    };
    axios(options)
      .then((response) => {
        console.log(response.data.comments)
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



const sendCommentAX = (cardId, content, tagId = []) => {
  return function (dispatch) {
    // console.log(cardId, content);
    // return;
      console.log(tagId)
      let comment_data = {
        commentContents: content,
        tag : tagId,
      };
      const options = {
        url: `/comment/${cardId}`,
        method: "POST",
        data: comment_data,
      };
      axios(options)
        .then((response) => {
          dispatch(addComment(response.data.result));
        })
        .catch((err) => {
          console.log(err);
          if (err.response) {
            console.log(err.response.data);
          }
        });
  };
};

const deleteCommentAX = (commentId) => {
  console.log(commentId);
  return function (dispatch, getState) {
    axios({
      method: "DELETE",
      url: `/comment/${commentId}`,
    })
      .then((res) => {
        dispatch(deleteComment(commentId));
      })
      .catch((err) => {
        swal({
          title: "코멘트 삭제 실패 😥",
          text: "댓글을 삭제하지 못했습니다❕",
          icon: "error",
        });
      });
  };
};

export const {
  setComment,
  addComment,
  deleteComment,
  setAnswerInfo,
  editAnswerInfo,
} = commentSlice.actions;

export const api = {
  getCommentAX,
  sendCommentAX,
  deleteCommentAX,
};

export default commentSlice.reducer;
