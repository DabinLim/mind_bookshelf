import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getCookie } from "../../shared/Cookie";
import swal from "sweetalert";
import { setAnswers } from "./moreview";

axios.defaults.baseURL = "https://lkj99.shop";
if (getCookie("is_login")) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${getCookie(
    "is_login"
  )}`;
}

const answerSlice = createSlice({
  name: "answer",
  initialState: {
    question: {},
    answer_id: null,
    answer_list: [],
    question_list: [],
    is_loading: false,
    is_changed: false,
  },
  reducers: {
    setLoading: (state, action) => {
      state.is_loading = action.payload;
    },
    detectChange: (state, action) => {
      state.isChanged = action.payload;
    },
    setQuestion: (state, action) => {
      state.question_list = action.payload;

      let index = state.question_list.findIndex((q) => q.available === true);
      if (index !== -1) {
        let temp = state.question_list[0];
        state.question_list[0] = state.question_list[index];
        state.question_list[index] = temp;
      }
      state.is_loading = false;
    },
    setAnwerId: (state, action) => {
      state.answer_id = action.payload;
    },
    setAnswer: (state, action) => {
      state.answer_list = action.payload;
      state.is_loading = false;
    },
    setQ: (state, action) => {
      state.question = action.payload;
      state.answer_id = action.payload.cardId;
    },
    changeQ: (state, action) => {
      state.question = action.payload;
      state.answer_id = action.payload.cardId;
    },
  },
});

const getQuestionAX = () => {
  return function (dispatch, getState) {
    dispatch(setLoading(true));
    const options = {
      url: `/card/daily`,
      method: "GET",
    };
    axios(options)
      .then((response) => {
        console.log(response.data)
        dispatch(setQuestion(response.data.cards));
      })
      .catch((err) => {
        console.log(err);
        if (err.response) {
          console.log(err.response.data);
        }
      });
  };
};

const getQuestionAX_NOTLOGIN = () => {
  return function (dispatch, getState) {
    dispatch(setLoading(true));
    delete axios.defaults.headers.common["Authorization"];
    const options = {
      url: `/card/daily`,
      method: "GET",
    };
    axios(options)
      .then((response) => {
        dispatch(setQuestion(response.data.cards));
      })
      .catch((err) => {
        console.log(err);
        if (err.response) {
          console.log(err.response.data);
        }
      });
  };
};

const getRecentAnswerAX = (userId) => {
  return function (dispatch, getState) {
    // dispatch(setLoading(true));
    const options = {
      url: `/card/recentAnswer/${userId}`,
      method: "GET",
    };
    axios(options)
      .then((response) => {
        dispatch(setAnswer(response.data.answerData));
      })
      .catch((err) => {
        console.log(err);
        if (err.response) {
          console.log(err.response.data);
        }
      });
  };
};

const sendAnswerAX = (question_id, content, isChecked) => {
  return function (dispatch, getState) {
    console.log(question_id, content, isChecked)
    let userInfo = getState().user.user;
    if (userInfo?.nickname === "") {
      swal({
        title: "로그인 필수!",
        text: "로그인 후 이용가능해요😊",
        icon: "info",
      });
      return;
    }
    let answer_data = {
      questionId: question_id,
      contents: content,
      isOpen: isChecked,
    };
    const options = {
      url: `/card`,
      method: "POST",
      data: answer_data,
    };
    axios(options)
      .then((response) => {
        console.log(response.data);
        dispatch(setQuestion(response.data.cards, response.data.result));
        swal({
          title: "답변 완료✌",
          text: "답변이 등록되었어요 🤩",
          icon: "success",
        });
      })
      .catch((err) => {
        console.log(err);
        if (err.response) {
          console.log(err.response.data);
        }
      });
  };
};

export const {
  setQuestion,
  setQ,
  setAnswer,
  changeQ,
  setAnswerId,
  setLoading,
  detectChange,
} = answerSlice.actions;

export const api = {
  getQuestionAX,
  sendAnswerAX,
  getRecentAnswerAX,
  getQuestionAX_NOTLOGIN,
};

export default answerSlice.reducer;
