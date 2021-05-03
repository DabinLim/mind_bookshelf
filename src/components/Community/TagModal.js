import React from "react";
import styled from "styled-components"
import Loader from "react-loader-spinner";

const TagModal = (props) => {


  return(
    <TagContainer>
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
  width: 300px;
  height: 200px;
  display: flex;
  flex-direction: column;
  background-color: white;
  z-index: 30;
  bottom: 66px;
  box-shadow: 0 3px 6px rgba(0,0,0,0.12), 0 2px 5px rgba(0,0,0,0.24);
`

const SpinContainer = styled.div`
    margin-top: 80px;
`

const UserContainer = styled.div`
  margin-top: 30px;
  margin-bottom: 15px;
  width: 80%;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
    };
`

const UserInfoContainer = styled.div`
  display: flex;
  padding: 15px 8px;
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
  margin-right: 20px;
`

const Username = styled.div`
  font-size: 14px;
  font-weight: 600;
`

const UserText = styled.div`
  margin: auto;
  font-weight: 600;
  font-size: 14px;
`
export default TagModal