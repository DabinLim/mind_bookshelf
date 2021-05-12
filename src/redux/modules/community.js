import { createSlice } from "@reduxjs/toolkit";
import { getCookie } from "../../shared/Cookie";
import axios from "axios";
import swal from "sweetalert";
import { editDetailLikeInfo } from "./moreview";
import { Drafts } from "@material-ui/icons";

axios.defaults.baseURL = "https://lkj99.shop";
axios.defaults.headers.common["Authorization"] = `Bearer ${getCookie(
  "is_login"
)}`;

const communitySlice = createSlice({
  name: "community",
  initialState: {
    question: [],
    question_info: null,
    is_loading: true,
    card_loading: true,
    card_detail: {},
  },
  reducers: {
    setCardDetail: (state, action) => {
      state.card_detail = action.payload;
    },
    setCardLoading: (state, action) => {
      state.card_loading = action.payload;
    },
    setLoading: (state, action) => {
      state.is_loading = action.payload;
    },
    setCommunity: (state, action) => {
      state.question = action.payload;
      state.is_loading = false;
    },
    changeType: (state, action) => {
      state.card_detail.type = action.payload;
    },
    editLikeCard: (state, action) => {
      state.card_detail = {
        ...state.card_detail,
        likeCount: action.payload.likeCount,
        like: action.payload.like,
      };
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
    editCommentInfo: (state, action) => {
      let idx = state.question.findIndex(
        (q) => q.id === action.payload.questionId
      );
      let answerIdx = state.question[idx].answers.findIndex(
        (a) => a.answerId === action.payload.answerId
      );
      state.question[idx].answers[answerIdx] = {
        ...state.question[idx].answers[answerIdx],
        commentCount:
          state.question[idx].answers[answerIdx].commentCount +
          action.payload.decision,
      };
    },
    deleteAnswer : (state, action) => {
      let idx = state.question.findIndex(
        (q) => q.id === action.payload.questionId
      );
      let answerIdx = state.question[idx].answers.findIndex(
        (a) => a.answerId === action.payload.answerId
      );
      state.question[idx].answers.splice(answerIdx,1)
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
  if (!getCookie("is_login")) {
    swal({
      title: "좋아요 실패 😥",
      text: "로그인이 필요한 기능이에요❕",
      icon: "info",
    });
    return;
  }
  return function (dispatch, getState) {
    const type = getState().community.card_detail.type;
    console.log(answerId, questionId);
    axios
      .post("/bookshelf/like/answerCard", { answerCardId: answerId })
      .then((res) => {
        console.log(res);
        if (type === "community") {
          dispatch(
            editLikeInfo({
              likeCount: res.data.likeCountNum,
              like: res.data.currentLike,
              answerId: answerId,
              questionId: questionId,
            })
          );
          dispatch(
            editLikeCard({
              likeCount: res.data.likeCountNum,
              like: res.data.currentLike,
            })
          );
        } else if (type === "detail") {
          dispatch(
            editDetailLikeInfo({
              answerId: answerId,
              decision: "like",
            })
          );
          dispatch(
            editLikeCard({
              likeCount: res.data.likeCountNum,
              like: res.data.currentLike,
            })
          );
        } else {
          dispatch(
            editLikeCard({
              likeCount: res.data.likeCountNum,
              like: res.data.currentLike,
            })
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const deleteLikeAX = (answerId, questionId) => {
  if (!getCookie("is_login")) {
    swal({
      title: "좋아요 취소 실패 😥",
      text: "로그인이 필요한 기능이에요❕",
      icon: "info",
    });
    return;
  }
  return function (dispatch, getState) {
    console.log(answerId, questionId);
    const type = getState().community.card_detail.type;
    axios
      .patch("/bookshelf/like/answerCard", { answerCardId: answerId })
      .then((res) => {
        console.log(res);
        console.log(answerId, questionId);
        if (type === "community") {
          dispatch(
            editLikeInfo({
              likeCount: res.data.likeCountNum,
              like: res.data.currentLike,
              answerId: answerId,
              questionId: questionId,
            })
          );
          dispatch(
            editLikeCard({
              likeCount: res.data.likeCountNum,
              like: res.data.currentLike,
            })
          );
        } else if (type === "detail") {
          dispatch(
            editDetailLikeInfo({
              answerId: answerId,
              decision: "dislike",
            })
          );
          dispatch(
            editLikeCard({
              likeCount: res.data.likeCountNum,
              like: res.data.currentLike,
            })
          );
        } else {
          dispatch(
            editLikeCard({
              likeCount: res.data.likeCountNum,
              like: res.data.currentLike,
            })
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const getCardDetail = (a_id, type) => {
  return function (dispatch, getState) {
    dispatch(setCardLoading(true));
    const options = {
      url: `/bookshelf/bookCardDetail/${a_id}`,
      method: "GET",
    };
    axios(options)
      .then((response) => {
        console.log(response.data);
        dispatch(
          setCardDetail({ ...response.data.bookCardDetail[0], type: type })
        );

        dispatch(setCardLoading(false));
      })
      .catch((err) => {
        console.log(err);
        if (err.response) {
          console.log(err.response);
        }
      });
  };
};

const deleteAnswerAX = (answerId, questionId) => {
  return function (dispatch) {
    axios
      .delete(`/card/myAnswer/${answerId}`)
      .then((res)=>{
        dispatch(deleteAnswer({
          answerId: answerId, 
          questionId: questionId,
        }))
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

const editAnswerAX = (answer) => {
  return function (dispatch) {
    console.log(answer)
    axios
      .patch(`/card/myAnswer`, {answerId: answer.answerId, contents: answer.contents, isOpen: answer.isOpen})
      .then((res) => {
        console.log(res)
      })
  }
}

export const {
  setCommunity,
  editLikeInfo,
  setLoading,
  setCardLoading,
  setCardDetail,
  editLikeCard,
  editCommentInfo,
  changeType,
  deleteAnswer,
} = communitySlice.actions;

export const api = {
  communityQuestionAX,
  addLikeAX,
  deleteLikeAX,
  getCardDetail,
  deleteAnswerAX,
  editAnswerAX,
};

export default communitySlice.reducer;
