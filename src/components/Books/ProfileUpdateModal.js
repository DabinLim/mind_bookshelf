import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Upload } from "../../shared/sharedindex";
import { useSelector, useDispatch } from "react-redux";
import { api as userActions } from "../../redux/modules/user";
import Loader from "react-loader-spinner";
import axios from "axios";
import WithdrawalModal from "./WithdrawalModal"
import {setPreview} from '../../redux/modules/user'
import CasinoIcon from '@material-ui/icons/Casino';

axios.defaults.baseURL = "http://lkj99.shop";

const ProfileUpdateModal = (props) => {
  const dispatch = useDispatch();
  const user_info = useSelector((state) => state.user.user);
  const [nickname, setNickname] = useState(
    user_info.nickname ? user_info.nickname : ""
  );
  const [introduce, setIntroduce] = useState(
    user_info.introduce ? user_info.introduce : "자신에 대해서 적어주세요."
  );
  const [loading, setLoading] = useState(false);
  const [withdrawal, setWidthdrawal] = useState(false);
  const [image, setImage] = useState(false);
  const [_friendship, setFriendship]  = useState(user_info.topic.friendship);
  const [_relationship, setRelationship] = useState(user_info.topic.relationship);
  const [_love, setLove] = useState(user_info.topic.love);
  const [_worth, setWorth] = useState(user_info.topic.worth);
  const [_myself, setMyself] = useState(user_info.topic.myself);
  const [_dream, setDream] = useState(user_info.topic.dream);
  
  useEffect(()=> {
    dispatch(setPreview(user_info.profileImg))
  },[])

  const getNicknameAX = async () => {
    const result = await axios.get(`/myPage/profile/random-nickname`);
    setNickname(result.data.nickname);
    setLoading(false);
  };

  const changeNickname = (e) => {
    if(e.target.value.length > 10){
      return
    }
    setNickname(e.target.value);
  };

  const changeIntroduce = (e) => {
    if(e.target.value.length > 50){
      return
    }
    setIntroduce(e.target.value);
  };

  const numberChecked = () => {
    const checkedType = [_friendship, _relationship, _love, _worth, _myself, _dream]
    if(Object.values(checkedType).filter(x => x==true).length == 3){
      console.log(2)
      return
    } 
    return true
  }

  const checkedRelationship = () => {
    if(!_relationship){
      setRelationship(true)
      if(!numberChecked()){
        console.log(3)
        window.alert('어허')
        setRelationship(false)
      }
    } else{
      setRelationship(false)
    }
  }

  const checkedFriendship = () => {
    if(!_friendship){
      setFriendship(true)
      if(!numberChecked()){
        window.alert('어허')
        setFriendship(false)
      }
    } else{
      setFriendship(false)
    }
  }

  const checkedLove = () => {
    if(!_love){
      setLove(true)
      if(!numberChecked()){
        window.alert('어허')
        setLove(false)
      }
    } else{
      setLove(false)
    }
  }

  const checkedDream = () => {
    if(!_dream){
      setDream(true)
      if(!numberChecked()){
        window.alert('어허')
        setDream(false)
      }
    } else{
      setDream(false)
    }
  }

  const checkedWorth = () => {
    if(!_worth){
      setWorth(true)
      if(!numberChecked()){
        window.alert('어허')
        setWorth(false)
      }
    } else{
      setWorth(false)
    }
  }

  const checkedMyself = () => {
    if(!_myself){
      setMyself(true)
      if(!numberChecked()){
        window.alert('어허')
        setMyself(false)
      }
    } else{
      setMyself(false)
    }
  }

  const editProfile = () => {
    if(!/^[a-zA-Z0-9ㄱ-ㅎ가-힣\_]{2,10}$/g.test(nickname)){
      window.alert('닉네임이 적절하지 않습니다.')
      return
    }

    let topic = {
      relationship: _relationship,
      love: _love,
      dream : _dream,
      friendship: _friendship,
      worth: _worth,
      myself: _myself,
    }

    let profile = {
      nickname: nickname,
      introduce: introduce,
      profileImg: image,
      topic: topic,
    }
    dispatch(userActions.UpdateProfileAX(profile))
    props.close()
  }

  return (
    <React.Fragment>
      {withdrawal? 
      <WithdrawalModal setWidthdrawal={setWidthdrawal}/>
      :null}
      <Background onClick={props.close} />
      <UpdateBox>
        <ImageUpdate>
          <Upload setImage={setImage} />
          <ImageIcon src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-camera-512.png" />
        </ImageUpdate>
        <Nickname>{user_info.nickname}<span style={{fontWeight:"400"}}>님</span></Nickname>
        <RemoveProfileBtn
          onClick={() => {
            dispatch(setPreview("https://blog.kakaocdn.net/dn/cyOIpg/btqx7JTDRTq/1fs7MnKMK7nSbrM9QTIbE1/img.jpg"))
            setImage("https://blog.kakaocdn.net/dn/cyOIpg/btqx7JTDRTq/1fs7MnKMK7nSbrM9QTIbE1/img.jpg")
          }}
        >
          프로필 이미지 삭제
        </RemoveProfileBtn>

        <InputBox>
          <InputContainer style={{marginBottom: '20px'}} >
              <InputUpper>
                <InputLabel for="nickname" >닉네임</InputLabel>
                <RandomBox onClick={() => {
                    setLoading(true);
                    getNicknameAX();
                  }}>
                  {loading ? (
                    <InputRandom style={{marginBottom: '13px'}}>
                      <Loader  type="Oval" color="#3d66ba" height={20} width={20} />
                    </InputRandom>
                  ) : (
                    <InputRandom> 
                    <CasinoIcon style={{margin:"0 5px 0 0", fontSize: "16px"}} /> 
                    </InputRandom>
                  )}
                  <InputRandom>랜덤 돌리기</InputRandom> 
                </RandomBox>
              </InputUpper>
              <div style={{position: "relative"}} >
                <Input id="nickname"  value={nickname} onChange={changeNickname}/>
                <CountNickname>{nickname.length}/10</CountNickname>
              </div>
          </InputContainer>
          <InputContainer>
            <InputLabel for="introduce" >소개</InputLabel>
            <div style={{position: "relative"}}>
              <Input2 id="introduce" placeholder={introduce} onChange={changeIntroduce} /> 
              <CountIntroduce>{introduce.length}/50</CountIntroduce>
            </div>
          </InputContainer>
        </InputBox>

        <TypeContainer>
          <div style={{marginBottom: '13px'}}>
          {_friendship?
            <CheckedLabel onClick={checkedFriendship} style={{background:"#B9FFC4" , boxShadow: '0px 0px 15px #C5FDCE'}} >#우정</CheckedLabel>
            :
            <CheckedLabel style={{background:"#F4F4F4"}} onClick={checkedFriendship} >#우정</CheckedLabel>
          }
          {_love? 
            <CheckedLabel onClick={checkedLove} style={{background:"#FFAAAA" , boxShadow: '0px 0px 15px #FDB9B9'}} >#사랑</CheckedLabel>
            :
            <CheckedLabel onClick={checkedLove} style={{background:"#F4F4F4"}} >#사랑</CheckedLabel>
          }
          {_dream? 
            <CheckedLabel onClick={checkedDream} style={{background:"#B7E6FF" , boxShadow: '0px 0px 15px #C4EAFE'}} >#꿈</CheckedLabel>
            :
            <CheckedLabel onClick={checkedDream} style={{background:"#F4F4F4"}} >#꿈</CheckedLabel>
          }
          </div>
          <div>
          {_worth? 
            <CheckedLabel onClick={checkedWorth} style={{background:"#B5BDFF" , boxShadow: '0px 0px 15px #C1C7FC'}} >#가치</CheckedLabel>
            :
            <CheckedLabel onClick={checkedWorth} style={{background:"#F4F4F4"}} >#가치</CheckedLabel>
          }
          {_relationship? 
            <CheckedLabel onClick={checkedRelationship} style={{background:"#FFF09D", boxShadow: '0px 0px 15px #FEF2AF'}}>#관계</CheckedLabel>
            :
            <CheckedLabel onClick={checkedRelationship} style={{background:"#F4F4F4"}} >#관계</CheckedLabel>
            
          }
          {_myself? 
            <CheckedLabel onClick={checkedMyself} style={{background:"#F9D1FD", boxShadow: '0px 0px 15px #F9D9FC' }} >#나</CheckedLabel>
            :
            <CheckedLabel onClick={checkedMyself} style={{background:"#F4F4F4"}} >#나</CheckedLabel>
          }
          </div>
        </TypeContainer>
        <BottomContainer>
          <Withdrawal onClick={() => {setWidthdrawal(true)}} >회원탈퇴</Withdrawal>
          <UpdateButton onClick={editProfile} >저장</UpdateButton>
        </BottomContainer>
      </UpdateBox>
    </React.Fragment>
  );
};

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  opacity: 0.4;
  height: 100vh;
  width: 100vw;
  background-color: black;
  z-index: 20;
