import React, {useState} from "react";
import styled from "styled-components";
import { CardModal } from "../Community/communityindex"
import { useSelector } from "react-redux";
import NotiList from "./NotiList";
import NewNotiList from "./NewNotiList";

const Notification = (props) => {

  return (
    <React.Fragment>
      <Background onClick={props.close} />
      <SearchContainer>
        <NotiHeader>
          알람
        </NotiHeader>
        <NewNotiList setCardModal={props.setCardModal} close={props.close} />
        <NotiList setCardModal={props.setCardModal} close={props.close} />
      </SearchContainer>
    </React.Fragment>
  );
};

const NotiHeader = styled.div`
width: 100%;
padding: 10px 20px;
text-align: left;
margin-top: 10px;
font: normal normal bold 14px/16px Roboto;
letter-spacing: 0px;
color: #333333;
`

const SearchContainer = styled.div`
  position: absolute;
  top: 190px;
  right: -210px;
  width: 420px;
  height: 300px;
  background: #ffffff;
  align-items: center;
  transform: translate(-50%, -50%);
  box-shadow: 0px 0px 15px #0000001A;
  z-index: 30;
  display: flex;
  flex-direction: column;
  color: black;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
    };
  @media (max-width: 900px){
    top: 175px;
    right: -170px;
  };
  @media (max-width: 500px){
    top: 175px;
    right: -150px;
    width: 330px;
    height: 300px;
  }
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
