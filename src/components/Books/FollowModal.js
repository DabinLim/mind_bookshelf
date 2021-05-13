import React, {useState} from 'react'  
import styled from  'styled-components'
import _ from "lodash";
import {history} from '../../redux/configStore'

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
        <div style={{width:'100%', display:'flex', justifyContent:'center', padding:'5px 0px 20px 0px', borderBottom:'1px solid lightgray'}}>
        <span style={{color:'black',font:'normal normal bold 14px/20px Noto Sans KR'}}>구독</span>
        </div>
        {/* <div style={{width:'100%', display:'flex', justifyContent:'center', padding:'20px 0px', borderTop:'1px solid lightgray', borderBottom:'1px solid lightgray'}}>
        <SearchInput onChange={onChange} placeholder="유저를 검색해보세요." />
        </div> */}
        <UserContainer>
          {userInput.length !== 0 ?
          userInput.map((f, idx) => {
            return  <UserInfoContainer key={idx} onClick={() => clickOther(f.id)} >
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
  width: 300px;
  height: 400px;
  border-radius: 20px;
  padding: 15px 0px;
  box-sizing:border-box;
  background: #FFFFFF;
  align-items: center;
  transform: translate(-50%, -50%);
  box-shadow: 0 3px 6px rgba(0,0,0,0.12), 0 2px 5px rgba(0,0,0,0.24);
  z-index: 30;
  display: flex;
  flex-direction: column;
`

const SearchInput = styled.input`
  box-sizing:border-box;
  width: 250px;
  font-size: 13px;
  padding: 10px 20px;
  background: #F2F2F2;
  border-radius: 30px;
  outline: none;
  border: none;
`

const UserContainer = styled.div`
  padding:0px 15px;
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
  flex-direction:row;
  justify-content: flex-start;
  align-items:center;
  margin-top:20px;
  width:100%;
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

const Username = styled.span`
  font: normal normal bold 14px/20px Noto Sans KR;
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
  font-size: 15px;
`

export default FollowModal