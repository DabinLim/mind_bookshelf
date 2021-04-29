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
  },
  reducers: {
    setComment: (state, action) => {
      state.list = action.payload;
    },
    addComment: (state, action) => {
      state.list[action.payload.question_id].unshift(action.payload.comment);
    },
    deleteComment: (state, action) => {
      const index = state.list[action.payload.question_id].findIndex(
        (c) => c.commentId === action.payload.commentId
      );
      state.list[action.payload.question_id].splice(index, 1);
    },
  },
});

const getCommentAX = (cardId) => {
  return function (dispatch, getState) {
    console.log(cardId);
    // const options = {
    //   url: `/comment/${cardId}`,
    //   method: "GET",
    // };
    // axios(options)
    //   .then((response) => {
    //     console.log(response.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     if (err.response) {
    //       console.log(err.response.data);
    //     }
    //   });
  };
};

const sendCommentAX = (cardId, content) => {
  return function (dispatch, getState) {
    let comment_data = {
      contents: content,
    };
    const options = {
      url: `/comment/${cardId}`,
      method: "POST",
      data: comment_data,
    };
    axios(options)
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
        if (err.response) {
          console.log(err.response.data);
        }
      });
  };
};

const deleteCommentAX = (cardId, commentId) => {
  console.log(cardId, commentId);
  return function (dispatch, getState, { history }) {
    axios({
      method: "DELETE",
      url: `/comment/${commentId}`,
      data: { commentId: commentId },
    })
      .then((res) => {
        console.log(res.data);
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

export const { setComment, addComment, deleteComment } = commentSlice.actions;

export const api = {
  getCommentAX,
  sendCommentAX,
  deleteCommentAX,
};

export default commentSlice.reducer;
