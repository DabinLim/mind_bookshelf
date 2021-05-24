import { createSlice } from "@reduxjs/toolkit";
import { getCookie } from "../../shared/Cookie";
import axios from "axios";
import { editAnswerInfo } from "./comment";

axios.defaults.baseURL = "https://lkj99.shop";
axios.defaults.headers.common["Authorization"] = `Bearer ${getCookie(
  "is_login"
)}`;

const moreviewSlice = createSlice({
  name: "moreview",
  initialState: {
    now_view: "new",
    question_info: null,
    answers: [],
    like_answers: [],
    friends_answers: [],
    page: 1,
    like_page: 1,
    friends_page: 1,
    next: true,
    like_next: true,
    friends_next: true,
    is_loading: true,
    like_loading: true,
    friends_loading: true,
    is_initialLoading: true,
  },
  reducers: {
    setLoading: (state, action) => {
      state.is_loading = action.payload;
    },
    setLikeLoading: (state, action) => {
      state.like_loading = action.payload;
    },
    setFriendsLoading: (state, action) => {
      state.friends_loading = action.payload;
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
    setInitialLoading: (state, action) => {
      state.is_initialLoading = action.payload;
    }
    ,
    setAnswers: (state, action) => {
      action.payload.forEach((v) => {
        state.answers.push(v);
      });
      state.is_initialLoading = false;
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
      if (!getCookie("is_login")) {
        return;
      }
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
      state.now_view = "new";
    },
    editDetailLikeInfo: (state, action) => {
      let index = state.answers.findIndex(
        (a) => a.answerId === action.payload.answerId
      );

      let like_index = state.like_answers.findIndex(
        (a) => a.answerId === action.payload.answerId
      );

      let friends_index = state.friends_answers.findIndex(
        (a) => a.answerId === action.payload.answerId
      );
      if(action.payload.decision){
        if (index !== -1){
          if(action.payload.decision ==='dislike'){
            state.answers[index] = {
              ...state.answers[index],
              like: false,
              answerLikes: state.answers[index].answerLikes -1,
            };
          }else{
            state.answers[index] = {
              ...state.answers[index],
              like: true,
              answerLikes: state.answers[index].answerLikes +1,
            };
          }
        }
        
        if (like_index !== -1){
          if(action.payload.decision ==='dislike'){
            state.like_answers[like_index] = {
              ...state.like_answers[like_index],
              like: false,
              answerLikes: state.like_answers[index].answerLikes -1,
            };
          } else{
            state.like_answers[like_index] = {
              ...state.like_answers[like_index],
              like: true,
              answerLikes: state.like_answers[index].answerLikes+1,
            };
          }
        }

        if (friends_index !== -1) {
          if(action.payload.decistion ==='dislike'){
            state.friends_answers[friends_index] = {
              ...state.friends_answers[friends_index],
              like: false,
              answerLikes: state.friends_answers[index].answerLikes -1,
            };
          } else{
            state.friends_answers[friends_index] = {
              ...state.friends_answers[friends_index],
              like: true,
              answerLikes: state.friends_answers[index].answerLikes +1,
            };
          }
        }
      }else{
        if (index !== -1){
          state.answers[index] = {
            ...state.answers[index],
            like: action.payload.like,
            answerLikes: action.payload.likeCount,
          };
        }
        
        if (like_index !== -1){
          state.like_answers[like_index] = {
            ...state.like_answers[like_index],
            like: action.payload.like,
            answerLikes: action.payload.likeCount,
          };
        }

        if (friends_index !== -1) {
          state.friends_answers[friends_index] = {
            ...state.friends_answers[friends_index],
            like: action.payload.like,
            answerLikes: action.payload.likeCount,
          };
        }
      }
    },
    editDetailCommentInfo: (state, action) => {
      let decision = action.payload.decision;
      let index = state.answers.findIndex(
        (a) => a.answerId === action.payload.answerId
      );
      let like_index = state.like_answers.findIndex(
        (a) => a.answerId === action.payload.answerId
      );

      let friends_index = state.friends_answers.findIndex(
        (a) => a.answerId === action.payload.answerId
      );

      if (decision === "add") {
        state.answers[index] = {
          ...state.answers[index],
          commentCount: state.answers[index].commentCount + 1,
        };

        state.like_answers[like_index] = {
          ...state.like_answers[like_index],
          commentCount: state.like_answers[like_index].commentCount + 1,
        };

        if (friends_index !== -1) {
          state.friends_answers[friends_index] = {
            ...state.friends_answers[friends_index],
            commentCount: state.friends_answers[friends_index].commentCount + 1,
          };
        }
      } else {
        state.answers[index] = {
          ...state.answers[index],
          commentCount: state.answers[index].commentCount - 1,
        };

        state.like_answers[like_index] = {
          ...state.like_answers[like_index],
          commentCount: state.like_answers[like_index].commentCount - 1,
        };

        if (friends_index !== -1) {
          state.friends_answers[friends_index] = {
            ...state.friends_answers[friends_index],
            commentCount: state.friends_answers[friends_index].commentCount - 1,
          };
        }
      }
    },
    deleteMoreview : (state, action) => {
      let index = state.answers.findIndex(
        (a) => a.answerId === action.payload.answerId
      );
      if(index !== -1){
        state.answers.splice(index, 1)
      }
      let like_index = state.like_answers.findIndex(
        (a) => a.answerId === action.payload.answerId
      );
      if(like_index !== -1){
        state.like_answers.splice(like_index,1)
      }
    },
    editMoreviewAnswer : (state, action) => {
      let index = state.answers.findIndex(
        (a) => a.answerId === action.payload.answerId
      );
      if(index !== -1){
        console.log(1, index)
        state.answers[index].answerContents = action.payload.contents;
      }
      let like_index = state.like_answers.findIndex(
        (a) => a.answerId === action.payload.answerId
      );
      if(like_index !== -1){
        console.log(2, like_index)
        state.like_answers[like_index].answerContents = action.payload.contents
      }
    }
  },
});

const getAnswers = (id) => {
  return function (dispatch, getState) {
    const loading = getState().moreview.is_loading;
    const page = getState().moreview.page;
    const next = getState().moreview.next;
    if (!next) {
      return;
    }
    if (loading && page > 1) {
      return;
    }
    dispatch(setInitialLoading(true));
    dispatch(setLoading(true));
    const options = {
      url: `/bookshelf/moreInfoCard/${id}?page=${page}&sort=new`,
      method: "GET",
    };
    axios(options).then((response) => {
      if (response.data.answer.length < 20) {
        dispatch(setAnswers(response.data.answer));
        dispatch(setNext(false));
        dispatch(setLoading(false));
        return;
      }
      dispatch(setAnswers(response.data.answer));
      dispatch(setPage(page + 1));
      dispatch(setLoading(false));
    });
  };
};

const getLikeAnswer = (id) => {
  return function (dispatch, getState) {
    const loading = getState().moreview.like_loading;
    const page = getState().moreview.like_page;
    const next = getState().moreview.like_next;
    if (!next) {
      return;
    }
    if (loading && page > 1) {
      return;
    }
    dispatch(setLikeLoading(true));

    const options = {
      url: `/bookshelf/moreInfoCard/${id}?page=${page}&sort=favor`,
      method: "GET",
    };
    axios(options).then((response) => {
      if (response.data.answer.length < 20) {
        dispatch(setLikeAnswers(response.data.answer));
        dispatch(setLikeNext(false));
        dispatch(setLikeLoading(false));
        return;
      }
      dispatch(setLikeAnswers(response.data.answer));
      dispatch(setLikePage(page + 1));
      dispatch(setLikeLoading(false));
    });
  };
};

const getFriendsAnswer = (id) => {
  return function (dispatch, getState) {
    const loading = getState().moreview.friends_loading;
    const next = getState().moreview.friends_next;
    const page = getState().moreview.friends_page;
    if (!next) {
      return;
    }
    if (loading && page > 1) {
      return;
    }
    dispatch(setFriendsLoading(true));
    const options = {
      url: `/bookshelf/moreInfoCard/${id}?page=${page}&sort=follower`,
      method: "GET",
    };
    axios(options).then((response) => {
      if (response.data.answer.length < 20) {
        dispatch(setFriendsAnswers(response.data.answer));
        dispatch(setFriendsNext(false));
        dispatch(setFriendsLoading(false));
        return;
      }
      dispatch(setFriendsAnswers(response.data.answer));
      dispatch(setFriendsPage(page + 1));
      dispatch(setFriendsLoading(false));
    });
  };
};

const getQuestionInfo = (id) => {
  return function (dispatch) {
    const options = {
      url: `/bookshelf/moreInfoCardTitle/${id}`,
      method: "GET",
    };
    axios(options).then((response) => {
      dispatch(setQuestionInfo(response.data));
    });
  };
};

export const {
  resetAll,
  setInitialLoading,
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
  setLikeLoading,
  setFriendsLoading,
  setView,
  editDetailLikeInfo,
  editDetailCommentInfo,
  deleteMoreview,
  editMoreviewAnswer,
} = moreviewSlice.actions;

export const api = {
  getAnswers,
  getQuestionInfo,
  getLikeAnswer,
  getFriendsAnswer,
};

export default moreviewSlice.reducer;
