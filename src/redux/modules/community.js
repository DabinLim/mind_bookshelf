import { createSlice } from "@reduxjs/toolkit";
import { getCookie } from '../../shared/Cookie';
import axios from "axios";

axios.defaults.baseURL = 'http://lkj99.shop';
axios.defaults.headers.common["Authorization"]= `Bearer ${getCookie('is_login')}`;


const communitySlice = createSlice({
  name: "community",
  initialState: {
    question : [],
    question_info: null,
    answers : [],
    page : 1,
    next : true,
  },
  reducers: {
    setQuestionInfo: (state, action) => {
      state.question_info = action.payload;
    },
    setNext:(state, action) => {
      state.next = action.payload;
    },
    setAnswers: (state,action) => {
      action.payload.forEach((v) => {
        state.answers.push(v)
      })
    },
    resetAnswers: (state) => {
      state.answers = [];
    },
    setPage: (state,action) => {
      state.page = action.payload
    },
    setCommunity: (state, action) => {
      // console.log(action.payload)
      state.question = action.payload;
    },
  },
});

const communityQuestionAX = () => {
  return function(dispatch){
    axios.get('/ourPlace/cards')
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
          }
          question_list.push(question)
        })
        // console.log(question_list)
        dispatch(setCommunity(question_list))
      }).catch((err)=> {
        console.log(err)
      })
  }
}

const getAnswers = (id) => {
  return function(dispatch, getState) {

    const next = getState().community.next;
    if(!next){
      console.log('next is none');
      return
    }
    const page = getState().community.page;

    const options = {
      url:`/bookshelf/moreInfoCard/${id}?page=${page}`,
      method:'GET'
    };
    axios(options).then((response) => {
      // console.log(response.data);
      if(!response.data.answer.length){
        window.alert('질문에 대한 답변이 더 이상 없습니다.');
        dispatch(setNext(false));
        return
      }
      dispatch(setAnswers(response.data.answer));
      dispatch(setPage(page+1));
    })
  }
}

const getQuestionInfo = (id) => {
  return function(dispatch){
    const options = {
      url:`/bookshelf/moreInfoCardTitle/${id}`,
      method:'GET'
    };
    axios(options).then((response) => {
      // console.log(response.data)
      dispatch(setQuestionInfo(response.data))
    })
  }
}

export const { 
  setCommunity,
  setAnswers,
  resetAnswers,
  setPage,
  setNext,
  setQuestionInfo
 } = communitySlice.actions;

export const api = {
  communityQuestionAX,
  getAnswers,
  getQuestionInfo
};

export default communitySlice.reducer;