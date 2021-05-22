import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getCookie } from "../../shared/Cookie";
axios.defaults.baseURL = "https://lkj99.shop";
axios.defaults.headers.common["Authorization"] = `Bearer ${getCookie(
  "is_login"
)}`;

const friendsSlice = createSlice({
    name: "frieinds",
    initialState: {
      answer_list: [],
      next: true,
      is_loading: true,
      is_initialLoading: true,
    },
    reducers: {
      setLoading: (state, action) => {
        state.is_loading = action.payload;
      },
      setInitialLoading: (state, action) => {
        state.is_initialLoading = action.payload;
      },
      setNext: (state, action) => {
        state.next = action.payload;
      },
      setAnswerList: (state, action) => {
        state.answer_list = action.payload;
        state.is_initialLoading = false;
      },
      addAnswerList: (state, action) => {
        action.payload.forEach((a) => {
          state.answer_list.push(a);
        })
      },
      editFriendLikeInfo: (state, action) => {
        console.log(action.payload);
        let index = state.answer_list.findIndex(
          (a) => a._id === action.payload._id
        );
        console.log(index);
  
          if (index !== -1){
            state.answer_list[index] = {
              ...state.answer_list[index],
              like: action.payload.like,
              likeCount: action.payload.likeCount,
            };
          }
      },
      editFriendCommentInfo: (state, action) => {
        let decision = action.payload.decision;
        let index = state.answer_list.findIndex(
          (a) => a._id === action.payload._id
        );
        console.log(index);
  
        if (decision === "add") {
          state.answer_list[index] = {
            ...state.answer_list[index],
            commentCount: state.answer_list[index].commentCount + 1,
          };
        } else {
          state.answer_list[index] = {
            ...state.answer_list[index],
            commentCount: state.answer_list[index].commentCount - 1,
          };
        }
      },
    },
  });
  
  const getFriendAnswers = () => {
    return function (dispatch, getState) {
      const next = getState().friends.next;
      if (!next) {
        return;
      }
      dispatch(setInitialLoading(true));
      dispatch(setLoading(true));
      const options = {
        url: `/friendFeed`,
        method: "GET",
      };
      axios(options).then((response) => {
          console.log(response.data.friendCards);
          let is_more = response.data.friendCards.length >= 10 ? true : false;
          console.log(is_more);
          if (!is_more) {
            dispatch(setAnswerList(response.data.friendCards));
            dispatch(setNext(false));
            dispatch(setLoading(false));
            return;
          }
          dispatch(setAnswerList(response.data.friendCards));
          dispatch(setNext(true));
          dispatch(setLoading(false));
        });
    };
  };

  const getNextFriendAnswers = (lastId) => {
    console.log("NEXT 실행됐다!!!!");
    return function (dispatch, getState) {
      const next = getState().friends.next;
      if (!next) {
        return;
      }
      dispatch(setLoading(true));
      const options = {
        url: `/friendFeed?lastId=${lastId}`,
        method: "GET",
      };
      axios(options).then((response) => {
          console.log(response.data.friendCards);
          let is_more = response.data.friendCards.length >= 10 ? true : false;

          if (!is_more) {
            dispatch(addAnswerList(response.data.friendCards));
            dispatch(setNext(false));
            dispatch(setLoading(false));
            return;
          }
          dispatch(addAnswerList(response.data.friendCards));
          dispatch(setNext(true));
          dispatch(setLoading(false));
        });
    };
  }

  const addLikeFriend = (answerId) => {
    return function (dispatch, getState) {
      axios
        .post("/bookshelf/like/answerCard", { answerCardId: answerId })
        .then((res) => {
          dispatch(
            editFriendLikeInfo({
              _id: answerId,
              likeCount: res.data.likeCountNum,
              like: res.data.currentLike,
            })
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  
  const deleteLikeFriend = (answerId) => {
    return function (dispatch, getState) {
      axios
        .patch("/bookshelf/like/answerCard", { answerCardId: answerId })
        .then((res) => {
          dispatch(
            editFriendLikeInfo({
              _id: answerId,
              likeCount: res.data.likeCountNum,
              like: res.data.currentLike,
            })
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  export const {
    setAnswerList,
    addAnswerList,
    setLoading,
    setInitialLoading,
    setNext,
    editFriendLikeInfo,
    editFriendCommentInfo,
  } = friendsSlice.actions;

  export const api = {
    getFriendAnswers,
    getNextFriendAnswers,
    addLikeFriend,
    deleteLikeFriend 
  };

  export default friendsSlice.reducer;