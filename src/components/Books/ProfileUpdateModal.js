import React, { useState } from "react";
import styled from "styled-components";
import CreateIcon from "@material-ui/icons/Create";
import { Upload } from "../../shared/sharedindex";
import { useSelector, useDispatch } from "react-redux";
import { api as userActions } from "../../redux/modules/user";
import Loader from "react-loader-spinner";
import axios from "axios";
import { NavigateBeforeRounded } from "@material-ui/icons";

axios.defaults.baseURL = "http://lkj99.shop";

const ProfileUpdateModal = (props) => {
  const dispatch = useDispatch();
  const user_info = useSelector((state) => state.user.user);
  const [edit_introduce, editIntroduce] = useState(false);
  const [edit_nickname, editNickname] = useState(false);
  const [nickname, setNickname] = useState(
    user_info.nickname ? user_info.nickname : ""
  );
  const [introduce, setIntroduce] = useState(
    user_info.introduce ? user_info.introduce : "자신에 대해서 적어주세요."
  );
  const [loading, setLoading] = useState(false);
  const checkedType = {
    love:false, 
    relationship:false, 
    friendship:false,
    worth:false,
    dream:false,
    myself:false, 
  };

  console.log(Object.values(checkedType))

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

  const checkedLove = (e) => {
    if(e.target.checked){
      checkedType.love = true;
      console.log(checkedType)
      if(!numberChecked()){
        window.alert('어허')
        e.target.checked = false;
        checkedType.love = false;
      }
    } else{
      checkedType.love = false;
      console.log(checkedType)
    }
  }

  const checkedFriendShip = (e) => {
    if(e.target.checked){
      checkedType.friendship = true;
      console.log(checkedType)
      if(!numberChecked()){
        window.alert('어허')
        e.target.checked = false;
        checkedType.friendship = false;
      }
    } else{
      checkedType.friendship = false;
      console.log(checkedType)
    }
  }

  const checkedRelationship = (e) => {
    if(e.target.checked){
      checkedType.relationship = true;
      console.log(checkedType)
      if(!numberChecked()){
        window.alert('어허')
        e.target.checked = false;
        checkedType.relationship = false;
      }
    } else{
      checkedType.relationship = false;
      console.log(checkedType)
    }
  }

  const checkedWorth = (e) => {
    if(e.target.checked){
      checkedType.worth = true;
      console.log(checkedType)
      if(!numberChecked()){
        window.alert('어허')
        e.target.checked = false;
        checkedType.worth = false;
      }
    } else{
      checkedType.worth = false;
      console.log(checkedType)
    }
  }

  const checkedDream = (e) => {
    if(e.target.checked){
      checkedType.dream = true;
      console.log(checkedType)
      if(!numberChecked()){
        window.alert('어허')
        e.target.checked = false;
        checkedType.dream = false;
      }
    } else{
      checkedType.dream = false;
      console.log(checkedType)
    }
  }

  const checkedMyself = (e) => {
    if(e.target.checked){
      checkedType.myself = true;
      console.log(checkedType)
      if(!numberChecked()){
        window.alert('어허')
        e.target.checked = false;
        checkedType.myself = false;
      }
    } else{
      checkedType.myself = false;
      console.log(checkedType)
    }
  }

  return (
    <React.Fragment>
      <Background onClick={props.close} />
      <UpdateBox>
        <ImageUpdate>
          <Upload />
          <ImageIcon src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-camera-512.png" />
        </ImageUpdate>
        <RemoveProfileBtn
          onClick={() => {
            dispatch(userActions.DeleteProfileImgAX());
          }}
        >
          프로필이미지 삭제
        </RemoveProfileBtn>
        
        <div>
          {checkedType.relationship? 
            <>
            <input type="checkbox" defaultChecked onChange={checkedRelationship} name="action" id="relationship" value="관계" /><label for="relationship">관계 </label>
            </>
            :
            <>
            <input type="checkbox" onChange={checkedRelationship} name="action" id="relationship" value="관계" /><label for="relationship">관계 </label>
            </>
          }
          <input type="checkbox" onChange={checkedFriendShip} name="action" id="friendship" value="우정"  /><label for="friendship">우정</label>
          <input type="checkbox" onChange={checkedLove} name="action" id="love" value="사랑" /><label for="love">사랑 </label>
          <input type="checkbox" onChange={checkedWorth} name="action" id="worth" value="가치" /><label for="worth">가치 </label>
          <input type="checkbox" onChange={checkedDream} name="action" id="dream" value="꿈" /><label for="dream">꿈 </label>
          <input type="checkbox" onChange={checkedMyself} name="action" id="myself" value="나" /><label for="myself">나 </label>
        </div>

        {edit_nickname ? (
          <InputContainer>
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
            <Input value={nickname} onChange={changeNickname} />
            <InputButton
              onClick={() => {
                dispatch(userActions.UpdateNicknameAX(nickname));
                editNickname(false);
              }}
            >
              확인
            </InputButton>
            <InputButton
              onClick={() => {
                editNickname(false);
                setNickname(user_info.nickname);
              }}
            >
              취소
            </InputButton>
          </InputContainer>
        ) : (
          <InputContainer>
            <String>{user_info.nickname}</String>
            <StringButton
              onClick={() => {
                editNickname(true);
              }}
            >
              <CreateIcon />
            </StringButton>
          </InputContainer>
        )}
        {edit_introduce ? (
          <InputContainer>
            <Input placeholder={introduce} onChange={changeIntroduce} />
            <InputButton
              onClick={() => {
                dispatch(userActions.UpdateIntroduceAX(introduce));
                editIntroduce(false);
              }}
            >
              확인
            </InputButton>
            <InputButton
              onClick={() => {
                editIntroduce(false);
                setIntroduce(user_info.introduce);
              }}
            >
              취소
            </InputButton>
          </InputContainer>
        ) : (
          <InputContainer>
            <String>
              {user_info.introduce
                ? user_info.introduce
                : "자신에 대해서 적어주세요."}
            </String>
            <StringButton
              onClick={() => {
                editIntroduce(true);
              }}
            >
              <CreateIcon />
            </StringButton>
          </InputContainer>
        )}
        <Withdrawal onClick={() => {dispatch(userActions.withdrawalAX())}} >회원탈퇴</Withdrawal>
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
  width: 600px;
  transform: translate(-50%, -50%);
  background-color: #fafafa;
  z-index: 30;
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
  width: 25px;
  height: 25px;
  position: absolute;
  top: 110px;
  right: 12px;
  border-radius: 30px;
  background: silver;
  padding: 5px;
  cursor: pointer;
`;

const RemoveProfileBtn = styled.button`
  margin-bottom: 30px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
`;

const InputContainer = styled.div`
  margin-bottom: 30px;
  display: flex;
  position: relative;
`;

const Input = styled.input`
  display: block;
  outline: none;
  border: none;
  background-color: transparent;
  border-bottom: 1px solid black;
  padding: 5px;
  font-size: 20px;
  width: 350px;
  box-sizing: border-box;
`;

const InputRandom = styled.div`
  position: absolute;
  cursor: pointer;
  right: 140px;
  top: 10px;
  z-index: 5;
`;

const InputButton = styled.div`
  margin-left: 20px;
  font-size: 20px;
  font-weight: 600;
  cursor: pointer;
`;

const String = styled.div`
  font-size: 20px;
  width: 350px;
`;

const StringButton = styled.div`
  margin-left: 20px;
  cursor: pointer;
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

export default ProfileUpdateModal;
