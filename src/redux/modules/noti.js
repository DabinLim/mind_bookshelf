import { createSlice } from "@reduxjs/toolkit";
import { getCookie } from "../../shared/Cookie";
import socketIOClient from 'socket.io-client';
import {config} from '../../shared/config';


const notiSlice = createSlice({
  name: "noti",
  initialState: {
    noti_list: []
  },
  reducers: {
    setNoti: (state, action) => {
      state.noti_list = action.payload;
    },
    addNoti: (state, action) => {
      state.noti_list.unshift(action.payload)
    },
  },
});

export const socket = socketIOClient(`${config.api}/alarm`)


const joinAlarmIO = () => {
  return function (dispatch){
    const token = getCookie('is_login')
    console.log(token)
    socket.emit('joinAlarm', {token: token})
    socket.on('joinAlarm', function(data) {
      console.log(data)
      dispatch(setNoti(data.msg))
    })
  }
}

const leaveAlarmIO = () => {
  return function (dispatch){
    // socket.emit('leave')
    console.log('로그아웃 성공')
  }
}

const openAlarmIO = () => {
  return function (dispatch){
    console.log('하이')
    socket.emit('openAlarm')
    }
}


export const {
  setNoti,
  addNoti,
} = notiSlice.actions;

export const api = {
  joinAlarmIO,
  openAlarmIO,
  leaveAlarmIO,
};

export default notiSlice.reducer;