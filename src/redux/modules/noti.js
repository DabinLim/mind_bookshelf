import { createSlice } from "@reduxjs/toolkit";
import { getCookie } from "../../shared/Cookie";
import socketIOClient from "socket.io-client";
import { config } from "../../shared/config";
import { logOut } from "./user";
import { setLoading } from "./answer";
import { history } from "../configStore";

const notiSlice = createSlice({
  name: "noti",
  initialState: {
    noti_list: [],
    new_list: [],
    is_checked: false,
  },
  reducers: {
    setNoti: (state, action) => {
      state.noti_list = action.payload.msg;
      state.is_checked = action.payload.checked;
    },
    addNoti: (state, action) => {
      let idx = state.new_list.findIndex(
        (n) => n.cardId === action.payload.cardId
      );
      console.log(idx)
      if(idx !== -1){
        console.log(1)
        if(state.new_list.findIndex(
          (n) => n.recentNickname === action.payload.recentNickname && n.eventType === action.payload.eventType
        ) === -1){
          console.log(1)
          state.new_list.unshift(action.payload);
          state.is_checked = true;
          return         
        }
        return
      }
      state.new_list.unshift(action.payload);
      state.is_checked = true;
    },
    alarmChecked: (state) => {
      state.is_checked = false;
    },
  },
});

export const socket = socketIOClient(`${config.api}/alarm`);

const joinAlarmIO = () => {
  return function (dispatch) {
    const token = getCookie("is_login");
    console.log(token);
    socket.emit("joinAlarm", { token: token });
    socket.on("joinAlarm", function (data) {
      dispatch(setNoti(data));
    });
  };
};

const leaveAlarmIO = () => {
  return function (dispatch) {
    socket.emit('leave');
    dispatch(setLoading(true))
    dispatch(logOut());
    history.replace("/");
  };
};

const openAlarmIO = () => {
  return function (dispatch) {
    socket.emit("openAlarm");
    dispatch(alarmChecked());
  };
};

export const { setNoti, addNoti, alarmChecked } = notiSlice.actions;

export const api = {
  joinAlarmIO,
  openAlarmIO,
  leaveAlarmIO,
};

export default notiSlice.reducer;
