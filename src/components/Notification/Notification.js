import React from "react";
import styled from "styled-components";

import { useSelector } from "react-redux";
import NotiList from "./NotiList";

const Notification = (props) => {
  return (
    <React.Fragment>
      <Background onClick={props.close} />
      <SearchContainer>
        <NotiList />
      </SearchContainer>
    </React.Fragment>
  );
};

const SearchContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 500px;
  height: 600px;
  background: #ffffff;
  align-items: center;
  transform: translate(-50%, -50%);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.12), 0 2px 5px rgba(0, 0, 0, 0.24);
  z-index: 30;
  display: flex;
  flex-direction: column;
`;

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  opacity: 0.4;
  height: 100vh;
  width: 100vw;
  background-color: black;
  z-index: 20;
`;

export default Notification;
