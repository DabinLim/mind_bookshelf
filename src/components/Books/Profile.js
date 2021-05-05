import React, {useState} from 'react'
import styled from 'styled-components'
import {useSelector, useDispatch} from 'react-redux'
import {FollowModal, ProfileUpdateModal} from './booksindex'
import {setComponent,setPageOwner, api as booksActions} from '../../redux/modules/books'
import {api as userActions, userLoading as loading} from '../../redux/modules/user'
import Loader from "react-loader-spinner";
import { Container } from '@material-ui/core'

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

  console.log(user_info);
  console.log(other_info);

  const closeUpdateModal = () => {
    setUpdateModal(false)
  }

  const closeFollowModal = () => {
    setFollowModal(false)
  }

  React.useEffect(() => {
    // if(is_other){
    //   dispatch(booksActions.setOthersQuestCount())
    //   dispatch(booksActions.setQuestCount(props.id))
    // }
    dispatch(setPageOwner(props.id));
    return () => {
      dispatch(loading(true));
    }
  },[])
  
  return(
    <>
      {is_other? 

          <React.Fragment>
            {userLoading? 
            <SpinnerContainer>
              <Loader type="Oval" color="#3d66ba" height={50} width={50} />
            </SpinnerContainer>
            :
            <>
            {followModal? <FollowModal friend_list={otherfriend_list} close={closeFollowModal} /> : null}
            <Background/>
            <ProfileImgContainer onClick={() => {setUpdateModal(true)}} >
              <ProfileImg style={{cursor:"pointer"}} src={other_info.profileImg} />
              <SettingIcon src="https://cdn4.iconfinder.com/data/icons/forgen-phone-settings/48/setting-512.png" />
            </ProfileImgContainer>
            <ProfileDetail>
              <Head>
            <Nickname>{other_info.nickname}</Nickname>
            <SubjectContainer>
              <div style={{display:'flex',alignItems:'center'}}>
              <span style={{fontSize:'14px',marginRight:'17px',fontWeight:'800'}}>선호 태그</span>
              </div>
              <Subject1><span>#가치</span></Subject1>
              <Subject2><span>#꿈</span></Subject2>
              <Subject3><span>#나</span></Subject3>
            </SubjectContainer>
              </Head>
              <Body>
                <Answers>
                  낙서
                <span style={{fontSize:'16px', fontWeight:'600',marginLeft:'5px'}}>{other_info.otherAnswerCount}</span>
                </Answers>
            <MyQuestionBtn onClick={()=>{dispatch(setComponent('othersquestion'))}}>질문<span style={{fontSize:'16px', fontWeight:'600',marginLeft:'5px'}}>{other_info.otherCustomQuestionCount}</span></MyQuestionBtn>
            <Myfollowers onClick={() => {setFollowModal(true)}} >구독중<span style={{fontSize:'16px', fontWeight:'600',marginLeft:'5px'}}>{otherfriend_list.length}</span></Myfollowers>
            {is_login?
            followed? 
            <FollowerBtn onClick={() => {dispatch(userActions.unfollowOtherAX(props.id, other_info.nickname))}} >팔로우취소</FollowerBtn>
            : <FollowerBtn onClick={()=>{dispatch(userActions.followOtherAX(props.id, other_info.nickname, other_info.profileImg))}} >팔로우하기</FollowerBtn>
            :null}
              </Body>
            <Introduce>{other_info.introduce}</Introduce>
            </ProfileDetail>
            </>}
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
            <Background/>
            <ProfileImgContainer onClick={() => {setUpdateModal(true)}} >
              <ProfileImg style={{cursor:"pointer"}} src={user_info.profileImg} />
              <SettingIcon src="https://cdn4.iconfinder.com/data/icons/forgen-phone-settings/48/setting-512.png" />
            </ProfileImgContainer>
            <ProfileDetail>
              <Head>
            <Nickname>{user_info.nickname}</Nickname>
            <SubjectContainer>
              <div style={{display:'flex',alignItems:'center'}}>
              <span style={{fontSize:'14px',marginRight:'17px',fontWeight:'800'}}>선호 태그</span>
              </div>
              <Subject1><span>#가치</span></Subject1>
              <Subject2><span>#꿈</span></Subject2>
              <Subject3><span>#나</span></Subject3>
            </SubjectContainer>
              </Head>
              <Body>
                <Answers>
                  낙서
                  <span style={{fontSize:'16px', fontWeight:'600',marginLeft:'5px'}}>{user_info.myAnswerCount}</span>
                </Answers>
            <MyQuestionBtn onClick={()=>{dispatch(setComponent('myquestion'))}}>질문
            <span style={{fontSize:'16px', fontWeight:'600',marginLeft:'5px'}}>{user_info.myCustomQuestionCount}</span>
            </MyQuestionBtn>
            <Myfollowers onClick={() => {setFollowModal(true)}} >구독중<span style={{fontSize:'16px', fontWeight:'600',marginLeft:'5px'}}>{myfriend_list.length}</span></Myfollowers>
              </Body>
            <Introduce>{user_info.introduce}</Introduce>
            </ProfileDetail>

            </>
            }
          </React.Fragment>
        
      }
    </>

  )
  }


