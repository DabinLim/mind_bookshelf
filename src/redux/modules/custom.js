import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import { getCookie } from '../../shared/Cookie';


axios.defaults.baseURL = 'https://lkj99.shop';
axios.defaults.headers.common["Authorization"]= `Bearer ${getCookie('is_login')}`;

const customSlice = createSlice({
    name:"custom",
    initialState: {
        now_view:'new',
        custom_question:[],
        page: 1,
        next:true,
        loading: true,
        pop_list: [],
        pop_page: 1,
        pop_next: true,
        pop_loading: true,
        custom_count:0,
        // my_answers:[],
        // answer_page: 1,
        // answer_next:true,
        // answer_count:0,
    },
    reducers: {
        setView: (state, action) => {
            state.now_view = action.payload;
        },
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
        setPopPage: (state, action) => {
            state.pop_page = action.payload;
        },
        setPopNext: (state, action) => {
            state.pop_next = action.payload;
        },
        setPopList: (state,action) => {
            action.payload.forEach(v => {
                state.pop_list.push(v);
            });
        },
        setPopLoading: (state, action) => {
            state.pop_loading = action.payload;
        },
        // setAnswerPage: (state, action) => {
        //     state.answer_page = action.payload;
        // },
        // setAnswerNext: (state, action) => {
        //     state.answer_next = action.payload;
        // },
        // setAnswerList: (state,action) => {
        //     action.payload.forEach(v => {
        //         state.answer_list.push(v);
        //     });
        // },
        // setAnswerLoading: (state, action) => {
        //     state.answer_loading = action.payload;
        // },
        // setAnswerPopPage: (state, action) => {
        //     state.answer_pop_page = action.payload;
        // },
        // setAnswerPopNext: (state, action) => {
        //     state.answer_pop_next = action.payload;
        // },
        // setAnswerPopList: (state,action) => {
        //     action.payload.forEach(v => {
        //         state.answer_pop_list.push(v);
        //     });
        // },
        // setAnswerPopLoading: (state, action) => {
        //     state.answer_pop_loading = action.payload;
        // },
        setCustomCount: (state, action) => {
            state.custom_count = action.payload;
        },
        resetAll: (state) => {
            state.custom_question = [];
            state.pop_list = [];
            state.page = 1;
            state.pop_page = 1;
            state.next = true;
            state.pop_next = true;
            state.loading = true;
            state.pop_loading = true;
            state.now_view = 'new';
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        }
    }
})

const getMyQuest = () => {
    return function(dispatch, getState){
        const loading = getState().custom.loading;
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
            if(response.data.myQuestion.length < 15){
                dispatch(setCustomQuestion(response.data.myQuestion));
                dispatch(setCustomCount(response.data.myQuestionCount));
                dispatch(setNext(false));
                dispatch(setLoading(false));
                return
            }

            dispatch(setCustomQuestion(response.data.myQuestion));
            dispatch(setCustomCount(response.data.myQuestionCount));
            dispatch(setPage(page+1));
            dispatch(setLoading(false));
        }).catch(err => {
            if(err.response){
                console.log(err.response.data);
            };

        })
    }
}

