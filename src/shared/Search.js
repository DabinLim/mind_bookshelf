import React, {useState} from 'react';  
import styled from  'styled-components';
import axios from 'axios'
import {config} from '../shared/config'
import _ from "lodash";
import {history} from '../redux/configStore'

const Search = (props) => {
  const [loading, setLoading] = useState(false);
  const [user_list, setUser] = useState();

  const debounce = _.debounce((words) => {
    const searchUsers = async() => {
      setLoading(true)
      console.log(words)
      const result = await axios.post(`${config.api}/bookshelf/searchUser`, {words: words})
      console.log(result)
      if(result.data.userInfo === "none"){
        setUser()
      }else{
        setUser(result.data.userInfo)
      }
    }
    searchUsers()
  }, 1000);
  console.log(user_list)

  const keyPress = React.useCallback(debounce, []);
  
  const onChange = (e) => {
    keyPress(e.target.value)
  }

  const clickOther = (id) => {
    history.push(`/others/${id}`);
    props.close()
  }

  // const closeModal = (event) => { 
  //   if (event === undefined) { 
  //     setUserModal(false); 
  //     return; 
  //   } 
  //   // 현재 함수가 걸려있는 target 과 구분해주기 위함. 
  //   if (event.target !== event.currentTarget) { 
  //     return; 
  //   } setUserModal(false); };

  return(
    <React.Fragment>
      <Background onClick={props.close} />
      <SearchContainer>
            <SearchInput  onChange={onChange}   />
            <UserContainer>
              {user_list ? 
              user_list.map((u) => {
                return  <UserInfoContainer onClick={() => clickOther(u.userId)} >
                          <ProfileImage src={u.profileImg} />
                          <Username>{u.nickname}</Username>
                        </UserInfoContainer>
              })
              : <UserText>찾으시는 유저가 없습니다.</UserText> }
            </UserContainer>
      </SearchContainer>
    </React.Fragment>
  )
}

const SearchContainer = styled.div`
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
export default Search