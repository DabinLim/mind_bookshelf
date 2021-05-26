import React from "react";
import styled from "styled-components";
import NotiList from "./NotiList";
import NewNotiList from "./NewNotiList";
import {useSelector, useDispatch} from 'react-redux';
import {editSound} from '../../redux/modules/noti';

const Notification = (props) => {
  // const dispatch = useDispatch()
  // const is_sound = useSelector((state) => state.noti.is_sound)

  return (
    <React.Fragment>
      <Background onClick={props.close} />
      <SearchContainer>
        <NotiHeader>
          <div>
            알람
          </div>
          {/* {is_sound? 
          <NotiSound 
            onClick={()=>{dispatch(editSound(false))}} > 
            소리 끄기 
          </NotiSound> 
          :
          <NotiSound 
            onClick={()=>{dispatch(editSound(true))}}> 
            소리 켜기 
          </NotiSound> 
          } */}
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
display: flex;
justify-content: space-between;
align-items: center;
text-align: left;
margin-top: 10px;
font: normal normal bold 14px/16px Roboto;
letter-spacing: 0px;
color: #333333;
`

const NotiSound = styled.div`
  font: normal normal normal 13px/19px Noto Sans CJK KR;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  width: 75px;
  border: 1px solid #848484;
  border-radius: 5px;
  &:hover{
    font-weight: bold;
  };
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
