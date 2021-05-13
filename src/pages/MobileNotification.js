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


  return(
    <React.Fragment>
      {cardModal ? 
        <CardModal/>
        :null}
      <NotiContainer>
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
  display: flex;
  flex-direction: column;
  margin-top: 60px;
`

export default MobileNoti

