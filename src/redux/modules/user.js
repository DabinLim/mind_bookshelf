import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { history } from "../configStore";
import { getCookie, deleteCookie } from "../../shared/Cookie";
import { api as notiActions } from "./noti";
import swal from "sweetalert";

axios.defaults.baseURL = "https://lkj99.shop";
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
      topic: {},
    },
    other: {
      introduce: "",
      profileImg: "",
      nickname: "",
      topic: {},
    },
    friends: [],
    otherFriends: [],
    is_login: false,
    is_userLoading: true,
    is_friendLoading: true,
    preview: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.is_login = true;
      // state.is_userLoading = false;
    },
    editUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
    logOut: (state) => {
      deleteCookie("is_login");
      // state.user = null;
      state.user.nickname = "";
      state.is_login = false;
      // window.location.reload();
    },
    setOther: (state, action) => {
      state.other = action.payload;
      // state.is_userLoading = false;
    },
    setFriend: (state, action) => {
      state.friends = action.payload;
      state.is_friendLoading = false;
    },
    addFriend: (state, action) => {
      state.friends.unshift(action.payload);
    },
    deleteFriend: (state, action) => {
      console.log(action.payload)
      state.friends = state.friends.filter((f) => {
        if (f.id !== action.payload) {
          return [...state.friends, f];
        }
      });
    },
    setOtherFriend: (state, action) => {
      state.otherFriends = action.payload;
    },
    userLoading: (state, action) => {
      state.is_userLoading = action.payload;
    },
    friendLoading: (state, action) => {
      state.is_friendLoading = action.payload;
    },
    setPreview: (state, action) => {
      state.preview = action.payload;
    },
  },
});

const LoginCheckAX = () => {
  return function (dispatch) {
    axios
      .get(`/auth/user`)
      .then((res) => {
        dispatch(
          setUser({
            myAnswerCount: res.data.myAnswerCount,
            myCustomQuestionCount: res.data.myCustomQuestionCount,
            introduce: res.data.introduce,
            profileImg: res.data.profileImg,
            nickname: res.data.nickname,
            id: res.data.userId,
            topic: res.data.topic,
            first: res.data.first,
          })
        );
        dispatch(notiActions.joinAlarmIO());
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

const SocialLoginAX = () => {
  return function (dispatch) {
    axios
      .get(`/auth/user`)
      .then((res) => {
        dispatch(
          setUser({
            myAnswerCount: res.data.myAnswerCount,
            myCustomQuestionCount: res.data.myCustomQuestionCount,
            introduce: res.data.introduce,
            profileImg: res.data.profileImg,
            nickname: res.data.nickname,
            id: res.data.userId,
            topic: res.data.topic,
            first: res.data.first,
          })
        );
        dispatch(notiActions.joinAlarmIO());
      }).then((res) => {
        history.replace("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

const UpdateProfileAX = (profile) => {
  return function (dispatch, getState) {
    const _image = getState().user.preview;
    const _profileImg = getState().user.user.profileImg;
    if (_image !== _profileImg) {
      if (
        _image ==
        "https://blog.kakaocdn.net/dn/cyOIpg/btqx7JTDRTq/1fs7MnKMK7nSbrM9QTIbE1/img.jpg"
      ) {
        const formData = new FormData();
        formData.append("nickname", profile.nickname);
        formData.append("introduce", profile.introduce);
        formData.append("defaultImg", "true");
        formData.append("topic", JSON.stringify(profile.topic));
        axios
          .patch("/mypage/profile", formData)
          .then((res) => {
            dispatch(editUser(res.data));
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        const formData = new FormData();
        formData.append("nickname", profile.nickname);
        formData.append("introduce", profile.introduce);
        formData.append("defaultImg", "false");
        formData.append("topic", JSON.stringify(profile.topic));
        formData.append("profileImg", profile.profileImg);
        axios
          .patch("/mypage/profile", formData)
          .then((res) => {
            dispatch(editUser(res.data));
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } else {
      const formData = new FormData();
      formData.append("nickname", profile.nickname);
      formData.append("introduce", profile.introduce);
      formData.append("defaultImg", "false");
      formData.append("topic", JSON.stringify(profile.topic));
      axios
        .patch("/mypage/profile", formData)
        .then((res) => {
          dispatch(editUser(res.data));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
};

const othersInfoAX = (id) => {
  return function (dispatch) {
    axios
      .get(`/bookshelf/auth/user/${id}`)
      .then((res) => {
        dispatch(
          setOther({
            otherAnswerCount: res.data.otherAnswerCount,
            otherCustomQuestionCount: res.data.otherCustomQuestionCount,
            introduce: res.data.introduce,
            profileImg: res.data.profileImg,
            nickname: res.data.nickname,
            topic: res.data.topic,
          })
        );
      })
      .then(() => {
        dispatch(userLoading(false));
      });
  };
};

const followOtherAX = (id, nickname, profileImg) => {
  return function (dispatch) {
    axios.post(`/bookshelf/addfriend`, { friendId: id }).then((res) => {
      dispatch(
        addFriend({
          id: id,
          nickname: nickname,
          profileImg: profileImg,
        })
      );
      swal({
        title: "정상적으로 추가되었습니다.",
        text: `${nickname}님을 구독하였습니다.`,
        icon: "success",
      });
    });
  };
};

const unfollowOtherAX = (id) => {
  return function (dispatch) {
    axios
      .delete(`/bookshelf/friend/${id}`)
      .then((res) => {
        dispatch(deleteFriend(id));
        swal({
          title: "정상적으로 취소되었습니다.",
          icon: "success",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const myFollowListAX = () => {
  return function (dispatch) {
    // dispatch(friendLoading(true))
    axios.get(`/bookshelf/friendList`).then((res) => {
      let friend_list = [];
      res.data.friends.forEach((_friend) => {
        let friend = {
          id: _friend.friendId,
          nickname: _friend.friendNickname,
          profileImg: _friend.friendProfileImg,
        };
        friend_list.push(friend);
      });

      dispatch(setFriend(friend_list));
    });
  };
};

const otherFriendListAX = (id) => {
  friendLoading();
  return function (dispatch) {
    axios.get(`/bookshelf/other/friendList/${id}`).then((res) => {
      let otherFriend_list = [];
      res.data.othersFriend.forEach((_friend) => {
        let friend = {
          id: _friend.otherFriendId,
          nickname: _friend.otherFriendNickname,
          profileImg: _friend.otherFriendProfileImg,
        };
        otherFriend_list.push(friend);
      });
      console.log(otherFriend_list);
      dispatch(setOtherFriend(otherFriend_list));
    });
  };
};

const withdrawalAX = () => {
  return function (dispatch) {
    axios
      .delete("/myPage/profile/quit")
      .then((res) => {
        history.replace("/");
        dispatch(logOut());
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

// 유저 검색 완료(검색 유저 클릭)
const addRecentUserAX = (id) => {
  return function (dispatch) {
    axios
      .post("/bookshelf/searchUserDetail", { id: id })
      .then((res) => {
      })
      .catch((err) => {
        console.log(err);
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
  deleteFriend,
  setOtherFriend,
  userLoading,
  friendLoading,
  getRecent,
  addRecent,
  setPreview,
} = userSlice.actions;

export const api = {
  LoginCheckAX,
  SocialLoginAX,
  othersInfoAX,
  followOtherAX,
  myFollowListAX,
  otherFriendListAX,
  unfollowOtherAX,
  withdrawalAX,
  addRecentUserAX,
  UpdateProfileAX,
};

export default userSlice.reducer;
