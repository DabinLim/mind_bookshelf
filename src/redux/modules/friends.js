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
      page: 1,
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
      setPage: (state, action) => {
        state.page = action.payload;
      },
      editDetailLikeInfo: (state, action) => {
        let index = state.answer_list.findIndex(
          (a) => a.answerId === action.payload.answerId
        );
  
          if (index !== -1){
            state.answer_list[index] = {
              ...state.answer_list[index],
              like: action.payload.like,
              answerLikes: action.payload.likeCount,
            };
          }
      },
      editDetailCommentInfo: (state, action) => {
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
      const loading = getState().friends.is_loading;
      // const page = getState().friends.page;
      const next = getState().friends.next;
      if (!next) {
        return;
      }
    //   if (loading && page > 1) {
    //     return;
    //   }
      dispatch(setLoading(true));
      const options = {
        url: `/friendFeed`,
        method: "GET",
      };
      axios(options).then((response) => {
          console.log(response.data.friendCards);
          let is_more = response.data.friendCards.length >= 10 ? true : false;

          if (!is_more) {
            dispatch(setAnswerList(response.data.friendCards));
            dispatch(setNext(false));
            dispatch(setLoading(false));
            return;
          }
          dispatch(setAnswerList(response.data.friendCards));
          dispatch(setNext(true));
          dispatch(setLoading(false));

    //     if (response.data.answer.length < 10) {
    //       dispatch(setAnswers(response.data.answer));
    //       dispatch(setNext(false));
    //       dispatch(setLoading(false));
    //       return;
    //     }
    //     dispatch(setAnswers(response.data.answer));
    //     dispatch(setPage(page + 1));
    //     dispatch(setLoading(false));
        });
    };
  };

  export const {
    setAnswerList,
    setLoading,
    setNext,
    setPage,
  } = friendsSlice.actions;

  export const api = {
    getFriendAnswers,
  };

  export default friendsSlice.reducer;