import React, { useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { FollowerModal } from "./booksindex";
import {
  setComponent,
  setPageOwner,
  api as booksActions,
} from "../../redux/modules/books";
import {
  api as userActions,
  userLoading as loading,
} from "../../redux/modules/user";
import Loader from "react-loader-spinner";
import { Container } from "@material-ui/core";
import {history} from '../../redux/configStore';

const Profile = (props) => {
  const dispatch = useDispatch();
  const [followerModal, setFollowerModal] = useState(false);
  const follower_list = useSelector((state) => state.user.follower);
  const following_list = useSelector((state) => state.user.following);
  const user_info = useSelector((state) => state.user.user);
  const is_other = props.id ? true : false;
  const other_info = useSelector((state) => state.user.other);
  const myfriend_list = useSelector((state) => state.user.friends);
  const otherfriend_list = useSelector((state) => state.user.otherFriends);
  const idx = myfriend_list.findIndex((f) => f.id === props.id);
  const followed = idx !== -1 ? true : false;
  const is_login = useSelector((state) => state.user.is_login);
  const userLoading = useSelector((state) => state.user.is_userLoading);
  const url = window.location.href.split('/');
  const id = url[url.length -1];
  const container = React.useRef();



  const closeFollowerModal = () => {
    setFollowerModal(false);
  };

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
              <Background/>
              <ProfileImgContainer>
                <ProfileImg src={other_info.profileImg} />
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
                          setFollowerModal(true);
                        }}
                      >
                        팔로잉<CountText>{otherfriend_list.length}</CountText>
                      </Myfollowers>
                      <Line />
                      <Myfollowers
                        onClick={() => {
                          setFollowerModal(true);
                        }}
                      >
                        팔로워<CountText>{otherfriend_list.length}</CountText>
                      </Myfollowers>
                    </HeadBody>
                    {is_login && other_info.nickname !== "알 수 없는 유저" ? (
                      followed ? (
                        <FollowerBtn
                          onClick={() => {
                            props.setUnfollowModal(true)
                          }}
                        >
                          팔로우취소
                        </FollowerBtn>
                      ) : (
                        <FollowerBtn
                          onClick={() => {
                            dispatch(
                              userActions.followOtherAX(
                                props.id,
                                other_info.nickname,
                                other_info.profileImg
                              )
                            );
                          }}
                        >
                          팔로우하기
                        </FollowerBtn>
                      )
                    ) : null}
                  </HeadBox>
                  {other_info.topic?.friendship === false &&
                  other_info.topic?.love === false &&
                  other_info.topic?.dream === false &&
                  other_info.topic?.relationship === false &&
                  other_info.topic?.myself === false &&
                  other_info.topic?.worth === false ? (
                    <SubjectContainer>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <Tagtext
                          style={{
                            fontSize: "14px",
                            marginRight: "17px",
                            fontWeight: "800",
                          }}
                        >
                          선택하신 선호 태그가 없습니다.
                        </Tagtext>
                      </div>
                    </SubjectContainer>
                  ) : (
                    <SubjectContainer>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <Tagtext
                          style={{
                            fontSize: "14px",
                            marginRight: "17px",
                            fontWeight: "800",
                          }}
                        >
                          선호 태그
                        </Tagtext>
                      </div>
                      <TagContainer>
                        {other_info.topic.friendship ? (
                          <Subject1
                            style={{
                              color: "#E0692D",
                              border: "2px solid #E0692D",
                            }}
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
                          >
                            <span>#나</span>
                          </Subject1>
                        ) : null}
                      </TagContainer>
                    </SubjectContainer>
                  )}
                </Head>
                <Body>
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
                      setFollowerModal(true);
                    }}
                  >
                    팔로잉<CountText>{otherfriend_list.length}</CountText>
                  </Myfollowers>
                  <Line />
                  <Myfollowers
                    onClick={() => {
                      setFollowerModal(true);
                    }}
                  >
                    팔로워<CountText>{otherfriend_list.length}</CountText>
                  </Myfollowers>
                </Body>
                <Bottom>
                  <Introduce>{other_info.introduce}</Introduce>
                </Bottom>
                {is_login && other_info.nickname !== "알 수 없는 유저" ? (
                  followed ? (
                    <UnFollowBtnMobile
                      onClick={() => {
                        props.setUnfollowModal(true)
                      }}
                    >
                      팔로잉
                    </UnFollowBtnMobile>
                  ) : (
                    <FollowBtnMobile
                      onClick={() => {
                        dispatch(
                          userActions.followOtherAX(
                            props.id,
                            other_info.nickname,
                            other_info.profileImg
                          )
                        );
                      }}
                    >
                      팔로우
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
            />
          ) : null}
          {!is_login ? (
            <SpinnerContainer>
              <Loader type="Oval" color="#3d66ba" height={50} width={50} />
            </SpinnerContainer>
          ) : (
            <>
              <Background/>
              <ProfileImgContainer
                onClick={() => {
                  props.setUpdateModal(true);
                }}
              >
                <ProfileImg
                  style={{ cursor: "pointer" }}
                  src={user_info.profileImg}
                />
                <SettingIcon src="https://cdn3.iconfinder.com/data/icons/google-material-design-icons/48/ic_settings_48px-512.png" />
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
                        <CountText>{user_info.myAnswerCount}</CountText>
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
                        <CountText>{user_info.myCustomQuestionCount}</CountText>
                      </MyQuestionBtn>
                      <Line />
                      <Myfollowers
                        onClick={() => {
                          setFollowerModal(true);
                        }}
                      >
                        팔로잉
                        <CountText>{myfriend_list.length}</CountText>
                      </Myfollowers>
                      <Line />
                      <Myfollowers
                        onClick={() => {
                          setFollowerModal(true);
                        }}
                      >
                        팔로워
                        <CountText>{myfriend_list.length}</CountText>
                      </Myfollowers>
                    </HeadBody>
                    </HeadBox>
                  {}
                  {user_info.topic?.friendship === false &&
                  user_info.topic?.love === false &&
                  user_info.topic?.dream === false &&
                  user_info.topic?.relationship === false &&
                  user_info.topic?.myself === false &&
                  user_info.topic?.worth === false ? (
                    <SubjectContainer>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <Tagtext
                          style={{
                            fontSize: "14px",
                            marginRight: "17px",
                            fontWeight: "800",
                          }}
                        >
                          선택하신 선호 태그가 없습니다.
                        </Tagtext>
                      </div>
                    </SubjectContainer>
                  ) : (
                    <SubjectContainer>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <Tagtext
                          style={{
                            fontSize: "14px",
                            marginRight: "17px",
                            fontWeight: "800",
                          }}
                        >
                          선호 태그
                        </Tagtext>
                      </div>
                      <TagContainer>
                        {user_info.topic.friendship ? (
                          <Subject1
                            style={{
                              color: "#E0692D",
                              border: "2px solid #E0692D",
                            }}
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
                          >
                            <span>#나</span>
                          </Subject1>
                        ) : null}
                      </TagContainer>
                    </SubjectContainer>
                  )}
                </Head>
                <Body>
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
                    <CountText>{user_info.myAnswerCount}</CountText>
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
                    <CountText>{user_info.myCustomQuestionCount}</CountText>
                  </MyQuestionBtn>
                  <Line />
                  <Myfollowers
                    onClick={() => {
                      setFollowerModal(true);
                    }}
                  >
                    팔로잉
                    <CountText>{myfriend_list.length}</CountText>
                  </Myfollowers>
                  <Line />
                  <Myfollowers
                    onClick={() => {
                      setFollowerModal(true);
                    }}
                  >
                    팔로워
                    <CountText>{myfriend_list.length}</CountText>
                  </Myfollowers>
                </Body>
                <Bottom>
                  <Introduce>{user_info.introduce}</Introduce>
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
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  top: 0;
  left: 0;
  opacity: 0.5;
  box-shadow: 0px 0px 6px #ffffff;
  border-radius: 20px;
  @media (max-width: 750px) {
    opacity: 0.9;
    box-shadow: 0px 0px 20px #aea1e590;
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
  }
`;

const ProfileImgContainer = styled.div`
  position: relative;
  width: 126px;
  height: 100%;
  @media (max-width: 750px) {
    width: 68px;
    height: 68px;
  }
`;

const ProfileImg = styled.img`
  width: 126px;
  height: 126px;
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
  margin: 0px 0px 0px 45px;
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

const Body = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  @media (max-width: 750px) {
    display: none;
  }
`;

const Line = styled.div`
  margin: 1px 10px 0px 10px;
  height: 9px;
  border: 0.5px solid #707070;
  @media (min-width: 750px) {
    display: none;
  }
`;

const Bottom = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-top: 20px;
  font-family: Noto Sans CJK KR, sans-serif;
  @media (max-width: 750px) {
    margin-top: 0px;
    margin-bottom: 20px;
    justify-content: center;
    font-size: 12px/18px;
  }
`;

const Nickname = styled.div`
  font-weight: 600;
  font-size: 22px;
  @media (max-width: 750px) {
    text-align: center;
    font: normal normal bold 17px/25px Noto Sans CJK KR;
  }
`;

const CountText = styled.span`
  font-weight: 600;
  margin-left: 5px;
  @media (max-width: 750px) {
    font: normal normal bold 14px/20px Noto Sans CJK KR;
  }
`;

const Introduce = styled.div`
  margin-top: 20px;
  font-size: 14px;
  text-align:center;
  @media (max-width: 750px) {
    font: normal normal normal 12px/18px Noto Sans CJK KR;
    margin-top: 5px;
  }
`;

const Answers = styled.div`
  cursor: pointer;
  margin-top: 11px;
  margin-right: 20px;
  font-weight: 400;
  font-size: 14px;
  @media (max-width: 750px) {
    display: flex;
    align-items: center;
    margin-top: 0px;
    margin-right: 0px;
    font: normal normal medium 11px/17px Noto Sans CJK KR;
  }
`;

const FollowerBtn = styled.div`
  margin-left: 20px;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
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
  margin-top: 11px;
  margin-right: 20px;
  cursor: pointer;
  font-weight: 400;
  font-size: 14px;
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
  @media (max-width: 750px) {
    display: flex;
    margin-top: 13px;
  };
`

const Subject1 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 72px;
  height: 31px;
  opacity: 0.8;
  margin-left: 5px;
  margin-right: 5px;
  border-radius: 45px;
  font-size: 14px;
  font-weight: 600;
  @media (max-width: 750px) {
    width: 58px;
    height: 25px;
    font: normal normal bold 11px/17px Noto Sans CJK KR;
  };
`;

const Myfollowers = styled.div`
  margin-top: 11px;
  margin-right: 20px;
  font-size: 14px;
  cursor: pointer;
  font-weight: 400;
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
