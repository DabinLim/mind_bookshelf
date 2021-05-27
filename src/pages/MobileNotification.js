import React, {useEffect, useState} from 'react'
import styled from "styled-components";
import {useDispatch, useSelector} from 'react-redux'
import {api as notiActions} from '../redux/modules/noti'
import ChannelService from "../shared/ChannelService"
import MobileNotiList from '../components/Notification/MobileNotiList'
import MobileNewNotiList from '../components/Notification/MobileNewNotiList'
import {CardModal} from '../components/Community/communityindex'
import GoBack from '../elements/GoBack'
import {editSound} from '../redux/modules/noti';

const MobileNoti = (props) => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.user);
  const [cardModal, setCardModal] = useState(false);

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
        <NotiHeaderContainer>
          <GoBack/>
          <NotiHeader>
            알람
          </NotiHeader>
          <div style={{width:"30px", height:"20px"}}></div>
        </NotiHeaderContainer>
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
  color: black;
  display: none;
  flex-direction: column;
  margin-top: 50px;
  @media (max-width: 750px) {
    display: flex;
  }
`

const NotiHeaderContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0px 10px 0 20px;
  margin-top: 25px;
  margin-bottom: 15px;
  align-items: center;
`

const NotiHeader = styled.div`
  font: normal normal bold 14px/16px Roboto;
  letter-spacing: 0px;
  color: #333333;
`


export default MobileNoti

