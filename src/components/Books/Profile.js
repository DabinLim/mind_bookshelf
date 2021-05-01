import React, {useState} from 'react'
import styled from 'styled-components'
import {useSelector, useDispatch} from 'react-redux'
import {FollowModal, ProfileUpdateModal} from './booksindex'
import {setComponent} from '../../redux/modules/books'
import {api as userActions} from '../../redux/modules/user'
import Loader from "react-loader-spinner";

const Profile = (props) => {
  const dispatch = useDispatch()
  const [UpdateModal, setUpdateModal] = useState(false)
  const [followModal, setFollowModal] = useState(false)
  const user_info = useSelector((state) => state.user.user)
  const is_other = props.id? true : false;
  const other_info = useSelector((state) => state.user.other)
  const myfriend_list = useSelector((state) => state.user.friends)
  const otherfriend_list = useSelector((state) => state.user.otherFriends)
  const idx = myfriend_list.findIndex((f) => f.id === props.id)
  const followed = idx !== -1? true :false;
  const is_login  = useSelector((state)=> state.user.is_login)
  const userLoading = useSelector((state)=> state.user.is_userLoading)
  const friendLoading = useSelector((state) => state.user.is_friendLoading)

  const closeUpdateModal = () => {
    setUpdateModal(false)
  }

  const closeFollowModal = () => {
    setFollowModal(false)
  }

  React.useEffect(() => {
    dispatch(setPageOwner(props.id));
  },[])
  
  return(
    <>
      {is_other? 
          <React.Fragment>
            {followModal? <FollowModal friend_list={otherfriend_list} close={closeFollowModal} /> : null}
            <ProfileImg src={other_info.profileImg} style={{marginTop: "50px"}} />
            <Nickname>{other_info.nickname}</Nickname>
            <SubjectContainer>
              <Subject>#사랑</Subject>
              <Subject>#추억</Subject>
            </SubjectContainer>
            <Introduce>{other_info.introduce}</Introduce>
            <Myfollowers onClick={() => {setFollowModal(true)}} >팔로잉 {otherfriend_list.length}명</Myfollowers>
            {is_login?
            followed? 
            <FollowerBtn onClick={() => {dispatch(userActions.unfollowOtherAX(props.id, other_info.nickname))}} >팔로우취소</FollowerBtn>
            : <FollowerBtn onClick={()=>{dispatch(userActions.followOtherAX(props.id, other_info.nickname, other_info.profileImg))}} >팔로우하기</FollowerBtn>
            :null}
            <MyQuestionBtn onClick={()=>{
              dispatch(setComponent('othersquestion'))
          }}>{other_info.nickname}님의 질문</MyQuestionBtn>
          </React.Fragment>
        :
          <React.Fragment>
            {followModal? <FollowModal friend_list={myfriend_list} close={closeFollowModal} /> : null}
            {UpdateModal? 
              <ProfileUpdateModal close={closeUpdateModal} />
            :null}

          
            {friendLoading? 
            <SpinnerContainer>
              <Loader type="Oval" color="#3d66ba" height={50} width={50} />
            </SpinnerContainer>
            :
            <>
            <ProfileImgContainer onClick={() => {setUpdateModal(true)}} >
              <ProfileImg style={{cursor:"pointer"}} src={user_info.profileImg} />
              <SettingIcon src="https://cdn4.iconfinder.com/data/icons/forgen-phone-settings/48/setting-512.png" />
            </ProfileImgContainer>
            <Nickname>{user_info.nickname}</Nickname>
            <SubjectContainer>
              <Subject>#사랑</Subject>
              <Subject>#추억</Subject>
            </SubjectContainer>
            <Introduce>{user_info.introduce}</Introduce>
            <Myfollowers onClick={() => {setFollowModal(true)}} >팔로잉 {myfriend_list.length}명</Myfollowers>
            <MyQuestionBtn onClick={()=>{dispatch(setComponent('myquestion'))}}>나의질문</MyQuestionBtn>
            </>
            }
          </React.Fragment>
        
      }
    </>

  )
  }

const ProfileImgContainer = styled.div`
  position: relative;
  margin-top: 50px;
  width: 150px;
`

const ProfileImg = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 150px;
  object-fit: cover;
`

const SettingIcon = styled.img`
  width: 30px;
  height: 30px;
  position: absolute;
  top: 7px;
  right: 12px;
  border-radius: 30px;
  background: silver;
  padding: 3px;
  cursor: pointer;
`

const Nickname = styled.div`
  margin-top: 20px;
  font-weight: 600;
  font-size: 30px;
  
`

const Introduce = styled.div`
  margin-top: 20px;
  font-size: 16px;
`

const FollowerBtn = styled.div`
  margin-top: 30px;
  cursor: pointer;
  font-weight: 600;
  font-size: 18px;
`
const MyQuestionBtn = styled.div`
  margin-top: 30px;
  cursor: pointer;
  font-weight: 600;
  font-size: 18px;
`

const SubjectContainer = styled.div`
  margin-top: 20px;
`

const Subject = styled.div`
  display: inline-block;
  background-color: #E5E5E5;
  margin-right: 10px;
  padding: 5px 14px;
  border-radius: 18px;
  font-weight: 600;
`

const Myfollowers = styled.div`
  font-size: 18px;
  margin-top: 30px;
  cursor: pointer;
  font-weight: 600;
`

const SpinnerContainer = styled.div`
  text-align: center;




`


export default Profile