`;

const UpdateBox = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 400px;
  transform: translate(-50%, -50%);
  background-color: #fafafa;
  z-index: 30;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.12), 0 2px 5px rgba(0, 0, 0, 0.24);
`;

const ImageUpdate = styled.div`
  position: relative;
  margin: 50px 0 20px 0;
`;

const ImageIcon = styled.img`
  width: 35px;
  height: 35px;
  position: absolute;
  top: 110px;
  right: 12px;
  border-radius: 30px;
  background: white;
  padding: 5px;
  cursor: pointer;
  box-shadow: 0px 0px 6px #00000029;
`;

const Nickname = styled.div`
  font-size: 20px;
  font-weight: 600;
`

const RemoveProfileBtn = styled.div`
  margin-top: 8px;
  margin-bottom: 20px;
  font-size: 14px;
  cursor: pointer;
  opacity: 0.4;
  &:hover {
    opacity: 1;
    font-weight: 600;
  };
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top: 0.3px solid #E0E0E0;
  border-bottom: 0.3px solid #E0E0E0;
  padding: 20px 0 ;
  box-sizing: border-box;
  width: 100%;
`

const InputContainer = styled.div`
  display: flex;
  position: relative;
  border: none;
  flex-direction: column;
`;

const InputLabel = styled.label`
  font-weight: 600;
  font-size: 17px;
  margin-bottom: 3px;
`
const CountNickname = styled.div`
  position: absolute;
  top:8px;
  right:12px;
  opacity: 0.6;
`

