import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getCookie } from "../../shared/Cookie";
import swal from "sweetalert";
import { setAnswers } from "./moreview";

axios.defaults.baseURL = "http://lkj99.shop";
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
    // dispatch(setLoading(true));
    const options = {
      url: `/card/daily`,
      method: "GET",
    };
    axios(options)
      .then((response) => {
        console.log(response.data);
        dispatch(setQuestion(response.data.cards));
        // if (getState().answer.is_changed) {
        //   dispatch(detectChange(false));
        // }
        // dispatch(setQ(response.data.cards[1]));
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
    // dispatch(setLoading(true));
    delete axios.defaults.headers.common["Authorization"];
    const options = {
      url: `/card/daily`,
      method: "GET",
    };
    axios(options)
      .then((response) => {
        console.log(response);
        dispatch(setQuestion(response.data.cards));
        // if (getState().answer.is_changed) {
        //   dispatch(detectChange(false));
        // }
        // dispatch(setQ(response.data.cards[1]));
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
        console.log(response.data);
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

const sendAnswerAX = (question_id, content) => {
  return function (dispatch, getState) {
    // dispatch(detectChange(true));
    let userInfo = getState().user.user;
    if (userInfo.nickname === "") {
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
    };
    const options = {
      url: `/card`,
      method: "POST",
      data: answer_data,
    };
    axios(options)
      .then((response) => {
        // 여기서 delete 를 써서 리덕스 정리 한 번 업데이트 해준다.
        // dispatch(deleteQuestion(question_id));
        // // 배열의 첫 번째 질문을 보여주는 것!

        dispatch(setQuestion(response.data.cards));
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
