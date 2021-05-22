import React from "react";
import styled from "styled-components";
import { history } from "../../redux/configStore";
import {UnfollowConfirmModal} from "../Books/booksindex"
import {useSelector, useDispatch} from 'react-redux';
import InfinityScroll from '../../shared/InfinityScroll';
import { api as communityActions } from "../../redux/modules/community";

const LikeModal = (props) => {

  const dispatch = useDispatch();
  const [UnfollowModal, setUnfollowModal] = React.useState(false);
  const [userId, setUserId] = React.useState();
  const [ref, setRef] = React.useState();
  const like_list = useSelector(state => state.community.like_list);
  const is_next = useSelector(state => state.community.like_next);
  const is_loading = useSelector(state => state.community.like_loading);
  const container = React.useRef();
  const url = window.location.href;
  const wtf = document.getElementById('likelist');

  const clickOther = (id) => {
    history.push(`/others/${id}`);
    props.close();
  };

  React.useEffect(() => {
    setRef(container.current);
  },[url])

  return (
    <React.Fragment>
      {UnfollowModal? 
        <UnfollowConfirmModal setUnfollowModal={setUnfollowModal} id={userId} />
      :null}
      <Background web={props.web} onClick={props.close} />
      <FollowContainer>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            padding: "5px 0px 20px 0px",
            borderBottom: "1px solid lightgray",
          }}
        >
          <span
            style={{
              color: "black",
              font: "normal normal bold 14px/20px Noto Sans CJK KR",
            }}
          >
            좋아하는 사람
          </span>
        </div>
        <UserContainer id='likelist' ref={props.container}>
          <InfinityScroll
          callNext={() => {
            console.log("scroooolled!");
            dispatch(communityActions.getLikeList(props.answerId));
          }}
          modal
          is_next={is_next ? true : false}
          is_loading={is_loading}
          ref_value={props.container}
          >
            {like_list.map((f, idx) => {
              return (
                <Body>
                  <UserInfoContainer key={idx} onClick={() => clickOther(f.userId)}>
                    <ProfileImage src={f.profileImg} />
                    <Username>{f.nickname}</Username>
                  </UserInfoContainer>
                  {props.typeFollow? 
                    <FollowBtn onClick={()=>{
                      setUserId(f.userId)
                      setUnfollowModal(true)
                      }} >
                      <FollowBtnText>
                        구독중 
                      </FollowBtnText>
                      <FollowCheckIcon src="https://user-images.githubusercontent.com/77369674/118684692-64e24b80-b83d-11eb-81fb-4976c2b190b4.png" />
                    </FollowBtn>
                  :null}
                </Body>
              );
            })}
          </InfinityScroll>
        </UserContainer>
      </FollowContainer>
    </React.Fragment>
  );
};

const FollowContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 300px;
  height: 400px;
  padding: 15px 0px;
  box-sizing: border-box;
  background-color: #FFFFFF;
  align-items: center;
  transform: translate(-50%, -50%);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.12), 0 2px 5px rgba(0, 0, 0, 0.24);
  z-index: 30;
  display: flex;
  flex-direction: column;
`;

const UserContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  cursor: pointer;
  &:hover {
    background: silver;
  }
`;
const ProfileImage = styled.img`
  border-radius: 50%;
  background-size: cover;
  height: 40px;
  width: 40px;
  margin-right: 10px;
`;

const Body = styled.div`
  padding: 0px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`

const FollowBtn = styled.div`
  width: 90px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #F0F0F0 0% 0% no-repeat padding-box;
  border-radius: 30px;
  cursor: pointer;
  &:hover{
    background: #473674 0% 0% no-repeat padding-box;
    color: #FFFFFF;
  };
`

const FollowCheckIcon = styled.img`
  width: 11px;
`

const FollowBtnText = styled.span`
  margin-right: 5px;
  font-size: 12px;
  font-family: Noto Sans CJK KR;
`

const Username = styled.span`
  font: normal normal medium 13px/19px Noto Sans CJK KR;
`;

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  opacity: 0.4;
  height: 100%;
  width: 100%;
  background-color:black;
  z-index: 20;

`;
const UserText = styled.div`
  margin: auto;
  font-weight: medium;
  font-size: 15px;
`;

export default LikeModal;