const CountIntroduce = styled.div`
  position: absolute;
  top: 35px;
  right:12px;
  opacity: 0.6;
`

const Input = styled.input`
  position: relative;
  display: block;
  outline: none;
  border: none;
  background: #F2F2F2 0% 0% no-repeat padding-box;
  border-radius: 10px;
  opacity: 0.8;
  padding: 10px 22px;
  font-size: 14px;
  width: 350px;
  border: none;
  box-sizing: border-box;
`;

const Input2 = styled.textarea`
  display: block;
  outline: none;
  border: none;
  background: #F2F2F2 0% 0% no-repeat padding-box;
  border-radius: 10px;
  opacity: 0.8;
  padding: 10px 22px;
  font-size: 14px;
  width: 350px;
  border: none;
  box-sizing: border-box;
`

const InputUpper = styled.div`
  display: flex;
  justify-content: space-between;
`

const InputRandom = styled.div`
  cursor: pointer;
  display: inline-block;
`;

const RandomBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #A8A8A8;
  &:hover{
    color: black;
    font-weight: 600;
  }
`


const Withdrawal = styled.div`
  position: absolute;
  top: 5px;
  left: 40px;
  font-weight: 600;
  cursor: pointer;
  opacity: 0.1;
  &:hover{
    opacity: 1;
  }
`

const TypeContainer = styled.div`
  width: 100%;
  margin: auto;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom: 0.3px solid #E0E0E0;
`
const CheckedLabel = styled.div`
  display: inline-block;
  margin-right: 14px;
  margin-left: 14px;
  cursor: pointer;
  width: 72px;
  padding: 6px 0;
  text-align: center;
  border-radius: 20px;
`
const UpdateButton = styled.div`
  font-size: 15px;
  cursor: pointer;
  text-align: center;
  border: 1px solid #707070;
  border-radius: 45px;
  padding: 5px 0;
  width: 73px;
  margin: auto;
  &:hover{
    border:1px solid #303685;
    background: #303685;
    color: white;
    font-weight: 600;
  }
`
const BottomContainer = styled.div`
  width: 100%;
  position: relative;
  margin: 20px 0;
`
export default ProfileUpdateModal;
