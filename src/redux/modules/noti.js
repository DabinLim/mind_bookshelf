import { createSlice } from "@reduxjs/toolkit";
import { getCookie } from "../../shared/Cookie";
import socketIOClient from 'socket.io-client';
import {config} from '../../shared/config';


const notiSlice = createSlice({
  name: "noti",
  initialState: {
    noti_list: [],
    is_checked: false,
  },
  reducers: {
    setNoti: (state, action) => {
      state.noti_list = action.payload.msg;
      state.is_checked = action.payload.checked;
    },
    addNoti: (state, action) => {
      state.noti_list.unshift(action.payload);
      state.is_checked = true;
    },
    alarmChecked : (state) => {
      state.is_checked = false;
    }
  },
});

export const socket = socketIOClient(`${config.api}/alarm`)


const joinAlarmIO = () => {
  return function (dispatch){
    const token = getCookie('is_login')
    console.log(token)
    socket.emit('joinAlarm', {token: token})
    socket.on('joinAlarm', function(data) {
      dispatch(setNoti(data))
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
    // console.log('하이')
    socket.emit('openAlarm')
    dispatch(alarmChecked())
    }
}


export const {
  setNoti,
  addNoti,
  alarmChecked,
} = notiSlice.actions;

export const api = {
  joinAlarmIO,
  openAlarmIO,
  leaveAlarmIO,
};

export default notiSlice.reducer;