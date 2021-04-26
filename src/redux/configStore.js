import { combineReducers } from "redux";
import { configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import { createBrowserHistory } from "history";
import { connectRouter } from "connected-react-router";
import User from '../redux/modules/user';
import Books from '../redux/modules/books';

export const history = createBrowserHistory();

const rootReducer = combineReducers({
  books:Books,
  user: User,
  router: connectRouter(history),
});

const { logger } = require("redux-logger");

let store = configureStore({
  reducer: rootReducer,
  middleware: [...getDefaultMiddleware({
    serializableCheck: false,
  }), logger],
  devTools: process.env.NODE_ENV !== "production",
});

export default store;