const getMyPopQuest = () => {
    return function(dispatch, getState){

        const loading = getState().custom.pop_loading;
        const page = getState().custom.pop_page;
        const next = getState().custom.pop_next;

        if(!next){
            console.log('next is none');
            return
        }
        if(loading && page > 1){
            console.log('잡았다 요놈');
            return
        }
        dispatch(setPopLoading(true))

        const options = {
            url:`/bookshelf/like/question?page=${page}`,
            method:"GET"
        };
        axios(options).then(response => {
            if(response.data.result.length < 15){
                dispatch(setPopList(response.data.result));
                // dispatch(setCustomCount(response.data.myQuestionCount));
                dispatch(setPopNext(false));
                dispatch(setPopLoading(false));
                return
            }

            dispatch(setPopList(response.data.result));
            // dispatch(setCustomCount(response.data.myQuestionCount));
            dispatch(setPopPage(page+1));
            dispatch(setPopLoading(false));
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

        const loading = getState().custom.loading;
        const page = getState().custom.page;
        const next = getState().custom.next;

        if(!next){
            return
        }
        if(loading && page > 1){
            return
        }
        dispatch(setLoading(true))

        const options = {
            url:`/bookshelf/other/${id}/question?page=${page}`,
            method:"GET"
        };
        axios(options).then(response => {
            if(response.data.otherQuestion.length < 15){
                dispatch(setCustomQuestion(response.data.otherQuestion))
                dispatch(setCustomCount(response.data.otherQuestionCount));
                dispatch(setNext(false));
                dispatch(setLoading(false));
                return
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

const getOthersPopQuest = (id) => {
    return function(dispatch, getState){

        const loading = getState().custom.pop_loading;
        const page = getState().custom.pop_page;
        const next = getState().custom.pop_next;

        if(!next){
            return
        }
        if(loading && page > 1){
            return
        }
        dispatch(setPopLoading(true))

        const options = {
            url:`/bookshelf/other/like/${id}/question?page=${page}`,
            method:"GET"
        };
        axios(options).then(response => {
            if(response.data.result.length < 15){
                dispatch(setPopList(response.data.result))
                // dispatch(setCustomCount(response.data.otherQuestionCount));
                dispatch(setPopNext(false));
                dispatch(setPopLoading(false));
                return
            }
            dispatch(setPopList(response.data.result))
            // dispatch(setCustomCount(response.data.otherQuestionCount));
            dispatch(setPopPage(page+1))
            dispatch(setPopLoading(false));

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
        const loading = getState().custom.loading;
        const page = getState().custom.page;
        const next = getState().custom.next;

        if(!next){
            return
        }
        if(loading && page > 1){
            return
        }
        dispatch(setLoading(true))

        const options = {
            url:`/bookshelf/answers?page=${page}`,
            method:"GET"
        };
        axios(options).then(response => {
            if(response.data.allMyAnswer.length < 15){
                dispatch(setCustomQuestion(response.data.allMyAnswer))
                dispatch(setCustomCount(response.data.answerCount));
                dispatch(setNext(false));
                dispatch(setLoading(false));
                return
            }
            dispatch(setCustomQuestion(response.data.allMyAnswer))
            dispatch(setCustomCount(response.data.answerCount));
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

const getMyPopAnswers = () => {
    return function(dispatch, getState){

        const loading = getState().custom.pop_loading;
        const page = getState().custom.pop_page;
        const next = getState().custom.pop_next;

        if(!next){
            return
        }
        if(loading && page > 1){
            return
        }
        dispatch(setPopLoading(true))

        const options = {
            url:`/bookshelf/answers/like?page=${page}`,
            method:"GET"
        };
        axios(options).then(response => {
            if(response.data.allMyAnswer.length < 15){
                dispatch(setPopList(response.data.allMyAnswer));
                // dispatch(setCustomCount(response.data.myQuestionCount));
                dispatch(setPopNext(false));
                dispatch(setPopLoading(false));
                return
            }

            dispatch(setPopList(response.data.allMyAnswer));
            // dispatch(setCustomCount(response.data.myQuestionCount));
            dispatch(setPopPage(page+1));
            dispatch(setPopLoading(false));
        }).catch(err => {
            console.log(err);
            if(err.response){
                console.log(err.response.data);
            };

        })
    }
}

const getOthersAnswers = (id) => {
    return function(dispatch, getState){

        const loading = getState().custom.loading;
        const page = getState().custom.page;
        const next = getState().custom.next;

        if(!next){
            return
        }
        if(loading && page > 1){
            return
        }
        dispatch(setLoading(true))

        const options = {
            url:`/bookshelf/other/answers/${id}?page=${page}`,
            method:"GET"
        };
        axios(options).then(response => {
            if(response.data.allMyAnswer.length < 15){
                dispatch(setCustomQuestion(response.data.allMyAnswer))
                // dispatch(setCustomCount(response.data.otherQuestionCount));
                dispatch(setNext(false));
                dispatch(setLoading(false));
                return
            }
            dispatch(setCustomQuestion(response.data.allMyAnswer))
            // dispatch(setCustomCount(response.data.otherQuestionCount));
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

const getOthersPopAnswers = (id) => {
    return function(dispatch, getState){

        const loading = getState().custom.pop_loading;
        const page = getState().custom.pop_page;
        const next = getState().custom.pop_next;

        if(!next){
            return
        }
        if(loading && page > 1){
            return
        }
        dispatch(setPopLoading(true))

        const options = {
            url:`/bookshelf/other/answers/${id}?page=${page}`,
            method:"GET"
        };
        axios(options).then(response => {
            console.log(response.data);
            if(response.data.allMyAnswer.length < 15){
                dispatch(setPopList(response.data.allMyAnswer))
                // dispatch(setCustomCount(response.data.otherQuestionCount));
                dispatch(setPopNext(false));
                dispatch(setPopLoading(false));
                return
            }
            dispatch(setPopList(response.data.allMyAnswer))
            // dispatch(setCustomCount(response.data.otherQuestionCount));
            dispatch(setPopPage(page+1))
            dispatch(setPopLoading(false));

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
    resetAll,
    setLoading,
    setView,
    setPopPage,
    setPopNext,
    setPopList,
    setPopLoading,
    setAnswerList,
    setAnswerPopList
} = customSlice.actions;

export const api = {
    getMyQuest,
    getMyPopQuest,
    getOthersQuest,
    getOthersPopQuest,
    getMyAnswers,
    getMyPopAnswers,
    getOthersAnswers,
    getOthersPopAnswers,
};

export default customSlice.reducer;
