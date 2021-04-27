import React, {useState} from 'react'
import styled from 'styled-components'
import {useSelector, useDispatch} from 'react-redux'
import ProfileUpdateModal from './ProfileUpdateModal'
import {setComponent} from '../redux/modules/books'

const Profile = (props) => {
  const dispatch = useDispatch()
  const [UpdateModal, setUpdateModal] = useState(false)
  const user_info = useSelector((state) => state.user.user)
  const is_other = props.id? true : false;
  const other_info = useSelector((state) => state.user.other)


  const closeUpdateModal = () => {
    setUpdateModal(false)
  }
  return(
    <>
      {is_other? 
          <React.Fragment>
            <ProfileImg src={other_info.profileImg} style={{marginTop: "50px"}} />
            <Nickname>{other_info.nickname}</Nickname>
            <Introduce>{other_info.introduce}</Introduce>
            <FollowerBtn>팔로우하기</FollowerBtn>
            <MyQuestionBtn onClick={()=>{dispatch(setComponent('myquestion'))}}>나의질문</MyQuestionBtn>
          </React.Fragment>
        :
          <React.Fragment>
            {UpdateModal? 
              <ProfileUpdateModal close={closeUpdateModal} />
            :null}
            <ProfileImgContainer onClick={() => {setUpdateModal(true)}} >
              <ProfileImg style={{cursor:"pointer"}} src={user_info.profileImg} />
              <SettingIcon src="https://pics.freeicons.io/uploads/icons/png/17773426191535958157-512.png" />
            </ProfileImgContainer>
            <Nickname>{user_info.nickname}</Nickname>
            <Introduce>{user_info.introduce}</Introduce>
            <FollowerBtn>팔로우하기</FollowerBtn>
            <MyQuestionBtn onClick={()=>{dispatch(setComponent('myquestion'))}}>나의질문</MyQuestionBtn>
          </React.Fragment>
        
      }
    </>

  )
  }

const ProfileImgContainer = styled.div`
  position: relative;
  margin-top: 50px;
`

const ProfileImg = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 150px;
  object-fit: cover;
`

const SettingIcon = styled.img`
  width: 25px;
  height: 25px;
  position: absolute;
  top: 7px;
  right: 12px;
  border-radius: 30px;
  background: silver;
  padding: 5px;
  cursor: pointer;
`

const Nickname = styled.div`
  margin-top: 20px;
  font-weight: 600;
  font-size: 20px;
`

const Introduce = styled.div`
  margin-top: 10px;
`

const FollowerBtn = styled.div`
  margin-top: 80px;
  cursor: pointer;
  font-weight: 600;
  font-size: 18px;
`
const MyQuestionBtn = styled.div`
  margin-top: 20px;
  cursor: pointer;
  font-weight: 600;
  font-size: 18px;
`

export default Profile