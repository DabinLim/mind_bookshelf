import React from "react";
import "./static/App.css";
import styled from "styled-components";
import { ConnectedRouter } from "connected-react-router";
import { Route } from "react-router-dom";
import { history } from "./redux/configStore";
import { useDispatch } from "react-redux";
import { api as userActions } from "./redux/modules/user";
import {Sidebar, Header} from "./shared/sharedindex";
import {Main, Auth, MyBooks, OthersBooks, Community} from './pages/pagesindex';
import { getCookie } from "./shared/Cookie";
import QuestionDetail from './components/Community/QuestionDetail';
import {socket, addNoti} from './redux/modules/noti'


function App() {
  const dispatch = useDispatch();
  const cookie = getCookie("is_login") ? true : false;
  
  socket.on('AlarmEvent', function(data) {
    console.log(data);
    dispatch(addNoti(data));
  })

  // 로그인이 되어있는지 확인하고 유저정보를 가져옵니다.
  React.useEffect(() => {
    //쿠키 안에 토큰값이 있으면 회원정보를 불러오고 리덕스에도 로그인상태 true가 됩니다.
    if (cookie) {
      dispatch(userActions.LoginCheckAX());
    }
  }, []);
  return (
    <React.Fragment>
      <Header />
      <ContentFrame>
        <Sidebar />
        <ConnectedRouter history={history}>
          <Route exact path="/" component={Main} />
          <Route exact path="/auth/:id" component={Auth} />
          <Route exact path="/mybook" component={MyBooks}></Route>
          <Route exact path="/mybook/:date" component={MyBooks}></Route>
          <Route exact path="/others/:id" component={OthersBooks} />
          <Route exact path="/others/:id/:date" component={OthersBooks} />
          <Route exact path="/community" component={Community} />
          <Route exact path="/community/:id" component={QuestionDetail} />
        </ConnectedRouter>
      </ContentFrame>
    </React.Fragment>
  );
}

const ContentFrame = styled.div`
  display: flex;
  padding-top: 55px;
  width: 100%;
  height: 100%;
`;

export default App;
