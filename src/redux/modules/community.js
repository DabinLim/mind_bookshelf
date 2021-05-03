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
    is_loading: true,
  },
  reducers: {
    setLoading: (state, action) => {
      state.is_loading = action.payload
    },
    setCommunity: (state, action) => {
      state.question = action.payload;
      state.is_loading = false;
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
        // console.log(res)
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



export const {
  setCommunity,
  editLikeInfo,
  setLoading,
} = communitySlice.actions;

export const api = {
  communityQuestionAX,
  addLikeAX,
  deleteLikeAX,
};

export default communitySlice.reducer;
