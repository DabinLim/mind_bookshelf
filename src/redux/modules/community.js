import { createSlice } from "@reduxjs/toolkit";
import { getCookie } from "../../shared/Cookie";
import axios from "axios";
import swal from "sweetalert";
import { editDetailLikeInfo, deleteMoreview, editMoreviewAnswer } from "./moreview";
import { ed} from "./friends";
import {editAnswersLikeInfo} from './custom';
import { deleteNoti } from "./noti";

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
    topic : [],
    topic_loading: false,
    topic_page: 1,
    topic_next: false,
    
    like_list: [],
    like_loading: true,
    like_page: 1,
    like_next:true,
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
    editAnswerCard : (state, action) => {
      state.card_detail.answerContents = action.payload.contents;
      state.card_detail.isOpen = action.payload.isOpen;
    },
    editAnswer : (state, action) => {
      let idx = state.question.findIndex(
        (q) => q.id === action.payload.questionId
      );
      let answerIdx = state.question[idx].answers.findIndex(
        (a) => a.answerId === action.payload.answerId
      );
      state.question[idx].answers[answerIdx].contents = action.payload.contents
    },
    addTopic : (state, action) => {
      state.topic.push(...action.payload)
      state.topic_page += 1;
      state.topic_loading = false;
    },
    setTopicLoading : (state, action) => {
      state.topic_loading = action.payload;
    },
    editTopicNext : (state, action) => {
      state.topic_next = action.payload;
    },
    resetTopicInfo: (state) => {
      state.topic = [];
      state.topic_page = 1;
      state.topic_loading = false;
      state.topic_next = false;
    },
    setLikeList: (state, action) => {
      action.payload.forEach(v => {
        state.like_list.push(v);
      });
    },
    setLikePage: (state, action) => {
      state.like_page = action.payload;
    },
    setLikeNext: (state, action) => {
      state.like_next = action.payload;
    },
    setLikeLoading: (state, action) => {
      state.like_loading = action.payload;
    },
    resetAll: (state) => {
      state.like_page = 1;
      state.like_list = [];
      state.like_next = true;
      state.like_loading = true;
    }
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

