import React from 'react';
import './static/App.css';
import styled from 'styled-components';
import { ConnectedRouter } from 'connected-react-router';
import { BrowserRouter, Route } from 'react-router-dom';
import {history} from './redux/configStore';
import {useDispatch} from 'react-redux';
import {api as userActions} from './redux/modules/user';
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";
import Header from "./components/Header";
import Auth from "./pages/Auth"
import MyBook from './pages/MyBooks';
import OtherBooks from './pages/OtherBooks';
import { getCookie } from './shared/Cookie';


function App() {
  const dispatch = useDispatch()
  const cookie = getCookie('is_login') ? true : false;
  // 로그인이 되어있는지 확인하고 유저정보를 가져옵니다.
  React.useEffect(() => {
    //쿠키 안에 토큰값이 있으면 회원정보를 불러오고 리덕스에도 로그인상태 true가 됩니다.
    console.log("ㅎㅇ")
    if(cookie){
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
          <Route exact path='/mybook' component={MyBook}></Route>
          <Route exact path='/mybook/:id' component={MyBook}></Route>
          <Route exact path='/other' component={OtherBooks} />
        </ConnectedRouter>
      </ContentFrame>
    </React.Fragment>
  );
}

const ContentFrame = styled.div`
  display: flex;
  position: relative;
  top: 55px;
  height: 90%;
`;

export default App;
