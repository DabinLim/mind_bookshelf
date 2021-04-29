import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import moment from 'moment';
import { getCookie } from '../../shared/Cookie';

axios.defaults.baseURL = 'http://lkj99.shop';
axios.defaults.headers.common["Authorization"]= `Bearer ${getCookie('is_login')}`;


const othersSlice = createSlice({
  name: "others",
  initialState: {
    others_books: [],
    date: moment(),
    formated_date: 0,
    others_component:'',

  },
  reducers: {
    setOthersBooks:(state,action) => {
        state.others_books = action.payload
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
            console.log(new_date)
            state.date = new_date;
            state.formated_date = new_date.format('YYYY . MM');
        }
    },

  },
});




const getOthersBooks = (towhen, id) => {
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
            url:`/bookshelf/books/${date}/${id}`,
            method:'GET',
        };
        axios(options).then((response) => {
            console.log(response.data)
            dispatch(setOthersBooks(response.data.books))
        }).catch((err) => {
            console.log(err)
            if(err.response){
                console.log(err.response.data)
            }
        })
    }
}




export const { 
    setOthersBooks,
    changeDate,
 } = othersSlice.actions;

export const api = {
    getOthersBooks
};

export default othersSlice.reducer;
