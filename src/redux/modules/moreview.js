import { createSlice } from "@reduxjs/toolkit";
import { getCookie } from "../../shared/Cookie";
import axios from "axios";
import { editAnswerInfo } from "./comment";

axios.defaults.baseURL = "http://lkj99.shop";
axios.defaults.headers.common["Authorization"] = `Bearer ${getCookie(
  "is_login"
)}`;

const moreviewSlice = createSlice({
  name: "moreview",
  initialState: {
    now_view:'new',
    question_info: null,
    answers: [],
    like_answers: [],
    friends_answers: [],
    page: 1,
    like_page:1,
    friends_page:1,
    next: true,
    like_next: true,
    friends_next: true,
    is_loading: true,
  },
  reducers: {
    setLoading: (state, action) => {
      state.is_loading = action.payload
    },
    setView: (state, action) => {
        state.now_view = action.payload;
    },
    setQuestionInfo: (state, action) => {
      state.question_info = action.payload;
    },
    setNext: (state, action) => {
      state.next = action.payload;
    },
    setAnswers: (state, action) => {
      action.payload.forEach((v) => {
        state.answers.push(v);
      });
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setLikeNext: (state, action) => {
        state.like_next = action.payload;
      },
      setLikeAnswers: (state, action) => {
        action.payload.forEach((v) => {
          state.like_answers.push(v);
        });
      },
      setLikePage: (state, action) => {
        state.new_page = action.payload;
      },
      setFriendsNext: (state, action) => {
        state.friends_next = action.payload;
      },
      setFriendsAnswers: (state, action) => {
        action.payload.forEach((v) => {
          state.friends_answers.push(v);
        });
      },
      setFriendsPage: (state, action) => {
        state.friends_page = action.payload;
      },
    resetAll: (state) => {
      state.answers = [];
      state.page = 1;
      state.next = true;
      state.like_answers = [];
      state.like_page = 1;
      state.like_next = true;
      state.friends_answers = [];
      state.friends_page = 1;
      state.friends_next = true;
      state.now_view = 'new';
    },
  },
});


const getAnswers = (id) => {
  return function (dispatch, getState) {
    const next = getState().moreview.next;
    if (!next) {
      console.log("next is none");
      return;
    }
    const page = getState().moreview.page;
    const options = {
      url: `/bookshelf/moreInfoCard/${id}?page=${page}`,
      method: "GET",
    };
    axios(options).then((response) => {
    //   console.log(response.data);
      if(!response.data.answer.length){
        window.alert('질문에 대한 답변이 더 이상 없습니다.');
        dispatch(setNext(false));
        return;
      }
      dispatch(setAnswers(response.data.answer));
      dispatch(setPage(page + 1));
    });
  };
};

const getLikeAnswer = (id) => {
    return function(dispatch, getState){
      const next = getState().moreview.like_next;
      if (!next) {
        console.log("next is none");
        return;
      }
      const page = getState().moreview.like_page;
      const options = {
        url: `/bookshelf/moreInfoCard/like/${id}?page=${page}`,
        method: "GET",
      };
      axios(options).then((response) => {
        // console.log(response.data);
        if(!response.data.length){
          window.alert('질문에 대한 답변이 더 이상 없습니다.');
          dispatch(setLikeNext(false));
          return;
        }
        dispatch(setLikeAnswers(response.data));
        dispatch(setLikePage(page + 1));
      });
    } 
  }

  const getFriendsAnswer = (id) => {
    return function(dispatch, getState){
      const next = getState().moreview.friends_next;
      if (!next) {
        console.log("next is none");
        return;
      }
      const page = getState().moreview.friends_page;
      const options = {
        url: `/bookshelf/moreInfoCard/friend/${id}?page=${page}`,
        method: "GET",
      };
      axios(options).then((response) => {
        // console.log(response.data);
        if(!response.data.length){
          window.alert('질문에 대한 답변이 더 이상 없습니다.');
          dispatch(setFriendsNext(false));
          return;
        }
        dispatch(setFriendsAnswers(response.data));
        dispatch(setFriendsPage(page + 1));
      });
    } 
  }


const getQuestionInfo = (id) => {
  return function (dispatch) {
    const options = {
      url: `/bookshelf/moreInfoCardTitle/${id}`,
      method: "GET",
    };
    axios(options).then((response) => {
      // console.log(response.data)
      dispatch(setQuestionInfo(response.data))
    })
  }
}


export const {
    resetAll,
  setAnswers,
  setPage,
  setNext,
  setLikeAnswers,
  setLikePage,
  setLikeNext,
  setFriendsAnswers,
  setFriendsPage,
  setFriendsNext,
  setQuestionInfo,
  setLoading,
  setView
} = moreviewSlice.actions;

export const api = {
  getAnswers,
  getQuestionInfo,
  getLikeAnswer,
  getFriendsAnswer
};

export default moreviewSlice.reducer;
