import React, {useState} from 'react'
import styled from 'styled-components'
import {useSelector} from 'react-redux'
import ProfileUpdateModal from './ProfileUpdateModal'

const Profile = () => {
  const [UpdateModal, setUpdateModal] = useState(false)
  const user_info = useSelector((state) => state.user.user)

  const closeUpdateModal = () => {
    setUpdateModal(false)
  }

  return(
    <React.Fragment>
      {UpdateModal? 
        <ProfileUpdateModal close={closeUpdateModal} />
      :null}
      <ProfileImgContainer onClick={() => {setUpdateModal(true)}} >
        <ProfileImg style={{cursor:"pointer"}} src={user_info.profileImg} />
        <SettingIcon src="https://pics.freeicons.io/uploads/icons/png/17773426191535958157-512.png" />
      </ProfileImgContainer>
    </React.Fragment>
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

export default Profile