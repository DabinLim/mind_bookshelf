import React from "react";
import "./static/App.css";
import styled from "styled-components";
import { ConnectedRouter } from "connected-react-router";
import { BrowserRouter, Route } from "react-router-dom";
import { history } from "./redux/configStore";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/modules/user";
import { api as userActions } from "./redux/modules/user";

import Sidebar from "./components/Sidebar";
import Main from "./components/Main";
import Header from "./components/Header";

function App() {
  const dispatch = useDispatch();

  // 로그인이 되어있는지 확인하고 유저정보를 가져옵니다.
  React.useEffect(() => {
    // dispatch(userActions.LoginCheckAX());
  }, []);
  return (
    <>
      <Header />
      <ContentFrame>
        <Sidebar />
        <ConnectedRouter history={history}>
          <Route exact path="/" component={Main} />
        </ConnectedRouter>
      </ContentFrame>
    </>
  );
}

const ContentFrame = styled.div`
  display: flex;
  position: relative;
  top: 55px;
  height: 90%;
`;

export default App;
