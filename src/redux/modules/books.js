import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import moment from 'moment';
import { getCookie } from '../../shared/Cookie';

axios.defaults.baseURL = 'http://lkj99.shop';
axios.defaults.headers.common["Authorization"]= `Bearer ${getCookie('is_login')}`;

const booksSlice = createSlice({
  name: "books",
  initialState: {
    books: [],
    date: moment(),
    formated_date: 0,
    component:'',
    selected_card:0,
  },
  reducers: {

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
        }
    },
    setComponent: (state, action) => {
        state.component = action.payload
    },
    setSelect : (state, action) => {
        state.selected_card = action.payload
    }
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
        console.log(date)
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
        const options = {
            url:`bookshelf/bookDetail/${date}`,
            method:'GET',
        };
        axios(options).then((response) => {
            console.log(response.data)
        }).catch((err) => {
            console.log(err);
            if(err.response){
                console.log(err.response.data)
            }
        })
    }

}

const addQuest = (topic, contents) => {
    return function(){
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


export const { 
    setBooks,
    changeDate,
    setComponent,
    setSelect
 } = booksSlice.actions;

export const api = {
    getBooks,
    getBookDetail,
    addQuest
};

export default booksSlice.reducer;
