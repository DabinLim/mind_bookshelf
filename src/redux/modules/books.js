import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import moment from 'moment';
import { getCookie } from '../../shared/Cookie';
import {api as communityActions, setCardLoading} from './community';
import { api as commentActions } from "./comment";

axios.defaults.baseURL = 'http://lkj99.shop';
axios.defaults.headers.common["Authorization"]= `Bearer ${getCookie('is_login')}`;


const booksSlice = createSlice({
  name: "books",
  initialState: {
    books: [],
    date: moment(),
    formated_date: 0,
    component:'',
    // selected_card:0,
    book_detail:[],
    page: 1,
    next:true,
    custom_question:[],
    page_owner:null,
    book_loading: true,
    book_detail_modal: null,
    date_visible:true,
    // card_answers:null,
  },
  reducers: {
    // setOther:(state, action) => {
    //     state.other = action.payload;
    // },
    // setCardAnswers:(state, action) => {
    //     state.card_answers = action.payload;
    // },
    setDateVisible: (state, action) => {
        state.date_visible = action.payload;
    },
    setBookDetailModal: (state, action) => {
        state.book_detail_modal = action.payload;
    },
    setPageOwner: (state, action) => {
        state.page_owner = action.payload;
    },

    setBookDetail: (state,action) => {
        state.book_detail = action.payload;
    },

    setBooks:(state, action) => {
        state.books = action.payload
    },

    changeDate: (state, action) => {
        console.log(action.payload)
        if(action.payload === 2){
            const new_date = state.date.add(1,'M');
            state.date = new_date
            state.formated_date = new_date.format('YYYY . MM')
        } else if(action.payload === 1){
            const new_date = state.date.subtract(1,'M')
            state.date = new_date
            state.formated_date = new_date.format('YYYY . MM')
        }
        else if(action.payload === 0){
            state.formated_date = state.date.format('YYYY . MM')
        } else {
            const new_date = moment(action.payload, 'YYYYMMDD');
            // console.log(new_date)
            state.date = new_date;
            state.formated_date = new_date.format('YYYY . MM');
        }
    },
    setComponent: (state, action) => {
        state.component = action.payload;
    },
    setPage: (state, action) => {
        state.page = action.payload;
    },
    setNext: (state, action) => {
        state.next = action.payload;
    },
    setCustomQuestion: (state, action) => {
        action.payload.forEach(v => {
            state.custom_question.push(v);
        })
    },
    resetCustomQuestion: (state) => {
        state.custom_question = [];
    },
    setBookLoading: (state, action) => {
        state.book_loading = action.payload;
    }
    // setSelect : (state, action) => {
    //     state.selected_card = action.payload
    // }

  },
});


const getBooks = (towhen) => {
    return function( dispatch, getState ) {

        if(towhen === 1){
            dispatch(changeDate(1));
        }
        if(towhen === 2) {
            dispatch(changeDate(2));
        }

        const date = getState().books.date.format('YYMM')
        // console.log(date)
        const options = {
            url:`/bookshelf/books/${date}`,
            method:'GET',
        };
        axios(options).then((response) => {
            console.log(response.data)
            dispatch(setBooks(response.data.books))
        }).catch((err) => {
            console.log(err)
            if(err.response){
                console.log(err.response.data)
            }
        })
    }
}



const getBookDetail = (date) => {
    return function(dispatch) { 
        console.log(date)
        const options = {
            url:`bookshelf/bookDetail/${date}`,
            method:'GET',
        };
        axios(options).then((response) => {
            console.log(response.data)
            dispatch(setBookDetail(response.data.booksDiary))
            
            dispatch(setBookLoading(false))
        }).catch((err) => {
            console.log(err);
            if(err.response){
                console.log(err.response.data)
            }
            dispatch(setBookLoading(false))
        })
    }
}

const getNextDetail = (date) => {
    return function(dispatch, getState) { 
        console.log(date)
        dispatch(setCardLoading(true))
        const options = {
            url:`bookshelf/bookDetail/${date}`,
            method:'GET',
        };
        axios(options).then((response) => {
            console.log(response.data)
            dispatch(setBookDetail(response.data.booksDiary))
        }).then(()=> {
            const book_detail = getState().books.book_detail
            
            dispatch(communityActions.getCardDetail(book_detail[0].answerId,'book'))
            dispatch(commentActions.getCommentAX(book_detail[0].answerId))
            dispatch(setBookLoading(false))
        }).catch((err) => {
            console.log(err);
            if(err.response){
                console.log(err.response.data)
            }
            dispatch(setBookLoading(false))
        })
    }
}

const getPreviousDetail = (date) => {
    return function(dispatch, getState) {
        dispatch(setCardLoading(true))
        const options = {
            url:`bookshelf/bookDetail/${date}`,
            method:'GET',
        };
        axios(options).then((response) => {
            console.log(response.data)
            dispatch(setBookDetail(response.data.booksDiary))
        }).then(()=> {
            const book_detail = getState().books.book_detail
            
            dispatch(communityActions.getCardDetail(book_detail[book_detail.length-1].answerId,'book'))
            dispatch(commentActions.getCommentAX(book_detail[book_detail.length-1].answerId))
            dispatch(setBookLoading(false))
        }).catch((err) => {
            console.log(err);
            if(err.response){
                console.log(err.response.data)
            }
            dispatch(setBookLoading(false))
        })
    }
}




