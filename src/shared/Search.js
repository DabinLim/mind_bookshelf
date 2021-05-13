import React, {useState} from 'react';  
import styled from  'styled-components';
import axios from 'axios'
import {config} from '../shared/config'
import _ from "lodash";
import {history} from '../redux/configStore'
import {useSelector, useDispatch} from 'react-redux'
import Loader from "react-loader-spinner";
import {setSearch} from '../redux/modules/noti';
import {api as userActions} from '../redux/modules/user'

const Search = (props) => {
  const dispatch = useDispatch();
  const [user_list, setUser] = useState();
  const user = useSelector(state => state.user.user)

  console.log(props.recent_list)
  const debounce = _.debounce((words) => {
    props.setLoading(true)
    const searchUsers = async() => {
      console.log(words)
      const result = await axios.post(`${config.api}/bookshelf/searchUser`, {words: words})
      console.log(result)
      if(result.data.userInfo === "none" || result.data.userInfo.length === 0){
        setUser()
        props.setLoading(false)
      }else{
        setUser(result.data.userInfo)
        props.setLoading(false)
      }
    }
    searchUsers()
  }, 500);
  console.log(user_list)

  const keyPress = React.useCallback(debounce, []);
  
  const onChange = (e) => {
    keyPress(e.target.value)
  }

  const clickOther = (id) => {
    dispatch(userActions.addRecentUserAX(id))
    if(id === user.id){
      history.push(`/mybook`)
      dispatch(setSearch(false));
      return
    }
    history.push(`/others/${id}`);
    dispatch(setSearch(false));
  }

  return(
    <React.Fragment>
      <Background onClick={()=> {dispatch(setSearch(false))}}/>
      <SearchContainer>
            <SearchInput placeholder='유저를 검색해보세요.' onChange={onChange}/>
            {props.loading?
            <SpinContainer>
              <Loader type="Oval" color="#3d66ba" height={50} width={50} />
            </SpinContainer>
            :
            <>
            {user_list ? 
            <UserContainer>
              {user_list.map((u) => {
                if(u.nickname === "알 수 없는 유저"){
                  return
                }
                return  <UserInfoContainer key={u.id} onClick={() => clickOther(u.userId)} >
                          <ProfileImage src={u.profileImg} />
                          <Username>{u.nickname}</Username>
                        </UserInfoContainer>
              })}
            </UserContainer>
            :
            <UserContainer>
              <RecentSearch>최근검색</RecentSearch>
              {props.recent_list ? 
              props.recent_list.map((r) => {
                if(r.nickname === "알 수 없는 유저"){
                  return
                }
                return  <UserInfoContainer style={{marginTop: "10px"}} key={r.id} onClick={() => clickOther(r.searchUserId)} >
                          <ProfileImage src={r.profileImg} />
                          <Username>{r.nickname}</Username>
                        </UserInfoContainer>
              })
              :
              <UserText>최근 유저 목록이 없습니다.</UserText> 
              }
            </UserContainer>
            }
            </>
            }
      </SearchContainer>
    </React.Fragment>
  )
}

const SearchContainer = styled.div`
  position: absolute;
  border-radius:20px;
  top: 190px;
  right: -115px;
  width: 250px;
  height: 300px;
  background: #FFFFFF;
  align-items: center;
  color: black;
  transform: translate(-50%, -50%);
  box-shadow: 0px 0px 15px #0000001A;
  z-index: 30;
  display: flex;
  flex-direction: column;
`

const SearchInput = styled.input`
  width: 200px;
  height:35px;
  font-size: 13px;
  padding: 5px 15px;
  background: #F2F2F2;
  opacity:0.8;
  margin-top: 30px;
  border-radius: 30px;
  border-style: none;
  outline: none;
`
const UserContainer = styled.div`
  margin-top: 20px;
  margin-bottom: 15px;
  width: 80%;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
    };
`

const SpinContainer = styled.div`
    margin-top: 80px;
`

const UserInfoContainer = styled.div`
  display: flex;
  padding:5px;
  cursor: pointer;
  &:hover{
    background: silver;
  };
`
const ProfileImage = styled.img`
  border-radius: 50%;
  background-size: cover;
  height: 28px;
  width: 28px;
  margin-right: 10px;
`

const Username = styled.div`
  margin: auto 0px;
  font-size: 14px;
  font-weight: 600;
`

const Background = styled.div`
  position: fixed;
  top: 0;
  left:0;
  opacity: 0;
  height: 100vh;
  width: 100vw;
  background-color: transparent;
  z-index: 20;
  /* pointer-events: none; */
`

const UserText = styled.div`
  margin: auto;
  margin-top: 30px;
  // font-weight: 600;
  font-size: 14px;
`

const RecentSearch = styled.div`
  font-weight: 600;
  font-size: 14px;
  margin-left: 8px;
`
export default Search