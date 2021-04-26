import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import moment from 'moment';

axios.defaults.baseURL = 'http://lkj99.shop';

const booksSlice = createSlice({
  name: "books",
  initialState: {
    books: [],
    date: moment(),
    formated_date: 0,
  },
  reducers: {
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
    }
  },
});



const getBooks = (getdate) => {
    return function( dispatch, getState ) {
        const date = getdate.format('YYMM')
        console.log(date)
        const options = {
            url:`/bookshelf/books/${date}`,
            method:'GET',
        };
        axios(options).then((response) => {
            console.log(response.data)
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
            url:`bookshelf/book/${date}`,
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


export const { 
    setUser,
    changeDate,
 } = booksSlice.actions;

export const api = {
    getBooks
};

export default booksSlice.reducer;
