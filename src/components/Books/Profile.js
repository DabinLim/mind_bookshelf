import React, { useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { FollowerModal, FollowingModal } from "./booksindex";
import {
  setComponent,
  setPageOwner,
} from "../../redux/modules/books";
import {
  api as userActions,
  userLoading as loading,
} from "../../redux/modules/user";
import Loader from "react-loader-spinner";
import {history} from '../../redux/configStore';

const Profile = (props) => {
  const dispatch = useDispatch();
  const [followerModal, setFollowerModal] = useState(false);
  const [followingModal, setFollowingModal] = useState(false);
  const follower_list = useSelector((state) => state.user.follower);
  const following_list = useSelector((state) => state.user.following);
  const user_info = useSelector((state) => state.user.user);
  const is_other = props.id ? true : false;
  const other_info = useSelector((state) => state.user.other);
  const myfriend_list = useSelector((state) => state.user.friends);
  const idx = myfriend_list.findIndex((f) => f.id === props.id);
  const is_login = useSelector((state) => state.user.is_login);
  const userLoading = useSelector((state) => state.user.is_userLoading);
  const url = window.location.href.split('/');
  const id = url[url.length -1];
  const container = React.useRef();
  const [profileImg, setProfileImg] = useState()

  const ImgeError = () => {
    setProfileImg('https://blog.kakaocdn.net/dn/cyOIpg/btqx7JTDRTq/1fs7MnKMK7nSbrM9QTIbE1/img.jpg')
  }

  const closeFollowerModal = () => {
    setFollowerModal(false);
  };

  const closeFollowingModal = () => {
    setFollowingModal(false)
  }

  React.useEffect(() => {
    dispatch(setPageOwner(props.id));
    return () => {
      dispatch(loading(true));
    };
  }, []);

  return (
    <>
      {is_other ? (
        <React.Fragment>
          {userLoading ? (
            <SpinnerContainer>
              <Loader type="Oval" color="#3d66ba" height={50} width={50} />
            </SpinnerContainer>
          ) : (
            <>
              {followerModal ? (
                <FollowerModal
                  close={closeFollowerModal}
                  follower_list = {follower_list}
                  container={container}
                  userId={props.id}
                />
              ) : null}
              {followingModal ? (
                <FollowingModal
                  close={closeFollowingModal}
                  following_list = {following_list}
                  container={container}
                  userId={props.id}
                />
              ) : null}
              <Background/>
              <MobileProfileImgContainer>
                <ProfileImg onError={ImgeError}  src={profileImg? profileImg :other_info.profileImg} />
              </MobileProfileImgContainer>
              <ProfileImgContainer>
                <ProfileImg onError={ImgeError} src={profileImg? profileImg :other_info.profileImg} />
              </ProfileImgContainer>
              <ProfileDetail>
                <Head>
                  <HeadBox>
                    <Nickname>{other_info.nickname}</Nickname>
                    <HeadBody>
                      <Answers
                        onClick={() => {
                          if(window.innerWidth <= 750){
                            history.push(`/othersanswers/${id}`);
                            return
                          };
                          dispatch(setComponent("othersanswers"));
                        }}
                      >
                        낙서
                        <CountText>{other_info.otherAnswerCount}</CountText>
                      </Answers>
                      <Line />
                      <MyQuestionBtn
                        onClick={() => {
                          if(window.innerWidth <= 750){
                            history.push(`/othersquestion/${id}`);
                            return
                          };
                          dispatch(setComponent("othersquestion"));
                        }}
                      >
                        질문
                        <CountText>{other_info.otherCustomQuestionCount}</CountText>
                      </MyQuestionBtn>
                      <Line />
                      <Myfollowers
                        onClick={() => {
                          setFollowingModal(true);
                        }}
                      >
                        팔로잉<CountText>{other_info.followingCount}</CountText>
                      </Myfollowers>
                      <Line />
                      <Myfollowers
                        onClick={() => {
                          setFollowerModal(true);
                        }}
                      >
                        팔로워<CountText>{other_info.followerCount}</CountText>
                      </Myfollowers>
                    </HeadBody>
                    <SubjectContainer>
                      <TagContainer>
                        {other_info.topic.friendship ? (
                          <Subject1
                            style={{
                              color: "#E0692D",
                              border: "2px solid #E0692D",
                            }}
                            onClick={() => {history.push(`/topic/우정`)}}
                          >
                            <span>#우정</span>
                          </Subject1>
                        ) : null}
                        {other_info.topic.love ? (
                          <Subject1
                            style={{
                              color: "#D34242",
                              border: "2px solid #D34242",
                            }}
                            onClick={() => {history.push(`/topic/사랑`)}}
                          >
                            <span>#사랑</span>
                          </Subject1>
                        ) : null}
                        {other_info.topic.dream ? (
                          <Subject1
                            style={{
                              color: "#E6BA28",
                              border: "2px solid #E6BA28",
                            }}
                            onClick={() => {history.push(`/topic/꿈`)}}
                          >
                            <span>#꿈</span>
                          </Subject1>
                        ) : null}
                        {other_info.topic.worth ? (
                          <Subject1
                            style={{
                              color: "#7249B4",
                              border: "2px solid #7249B4",
                            }}
                            onClick={() => {history.push(`/topic/가치`)}}
                          >
                            <span>#가치</span>
                          </Subject1>
                        ) : null}
                        {other_info.topic.relationship ? (
                          <Subject1
                            style={{
                              color: "#2761CC",
                              border: "2px solid #2761CC",
                            }}
                            onClick={() => {history.push(`/topic/관계`)}}
                          >
                            <span>#관계</span>
                          </Subject1>
                        ) : null}
                        {other_info.topic.myself ? (
                          <Subject1
                            style={{
                              color: "#458857",
                              border: "2px solid #458857",
                            }}
                            onClick={() => {history.push(`/topic/나`)}}
                          >
                            <span>#나</span>
                          </Subject1>
                        ) : null}
                      </TagContainer>
                    </SubjectContainer>
                  </HeadBox>
                  {is_login && other_info.nickname !== "알 수 없는 유저" ? (
                      other_info.isFollowing ? (
                        <FollowerBtn 
                          style={{backgroundColor:"#E8E8E8", color:"#121212" }}
                          onClick={() => {
                            props.setUnfollowModal(true)
                          }}
                        >
                          팔로우
                          <CheckIcon src="https://user-images.githubusercontent.com/77369674/119218304-a95e3780-bb1a-11eb-977e-c981a9b52504.png"/>
                        </FollowerBtn>
                      ) : (
                        <FollowerBtn
                          onClick={() => {
                            dispatch(
                              userActions.followOtherAX(
                                props.id, "other"
                              )
                            );
                          }}
                        >
                          팔로우
                        </FollowerBtn>
                      )
                    ) : null}
                </Head>
                <Body>
                  <Myfollowers
                    onClick={() => {
                      setFollowingModal(true);
                    }}
                  >
                    팔로잉<CountText>{other_info.followingCount}</CountText>
                  </Myfollowers>
                  <Line />
                  <Myfollowers
                    onClick={() => {
                      setFollowerModal(true);
                    }}
                  >
                    팔로워<CountText>{other_info.followerCount}</CountText>
                  </Myfollowers>
                </Body>
                <Bottom>
                  <Introduce>{other_info.introduce}</Introduce>
                  <BottomRight>
                    <Answers
                      onClick={() => {
                        if(window.innerWidth <= 750){
                          history.push(`/otheranswers/${id}`);
                          return
                        };
                        dispatch(setComponent("othersanswers"));
                      }}
                    >
                      낙서
                      <CountText2>{other_info.otherAnswerCount}</CountText2>
                    </Answers>
                    <MyQuestionBtn
                      onClick={() => {
                        if(window.innerWidth <= 750){
                          history.push(`/othersquestion/${id}`);
                          return
                        };
                        dispatch(setComponent("othersquestion"));
                      }}
                    >
                      질문
                      <CountText2>{other_info.otherCustomQuestionCount}</CountText2>
                    </MyQuestionBtn>
                  </BottomRight>
                </Bottom>
                {is_login && other_info.nickname !== "알 수 없는 유저" ? (
                  other_info.isFollowing ? (
                    <UnFollowBtnMobile
                      onClick={() => {
                        props.setUnfollowModal(true)
                      }}
                    >
                      팔로우 취소
                    </UnFollowBtnMobile>
                  ) : (
                    <FollowBtnMobile
                      onClick={() => {
                        dispatch(
                          userActions.followOtherAX(
                            props.id, "other"
                          )
                        );
                      }}
                    >
                      팔로우 하기
                    </FollowBtnMobile>
                  )
                ) : null}
              </ProfileDetail>
            </>
          )}
        </React.Fragment>
      ) : (
        <React.Fragment>
          {followerModal ? (
            <FollowerModal 
              close={closeFollowerModal}
              follower_list = {follower_list}
              container={container}
              userId={user_info.id}
            />
          ) : null}
          {followingModal ? (
            <FollowingModal 
              close={closeFollowingModal}
              following_list = {following_list}
              container={container}
              userId={user_info.id}
            />
          ) : null}
          {!is_login ? (
            <SpinnerContainer>
              <Loader type="Oval" color="#3d66ba" height={50} width={50} />
            </SpinnerContainer>
          ) : (
            <>
              <Background/>
              <MobileProfileImgContainer
                onClick={() => {
                  props.setUpdateModal(true);
                }}
              >
                <ProfileImg
                  onError={ImgeError}
                  src={profileImg? profileImg :user_info.profileImg}
                />
                <SettingIcon src="https://cdn3.iconfinder.com/data/icons/google-material-design-icons/48/ic_settings_48px-512.png" />
              </MobileProfileImgContainer>
              <ProfileImgContainer>
                <ProfileImg src={profileImg? profileImg :user_info.profileImg} onError={ImgeError}/>
              </ProfileImgContainer>
              <ProfileDetail>
                <Head>
                  <HeadBox>
                    <Nickname>{user_info.nickname}</Nickname>
                    <HeadBody>
                      <Answers
                        onClick={() => {
                          if(window.innerWidth <= 750){
                            history.push(`/myanswers`);
                            return
                          };
                          dispatch(setComponent("myanswers"));
                        }}
                      >
                        낙서
                        <CountText>{other_info.otherAnswerCount}</CountText>
                      </Answers>
                      <Line />
                      <MyQuestionBtn
                        onClick={() => {
                          if(window.innerWidth <= 750){
                            history.push(`/myquestion`);
                            return
                          };
                          dispatch(setComponent("myquestion"));
                        }}
                      >
                        질문
                        <CountText>{other_info.otherCustomQuestionCount}</CountText>
                      </MyQuestionBtn>
                      <Line />
                      <Myfollowers
                        onClick={() => {
                          setFollowingModal(true);
                        }}
                      >
                        팔로잉
                        <CountText>{other_info.followingCount}</CountText>
                      </Myfollowers>
                      <Line />
                      <Myfollowers
                        onClick={() => {
                          setFollowerModal(true);
                        }}
                      >
                        팔로워
                        <CountText>{other_info.followerCount}</CountText>
                      </Myfollowers>
                    </HeadBody>
                    <SubjectContainer>
                      <TagContainer>
                        {user_info.topic.friendship ? (
                          <Subject1
                            style={{
                              color: "#E0692D",
                              border: "2px solid #E0692D",
                            }}
                            onClick={() => {history.push(`/topic/우정`)}}
                          >
                            <span>#우정</span>
                          </Subject1>
                        ) : null}
                        {user_info.topic.love ? (
                          <Subject1
                            style={{
                              color: "#D34242",
                              border: "2px solid #D34242",
                            }}
                            onClick={() => {history.push(`/topic/사랑`)}}
                          >
                            <span>#사랑</span>
                          </Subject1>
                        ) : null}
                        {user_info.topic.dream ? (
                          <Subject1
                            style={{
                              color: "#E6BA28",
                              border: "2px solid #E6BA28",
                            }}
                            onClick={() => {history.push(`/topic/꿈`)}}
                          >
                            <span>#꿈</span>
                          </Subject1>
                        ) : null}
                        {user_info.topic.worth ? (
                          <Subject1
                            style={{
                              color: "#7249B4",
                              border: "2px solid #7249B4",
                            }}
                            onClick={() => {history.push(`/topic/가치`)}}
                          >
                            <span>#가치</span>
                          </Subject1>
                        ) : null}
                        {user_info.topic.relationship ? (
                          <Subject1
                            style={{
                              color: "#2761CC",
                              border: "2px solid #2761CC",
                            }}
                            onClick={() => {history.push(`/topic/관계`)}}
                          >
                            <span>#관계</span>
                          </Subject1>
                        ) : null}
                        {user_info.topic.myself ? (
                          <Subject1
                            style={{
                              color: "#458857",
                              border: "2px solid #458857",
                            }}
                            onClick={() => {history.push(`/topic/나`)}}
                          >
                            <span>#나</span>
                          </Subject1>
                        ) : null}
                      </TagContainer>
                    </SubjectContainer>
                    </HeadBox>
                    <ProfileUpdateBtn 
                      onClick={() => {
                      props.setUpdateModal(true);
                    }}>
                      <SettingImg src="https://user-images.githubusercontent.com/67696504/119390859-96a95580-bd08-11eb-9aba-110a41fe53f9.png" />
                      <ProfileUpdateText>프로필 편집</ProfileUpdateText>
                    </ProfileUpdateBtn>
                </Head>
                <Body>
                  
                  <Myfollowers
                    onClick={() => {
                      setFollowingModal(true);
                    }}
                  >
                    팔로잉
                    <CountText>{other_info.followingCount}</CountText>
                  </Myfollowers>
                  <Line />
                  <Myfollowers
                    onClick={() => {
                      setFollowerModal(true);
                    }}
                  >
                    팔로워
                    <CountText>{other_info.followerCount}</CountText>
                  </Myfollowers>
                </Body>
                <Bottom>
                  <Introduce>{user_info.introduce}</Introduce>
                  <BottomRight >
                    <Answers
                      onClick={() => {
                        if(window.innerWidth <= 750){
                          history.push(`/myanswers`);
                          return
                        };
                        dispatch(setComponent("myanswers"));
                      }}
                    >
                      낙서
                      <CountText2>{other_info.otherAnswerCount}</CountText2>
                    </Answers>
                    <MyQuestionBtn
                      onClick={() => {
                        if(window.innerWidth <= 750){
                          history.push(`/myquestion`);
                          return
                        };
                        dispatch(setComponent("myquestion"));
                      }}
                    >
                      질문
                      <CountText2>{other_info.otherCustomQuestionCount}</CountText2>
                    </MyQuestionBtn>
                  </BottomRight>
                </Bottom>
              </ProfileDetail>
            </>
          )}
        </React.Fragment>
      )}
    </>
  );
};

const Background = styled.div`
  position: absolute;
  display: none;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  top: 0;
  left: 0;
  opacity: 0.5;
  box-shadow: 0px 0px 6px #ffffff;
  border-radius: 20px;
  @media (max-width: 750px){
    display: block;
    opacity: 0.9;
    box-shadow: 0px 0px 20px #aea1e590;
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
  }
`;

const MobileProfileImgContainer = styled.div`
position: relative;
width: 68px;
height: 68px;
@media (min-width: 750px) {
  display: none;
}
`

const ProfileImgContainer = styled.div`
  position: relative;
  width: 126px;
  height: 100%;
  @media (max-width: 750px) {
    display: none;
  }
`;

const ProfileImg = styled.img`
  width: 112px;
  height: 112px;
  border-radius: 50%;
  object-fit: cover;
  @media (max-width: 750px) {
    width: 70px;
    height: 70px;
  }
`;

const SettingIcon = styled.img`
  width: 30px;
  height: 30px;
  position: absolute;
  top: 7px;
  right: 10px;
  border-radius: 30px;
  background: #cbcbcb;
  padding: 3px;
  cursor: pointer;
  box-shadow: 0px 0px 6px #00000029;
  @media (max-width: 750px) {
    top: 0px;
    right: 0px;
    width: 20px;
    height: 20px;
  }
`;

const ProfileDetail = styled.div`
  z-index: 1;
  margin: 0px 0px 0px 34px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 750px) {
    margin: 0px;
  }
`;

const Head = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  @media (max-width: 750px) {
    flex-direction : column;
    margin-top: 13px;
    margin-bottom: 13px;
    align-items: center;
  }
`;

const HeadBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  @media (max-width: 750px) {
    flex-direction: column;
    align-items: center;
  }
`

const HeadBody = styled.div`
  display: none;
  @media (max-width: 750px) {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 20px;
    box-sizing: border-box;
    flex-direction: row;
    align-items: center;
    margin-top: 10px;
  }
`


const ProfileUpdateBtn = styled.div`
cursor: pointer;
display: flex;
justify-content: center;
align-items: center;
height: 36px;
width: 150px;
border: 1px solid #848484;
border-radius: 5px;
@media (max-width: 750px) {
  display: none;
}
`

const ProfileUpdateText = styled.div`
  margin-left: 8px;
  font: normal normal normal 13px/19px Noto Sans CJK KR;
  color: #121212;
`

const SettingImg = styled.img`
  width: 16px;
  height: 16px;

`

const Body = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  margin-top: 18px;
  @media (max-width: 750px) {
    display: none;
  }
`;

const Line = styled.div`
  margin: 1px 10px 0px 10px;
  height: 9px;
  border: 0.5px solid #707070;
  @media (min-width: 750px) {
    margin: 0px 11px;
  }
`;

const Bottom = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-top: 15px;
  font-family: Noto Sans CJK KR, sans-serif;
  @media (max-width: 750px) {
    margin-top: 0px;
    margin-bottom: 20px;
    justify-content: center;
    font-size: 12px/18px;
  }
`;

const Nickname = styled.div`
  font: normal normal bold 20px/29px Noto Sans CJK KR;
  @media (max-width: 750px) {
    text-align: center;
    font: normal normal bold 17px/25px Noto Sans CJK KR;
  }
`;

const CountText = styled.span`
  font: normal normal bold 14px/20px Noto Sans CJK KR;
  margin-left: 5px;
  @media (max-width: 750px) {
    font: normal normal bold 14px/20px Noto Sans CJK KR;
  }
`;

const CountText2 = styled.div`
  display: inline-block;
  font: normal normal 100 27px/39px Noto Sans CJK KR;
  margin-left: 7px;
  line-height: 28px;
  height: 29px;
`

const CheckIcon = styled.img`
  width: 10px;
  height:7px;
  margin-left:6px;
`

const BottomRight = styled.div`
display: flex;
@media (max-width: 750px) {
  display: none;
}
`

const Introduce = styled.div`
font: normal normal normal 12px/17px Noto Sans CJK KR;
  text-align:center;
  @media (max-width: 750px) {
    font: normal normal normal 12px/18px Noto Sans CJK KR;
    margin-top: 5px;
  }
`;

const Answers = styled.div`
  display: flex;
  cursor: pointer;
  margin-right: 29px;
  font: normal normal medium 14px/20px Noto Sans KR;
  @media (max-width: 750px) {
    display: flex;
    align-items: center;
    margin-top: 0px;
    margin-right: 0px;
    font: normal normal medium 11px/17px Noto Sans CJK KR;
  }
`;

const FollowerBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 180px;
  height: 40px;
  border-radius: 20px;
  cursor: pointer;
  background: #473674 0% 0% no-repeat padding-box;
  font: normal normal normal 13px/19px Noto Sans CJK KR;
  color: #FFFFFF;
  @media (max-width: 750px) {
    display: none;
  }
`;

const FollowBtnMobile = styled.button`
  width: 100%;
  height: 36px;
  border-style: none;
  border-radius: 45px;
  background-color: #efe7ff;
  font-size: 13px/19px;
  font-family: Noto Sans CJK KR, sans-serif;
  cursor: pointer;
  @media (min-width: 750px) {
    display: none;
  }
`;

const UnFollowBtnMobile = styled.button`
  width: 100%;
  height: 36px;
  border-style: none;
  border-radius: 45px;
  background-color: #f0f0f0;
  font: normal normal normal 13px/19px Noto Sans CJK KR;
  cursor: pointer;
  @media (min-width: 750px) {
    display: none;
  }
`;

const MyQuestionBtn = styled.div`
  display: flex;
  cursor: pointer;
  font: normal normal medium 14px/20px Noto Sans CJK KR;
  @media (max-width: 750px) {
    display: flex;
    align-items: center;
    margin-top: 0px;
    margin-right: 0px;
    font: normal normal medium 11px/17px Noto Sans CJK KR;
  };
`;

const SubjectContainer = styled.div`
  display: flex;
  flex-direction: row;
  @media (max-width: 750px) {
  };
`;

const Tagtext = styled.span`
  @media (max-width: 750px) {
    display: none;
  };
`

const TagContainer = styled.span`
  display: flex;
  margin-left: 8px;
  @media (max-width: 750px) {
    display: flex;
    margin-top: 13px;
    margin-left: 0px;
  };
`

const Subject1 = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 58px;
  height: 25px;
  opacity: 0.8;
  margin-left: 4px;
  margin-right: 4px;
  border-radius: 45px;
  font: normal normal bold 11px/16px Noto Sans CJK KR;
  @media (max-width: 750px) {
    width: 58px;
    height: 25px;
    font: normal normal bold 11px/17px Noto Sans CJK KR;
  };
`;

const Myfollowers = styled.div`
  font: normal normal medium 12px/17px Noto Sans CJK KR;
  cursor: pointer;
  @media (max-width: 750px) {
    display: flex;
    align-items: center;
    margin-top: 0px;
    margin-right: 0px;
    font: normal normal medium 11px/17px Noto Sans CJK KR;
  }
`;

const SpinnerContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Profile;
