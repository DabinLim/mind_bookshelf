import React from "react";
import styled from "styled-components";

import { useSelector } from "react-redux";
import NotiList from "./NotiList";
import NewNotiList from "./NewNotiList";

const Notification = (props) => {
  return (
    <React.Fragment>
      <Background onClick={props.close} />
      <SearchContainer>
        <NewNotiList />
        <NotiList />
      </SearchContainer>
    </React.Fragment>
  );
};

const SearchContainer = styled.div`
  border-radius:20px;
  position: absolute;
  top: 190px;
  right: -180px;
  width: 380px;
  height: 300px;
  background: #ffffff;
  align-items: center;
  transform: translate(-50%, -50%);
  box-shadow: 0px 0px 15px #0000001A;
  z-index: 30;
  display: flex;
  flex-direction: column;
  // overflow:hidden;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
    };
`;

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  opacity: 0;
  height: 100vh;
  width: 100vw;
  background-color: transparent;
  z-index: 20;
`;

export default Notification;
