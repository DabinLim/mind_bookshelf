import React from 'react';
import styled from 'styled-components'
import {api as userActions} from "../../redux/modules/user";
import { useSelector, useDispatch } from "react-redux";

const UnfollowConfirmModal = (props) => {
  const dispatch = useDispatch()
  return(
    <React.Fragment>
      <Background onClick={()=>{props.setUnfollowModal(false)}} />
      <Container>
        <Header>
          <div>
            <b>{props.nickname}</b>님을
          </div>
          <div>
            팔로우 해제하시겠어요?
          </div> 
        </Header>
        <Body>
          <Button 
            onClick={() => {
              if(props.like){
                dispatch(
                  userActions.unfollowOtherAX(
                    props.id, "like"
                  )
                );
                props.setUnfollowModal(false);
                return
              }
              if(props.other){
                dispatch(
                  userActions.unfollowOtherAX(
                    props.id, "other"
                  )
                );
                props.setUnfollowModal(false);
                return
              }
              dispatch(
                userActions.unfollowOtherAX(
                  props.id, "profile"
                )
              );
              props.setUnfollowModal(false);
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
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align:center;
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
  cursor: pointer;
`

export default UnfollowConfirmModal