const getOthersBooks = (towhen, id) => {
    return function( dispatch, getState ) {


        if(towhen === 1){
            dispatch(changeDate(1));
        }
        if(towhen === 2) {
            dispatch(changeDate(2));
        }

        const date = getState().books.date.format('YYMM')
        // console.log(date)
        const options = {
            url:`/bookshelf/other/books/${date}/${id}`,
            method:'GET',
        };
        axios(options).then((response) => {
            console.log(response.data)
            dispatch(setBooks(response.data.books))
        }).catch((err) => {
            console.log(err)
            if(err.response){
                console.log(err.response.data)
            }
        })
    }
}

const getOthersBookDetail = (date,id) => {
    return function(dispatch) { 

        dispatch(setBookLoading(true));

        const options = {
            url:`bookshelf/other/bookDetail/${date}/${id}`,
            method:'GET',
        };
        axios(options).then((response) => {
            dispatch(setBookDetail(response.data.booksDiary));
            dispatch(setBookLoading(false));
        }).catch((err) => {
            console.log(err);
            if(err.response){
                console.log(err.response.data);
            };
            dispatch(setBookLoading(false));
        })
    }

}

const getNextOthersBookDetail = (date,id) => {
    return function(dispatch, getState) { 
        dispatch(setCardLoading(true))
        dispatch(setBookLoading(true));

        const options = {
            url:`bookshelf/other/bookDetail/${date}/${id}`,
            method:'GET',
        };
        axios(options).then((response) => {
            dispatch(setBookDetail(response.data.booksDiary));
        }).then(()=>{
            const book_detail = getState().books.book_detail
            
            dispatch(communityActions.getCardDetail(book_detail[0].answerId,'book'))
            dispatch(commentActions.getCommentAX(book_detail[0].answerId))
            dispatch(setBookLoading(false));
        }).catch((err) => {
            console.log(err);
            if(err.response){
                console.log(err.response.data);
            };
            dispatch(setBookLoading(false));
        })
    }

}

const getPreviousOthersBookDetail = (date,id) => {
    return function(dispatch, getState) { 
        dispatch(setCardLoading(true))
        dispatch(setBookLoading(true));

        const options = {
            url:`bookshelf/other/bookDetail/${date}/${id}`,
            method:'GET',
        };
        axios(options).then((response) => {
            dispatch(setBookDetail(response.data.booksDiary));
            
        }).then(()=>{
            const book_detail = getState().books.book_detail
            
            dispatch(communityActions.getCardDetail(book_detail[book_detail.length-1].answerId,'book'))
            dispatch(commentActions.getCommentAX(book_detail[book_detail.length-1].answerId))
            dispatch(setBookLoading(false));
        }).catch((err) => {
            console.log(err);
            if(err.response){
                console.log(err.response.data);
            };
            dispatch(setBookLoading(false));
        })
    }

}

const addQuest = (topic, contents) => {
    return function(){
        console.log(topic, contents)
        const options = {
            url:'bookshelf/question',
            method:'POST',
            data: {
                topic:topic,
                contents:contents
            }
        };
        axios(options).then((response)=> {
            console.log(response.data)

        }).catch((err) => {
            console.log(err)
            if(err.response){
                console.log(err.response.data)
            }
        })
    }
}

const getMyQuest = () => {
    return function(dispatch, getState){

        const page = getState().books.page;
        const next = getState().books.next;

        if(!next){
            console.log('next is none');
            return
        }

        const options = {
            url:`/bookshelf/question?page=${page}`,
            method:"GET"
        };
        axios(options).then(response => {
            console.log(response.data);
            if(!response.data.myQuestion.length){
                dispatch(setNext(false));
                window.alert('다음 질문이 없습니다.');
            }

            dispatch(setCustomQuestion(response.data.myQuestion))
            dispatch(setPage(page+1))
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
        console.log(id)


        const page = getState().books.page;
        const next = getState().books.next;

        if(!next){
            console.log('next is none');
            return
        }

        const options = {
            url:`/bookshelf/other/${id}/question?page=${page}`,
            method:"GET"
        };
        axios(options).then(response => {
            console.log(response.data);
            // if(!response.data.myQuestion.length){
            //     dispatch(setNext(false));
            //     window.alert('다음 질문이 없습니다.');
            // }
            // dispatch(setCustomQuestion(response.data.myQuestion))
            // dispatch(setPage(page+1))

        }).catch(err => {
            console.log(err);
            if(err.response){
                console.log(err.response.data);
            };

        })
    }
}



// const getCardAnswers = (date,question_id) => {
//     return function(dispatch){
//         const options = {
//             url:`/bookshelf/bookCardDetail/${date}/${question_id}`,
//             method:'GET',
//         }
//         axios(options).then((response) => {
//             console.log(response.data)
//             dispatch(setCardDetails(response.data));
//         }).catch(err => {
//             console.log(err);
//             if(err.response){
//                 console.log(err.response.data)
//             }
//         })
//     }
// }


export const { 
    setBooks,
    changeDate,
    setComponent,
    // setSelect,
    setBookDetail,
    setPage,
    setNext,
    setCustomQuestion,
    resetCustomQuestion,
    setPageOwner,
    setBookLoading,
    setDateVisible,
    setBookDetailModal,
    // setCardAnswers,
    // setOther
 } = booksSlice.actions;

export const api = {
    getBooks,
    getBookDetail,
    addQuest,
    // getCardAnswers,
    getOthersBooks,
    getOthersBookDetail,
    getNextOthersBookDetail,
    getPreviousOthersBookDetail,
    getMyQuest,
    getOthersQuest,
    getNextDetail,
    getPreviousDetail,
};

export default booksSlice.reducer;
