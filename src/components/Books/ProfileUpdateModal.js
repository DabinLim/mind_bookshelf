import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Upload } from "../../shared/sharedindex";
import { useSelector, useDispatch } from "react-redux";
import { api as userActions } from "../../redux/modules/user";
import Loader from "react-loader-spinner";
import axios from "axios";
import WithdrawalModal from "./WithdrawalModal"
import {setPreview} from '../../redux/modules/user'

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
  const checkedType = {...user_info.topic}
  
  useEffect(()=> {
    dispatch(setPreview(user_info.profileImg))
  },[])

  const getNicknameAX = async () => {
    const result = await axios.get(`/myPage/profile/random-nickname`);
    setNickname(result.data.nickname);
    setLoading(false);
  };

  const changeNickname = (e) => {
    setNickname(e.target.value);
  };

  const changeIntroduce = (e) => {
    setIntroduce(e.target.value);
  };

  const numberChecked = () => {
    let check = Object.values(checkedType)
    let count = 0;
    for(let i = 0; i < check.length; i++){
      if(check[i] === true){
        count ++
        if(count == 4){
          return
        }
      }
    }
    return true
  }

  const checkedTopic = (e) => {
    if(e.target.checked){
      checkedType[e.target.id] = true;
      console.log(checkedType)
      if(!numberChecked()){
        window.alert('어허')
        e.target.checked = false;
        checkedType[e.target.id] = false;
      }
    } else{
      checkedType[e.target.id] = false;
      console.log(checkedType)
    }
  }

  const editProfile = () => {
    let profile = {
      nickname: nickname,
      introduce: introduce,
      profileImg: image,
      topic: checkedType,
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
            {loading ? (
              <InputRandom>
                <Loader type="Oval" color="#3d66ba" height={20} width={20} />
              </InputRandom>
            ) : (
              <InputRandom
                onClick={() => {
                  setLoading(true);
                  getNicknameAX();
                }}
              >
                랜덤
              </InputRandom>
            )}
            <Input  value={nickname} onChange={changeNickname} />
          </InputContainer>
          <InputContainer>
            <Input placeholder={introduce} onChange={changeIntroduce} /> 
          </InputContainer>
        </InputBox>

        <TypeContainer>
          <div>
          <div style={{marginBottom: "20px"}}>
          {user_info.topic.friendship? 
            <>
            <CheckedBox type="checkbox" defaultChecked onChange={checkedTopic} name="action" id="friendship" value="우정"  /><CheckedLabel for="friendship" style={{background:"#B9FFC4"}} >#우정</CheckedLabel>
            </>
            :
            <>
            <CheckedBox type="checkbox" onChange={checkedTopic} name="action" id="friendship" value="우정"  /><CheckedLabel for="friendship" style={{background:"#B9FFC4"}} >#우정</CheckedLabel>
            </>
          }
          {user_info.topic.love? 
            <>
            <CheckedBox type="checkbox" defaultChecked onChange={checkedTopic} name="action" id="love" value="사랑" /><CheckedLabel for="love" style={{background:"#FFAAAA"}} >#사랑</CheckedLabel>
            </>
            :
            <>
            <CheckedBox type="checkbox" onChange={checkedTopic} name="action" id="love" value="사랑" /><CheckedLabel for="love" style={{background:"#FFAAAA"}} >#사랑</CheckedLabel>
            </>
          }
          {user_info.topic.dream? 
            <>
            <CheckedBox type="checkbox" defaultChecked onChange={checkedTopic} name="action" id="dream" value="꿈" /><CheckedLabel for="dream" style={{background:"#B7E6FF"}} >#꿈</CheckedLabel>
            </>
            :
            <>
            <CheckedBox type="checkbox" onChange={checkedTopic} name="action" id="dream" value="꿈" /><CheckedLabel for="dream" style={{background:"#B7E6FF"}} >#꿈</CheckedLabel>
            </>
          }
          </div>
          <div>
          {user_info.topic.worth? 
            <>
            <CheckedBox type="checkbox" defaultChecked onChange={checkedTopic} name="action" id="worth" value="가치" /><CheckedLabel for="worth" style={{background:"#B5BDFF"}} >#가치</CheckedLabel>
            </>
            :
            <>
            <CheckedBox type="checkbox" onChange={checkedTopic} name="action" id="worth" value="가치" /><CheckedLabel for="worth" style={{background:"#B5BDFF"}} >#가치</CheckedLabel>
            </>
          }
          {user_info.topic.relationship? 
            <>
            <CheckedBox type="checkbox" defaultChecked onChange={checkedTopic} name="action" id="relationship" value="관계" /><CheckedLabel for="relationship" style={{background:"#FFF09D"}}>#관계</CheckedLabel>
            </>
            :
            <>
            <CheckedBox type="checkbox" onChange={checkedTopic} name="action" id="relationship" value="관계" /><CheckedLabel for="relationship" style={{background:"#FFF09D"}} >#관계</CheckedLabel>
            </>
          }
          {user_info.topic.myself? 
            <>
            <CheckedBox type="checkbox" defaultChecked onChange={checkedTopic} name="action" id="myself" value="나" /><CheckedLabel for="myself" style={{background:"#F9D1FD"}} >#나</CheckedLabel>
            </>
            :
            <>
            <CheckedBox type="checkbox" onChange={checkedTopic} name="action" id="myself" value="나" /><CheckedLabel for="myself" style={{background:"#F9D1FD"}} >#나</CheckedLabel>
            </>
          }
          </div>
          </div>
        </TypeContainer>
          
        <UpdateButton onClick={editProfile} >수정하기</UpdateButton>
        <Withdrawal onClick={() => {setWidthdrawal(true)}} >회원탈퇴</Withdrawal>
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
  };
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top: 0.5px solid #A8A8A8;
  border-bottom: 0.5px solid #A8A8A8;
  padding: 20px 0 ;
  box-sizing: border-box;
  width: 100%;
`

const InputContainer = styled.div`
  display: flex;
  position: relative;
  border: none;
`;

const Input = styled.input`
  display: block;
  outline: none;
  border: none;
  background: #F2F2F2 0% 0% no-repeat padding-box;
  border-radius: 10px;
  opacity: 0.8;
  padding: 5px;
  font-size: 20px;
  width: 350px;
  border: none;
  box-sizing: border-box;
`;

const InputRandom = styled.div`
  position: absolute;
  cursor: pointer;
  right: 140px;
  top: 10px;
  z-index: 5;
`;

const Withdrawal = styled.div`
  margin-bottom: 30px;
  font-weight: 600;
  cursor: pointer;
  opacity: 0.1;
  &:hover{
    opacity: 1;
  }
`

const TypeContainer = styled.div`
  margin: auto;
  margin-top: 20px;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  width: 350px;
`

const CheckedBox = styled.input`
  display: inline-block;
  width: 17px;
  height: 17px;
  vertical-align: middle;
`
const CheckedLabel = styled.label`
  margin-right: 20px;
  margin-left: 8px;
  cursor: pointer;
  padding: 5px 15px;
  border-radius: 20px;
  box-shadow: 0px 0px 15px #00000029;
`
const UpdateButton = styled.div`
  font-size: 18px;
  cursor: pointer;
`
export default ProfileUpdateModal;
