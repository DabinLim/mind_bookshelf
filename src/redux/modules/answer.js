import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// import moment from "moment";
import { getCookie, deleteCookie } from "../../shared/Cookie";
import swal from "sweetalert";

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
  },
  reducers: {
    setLoading: (state, action) => {
      state.is_loading = action.payload;
    },
    setQuestion: (state, action) => {
      state.question_list = action.payload;
      state.is_loading = false;
    },
    setAnswer: (state, action) => {
      state.answer_list = action.payload;
      state.is_loading = false;
    },
    // setQ: (state, action) => {
    //   if (state.question_list.length === 0) {
    //     state.is_loading = false;
    //     return;
    //   }
    //   state.question = state.question_list[0];
    //   state.answer_id = state.question_list[0].cardId;
    //   state.is_loading = false;
    // },
    changeQ: (state, action) => {
      state.question = action.payload;
      state.answer_id = action.payload.cardId;
    },
    deleteQuestion: (state, action) => {
      const index = state.question_list.findIndex(
        (q) => q.cardId === action.payload
      );
      state.question_list.splice(index, 1);
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
        dispatch(setQuestion(response.data.cards));
        // dispatch(setQ(response.data.cards[0]));
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
        // dispatch(setQ(response.data.cards[0]));
      })
      .catch((err) => {
        console.log(err);
        if (err.response) {
          console.log(err.response.data);
        }
      });
  };
};

const getRecentAnswerAX = (cardId) => {
  return function (dispatch, getState) {
    dispatch(setLoading(true));
    if (!cardId) {
      return;
    }
    const options = {
      url: `/card/recentAnswer/${cardId}`,
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

const sendAnswerAX = (question_id, content) => {
  return function (dispatch, getState) {
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
        // dispatch(setQ(response.data.result));
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
  deleteQuestion,
  setQ,
  setAnswer,
  changeQ,
  setLoading,
} = answerSlice.actions;

export const api = {
  getQuestionAX,
  sendAnswerAX,
  getRecentAnswerAX,
  getQuestionAX_NOTLOGIN,
};

export default answerSlice.reducer;
