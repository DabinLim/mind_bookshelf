import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = '';

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;

    },
  },
});

// 예시입니다.

const exDispatch = (exText) => {
    return function(dispatch) {
        dispatch(setUser(exText))
    }
}




export const { setUser } = userSlice.actions;

export const api = {
    exDispatch
};

export default userSlice.reducer;
