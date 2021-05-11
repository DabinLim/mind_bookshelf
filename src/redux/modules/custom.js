import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import { getCookie } from '../../shared/Cookie';


axios.defaults.baseURL = 'https://lkj99.shop';
axios.defaults.headers.common["Authorization"]= `Bearer ${getCookie('is_login')}`;

const customSlice = createSlice({
    name:"custom",
    initialState: {
        custom_question:[],
        page: 1,
        next:true,
        loading: true,
        custom_count:0,
        // my_answers:[],
        // answer_page: 1,
        // answer_next:true,
        // answer_count:0,
    },
    reducers: {
        setPage: (state, action) => {
            state.page = action.payload;
            // state.book_loading = false;
        },
        setNext: (state, action) => {
            state.next = action.payload;
        },
        setCustomQuestion: (state, action) => {
            action.payload.forEach(v => {
                state.custom_question.push(v);
            })
        },
        setCustomCount: (state, action) => {
            state.custom_count = action.payload;
        },
        resetCustomQuestion: (state) => {
            state.custom_question = [];
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        }
    }
})

const getMyQuest = () => {
    return function(dispatch, getState){
        const loading = getState().custom.book_loading;
        const page = getState().custom.page;
        const next = getState().custom.next;

        if(!next){
            console.log('next is none');
            return
        }
        if(loading && page > 1){
            console.log('잡았다 요놈');
            return
        }
        dispatch(setLoading(true))

        const options = {
            url:`/bookshelf/question?page=${page}`,
            method:"GET"
        };
        axios(options).then(response => {
            console.log(response.data);
            if(response.data.myQuestion.length < 15){
                dispatch(setCustomQuestion(response.data.myQuestion));
                dispatch(setCustomCount(response.data.myQuestionCount));
                dispatch(setNext(false));
                dispatch(setLoading(false));
            }

            dispatch(setCustomQuestion(response.data.myQuestion));
            dispatch(setCustomCount(response.data.myQuestionCount));
            dispatch(setPage(page+1));
            dispatch(setLoading(false));
        }).catch(err => {
            console.log(err);
            if(err.response){
                console.log(err.response.data);
            };

        })
    }
}

const getOthersQuest = (id) => {
    return function(dispatch, getState){

        const loading = getState().custom.book_loading;
        const page = getState().custom.page;
        const next = getState().custom.next;

        if(!next){
            console.log('next is none');
            return
        }
        if(loading && page > 1){
            console.log('잡았다 요놈');
            return
        }
        dispatch(setLoading(true))

        const options = {
            url:`/bookshelf/other/${id}/question?page=${page}`,
            method:"GET"
        };
        axios(options).then(response => {
            console.log(response.data);
            if(response.data.otherQuestion.length < 15){
                dispatch(setCustomQuestion(response.data.otherQuestion))
                dispatch(setCustomCount(response.data.otherQuestionCount));
                dispatch(setNext(false));
                dispatch(setLoading(false));
            }
            dispatch(setCustomQuestion(response.data.otherQuestion))
            dispatch(setCustomCount(response.data.otherQuestionCount));
            dispatch(setPage(page+1))
            dispatch(setLoading(false));

        }).catch(err => {
            console.log(err);
            if(err.response){
                console.log(err.response.data);
            };

        })
    }
}

const getMyAnswers = () => {
    return function(dispatch, getState){
        const loading = getState().custom.book_loading;
        const page = getState().custom.page;
        const next = getState().custom.next;

        if(!next){
            console.log('next is none');
            return
        }
        if(loading && page > 1){
            console.log('잡았다 요놈');
            return
        }
        dispatch(setLoading(true))

        const options = {
            url:`/bookshelf/answers?page=${page}`,
            method:"GET"
        };
        axios(options).then(response => {
            console.log(response.data);
            if(response.data.allMyAnswer.length < 15){
                dispatch(setCustomQuestion(response.data.allMyAnswer))
                dispatch(setCustomCount(response.data.allMyAnswerCount));
                dispatch(setNext(false));
                dispatch(setLoading(false));
            }
            dispatch(setCustomQuestion(response.data.allMyAnswer))
            // dispatch(setCustomCount(response.data.allMyAnswerCount));
            dispatch(setPage(page+1))
            dispatch(setLoading(false));

        }).catch(err => {
            console.log(err);
            if(err.response){
                console.log(err.response.data);
            };

        })
    }
}

export const {
    setPage,
    setNext,
    setCustomQuestion,
    setCustomCount,
    resetCustomQuestion,
    setLoading
} = customSlice.actions;

export const api = {
    getMyQuest,
    getOthersQuest,
    getMyAnswers,
};

export default customSlice.reducer;
