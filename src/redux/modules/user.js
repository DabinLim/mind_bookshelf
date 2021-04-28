import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { config } from "../../shared/config";
import { history } from "../configStore";
import { getCookie, deleteCookie } from "../../shared/Cookie";
import swal from "sweetalert";

// axios.defaults.baseURL = 'http://lkj99.shop';
axios.defaults.headers.common["Authorization"] = `Bearer ${getCookie(
  "is_login"
)}`;

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {
      introduce: "",
      profileImg: "",
      nickname: "",
    },
    other: {
      introduce: "",
      profileImg: "",
      nickname: "",
    },
    friends: [],
    is_login: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.is_login = true;
    },
    editUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
    logOut: (state) => {
      deleteCookie("is_login");
      state.user = null;
      state.is_login = false;
      window.location.reload();
    },
    setOther: (state, action) => {
      state.other = action.payload;
    },
    setFriend: (state, action) => {
      state.friends = action.payload;
    },
    addFriend: (state, action) => {
      state.friends.unshift(action.payload);
    },
  },
});

const LoginCheckAX = () => {
  return function (dispatch) {
    axios
      .get(`${config.api}/auth/user`)
      .then((res) => {
        console.log(res);
        dispatch(
          setUser({
            introduce: res.data.introduce,
            profileImg: res.data.profileImg,
            nickname: res.data.nickname,
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

const SocialLoginAX = () => {
  return function (dispatch) {
    axios
      .get(`${config.api}/auth/user`)
      .then((res) => {
        console.log(res);
        dispatch(
          setUser({
            introduce: res.data.introduce,
            profileImg: res.data.profileImg,
            nickname: res.data.nickname,
          })
        );
        history.replace("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

const UpdateNicknameAX = (nickname) => {
  return function (dispatch) {
    axios
      .patch(`${config.api}/myPage/profile/nickname`, { nickname: nickname })
      .then((res) => {
        console.log(res);
        dispatch(editUser({ nickname: nickname }));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const UpdateIntroduceAX = (introduce) => {
  return function (dispatch) {
    axios
      .patch(`${config.api}/mypage/profile/introduce`, { introduce: introduce })
      .then((res) => {
        console.log(res);
        dispatch(editUser({ introduce: introduce }));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const UpdateProfileImgAX = (profileImg) => {
  return function (dispatch) {
    const formData = new FormData();
    formData.append("profileImg", profileImg);
    axios
      .patch(`${config.api}/mypage/profile/profileImg`, formData)
      .then((res) => {
        console.log(res);
        dispatch(editUser({ profileImg: res.data.profileImg }));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const DeleteProfileImgAX = () => {
  return function (dispatch) {
    axios
      .patch(`${config.api}/mypage/profile/defaultImg`)
      .then((res) => {
        console.log(res);
        dispatch(editUser({ profileImg: res.data.profileImg }));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const othersInfoAX = (id) => {
  return function (dispatch) {
    console.log(id);
    axios.get(`${config.api}/bookshelf/auth/user/${id}`).then((res) => {
      console.log(res);
      dispatch(
        setOther({
          introduce: res.data.introduce,
          profileImg: res.data.profileImg,
          nickname: res.data.nickname,
        })
      );
    });
  };
};

const followOtherAX = (id, nickname, profileImg) => {
  return function (dispatch) {
    console.log(id);
    axios
      .post(`${config.api}/bookshelf/addfriend`, { friendId: id })
      .then((res) => {
        console.log(res);

        dispatch(
          addFriend({
            id: id,
            nickname: nickname,
            profileImg: profileImg,
          })
        );

        swal({
          title: "정상적으로 추가되었습니다. 😀",
          text: `${nickname}님과 친구가 되었습니다.`,
          icon: "success",
        });
      });
  };
};

const myFollowListAX = () => {
  return function (dispatch) {
    axios.get(`${config.api}/bookshelf/friendList`).then((res) => {
      console.log(res);
      let friend_list = [];
      res.data.friends.forEach((_friend) => {
        let friend = {
          id: _friend.friendId,
          nickname: _friend.friendNickname,
          profileImg: _friend.friendProfileImg,
        };
        friend_list.push(friend);
      });
      console.log(friend_list);

      dispatch(setFriend(friend_list));
    });
  };
};

const otherFriendListAX = (id) => {
  return function (dispatch) {
    console.log(id);
    axios.get(`${config.api}/bookshelf/other/friendList/${id}`).then((res) => {
      console.log(res);
    });
  };
};

export const {
  setUser,
  logOut,
  editUser,
  setOther,
  setFriend,
  addFriend,
} = userSlice.actions;

export const api = {
  LoginCheckAX,
  SocialLoginAX,
  UpdateNicknameAX,
  UpdateIntroduceAX,
  UpdateProfileImgAX,
  DeleteProfileImgAX,
  othersInfoAX,
  followOtherAX,
  myFollowListAX,
  otherFriendListAX,
};

export default userSlice.reducer;
