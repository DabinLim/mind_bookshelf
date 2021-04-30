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
    }
  },

});

const socket = socketIOClient(`${config.api}/alarm`)


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

socket.on('AlarmEvent', function(data) {
  console.log(data)
  console.log('하이')
})

const openAlarmIO = () => {
  return function (dispatch){
    socket.emit('openAlarm')
    }
}


export const {
  setNoti,
} = notiSlice.actions;

export const api = {
  joinAlarmIO,
  openAlarmIO,
  leaveAlarmIO,
};

export default notiSlice.reducer;