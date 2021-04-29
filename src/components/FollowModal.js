import React, {useState} from 'react'  
import styled from  'styled-components'
import _ from "lodash";
import {history} from '../redux/configStore'

const FollowModal = (props) => {
  const [userInput, setInput] = useState(props.friend_list)
  
  const debounce = _.debounce((words) => {
    const filteredUser = props.friend_list.filter((f) => {
      return f.nickname.includes(words)
    })
    setInput(filteredUser)
  }, 500)

  const keyPress = React.useCallback(debounce, []);

  const onChange = (e) => {
    keyPress(e.target.value)
  }

  const clickOther = (id) => {
    history.push(`/others/${id}`);
    props.close()
  }

  return(

    <React.Fragment>
      <Background onClick={props.close}/>
      <FollowContainer>
        <SearchInput onChange={onChange} />
        <UserContainer>
          {userInput.length !== 0 ?
          userInput.map((f) => {
            return  <UserInfoContainer onClick={() => clickOther(f.id)} >
                      <ProfileImage src={f.profileImg} />
                      <Username>{f.nickname}</Username>
                    </UserInfoContainer>
          })
          :<UserText>찾으시는 유저가 없습니다.</UserText>}
          
        </UserContainer>
      </FollowContainer>
    </React.Fragment>

  )

}

const FollowContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 500px;
  height: 600px;
  background: #FFFFFF;
  align-items: center;
  transform: translate(-50%, -50%);
  box-shadow: 0 3px 6px rgba(0,0,0,0.12), 0 2px 5px rgba(0,0,0,0.24);
  z-index: 30;
  display: flex;
  flex-direction: column;
`

const SearchInput = styled.input`
  width: 300px;
  font-size: 20px;
  padding: 5px 15px;
  background: #FFFFFF;
  margin-top: 30px;
  border-radius: 30px;
  outline: none;
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
  font-size: 18px;
  font-weight: 600;
`

const Background = styled.div`
  position: fixed;
  top: 0;
  left:0;
  opacity: 0.4;
  height: 100vh;
  width: 100vw;
  background-color: black;
  z-index: 20;
`
const UserText = styled.div`
  margin: auto;
  font-weight: 600;
  font-size: 18px;
`

export default FollowModal