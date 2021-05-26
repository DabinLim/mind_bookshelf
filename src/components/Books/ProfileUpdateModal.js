import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Upload } from "../../shared/sharedindex";
import { useSelector, useDispatch } from "react-redux";
import { api as userActions } from "../../redux/modules/user";
import Loader from "react-loader-spinner";
import axios from "axios";
import WithdrawalModal from "./WithdrawalModal";
import { setPreview } from "../../redux/modules/user";
import CasinoIcon from "@material-ui/icons/Casino";
import swal from "sweetalert";
import { first } from "lodash";

axios.defaults.baseURL = "http://lkj99.shop";

const ProfileUpdateModal = (props) => {
  const dispatch = useDispatch();
  const user_info = useSelector((state) => state.user.user);
  const [nickname, setNickname] = useState( user_info.first? "":
    user_info.nickname
  );
  const [introduce, setIntroduce] = useState(
    user_info.introduce
  );
  const [loading, setLoading] = useState(false);
  const [withdrawal, setWidthdrawal] = useState(false);
  const [image, setImage] = useState(false);
  const [_friendship, setFriendship] = useState(user_info.topic.friendship);
  const [_relationship, setRelationship] = useState(
    user_info.topic.relationship
  );
  const [_love, setLove] = useState(user_info.topic.love);
  const [_worth, setWorth] = useState(user_info.topic.worth);
  const [_myself, setMyself] = useState(user_info.topic.myself);
  const [_dream, setDream] = useState(user_info.topic.dream);

  useEffect(() => {
    dispatch(setPreview(user_info.profileImg));
  }, []);

  const getNicknameAX = async () => {
    const result = await axios.get(`/myPage/profile/random-nickname`);
    setNickname(result.data.nickname);
    setLoading(false);
  };

  const changeNickname = (e) => {
    if (e.target.value.length > 10) {
      return;
    }
    setNickname(e.target.value);
  };

  const changeIntroduce = (e) => {
    if (e.target.value.length > 50) {
      return;
    }
    setIntroduce(e.target.value);
  };

  const numberChecked = () => {
    const checkedType = [
      _friendship,
      _relationship,
      _love,
      _worth,
      _myself,
      _dream,
    ];
    if (Object.values(checkedType).filter((x) => x == true).length == 3) {
      return;
    }
    return true;
  };

  const checkedSwal = () => {
    swal({
      title: "더이상 주제를 추가할 수 없습니다.",
      text: `주제는 3개까지 선택 가능합니다.`,
      icon: "error",
    });
  };

  const checkedRelationship = () => {
    if (!_relationship) {
      setRelationship(true);
      if (!numberChecked()) {
        checkedSwal();
        setRelationship(false);
      }
    } else {
      setRelationship(false);
    }
  };

  const checkedFriendship = () => {
    if (!_friendship) {
      setFriendship(true);
      if (!numberChecked()) {
        checkedSwal();
        setFriendship(false);
      }
    } else {
      setFriendship(false);
    }
  };

  const checkedLove = () => {
    if (!_love) {
      setLove(true);
      if (!numberChecked()) {
        checkedSwal();
        setLove(false);
      }
    } else {
      setLove(false);
    }
  };

  const checkedDream = () => {
    if (!_dream) {
      setDream(true);
      if (!numberChecked()) {
        checkedSwal();
        setDream(false);
      }
    } else {
      setDream(false);
    }
  };

  const checkedWorth = () => {
    if (!_worth) {
      setWorth(true);
      if (!numberChecked()) {
        checkedSwal();
        setWorth(false);
      }
    } else {
      setWorth(false);
    }
  };

  const checkedMyself = () => {
    if (!_myself) {
      setMyself(true);
      if (!numberChecked()) {
        checkedSwal();
        setMyself(false);
      }
    } else {
      setMyself(false);
    }
  };

  const addProfile = () => {
    if (!/^[a-zA-Z0-9ㄱ-ㅎ가-힣\_]{2,10}$/g.test(nickname)) {
      swal({
        title: "닉네임이 적절하지 않습니다.",
        text: `2~10글자, 특수문자는 '_'만 사용가능합니다.`,
        icon: "error",
      });
      return;
    }

    let topic = {
      relationship: _relationship,
      love: _love,
      dream: _dream,
      friendship: _friendship,
      worth: _worth,
      myself: _myself,
    };

    let profile = {
      nickname: nickname,
      introduce: introduce,
      profileImg: image,
      topic: topic,
    };
    dispatch(userActions.UpdateProfileAX(profile));
  }

  const editProfile = () => {
    if (!/^[a-zA-Z0-9ㄱ-ㅎ가-힣\_]{2,10}$/g.test(nickname)) {
      swal({
        title: "닉네임이 적절하지 않습니다.",
        text: `2~10글자, 특수문자는 '_'만 사용가능합니다.`,
        icon: "error",
      });
      return;
    }

    let topic = {
      relationship: _relationship,
      love: _love,
      dream: _dream,
      friendship: _friendship,
      worth: _worth,
      myself: _myself,
    };

    let profile = {
      nickname: nickname,
      introduce: introduce,
      profileImg: image,
      topic: topic,
    };
    dispatch(userActions.UpdateProfileAX(profile));
    props.close();
  };

  return (
    <React.Fragment>
      {withdrawal ? <WithdrawalModal nickname={user_info.nickname} setWidthdrawal={setWidthdrawal} /> : null}
      {user_info.first? 
      <Background /> 
      :
      <Background onClick={props.close} />
      }
      <UpdateBox>
        <ProfileUpdateHeader>
          {user_info.first? 
          <ProfileCancelButton style={{color:"#FFFFFF", cursor:"context-menu"}} >취소</ProfileCancelButton>
          :
          <ProfileCancelButton onClick={props.close} >취소</ProfileCancelButton>
          }
          {user_info.first? 
          <ProfileHeaderText>프로필 설정</ProfileHeaderText>
          :
          <ProfileHeaderText>프로필 편집</ProfileHeaderText>
          }
          {user_info.first? 
          <ProfileHeaderButton onClick={addProfile} >가입</ProfileHeaderButton>
          :
          <ProfileHeaderButton onClick={editProfile} >완료</ProfileHeaderButton>
          }
        </ProfileUpdateHeader>
        <ImageUpdate>
          <Upload setImage={setImage} />
        </ImageUpdate>
        {user_info.first?
          null: 
          <Nickname>
            {user_info.nickname}
          </Nickname>
        }
        <RemoveProfileBtn
          onClick={() => {
            dispatch(
              setPreview(
                "https://blog.kakaocdn.net/dn/cyOIpg/btqx7JTDRTq/1fs7MnKMK7nSbrM9QTIbE1/img.jpg"
              )
            );
            setImage(
              "https://blog.kakaocdn.net/dn/cyOIpg/btqx7JTDRTq/1fs7MnKMK7nSbrM9QTIbE1/img.jpg"
            );
          }}
        >
          프로필 이미지 삭제
        </RemoveProfileBtn>

        <InputBox>
          <InputContainer style={{ marginBottom: "20px" }}>
            <InputUpper>
              <InputLabel for="nickname">닉네임</InputLabel>
              {/* <RandomBox
                onClick={() => {
                  setLoading(true);
                  getNicknameAX();
                }}
              >
                {loading ? (
                  <InputRandom style={{ marginBottom: "13px" }}>
                    <Loader
                      type="Oval"
                      color="#3d66ba"
                      height={15}
                      width={15}
                    />
                  </InputRandom>
                ) : (
                  <InputRandom>
                    <CasinoIcon
                      style={{ width: "15px", height: "15px" }}
                    />
                  </InputRandom>
                )}
                <InputRandomText>랜덤 돌리기</InputRandomText>
              </RandomBox> */}
            </InputUpper>
            {user_info.first?
              <div style={{ position: "relative" }}>
                <Input id="nickname" onChange={changeNickname} />
                <CountNickname>{nickname.length}/10</CountNickname>
              </div>
            :
              <div style={{ position: "relative" }}>
                <Input id="nickname" value={nickname} onChange={changeNickname} />
                <CountNickname>{nickname.length}/10</CountNickname>
              </div>
            }
          </InputContainer>
          <InputContainer>
            <InputLabel for="introduce">소개</InputLabel>
            <div style={{ position: "relative" }}>
              <Input2
                id="introduce"
                onChange={changeIntroduce}
                value={introduce}
              />
              <CountIntroduce>{introduce.length}/50</CountIntroduce>
            </div>
          </InputContainer>
        </InputBox>
        <TypeBox>
          <TypeLabel>선호태그</TypeLabel>
          <TypeContainer>
            <div style={{ marginBottom: "13px" }}>
              {_friendship ? (
                <CheckedLabel
                  onClick={checkedFriendship}
                  style={{
                    background: "#F4F4F4", 
                    color: "#E0692D",
                    border: "2px solid #E0692D",
                    marginRight:"13px",
                  }}
                >
                  #우정
                </CheckedLabel>
              ) : (
                <CheckedLabel
                  style={{ 
                    background: "#F4F4F4", 
                    marginRight:"13px" }}
                  onClick={checkedFriendship}
                >
                  #우정
                </CheckedLabel>
              )}
              {_love ? (
                <CheckedLabel
                  onClick={checkedLove}
                  style={{
                    background: "#F4F4F4", 
                    color: "#D34242",
                    border: "2px solid #D34242",
                    marginRight:"13px",
                  }}
                >
                  #사랑
                </CheckedLabel>
              ) : (
                <CheckedLabel
                  onClick={checkedLove}
                  style={{ background: "#F4F4F4", marginRight:"13px" }}
                >
                  #사랑
                </CheckedLabel>
              )}
              {_dream ? (
                <CheckedLabel
                  onClick={checkedDream}
                  style={{
                    background: "#F4F4F4", 
                    color: "#E6BA28",
                    border: "2px solid #E6BA28",
                  }}
                >
                  #꿈
                </CheckedLabel>
              ) : (
                <CheckedLabel
                  onClick={checkedDream}
                  style={{ background: "#F4F4F4" }}
                >
                  #꿈
                </CheckedLabel>
              )}
            </div>
            <div>
              {_worth ? (
                <CheckedLabel
                  onClick={checkedWorth}
                  style={{
                    background: "#F4F4F4", 
                    color: "#7249B4",
                    border: "2px solid #7249B4",
                    marginRight:"13px"
                  }}
                >
                  #가치
                </CheckedLabel>
              ) : (
                <CheckedLabel
                  onClick={checkedWorth}
                  style={{ background: "#F4F4F4",marginRight:"13px" }}
                >
                  #가치
                </CheckedLabel>
              )}
              {_relationship ? (
                <CheckedLabel
                  onClick={checkedRelationship}
                  style={{
                    background: "#F4F4F4", 
                    color: "#2761CC",
                    border: "2px solid #2761CC",
                    marginRight:"13px"
                  }}
                >
                  #관계
                </CheckedLabel>
              ) : (
                <CheckedLabel
                  onClick={checkedRelationship}
                  style={{ background: "#F4F4F4", marginRight:"13px" }}
                >
                  #관계
                </CheckedLabel>
              )}
              {_myself ? (
                <CheckedLabel
                  onClick={checkedMyself}
                  style={{
                    background: "#F4F4F4", 
                    color: "#458857",
                    border: "2px solid #458857",
                  }}
                >
                  #나
                </CheckedLabel>
              ) : (
                <CheckedLabel
                  onClick={checkedMyself}
                  style={{ background: "#F4F4F4" }}
                >
                  #나
                </CheckedLabel>
              )}
            </div>
          </TypeContainer>
        </TypeBox>
        {user_info.first? null
        :
        <BottomContainer>
          <Withdrawal
            onClick={() => {
              setWidthdrawal(true);
            }}
          >
            회원탈퇴
          </Withdrawal>
        </BottomContainer>
        }
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
  z-index: 80;
`;

const UpdateBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 400px;
  hight: auto;
  margin: 20px 0 ;
  transform: translate(-50%, -50%);
  background-color: #FFFFFF;
  z-index: 100;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  cursor: context-menu;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.12), 0 2px 5px rgba(0, 0, 0, 0.24);
  @media (max-width: 420px) {
    width: 100%;
    top: 50px;
    left: 0px;
    transform: translate(0%, 0%);
    margin: 0;
  } ;
`;

const ProfileUpdateHeader = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 61px;
    border-bottom: 0.3px solid #e0e0e0;
    padding: 0 24px;
`

const ProfileHeaderButton = styled.div`
  font: normal normal medium 14px/16px Noto Sans CJK KR;
  cursor: pointer;
  &:hover {
    color: black;
    font-weight: 600;
  }
`

const ProfileCancelButton = styled.div`
color: #A8A8A8;
font: normal normal medium 14px/16px Noto Sans CJK KR;
cursor: pointer;
&:hover {
  color: black;
  font-weight: 600;
}

`

const ProfileHeaderText = styled.div`
  font: normal normal bold 14px/20px Noto Sans CJK KR;
`

const ImageUpdate = styled.div`
  position: relative;
  margin: 27px 0 17px 0;
  @media (max-width: 500px) {
    margin: 27px 0 17px 0;
  } ;
`;

const Nickname = styled.div`
  font: normal normal bold 15px/20px Noto Sans CJK KR;  
  font-weight: 600;
  @media (max-width: 500px) {
    font: normal normal bold 14px/20px Noto Sans CJK KR;
  } ;
`;

const RemoveProfileBtn = styled.div`
  margin-top: 8px;
  margin-bottom: 20px;
  font: normal normal normal 12px/18px Noto Sans CJK KR;
  cursor: pointer;
  color: #A8A8A8;
  &:hover {
    color: #000000;
  }
  @media (max-width: 500px) {
    font: normal normal normal 12px/18px Noto Sans CJK KR;
    margin-bottom: 27px;
  } ;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top: 0.3px solid #e0e0e0;
  border-bottom: 0.3px solid #e0e0e0;
  padding: 20px 0;
  box-sizing: border-box;
  width: 100%;
`;

const InputContainer = styled.div`
  display: flex;
  position: relative;
  border: none;
  flex-direction: column;
`;

const InputLabel = styled.label`
  font-weight: 600;
  font-size: 17px;
  margin-bottom: 10px;
  @media (max-width: 500px) {
    font: normal normal bold 13px/19px Noto Sans CJK KR;
  } ;
`;
const CountNickname = styled.div`
  position: absolute;
  top: 8px;
  right: 12px;
  opacity: 0.6;
  @media (max-width: 500px) {
    font: normal normal normal 12px/18px Noto Sans CJK KR;
  } ;
  
`;

const CountIntroduce = styled.div`
  position: absolute;
  bottom: 10px;
  right: 12px;
  opacity: 0.6;
  @media (max-width: 500px) {
    font: normal normal normal 12px/18px Noto Sans CJK KR;
  } ;
`;

const Input = styled.input`
  position: relative;
  display: block;
  outline: none;
  background: #F5F5F5 0% 0% no-repeat padding-box;
  border-radius: 10px;
  height: 42px;
  padding: 0px 15px;
  font: normal normal normal 13px/19px Noto Sans CJK KR;
  width: 350px;
  border: none;
  box-sizing: border-box;
  border-radius: 15px;
  @media (max-width: 500px) {
    width: 327px;
    height: 42px;
    padding: 0px 15px;
  } ;
`;

const Input2 = styled.textarea`
  display: block;
  outline: none;
  border: none;
  background: #F5F5F5 0% 0% no-repeat padding-box;
  border-radius: 10px;
  opacity: 0.8;
  height: 110px;
  padding: 11px 15px;
  font: normal normal normal 13px/19px Noto Sans CJK KR;
  color: #939393;
  width: 350px;
  border: none;
  border-radius: 15px;
  box-sizing: border-box;
  resize: none;
  @media (max-width: 500px) {
    width: 327px;
  } ;
`;

const InputUpper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const InputRandom = styled.div`
  position: absolute;
  cursor: pointer;
  display: inline-block;
  top: -3px;
  left: -17px;
`;

const InputRandomText = styled.div`
  font: normal normal normal 12px/14px Roboto;
  cursor: pointer;
`

const RandomBox = styled.div`
  position: relative;
  color: #a8a8a8;
  &:hover {
    color: black;
    font-weight: 600;
  }
`;

const Withdrawal = styled.div`
  font: normal normal medium 14px/20px Noto Sans CJK KR;
  cursor: pointer;
  color: #A8A8A8;
  &:hover {
    color: black;
    font-weight: 600;
  }
`;

const TypeBox = styled.div` 
  display: flex;
  border-bottom: 0.3px solid #e0e0e0;
  width: 100%;
  justify-content: space-between;
  padding: 20px 24px;
`

const TypeLabel = styled.div`
  font: normal normal bold 13px/19px Noto Sans CJK KR;
`

const TypeContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const CheckedLabel = styled.div`
  display: inline-block;
  cursor: pointer;
  width: 72px;
  padding: 6px 0;
  text-align: center;
  border-radius: 20px;
  box-sizing: border-box;
`;

const BottomContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 63px;
`;
export default ProfileUpdateModal;