const Background = styled.div`
  z-index:-1;
  position:absolute;
  width:100%;
  height:100%;
  background-color: #ffffff;
  top:0;
  left:0;
  opacity:0.5;
  box-shadow: 0px 0px 6px #FFFFFF;
    border-radius: 20px;
`;

const ProfileImgContainer = styled.div`
  position: relative;
  width: 150px;
`

const ProfileImg = styled.img`
  width: 126px;
  height: 126px;
  border-radius: 50%;
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

const ProfileDetail = styled.div`
  margin:0px 0px 0px 45px;
  width:100%;
  display:flex;
  flex-direction:column;
`;

const Head = styled.div`
  display:flex;
  width:100%;
  flex-direction:row;
  justify-content:space-between;
`;

const Body = styled.div`
  display:flex;
  width:100%;
  flex-direction:row;
  align-items:center;
`;

const Nickname = styled.div`
  
  font-weight: 600;
  font-size: 22px;
  
`

const Introduce = styled.div`
  margin-top: 20px;
  font-size: 14px;
`

const Answers = styled.div`
margin-top:11px;
  margin-right:20px;
  font-weight: 400;
  font-size: 14px;
`;

const FollowerBtn = styled.div`
  margin-top:11px;
  margin-right:20px;
  cursor: pointer;
  font-weight: 600;
  font-size: 18px;
`
const MyQuestionBtn = styled.div`
margin-top:11px;
margin-right:20px;
  cursor: pointer;
  font-weight: 400;
  font-size: 14px;
`

const SubjectContainer = styled.div`
  display:flex;
  flex-direction:row;
`

const Subject1 = styled.div`
  display: flex;
  justify-content:center;
  align-items:center;
  width:72px;
  height:31px;
  background-color: #A2ACFF;
  box-shadow: 0px 0px 15px #B2B4FD;
  opacity:0.8;
  margin-left: 10px;
  border-radius: 45px;
  font-size:14px;
  font-weight: 600;
  
`

const Subject2 = styled.div`
  display: flex;
  justify-content:center;
  align-items:center;
  width:72px;
  height:31px;
  background-color: #96DBFF;
  box-shadow: 0px 0px 15px #A9DAFE;
  opacity: 0.8;
  margin-left: 10px;
  border-radius: 45px;
  font-size:14px;
  font-weight: 600;
  
`

const Subject3 = styled.div`
  display: flex;
  justify-content:center;
  align-items:center;
  width:72px;
  height:31px;
  background-color: #FFB5FC;
  box-shadow: 0px 0px 15px #FDBBFA;
  opacity: 0.8;
  margin-left: 10px;
  border-radius: 45px;
  font-size:14px;
  font-weight: 600;
  
`

const Myfollowers = styled.div`
margin-top:11px;
margin-right:20px;
  font-size: 14px;
  cursor: pointer;
  font-weight: 400;
`

const SpinnerContainer = styled.div`
  width:100%;
  height:100%;
  display:flex;
  justify-content:center;
  align-items:center;
`


export default Profile