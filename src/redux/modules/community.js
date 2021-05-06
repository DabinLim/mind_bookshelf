import { createSlice } from "@reduxjs/toolkit";
import { getCookie } from "../../shared/Cookie";
import axios from "axios";
import { editAnswerInfo } from "./comment";
import { PagesRounded } from "@material-ui/icons";

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
    card_detail:{},
  },
  reducers: {
    setCardDetail: (state, action) => {
      state.card_detail = action.payload;
  },
    setLoading: (state, action) => {
      state.is_loading = action.payload
    },
    setCommunity: (state, action) => {
      state.question = action.payload;
      state.is_loading = false;
    },
    editLikeInfo: (state, action) => {
      state.card_detail = {...state.card_detail, likeCount: action.payload.likeCount, like: action.payload.like }
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
    console.log(answerId, questionId)
    axios
      .patch("/bookshelf/like/answerCard", { answerCardId: answerId })
      .then((res) => {
        console.log(res)
        console.log(answerId, questionId)
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

const getCardDetail = (a_id, page=null) => {
  return function(dispatch, getState){
    console.log(page)
      const options = {
          url:`/bookshelf/bookCardDetail/${a_id}`,
          method:"GET",
      };
      axios(options).then((response) => {
          console.log(response.data)
          if(!page){
            let book_list = []
            response.data.bookCardDetail.forEach((v) => {
              book_list.push({
                  contents: v.questionContents,
                  nickname: v.nickname,
                  id:v.questionId,
                  topic: v.questionTopic,
                  answers: [v.answerContents]
              });
          });
            dispatch(setCommunity(book_list))
          }

          dispatch(setCardDetail(response.data.bookCardDetail[0]))
      }).catch((err) => {
        console.log(err)
        if(err.response){
          console.log(err.response)
        }
      })
  }
}



export const {
  setCommunity,
  editLikeInfo,
  setLoading,
  setCardDetail
} = communitySlice.actions;

export const api = {
  communityQuestionAX,
  addLikeAX,
  deleteLikeAX,
  getCardDetail
};

export default communitySlice.reducer;
