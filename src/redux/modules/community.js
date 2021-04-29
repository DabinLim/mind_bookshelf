import { createSlice } from "@reduxjs/toolkit";
import { getCookie } from '../../shared/Cookie';
import axios from "axios";

axios.defaults.baseURL = 'http://lkj99.shop';
axios.defaults.headers.common["Authorization"]= `Bearer ${getCookie('is_login')}`;


const communitySlice = createSlice({
  name: "community",
  initialState: {
    question : [],
  },
  reducers: {
    setCommunity: (state, action) => {
      console.log(action.payload)
      state.question = action.payload;
    },
  },
});

const communityQuestionAX = () => {
  return function(dispatch){
    axios.get('/ourPlace/cards')
      .then((res) => {
        console.log(res)
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
        console.log(question_list)
        dispatch(setCommunity(question_list))
      }).catch((err)=> {
        console.log(err)
      })
  }
}


export const { setCommunity } = communitySlice.actions;

export const api = {
  communityQuestionAX,
};

export default communitySlice.reducer;