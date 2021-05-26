import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { history } from "../configStore";
import { getCookie, deleteCookie } from "../../shared/Cookie";
import { api as notiActions } from "./noti";
import swal from "sweetalert";
import {addFollowLike,deleteFollowLike} from '../modules/community';

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
    follower: [],
    following: [],
    follower_loading: false,
    following_loading: false,
    follower_next: true,
    following_next: true,
    is_login: false,
    is_userLoading: true,
    is_friendLoading: true,
    preview: null,
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
      state.user.nickname = "";
      state.is_login = false;
      state.user.first = false;
    },
    setOther: (state, action) => {
      state.other = action.payload;
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
    editFollowOther : (state, action) => {
      state.other.isFollowing = action.payload;
    },
    addFollow: (state, action) => {
      let followerIdx = state.follower.findIndex(
        (f) => f.userId === action.payload
      );
      let followingIdx = state.following.findIndex(
        (f) => f.userId === action.payload
      );
      if(followerIdx !== -1){
        state.follower[followerIdx].isFollowing = true;
      }
      if(followingIdx !== -1){
        state.following[followingIdx].isFollowing = true;
      }
    },
    deleteFollow: (state, action) => {
      let followerIdx = state.follower.findIndex(
        (f) => f.userId === action.payload
      );
      let followingIdx = state.following.findIndex(
        (f) => f.userId === action.payload
      );
      if(followerIdx !== -1){
        state.follower[followerIdx].isFollowing = false;
      }
      if(followingIdx !== -1){
        state.following[followingIdx].isFollowing = false;
      }
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
    addfollowing: (state, action) => {
      state.following.push(...action.payload); 
      state.following_loading = false;
    },
    addfollower: (state, action) => {
      state.follower.push(...action.payload);
      state.follower_loading = false;
    },
    setFollowerLoading : (state, action) => {
      state.follower_loading = action.payload;
    },
    setFollowingLoading : (state, action) => {
      state.following_loading = action.payload;
    },
    setFollowerNext: (state,action) => {
      state.follower_next = action.payload;
    },
    setFollowingNext: (state,action) => {
      state.following_next = action.payload;
    },
    resetFollower: (state) => {
      state.follower = [];
      state.follower_loading = false;
      state.follower_next = true;
    },
    resetFollowing: (state) => {
      state.following = [];
      state.following_loading = false;
      state.following_next = true;
    },
  },
});

const getFollowing = (userId) => {
  return function(dispatch, getState) {
    const next = getState().user.following_next;
    const loading = getState().user.following_loading;
    const following = getState().user.following;

    dispatch(setFollowingLoading(true))

    if(following.length !== 0){
      const lastId = following[following.length -1].userId
      axios
        .get(`/friends/following/${userId}?lastId=${lastId}`)
        .then((res) => {
          console.log(res)
          dispatch(addfollowing(res.data.following))
          if(res.data.following.length === 10){
            dispatch(setFollowingNext(true))
          } else{
            dispatch(setFollowingNext(false))
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }else{
      const lastId = ""
      axios
        .get(`/friends/following/${userId}?lastId=${lastId}`)
        .then((res) => {
          dispatch(addfollowing(res.data.following))
          if(res.data.following.length === 10){
            dispatch(setFollowingNext(true))
          } else{
            dispatch(setFollowingNext(false))
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }

  }
}

const getFollower = (userId) => {
  return function(dispatch, getState) {
    const follower = getState().user.follower;

    dispatch(setFollowerLoading(true))
    if(follower.length !== 0){
      const lastId = follower[follower.length -1].userId
      axios
        .get(`/friends/follower/${userId}?lastId=${lastId}`)
        .then((res) => {
          dispatch(addfollower(res.data.follower))
          if(res.data.follower.length === 10){
            dispatch(setFollowerNext(true))
          } else{
            dispatch(setFollowerNext(false))
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }else{
      const lastId = ""
      axios
        .get(`/friends/follower/${userId}?lastId=${lastId}`)
        .then((res) => {
          dispatch(addfollower(res.data.follower))
          if(res.data.follower.length === 10){
            dispatch(setFollowerNext(true))
          } else{
            dispatch(setFollowerNext(false))
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}

const LoginCheckAX = (mybook) => {
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
        if(mybook){
          dispatch(othersInfoAX(res.data.userId));
          dispatch(getFollowing(res.data.userId));
          dispatch(getFollower(res.data.userId));
        }
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
    const is_first = getState().user.user.first;
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
            if(is_first){
              swal({
                title: "가입을 축하드립니다.",
                text: `${profile.nickname}님 환영합니다.`,
                icon: "success",
              });
            }
          })
          .catch((err) => {
            console.log(err);
            swal({
              title: "중복된 닉네임입니다. 다른 닉네임을 사용해주세요.",
              text: `${profile.nickname}은 중복된 닉네임입니다.`,
              icon: "error",
            });
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
            if(is_first){
              swal({
                title: "가입을 축하드립니다.",
                text: `${profile.nickname}님 환영합니다.`,
                icon: "success",
              });
            };
          })
          .catch((err) => {
            console.log(err);
            swal({
              title: "중복된 닉네임입니다. 다른 닉네임을 사용해주세요.",
              text: `${profile.nickname}은 중복된 닉네임입니다.`,
              icon: "error",
            });
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
          if(is_first){
            swal({
              title: "가입을 축하드립니다.",
              text: `${profile.nickname}님 환영합니다.`,
              icon: "success",
            });
          }
        })
        .catch((err) => {
          console.log(err);
          swal({
            title: "중복된 닉네임입니다. 다른 닉네임을 사용해주세요.",
            text: `${profile.nickname}은 중복된 닉네임입니다.`,
            icon: "error",
          });
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
            followerCount: res.data.followerCount,
            followingCount: res.data.followingCount,
            createdQuestion: res.data.createdQuestion,
            isFollowing: res.data.isFollowing,
          })
        );
      })
      .then(() => {
        dispatch(userLoading(false));
      });
  };
};

const followOtherAX = (id, type) => {
  return function (dispatch) {
    axios.post(`/bookshelf/addfriend`, { friendId: id }).then((res) => {
      if(type === "like"){
        dispatch(addFollowLike(id));
      } else if(type === "profile"){
        dispatch(addFollow(id));
      } else {
        dispatch(editFollowOther(true))
      }

      swal({
        title: "정상적으로 추가되었습니다.",
        icon: "success",
      });
    });
  };
};

const unfollowOtherAX = (id, type) => {
  return function (dispatch) {
    axios
      .delete(`/bookshelf/friend/${id}`)
      .then((res) => {
        if(type === "like"){
          console.log('1')
          dispatch(deleteFollowLike(id));
        } else if(type === "profile"){
          console.log('2')
          dispatch(deleteFollow(id));
        } else{
          console.log('3')
          dispatch(editFollowOther(false))
        }
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
  addfollowing,
  addfollower,
  setFollowerLoading,
  setFollowingLoading,
  setFollowerNext,
  setFollowingNext,
  resetFollower,
  resetFollowing,
  addFollow,
  deleteFollow,
  editFollowOther,
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
  getFollowing,
  getFollower
};

export default userSlice.reducer;
