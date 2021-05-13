import React, {useState, useEffect} from 'react' 
import styled from 'styled-components'
import axios from 'axios'
import {config} from '../shared/config'
import _ from "lodash";
import {history} from '../redux/configStore'
import {useSelector, useDispatch} from 'react-redux'
import Loader from "react-loader-spinner";
import {setSearch} from '../redux/modules/noti';
import {api as userActions} from '../redux/modules/user'
import { getCookie } from '../shared/Cookie'
import ChannelService from "../shared/ChannelService"

const MobileSearch = (props) => {
  const dispatch = useDispatch();
  const [user_list, setUser] = useState();
  const user = useSelector(state => state.user.user)
  const [loading, setLoading] = useState(true);
  const [recent_list, setRecent] = useState();
  
  useEffect(() => {
    recentUser()
    ChannelService.shutdown();
    return () => {
      ChannelService.boot({
        pluginKey: "1e06f0ed-5da8-42f4-bb69-7e215b14ec18",
      });
    };
  },[])

  const recentUser = async () => {
    if (!getCookie("is_login")) {
      setLoading(false);
      return;
    }
    const result = await axios.get("/bookshelf/searchUser");
    console.log(result);
    if (result.data.result.searchUser.length === 0) {
      setRecent();
      setLoading(false);
    } else {
      setRecent(result.data.result.searchUser);
      setLoading(false);
    }
  };

  const debounce = _.debounce((words) => {
    setLoading(true)
    const searchUsers = async() => {
      console.log(words)
      const result = await axios.post(`${config.api}/bookshelf/searchUser`, {words: words})
      console.log(result)
      if(result.data.userInfo === "none" || result.data.userInfo.length === 0){
        setUser()
        setLoading(false)
      }else{
        setUser(result.data.userInfo)
        setLoading(false)
      }
    }
    searchUsers()
  }, 500);

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
      <SearchContainer>
            <SearchInput placeholder='유저를 검색해보세요.' onChange={onChange}/>
            {loading?
            <SpinContainer>
              <Loader type="Oval" color="#3d66ba" height={50} width={50} />
            </SpinContainer>
            :
            <>
            {user_list ? 
            <UserContainer>
              {user_list.map((u) => {
                return  <UserInfoContainer key={u.id} onClick={() => clickOther(u.userId)} >
                          <ProfileImage src={u.profileImg} />
                          <Username>{u.nickname}</Username>
                        </UserInfoContainer>
              })}
            </UserContainer>
            :
            <UserContainer>
              <RecentSearch>최근검색</RecentSearch>
              {recent_list ? 
              recent_list.map((r) => {
                return  <UserInfoContainer style={{marginTop: "10px"}} key={r.id} onClick={() => clickOther(r.searchUserId)} >
                          <ProfileImage src={r.profileImg} />
                          <Username>{r.nickname}</Username>
                        </UserInfoContainer>
              })
              :
              <UserText>최신 유저 목록이 없습니다.</UserText> 
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
  background: white;
  width: 100vw;
  height: 100vh;
  align-items: center;
  color: black;
  display: flex;
  flex-direction: column;
  margin-top: 60px;
`

const SearchInput = styled.input`
  width: 90%;
  min-height: 50px;
  max-height: 50px;
  font-size: 13px;
  padding: 0px 25px;
  background: #F2F2F2;
  opacity:0.8;
  margin-top: 30px;
  border-radius: 30px;
  border-style: none;
  outline: none;
`
const UserContainer = styled.div`
  margin-top: 30px;
  margin-bottom: 15px;
  width: 90%;
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
  height: 40px;
  width: 40px;
  margin-right: 10px;
`

const Username = styled.div`
  margin: auto 0px;
  font: normal normal bold 14px/16px Roboto;
  color: #7D7D7D;
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
  font: normal normal bold 14px/16px Roboto;
  color: #333333;
  margin-left: 8px;
`

export default MobileSearch