import React, {useState} from 'react';  
import styled from  'styled-components';
import axios from 'axios'
import {config} from '../shared/config'
import _ from "lodash";
import {history} from '../redux/configStore'

const Search = (props) => {
  const [loading, setLoading] = useState(false);
  const [user_list, setUser] = useState();
  const [userModal, setUserModal] = useState(false);

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
    console.log("하이")
    history.push(`/other/${id}`);
    setUserModal(false)
  }

  const closeModal = (event) => { 
    if (event === undefined) { 
      setUserModal(false); 
      return; 
    } 
    // 현재 함수가 걸려있는 target 과 구분해주기 위함. 
    if (event.target !== event.currentTarget) { 
      return; 
    } setUserModal(false); };

  return(
    <React.Fragment>
      <SearchContainer onFocus={() => {setUserModal(true)}}>
        {userModal?
          <>
            <UserModal onClick={closeModal} >
              {user_list ? 
              user_list.map((u) => {
                return  <UserInfoContainer onClick={() => clickOther(u.userId)} >
                          <ProfileImage src={u.profileImg} />
                          <Username>{u.nickname}</Username>
                        </UserInfoContainer>
              })
              : null }
            </UserModal>
          </> 
          :null}
        <SearchInput  onChange={onChange}   />
      </SearchContainer>
    </React.Fragment>
  )
}

const SearchContainer = styled.div`
  margin-right: 50px;
`

const SearchInput = styled.input`
  width: 300px;
  font-size: 20px;
  padding: 5px 8px;
  background: #FAFAFA;
`
const UserModal = styled.div`
  position:fixed;
  top: 70px;
  right: 200px;
  width: 350px;
  height: 500px;
  background-color: #FFFFFF;
  z-index: 10;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
    };
  box-shadow: 0 3px 6px rgba(0,0,0,0.12), 0 2px 5px rgba(0,0,0,0.24);
`

const UserInfoContainer = styled.div`
  display: flex;
  margin-top: 15px;
  margin-bottom: 15px;
  margin-left: 30px;
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
  


`
export default Search