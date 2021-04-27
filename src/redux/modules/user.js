import { RepeatOneSharp } from "@material-ui/icons";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {config} from "../../shared/config"
import {history} from "../configStore"
import { getCookie, deleteCookie } from '../../shared/Cookie';

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
      state.is_login = true;
    },
    logOut: (state, action) => {
      deleteCookie('is_login');
      state.user = null;
      state.is_login = false;
    }
  },
});



const LoginCheckAX = () => {
    return function(dispatch) {
      const jwtToken = getCookie('is_login');
      let token = {
        headers : { authorization: `Bearer ${jwtToken}`}
      }
      axios(`${config.api}/auth/user`, token)
      .then((res) => {
        console.log(res)
        dispatch(setUser({
          introduce: res.data.introduce,
          profileImg: res.data.profileImg,
          nickname: res.data.nickname,
        }))
      }).catch((error)=> {
        console.log(error)
      })
    }
}

const SocialLoginAX = (jwtToken) => {
  return function(dispatch){
    let token = {
      headers : { authorization: `Bearer ${jwtToken}`}
    }
    axios(`${config.api}/auth/user`, token)
      .then((res) => {
        console.log(res)
        dispatch(setUser({
          introduce: res.data.introduce,
          profileImg: res.data.profileImg,
          nickname: res.data.nickname,
        }))
        history.replace('/')
      }).catch((error)=> {
        console.log(error)
      })
  }
}


const UserUpdateAX = () => {
  return function(dispatch){
    
  }
}


export const { setUser, logOut } = userSlice.actions;

export const api = {
  LoginCheckAX,
  SocialLoginAX
};

export default userSlice.reducer;
