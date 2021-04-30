import { createSlice } from "@reduxjs/toolkit";
import { getCookie } from "../../shared/Cookie";
import axios from "axios";
import { editAnswerInfo } from "./comment";

axios.defaults.baseURL = "http://lkj99.shop";
axios.defaults.headers.common["Authorization"] = `Bearer ${getCookie(
  "is_login"
)}`;

const communitySlice = createSlice({
  name: "community",
  initialState: {
    question: [],
    question_info: null,
    answers: [],
    page: 1,
    next: true,
  },
  reducers: {
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
    resetAnswers: (state) => {
      state.answers = [];
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setCommunity: (state, action) => {
      console.log(action.payload);
      state.question = action.payload;
    },
    editLikeInfo: (state, action) => {
      let idx = state.question.findIndex(
        (q) => q.id === action.payload.questionId
      );
      let answerIdx = state.question[idx].answers.findIndex(
        (a) => a.answerId === action.payload.answerId
      );
      state.question[idx].answers[answerIdx] = {
        ...state.question[idx].answers[answerIdx],
        like: action.payload.like,
        likeCount: action.payload.likeCount,
      };
    },
  },
});

const communityQuestionAX = () => {
  return function (dispatch) {
    axios
      .get("/ourPlace/cards")
      .then((res) => {
        let question_list = [];
        res.data.result.forEach((_question) => {
          let question = {
            contents: _question.questions.contents,
            nickname: _question.questions.nicname,
            id: _question.questions.questionId,
            topic: _question.questions.topic,
            answers: _question.answers,
          };
          question_list.push(question);
        });
        dispatch(setCommunity(question_list));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const addLikeAX = (answerId, questionId) => {
  return function (dispatch) {
    console.log(answerId, questionId)
    axios
      .post("/bookshelf/like/answerCard", { answerCardId: answerId })
      .then((res) => {
        console.log(res)
        dispatch(
          editAnswerInfo({
            likeCount: res.data.likeCountNum,
            like: res.data.currentLike,
          })
        );
        dispatch(
          editLikeInfo({
            likeCount: res.data.likeCountNum,
            like: res.data.currentLike,
            answerId: answerId,
            questionId: questionId,
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const deleteLikeAX = (answerId, questionId) => {
  return function (dispatch) {
    axios
      .patch("/bookshelf/like/answerCard", { answerCardId: answerId })
      .then((res) => {
        console.log(res)
        console.log(answerId, questionId)
        dispatch(editAnswerInfo({
          likeCount: res.data.likeCountNum,
          like: res.data.currentLike,
        }));
        dispatch(editLikeInfo({
          likeCount: res.data.likeCountNum,
          like: res.data.currentLike,
          answerId: answerId,
          questionId: questionId,
        }));
      }).catch((err)=> {
        console.log(err)
      })
  };
};

const getAnswers = (id) => {
  return function (dispatch, getState) {
    const next = getState().community.next;
    if (!next) {
      console.log("next is none");
      return;
    }
    const page = getState().community.page;
    const options = {
      url: `/bookshelf/moreInfoCard/${id}?page=${page}`,
      method: "GET",
    };
    axios(options).then((response) => {
      if (!response.data.answer.length) {
        window.alert("질문에 대한 답변이 더 이상 없습니다.");
        dispatch(setNext(false));
        return;
      }
      dispatch(setAnswers(response.data.answer));
      dispatch(setPage(page + 1));
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
  setCommunity,
  setAnswers,
  resetAnswers,
  setPage,
  setNext,
  setQuestionInfo,
  editLikeInfo,
} = communitySlice.actions;

export const api = {
  communityQuestionAX,
  getAnswers,
  getQuestionInfo,
  addLikeAX,
  deleteLikeAX,
};

export default communitySlice.reducer;
