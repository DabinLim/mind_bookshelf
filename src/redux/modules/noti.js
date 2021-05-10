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
    searchModal: false,
  },
  reducers: {
    setSearch: (state, action) => {
      state.searchModal = action.payload;
    },
    setNoti: (state, action) => {
      state.noti_list = action.payload.msg;
      state.is_checked = action.payload.checked;
    },
    addNoti: (state, action) => {
      if(action.payload.eventType !== 'tag'){
        if(state.new_list.findIndex(
          (n) => n.cardId === action.payload.cardId &&
                n.recentNickname === action.payload.recentNickname &&
                n.eventType === action.payload.eventType
        ) !== -1){
          return
        }
        state.new_list.unshift(action.payload);
        state.is_checked = true;
        return;
      }
      state.new_list.unshift(action.payload);
      state.is_checked = true;
      
      // if (idx !== -1) {
      //   console.log(1);
      //   if (
      //     state.new_list.findIndex(
      //       (n) =>
      //         n.recentNickname === action.payload.recentNickname &&
      //         n.eventType === action.payload.eventType
      //     ) === -1
      //   ) {
      //     console.log(1);
      //     state.new_list.unshift(action.payload);
      //     state.is_checked = true;
      //     return;
      //   }
      //   return;
      // }
    },
    alarmChecked: (state) => {
      state.is_checked = false;
    },
  },
});

export const socket = socketIOClient(`https://lkj99.shop/alarm`);

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
  return function (dispatch, getState) {
    socket.emit("leave");
    dispatch(setLoading(true));
    dispatch(logOut());
    if(getState().router.location.pathname === "/"){
      window.location.reload()
    } else{
      history.replace("/");
    }
  };
};

const openAlarmIO = (user_id) => {
  return function (dispatch) {
    socket.emit("openAlarm", { id: user_id });
    dispatch(alarmChecked());
  };
};

export const { setNoti, addNoti, alarmChecked, setSearch } = notiSlice.actions;

export const api = {
  joinAlarmIO,
  openAlarmIO,
  leaveAlarmIO,
};

export default notiSlice.reducer;
