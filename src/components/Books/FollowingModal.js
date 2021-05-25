import React, { useState } from "react";
import styled from "styled-components";
import _ from "lodash";
import { history } from "../../redux/configStore";
import {UnfollowConfirmModal, FollowConfirmModal} from "./booksindex"
import {useDispatch, useSelector} from "react-redux"
import InfinityScroll from "../../shared/InfinityScroll"
import {api as userActions} from '../../redux/modules/user'

const FollowingModal = (props) => {
  const [UnfollowModal, setUnfollowModal] = useState(false);
  const [followModal, setFollowModal] = useState(false)
  const [followerId, setFollowerId] = useState();
  const [followerNickname, setFollowerNickname] = useState();
  const dispatch = useDispatch();
  const next = useSelector((state) => state.user.following_next);
  const is_loading = useSelector((state) => state.user.follow_loading);
  const myId = useSelector((state) => state.user.user.id)
  const is_login = useSelector((state) => state.user.is_login);
  const [profileImg, setProfileImg] = useState()

  const ImgeError = () => {
    setProfileImg('https://blog.kakaocdn.net/dn/cyOIpg/btqx7JTDRTq/1fs7MnKMK7nSbrM9QTIbE1/img.jpg')
  }

  const clickOther = (id) => {
    history.push(`/others/${id}`);
    props.close();
  };

  return (
    <React.Fragment>
      {UnfollowModal? 
        <UnfollowConfirmModal setUnfollowModal={setUnfollowModal} nickname={followerNickname} id={followerId} />
        :null}
      {followModal?
        <FollowConfirmModal setFollowModal={setFollowModal} nickname={followerNickname} id={followerId} />
        :null
      }
      <Background onClick={props.close} />
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
            팔로잉
          </span>
        </div>
        <UserContainer ref={props.container} >
          {props.following_list.length !== 0 ? (
          <InfinityScroll
            callNext={() => {
              console.log(props.following_list)
              dispatch(userActions.getFollowing(props.userId))
            }}
            is_next={next}
            is_loading={is_loading}
            ref_value={props.container}
            modal
            height={20}
          >
              {props.following_list.map((f, idx) => {
                return (
                  <Body>
                    <UserInfoContainer key={idx} onClick={() => clickOther(f.userId)}>
                      <ProfileImage  onError={ImgeError} src={profileImg? profileImg :f.profileImg} />
                      <Username>{f.nickname}</Username>
                    </UserInfoContainer>
                    {myId === f.userId || !is_login ? 
                      null
                    :
                      f.isFollowing? 
                        <FollowBtn onClick={()=>{
                          setFollowerId(f.userId);
                          setUnfollowModal(true);
                          setFollowerNickname(f.nickname);
                          }} >
                          <FollowBtnText>
                            구독중 
                          </FollowBtnText>
                          <FollowCheckIcon src="https://user-images.githubusercontent.com/77369674/118684692-64e24b80-b83d-11eb-81fb-4976c2b190b4.png" />
                        </FollowBtn>
                      :
                      <UnfollowBtn onClick={()=>{
                        setFollowerId(f.userId);
                        setFollowModal(true);
                        setFollowerNickname(f.nickname);
                        }} >
                        <FollowBtnText>
                          구독하기
                        </FollowBtnText>
                      </UnfollowBtn>
                    }
                  </Body>
                );
              })}
            </InfinityScroll>
            ) : (
              <UserText>구독하는 유저가 없습니다.</UserText>
            )}
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
  object-fit:cover;
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

const UnfollowBtn = styled.div`
  width: 90px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #473674 0% 0% no-repeat padding-box;
  color: #FFFFFF;
  border-radius: 30px;
  cursor: pointer;
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
  height: 100vh;
  width: 100vw;
  background-color: black;
  z-index: 20;
`;
const UserText = styled.div`
  margin: auto;
  font-weight: medium;
  font-size: 15px;
`;

export default FollowingModal;