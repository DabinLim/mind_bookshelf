import React, {useEffect, useState} from 'react'
import styled from "styled-components";
import {useDispatch, useSelector} from 'react-redux'
import {api as notiActions} from '../redux/modules/noti'
import ChannelService from "../shared/ChannelService"
import MobileNotiList from '../components/Notification/MobileNotiList'
import MobileNewNotiList from '../components/Notification/MobileNewNotiList'
import {CardModal} from '../components/Community/communityindex'

const MobileNoti = (props) => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.user);
  const [cardModal, setCardModal] = useState(false)

  useEffect(() => {
    dispatch(notiActions.openAlarmIO(user.id));
    ChannelService.shutdown();
    return () => {
      ChannelService.boot({
        pluginKey: "1e06f0ed-5da8-42f4-bb69-7e215b14ec18",
      });
    };
  },[])

  const closeCard = () => {
    setCardModal(false)
  }

  return(
    <React.Fragment>
      {cardModal ? 
        <CardModal close={closeCard} />
        :null}
      <NotiContainer>
        <NotiHeader>
          알람
        </NotiHeader>
        <MobileNotiList setCardModal={setCardModal} />
        <MobileNewNotiList setCardModal={setCardModal} />
      </NotiContainer>
    </React.Fragment>
  )
}

const NotiContainer = styled.div`
  background: white;
  width: 100vw;
  height: 100vh;
  align-items: center;
  color: black;
  display: none;
  flex-direction: column;
  margin-top: 50px;
  @media (max-width: 750px) {
    display: flex;
  }
`

const NotiHeader = styled.div`
width: 100%;
padding: 10px 20px;
text-align: left;
margin-top: 25px;
font: normal normal bold 14px/16px Roboto;
letter-spacing: 0px;
color: #333333;
`


export default MobileNoti

