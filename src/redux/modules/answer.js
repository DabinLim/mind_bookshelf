import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// import moment from "moment";
import { getCookie, deleteCookie } from "../../shared/Cookie";

axios.defaults.baseURL = "http://lkj99.shop";
axios.defaults.headers.common["Authorization"] = `Bearer ${getCookie(
  "is_login"
)}`;

const answerSlice = createSlice({
  name: "answer",
  initialState: {
    question: {},
    answer: {},
    question_list: [],
  },
  reducers: {
    setQuestion: (state, action) => {
      state.question_list = action.payload.question_list;
    },
    deleteQuestion: (state, action) => {
      state.question_list.pop(0);
    },
  },
});

const getQuestionAX = () => {
  return function (dispatch, getState) {
    const options = {
      url: `/card`,
      method: "GET",
    };
    axios(options)
      .then((response) => {
        console.log(response.data);
        // dispatch(setQuestion(response.data));
      })
      .catch((err) => {
        console.log(err);
        if (err.response) {
          console.log(err.response.data);
        }
      });
  };
};

const sendAnswerAX = (question_id, content) => {
  return function (dispatch, getState) {
    let answer_data = {
      questionId: question_id,
      contents: content,
    };
    const options = {
      url: `/card`,
      method: "GET",
      data: answer_data,
    };
    axios(options)
      .then((response) => {
        console.log(response.data);
        // dispatch(setQuestion(response.data));
        // 여기서 delete 를 써서 리덕스 정리 한 번 업데이트 해준다.
      })
      .catch((err) => {
        console.log(err);
        if (err.response) {
          console.log(err.response.data);
        }
      });
  };
};

export const { setQuestion, deleteQuestion } = answerSlice.actions;

export const api = {
  getQuestionAX,
  sendAnswerAX,
};

export default answerSlice.reducer;
