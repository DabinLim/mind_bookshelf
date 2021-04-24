import React from 'react';
import './static/App.css';
import { ConnectedRouter } from 'connected-react-router';
import { BrowserRouter, Route } from 'react-router-dom';
import {history} from './redux/configStore';
import {useDispatch} from 'react-redux';
import {setUser} from './redux/modules/user';
import {api as userActions} from './redux/modules/user';

function App() {
  const dispatch = useDispatch()
  
  // 예시입니다. 
  React.useEffect(() => {
    dispatch(userActions.exDispatch('유저정보'))
  },[])
  return (
    <React.Fragment>
      <BrowserRouter>
      <ConnectedRouter history={history}>
        <div>이거 지우고 시작</div>
      </ConnectedRouter>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