const addLikeDetail = (answerId) => {
  return function (dispatch, getState) {
    axios
      .post("/bookshelf/like/answerCard", { answerCardId: answerId })
      .then((res) => {
        dispatch(
          editDetailLikeInfo({
            answerId: answerId,
            likeCount: res.data.likeCountNum,
            like: res.data.currentLike,
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

const deleteLikeDetail = (answerId) => {
  return function (dispatch, getState) {
    axios
      .patch("/bookshelf/like/answerCard", { answerCardId: answerId })
      .then((res) => {
        dispatch(
          editDetailLikeInfo({
            answerId: answerId,
            likeCount: res.data.likeCountNum,
            like: res.data.currentLike,
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

const addLikeAnswers = (answerId) => {
  return function (dispatch, getState) {
    axios
      .post("/bookshelf/like/answerCard", { answerCardId: answerId })
      .then((res) => {
        console.log(res.data)
        dispatch(
          editAnswersLikeInfo({
            answerId: answerId,
            likeCount: res.data.likeCountNum,
            like: res.data.currentLike,
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

const deleteLikeAnswers = (answerId) => {
  return function (dispatch, getState) {
    axios
      .patch("/bookshelf/like/answerCard", { answerCardId: answerId })
      .then((res) => {
        console.log(res.data)
        dispatch(
          editAnswersLikeInfo({
            answerId: answerId,
            likeCount: res.data.likeCountNum,
            like: res.data.currentLike,
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

const addLikeQnA = (answerId, questionId) => {
  return function (dispatch, getState) {
    axios
      .post("/bookshelf/like/answerCard", { answerCardId: answerId })
      .then((res) => {
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
  }
}

const deleteLikeQnA = (answerId, questionId) => {
  return function (dispatch, getState) {
    axios
      .patch("/bookshelf/like/answerCard", { answerCardId: answerId })
      .then((res) => {
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
  }
}

const addLikeAX = (answerId, questionId) => {
  if (!getCookie("is_login")) {
    swal({
      title: "좋아요 실패",
      text: "로그인이 필요한 기능이에요❕",
      icon: "info",
    });
    return;
  }
  return function (dispatch, getState) {
    const type = getState().community.card_detail.type;
    axios
      .post("/bookshelf/like/answerCard", { answerCardId: answerId })
      .then((res) => {
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
      title: "좋아요 취소 실패",
      text: "로그인이 필요한 기능이에요❕",
      icon: "info",
    });
    return;
  }
  return function (dispatch, getState) {
    const type = getState().community.card_detail.type;
    axios
      .patch("/bookshelf/like/answerCard", { answerCardId: answerId })
      .then((res) => {
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
  return function (dispatch, getState) {
    const type = getState().community.card_detail.type;
    axios
      .delete(`/card/myAnswer/${answerId}`)
      .then((res)=>{
        if(type === "community"){
          dispatch(deleteAnswer({
            answerId: answerId, 
            questionId: questionId,
          }))
        }
        else if(type === "detail"){
          dispatch(deleteMoreview({
            answerId: answerId,
          }))
        }
        else if(type === "noti"){
          dispatch(deleteNoti({
            answerId: answerId,
          }))
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

const editAnswerAX = (answer) => {
  return function (dispatch, getState) {
    const type = getState().community.card_detail.type;
    axios
      .patch(`/card/myAnswer`, {answerId: answer.answerId, contents: answer.contents, isOpen: answer.isOpen})
      .then((res) => {
        dispatch(editAnswerCard({
          contents: answer.contents,
          isOpen : answer.isOpen
        }))
        if(type === "community"){
          dispatch(editAnswer({
            answerId : answer.answerId,
            questionId : answer.questionId,
            contents: answer.contents,
          }))
        }
        if(type === "detail"){
          dispatch(editMoreviewAnswer({
            contents: answer.contents,
            answerId: answer.answerId,
          }))
        }
      })
  }
}

const getTopicQuestion = (topic) => {
  return function (dispatch, getState) {
    dispatch(setTopicLoading(true));
    const page = getState().community.topic_page;
    axios
      .get(`/topic/${encodeURIComponent(topic)}?page=${page}`)
      .then((res) => {
        console.log(res)
        dispatch(addTopic(res.data.result))
        if(res.data.result.length === 15){
          dispatch(editTopicNext(true));
        }else{
          dispatch(editTopicNext(false));
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }
}

const getLikeList = (id) => {
  return function(dispatch, getState){

    const loading = getState().community.like_loading;
    const next = getState().community.like_next;
    const page = getState().community.like_page;

    if(!next){
      console.log('next is none');
      return
    }
    if(loading && page > 1){
      console.log('안되지 요놈아')
      return
    }

    dispatch(setLikeLoading(true));

    const options = {
      url:`/bookshelf/like/list/${id}?page=${page}`,
      method:"GET",
    }
    axios(options).then(response => {
      if(response.data.likeList.length < 15){
        dispatch(setLikeList(response.data.likeList));
        dispatch(setLikeNext(false));
        dispatch(setLikeLoading(false));
        return
      }
      dispatch(setLikeList(response.data.likeList));
      dispatch(setLikePage(page+1));
      dispatch(setLikeLoading(false));
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
  editAnswerCard,
  editAnswer,
  addTopic,
  setTopicLoading,
  editTopicNext,
  resetTopicInfo,
  setLikeList,
  setLikePage,
  setLikeNext,
  setLikeLoading,
  resetAll
} = communitySlice.actions;

export const api = {
  communityQuestionAX,
  addLikeAX,
  deleteLikeAX,
  getCardDetail,
  deleteAnswerAX,
  editAnswerAX,
  addLikeQnA,
  deleteLikeQnA,
  addLikeDetail,
  deleteLikeDetail,
  addLikeAnswers,
  deleteLikeAnswers,
  getTopicQuestion,
  getLikeList
};

export default communitySlice.reducer;
