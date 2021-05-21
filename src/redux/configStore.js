import { combineReducers } from "redux";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { createBrowserHistory } from "history";
import { connectRouter } from "connected-react-router";
import User from "../redux/modules/user";
import Books from "../redux/modules/books";
import Answer from "../redux/modules/answer";
import Community from "../redux/modules/community";
import Comment from "../redux/modules/comment";
import Noti from "../redux/modules/noti";
import Moreview from "../redux/modules/moreview";
import Custom from "../redux/modules/custom";
import Friends from "../redux/modules/friends";

export const history = createBrowserHistory();

const rootReducer = combineReducers({
  noti: Noti,
  books: Books,
  user: User,
  answer: Answer,
  community: Community,
  comment: Comment,
  moreview: Moreview,
  custom: Custom,
  friends: Friends,
  router: connectRouter(history),
});

const middlewares = [
  ...getDefaultMiddleware({
    serializableCheck: false,
  })
]


if (process.env.NODE_ENV === "development") {
  const { logger } = require("redux-logger");
  middlewares.push(logger);
}

let store = configureStore({
  reducer: rootReducer,
  middleware: middlewares,
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
