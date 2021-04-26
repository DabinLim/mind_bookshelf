import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {config} from "../../shared/config"

// axios.defaults.baseURL = 'http://lkj99.shop';

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    is_login: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;

    },
  },
});

// 예시입니다.

const LoginCheckAX = () => {
    return function(dispatch) {
      axios.get(`${config.api}/auth/user`)
        .then((response) => {
          console.log(response)
        })
    }
}




export const { setUser } = userSlice.actions;

export const api = {
  LoginCheckAX
};

export default userSlice.reducer;
