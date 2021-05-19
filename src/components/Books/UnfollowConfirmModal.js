import React from 'react';
import styled from 'styled-components'
import {api as userActions} from "../../redux/modules/user";
import { useSelector, useDispatch } from "react-redux";

const UnfollowConfirmModal = (props) => {
  const dispatch = useDispatch()
  const other_info = useSelector((state) => state.user.other);

  return(
    <React.Fragment>
      <Background onClick={()=>{props.setUnfollowModal(false)}} />
      <Container>
        <Header>
          구독을 해제하시겠어요?
        </Header>
        <Body>
          <Button 
            onClick={() => {
              dispatch(
                userActions.unfollowOtherAX(
                  props.id,
                )
              );
              props.setUnfollowModal(false)
            }}
            style={{color:"#EB5959", borderBottom: '0.5px solid #D3D4D3'}} >해제</Button>
          <Button onClick={()=>{props.setUnfollowModal(false)}} >취소</Button>
        </Body>
      </Container>
    </React.Fragment>
  )
}

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  opacity: 0.4;
  height: 100%;
  width: 100%;
  background-color: black;
  z-index: 80;
`

const Container = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 240px;
  height: 200px;
  transform: translate(-50%, -50%);
  background: #FFFFFF;
  z-index: 81;
`

const Header = styled.div`
  height: 106px;
  display: flex;
  align-items: center;
  justify-content: center;
  font: normal normal medium 14px/20px Noto Sans CJK KR  ;
  border-bottom: 0.5px solid #D3D4D3;
`

const Body = styled.div`
  height: 94px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Button = styled.div`
  width: 100%;
  height: 47px;
  display: flex;
  align-items: center;
  justify-content: center;
  font: normal normal normal 14px/20px Noto Sans CJK KR;
`

export default UnfollowConfirmModal