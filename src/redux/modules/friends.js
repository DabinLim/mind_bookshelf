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
    },
    reducers: {
      setLoading: (state, action) => {
        state.is_loading = action.payload;
      },
      setNext: (state, action) => {
        state.next = action.payload;
      },
      setAnswerList: (state, action) => {
        state.answer_list = action.payload;
      },
      addAnswerList: (state, action) => {
        action.payload.forEach((a) => {
          state.answer_list.push(a);
        })
      },
      editFriendLikeInfo: (state, action) => {
        console.log(action.payload);
        let index = state.answer_list.findIndex(
          (a) => a._id === action.payload
        );
        console.log(index);
  
          if (index !== -1){
            state.answer_list[index] = {
              ...state.answer_list[index],
              like: state.answer_list[index].like? false : true,
              likeCount: state.answer_list[index].like? state.answer_list[index].likeCount - 1 : state.answer_list[index].likeCount + 1,
            };
          }
      },
      editFriendCommentInfo: (state, action) => {
        let decision = action.payload.decision;
        let index = state.answer_list.findIndex(
          (a) => a.answerId === action.payload.answerId
        );
  
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
  export const {
    setAnswerList,
    addAnswerList,
    setLoading,
    setNext,
    editFriendLikeInfo,
    editFriendCommentInfo,
  } = friendsSlice.actions;

  export const api = {
    getFriendAnswers,
    getNextFriendAnswers
  };

  export default friendsSlice.reducer;