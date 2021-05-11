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
  router: connectRouter(history),
});

const { logger } = require("redux-logger");

let store = configureStore({
  reducer: rootReducer,
  middleware: [
    ...getDefaultMiddleware({
      serializableCheck: false,
    }),
    logger,
  ],
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
