import React from "react";
import "./static/App.css";
import styled from "styled-components";
import { ConnectedRouter } from "connected-react-router";
import { Route, Switch } from "react-router-dom";
import { history } from "./redux/configStore";
import { useDispatch, useSelector } from "react-redux";
import { api as userActions } from "./redux/modules/user";
import { Header } from "./shared/sharedindex";
import {
  Main,
  Auth,
  MyBooks,
  OthersBooks,
  Community,
  MobileSearch,
  MobileNotification,
  NotFound,
  Topic,
  FriendsGround
} from "./pages/pagesindex";
import { getCookie } from "./shared/Cookie";
import QuestionDetail from "./components/Community/QuestionDetail";
import CardDetail from './components/Community/CardDetail';
import {BookDetail, MyAnswers, OthersAnswers, MyQuestion, OthersQuestion} from './components/Books/booksindex';
// import Boop from './components/Notification/Sound'
import useSound from 'use-sound';
import boopSfx from "./static/sounds/YOO.mp3";
import { socket, addNoti } from "./redux/modules/noti";
import ComponentSlider from "./components/Main/ComponentSlider";
import axios from "axios";
import ChannelService from "./shared/ChannelService";

function App() {
  axios.defaults.baseURL = "https://lkj99.shop";
  const dispatch = useDispatch();
  const cookie = getCookie("is_login") ? true : false;
  const is_sound = useSelector((state) => state.noti.is_sound);
  const [play] = useSound(boopSfx);


  socket.on("AlarmEvent", function (data) {
    dispatch(addNoti(data));
    // if(!is_sound){
    //   console.log('하이')
    //   return
    // }
    // console.log('1')
    play();
  });

  // 로그인이 되어있는지 확인하고 유저정보를 가져옵니다.
  React.useEffect(() => {
    //쿠키 안에 토큰값이 있으면 회원정보를 불러오고 리덕스에도 로그인상태 true가 됩니다.
    if (cookie) {
      dispatch(userActions.LoginCheckAX());
    }
    ChannelService.boot({
      pluginKey: "1e06f0ed-5da8-42f4-bb69-7e215b14ec18",
    });
  }, []);
  return (
    <React.Fragment>
      <Header />
      <ContentFrame>
        {/* <Sidebar /> */}
        <ConnectedRouter history={history}>
          <Switch>
            <Route exact path="/" component={Main} />
            <Route exact path="/auth/:id" component={Auth} />
            <Route exact path="/mybook" component={MyBooks}></Route>
            <Route exact path="/mybook/:date" component={MyBooks}></Route>
            <Route exact path="/others/:id" component={OthersBooks} />
            <Route exact path="/others/:id/:date" component={OthersBooks} />
            <Route exact path="/myanswers" component={MyAnswers}/>
            <Route exact path="/othersanswers/:id" component={OthersAnswers}/>
            <Route exact path="/myquestion" component={MyQuestion}/>
            <Route exact path="/othersquestion/:id" component={OthersQuestion}/>
            <Route exact path="/community" component={Community} />
            <Route exact path="/community/:id" component={QuestionDetail} />
            <Route exact path='/bookdetail/:date/:answerid' component={BookDetail}/>
            <Route exact path='/othersdetail/:date/:userid/:answerid' component={BookDetail}/>
            <Route exact path='/carddetail/:id' component={CardDetail}/>
            <Route exact path="/test" component={ComponentSlider} />
            <Route exact path="/search" component={MobileSearch} />
            <Route exact path="/noti" component={MobileNotification} />
            <Route exact path="/topic/:topic" component={Topic} />
            <Route exact path="/friends" component={FriendsGround}/>
            <Route exact component={NotFound}/>
          </Switch>
        </ConnectedRouter>
      </ContentFrame>
    </React.Fragment>
  );
}

const ContentFrame = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

export default App;
