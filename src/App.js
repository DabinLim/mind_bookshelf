import React from 'react';
import './static/App.css';
import styled from 'styled-components';
import { ConnectedRouter } from 'connected-react-router';
import { BrowserRouter, Route } from 'react-router-dom';
import {history} from './redux/configStore';
import {useDispatch} from 'react-redux';
import {api as userActions} from './redux/modules/user';
import MyBook from './pages/MyBooks';
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

function App() {
  const dispatch = useDispatch()

  return (
    <React.Fragment>
      <Header />
      <Container>
      <Sidebar />
      <BrowserRouter>
      <ConnectedRouter history={history}>
        <Route exact path='/mybook' component={MyBook}></Route>
        <Route exact path='/mybook/:id' component={MyBook}></Route>
    </ConnectedRouter>
      </BrowserRouter>
      </Container>
    </React.Fragment>
  );
}

const Container = styled.div`
  margin-top: 55px;
  width:100%;
  height:100%;
  display:flex;
  flex-direction:row;
`;



export default App;
