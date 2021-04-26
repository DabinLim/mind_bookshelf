import React from 'react';
import './static/App.css';
import styled from 'styled-components';
import { ConnectedRouter } from 'connected-react-router';
import { BrowserRouter, Route } from 'react-router-dom';
import {history} from './redux/configStore';
import {useDispatch} from 'react-redux';
import {api as userActions} from './redux/modules/user';
import MyBook from './pages/MyBooks';

function App() {
  const dispatch = useDispatch()

  // 예시입니다. 

  return (
    <React.Fragment>
      <BrowserRouter>
      <ConnectedRouter history={history}>
        <Route exact path='/mybook' component={MyBook}></Route>
        <Route exact path='/mybook/:id' component={MyBook}></Route>
      </ConnectedRouter>
      </BrowserRouter>
    </React.Fragment>
  );
}



export default App;
