import { RepeatOneSharp } from "@material-ui/icons";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {config} from "../../shared/config"
import {history} from "../configStore"
import { getCookie, deleteCookie } from '../../shared/Cookie';

// axios.defaults.baseURL = 'http://lkj99.shop';
axios.defaults.headers.common["Authorization"]= `Bearer ${getCookie('is_login')}`;

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {
      introduce: "",
      profileImg: "",
      nickname: "",
    },
    is_login: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.is_login = true;
    },
    editUser: (state, action) => {
      state.user = {...state.user, ...action.payload}
    },
    logOut: (state) => {
      deleteCookie('is_login');
      state.user = null;
      state.is_login = false;
    }
  },
});



const LoginCheckAX = () => {
    return function(dispatch) {
      axios.get(`${config.api}/auth/user`)
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
    axios.get(`${config.api}/auth/user`)
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

const UpdateNicknameAX = (nickname) => {
  return function(dispatch){
    axios.patch(`${config.api}/myPage/profile/nickname`, {nickname : nickname})
      .then((res) => {
        console.log(res)
        dispatch(editUser({nickname : nickname}))
      }).catch((err)=> {
        console.log(err)
      })
  }
}

const UpdateIntroduceAX = (introduce) => {
  return function(dispatch){
    axios.patch(`${config.api}/mypage/profile/introduce`, {introduce : introduce})
      .then((res) => {
        console.log(res)
        dispatch(editUser({introduce : introduce}))
      }).catch((err) => {
        console.log(err)
      })
  }
}

const UpdateProfileImgAX = (profileImg) => {
  return function(dispatch){
    const formData = new FormData();
    formData.append("profileImg", profileImg )
    axios.patch(`${config.api}/mypage/profile/profileImg`, formData)
      .then((res)=> {
        console.log(res)
        dispatch(editUser({profileImg: res.data.profileImg}))
      }).catch((err)=> {
        console.log(err)
      })
  }
}

const DeleteProfileImgAX = () => {
  return function(dispatch){
    axios.patch(`${config.api}/mypage/profile/defaultImg`)
      .then((res)=> {
        console.log(res)
        dispatch(editUser({profileImg : res.data.profileImg}))
      }).catch((err)=> {
        console.log(err)
      })
  }
}

export const { setUser, logOut, editUser } = userSlice.actions;

export const api = {
  LoginCheckAX,
  SocialLoginAX,
  UpdateNicknameAX,
  UpdateIntroduceAX,
  UpdateProfileImgAX,
  DeleteProfileImgAX
};

export default userSlice.reducer;
