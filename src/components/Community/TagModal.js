import React from "react";
import styled from "styled-components"
import Loader from "react-loader-spinner";

const TagModal = (props) => {


  return(
    <TagContainer mobile={props.mobile}>
      {props.loading? 
      <SpinContainer>
        <Loader type="Oval" color="#3d66ba" height={50} width={50} />
      </SpinContainer>
      :
      <UserContainer>
        {props.user_list ? 
        props.user_list.map((u) => {
          return  <UserInfoContainer key={u.id} onClick={() => {props.getUserTag(u.nickname)}} >
                    <ProfileImage src={u.profileImg} />
                    <Username>{u.nickname}</Username>
                  </UserInfoContainer>
        })
        : <UserText>찾으시는 유저가 없습니다.</UserText> }
      </UserContainer>
      }
    </TagContainer>
  )


}

const TagContainer = styled.div`
  position: absolute;
  width: 250px;
  height: 180px;
  display: flex;
  flex-direction: column;
  background-color: white;
  z-index: 30;
  bottom: 66px;
  // border-radius: 10px;
  box-shadow: 0 3px 6px rgba(0,0,0,0.12), 0 2px 5px rgba(0,0,0,0.24);
  @media (max-width: 750px) {
    left:5px;
    bottom:80px;
    
  }
`

const SpinContainer = styled.div`
    margin: 80px auto 0px auto;
`

const UserContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
    };
`

const UserInfoContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 15px 8px;
  width: 100%;
  cursor: pointer;
  &:hover{
    background: silver;
  };
`
const ProfileImage = styled.img`
  border-radius: 50%;
  background-size: cover;
  height: 30px;
  width: 30px;
  margin-right: 10px;
`

const Username = styled.div`
  font-size: 14px;
  font-weight: 600;
`

const UserText = styled.div`
  margin: auto;
  margin-top: 30px;
  font-weight: medium;
  font-size: 14px;
`
export default TagModal