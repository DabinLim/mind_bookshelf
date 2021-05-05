import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { history } from "../configStore";
import { getCookie, deleteCookie } from "../../shared/Cookie";
import { api as notiActions } from "./noti";
import swal from "sweetalert";

axios.defaults.baseURL = "http://lkj99.shop";
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
    otherFriends: [],
    is_login: false,
    is_userLoading: true,
    is_friendLoading: true,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.is_login = true;
      state.is_userLoading = false;
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
  },
});

const LoginCheckAX = () => {
  return function (dispatch) {
    axios
      .get(`/auth/user`)
      .then((res) => {
        console.log(res.data);
        dispatch(
          setUser({
            myAnswerCount: res.data.myAnswerCount,
            myCustomQuestionCount: res.data.myCustomQuestionCount,
            introduce: res.data.introduce,
            profileImg: res.data.profileImg,
            nickname: res.data.nickname,
            id: res.data.userId,
            topic: res.data.topic,
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
        console.log(res.data);
        dispatch(
          setUser({
            myAnswerCount: res.data.myAnswerCount,
            myCustomQuestionCount: res.data.myCustomQuestionCount,
            introduce: res.data.introduce,
            profileImg: res.data.profileImg,
            nickname: res.data.nickname,
            id: res.data.userId,
            topic: res.data.topic,
          })
        );
        dispatch(notiActions.joinAlarmIO());
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
      .patch(`/myPage/profile/nickname`, { nickname: nickname })
      .then((res) => {
        dispatch(editUser({ nickname: nickname }));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

//랜덤 닉네임 가져오는 함수
// const getNicknameAX = () => {
//   return function (dispatch){
//     axios
//       .get('myPage/profile/random-nickname')
//       .then((res) => {
//         console.log(res.data)
//       })
//   }
// }

const UpdateIntroduceAX = (introduce) => {
  return function (dispatch) {
    axios
      .patch(`/mypage/profile/introduce`, { introduce: introduce })
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
      .patch(`/mypage/profile/profileImg`, formData)
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
      .patch(`/mypage/profile/defaultImg`)
      .then((res) => {
        console.log(res);
        dispatch(editUser({ profileImg: res.data.profileImg }));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const editTopicAX = (topic) => {
  return function (dispatch) {
    console.log(topic)
    axios
      .patch(`myPage/profile/preferredTopic`, {topic: topic})
      .then((res) => {
        console.log(res)
        dispatch(editUser({ topic: topic }));
        swal({
          title: "정상적으로 수정되었습니다. 😀",
          text: `토픽이 수정되었습니다.`,
          icon: "success",
        });
      }).catch((res)=> {
        console.log(res)
      })
  }
}

const othersInfoAX = (id) => {
  return function (dispatch) {
    console.log(id);
    axios.get(`/bookshelf/auth/user/${id}`).then((res) => {
      console.log(res.data);
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
      }).then(()=>{dispatch(userLoading(false))});
  };
};

const followOtherAX = (id, nickname, profileImg) => {
  return function (dispatch) {
    console.log(id);
    axios.post(`/bookshelf/addfriend`, { friendId: id }).then((res) => {
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

const unfollowOtherAX = (id, nickname) => {
  return function (dispatch) {
    axios
      .delete("/bookshelf/friend", { friendId: id })
      .then((res) => {
        console.log(res);
        dispatch(deleteFriend(id));
        swal({
          title: "정상적으로 취소되었습니다.",
          text: `${nickname}님이 친구삭제 되었습니다.`,
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
  friendLoading();
  return function (dispatch) {
    // console.log(id);
    axios.get(`/bookshelf/other/friendList/${id}`).then((res) => {
      // console.log(res.data);
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
        console.log(res);
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
      .post("/bookshelf/searchUserDetail", {id: id})
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log(err);
        })
  }
}


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
  unfollowOtherAX,
  withdrawalAX,
  addRecentUserAX,
  editTopicAX,
};

export default userSlice.reducer;
