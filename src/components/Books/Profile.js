import React, { useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { FollowModal, ProfileUpdateModal } from "./booksindex";
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

const Profile = (props) => {
  const dispatch = useDispatch();
  const [UpdateModal, setUpdateModal] = useState(false);
  const [followModal, setFollowModal] = useState(false);
  const user_info = useSelector((state) => state.user.user);
  const is_other = props.id ? true : false;
  const other_info = useSelector((state) => state.user.other);
  const myfriend_list = useSelector((state) => state.user.friends);
  const otherfriend_list = useSelector((state) => state.user.otherFriends);
  const idx = myfriend_list.findIndex((f) => f.id === props.id);
  const followed = idx !== -1 ? true : false;
  const is_login = useSelector((state) => state.user.is_login);
  const userLoading = useSelector((state) => state.user.is_userLoading);
  const friendLoading = useSelector((state) => state.user.is_friendLoading);

  const closeUpdateModal = () => {
    setUpdateModal(false);
  };

  const closeFollowModal = () => {
    setFollowModal(false);
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
              {followModal ? (
                <FollowModal
                  friend_list={otherfriend_list}
                  close={closeFollowModal}
                />
              ) : null}
              <Background />
              <ProfileImgContainer
                onClick={() => {
                  setUpdateModal(true);
                }}
              >
                <ProfileImg src={other_info.profileImg} />
                {/* <SettingIcon src="https://cdn4.iconfinder.com/data/icons/forgen-phone-settings/48/setting-512.png" /> */}
              </ProfileImgContainer>
              <ProfileDetail>
                <Head>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "flex-end",
                    }}
                  >
                    <Nickname>{other_info.nickname}</Nickname>
                    {is_login ? (
                      followed ? (
                        <FollowerBtn
                          onClick={() => {
                            dispatch(
                              userActions.unfollowOtherAX(
                                props.id,
                                other_info.nickname
                              )
                            );
                          }}
                        >
                          구독취소
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
                          구독하기
                        </FollowerBtn>
                      )
                    ) : null}
                  </div>
                  {other_info.topic?.friendship === false &&
                  other_info.topic?.love === false &&
                  other_info.topic?.dream === false &&
                  other_info.topic?.relationship === false &&
                  other_info.topic?.myself === false &&
                  other_info.topic?.worth === false ? (
                    <SubjectContainer>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <span
                          style={{
                            fontSize: "14px",
                            marginRight: "17px",
                            fontWeight: "800",
                          }}
                        >
                          선택하신 선호 태그가 없습니다.
                        </span>
                      </div>
                    </SubjectContainer>
                  ) : (
                    <SubjectContainer>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <span
                          style={{
                            fontSize: "14px",
                            marginRight: "17px",
                            fontWeight: "800",
                          }}
                        >
                          선호 태그
                        </span>
                      </div>
                      {user_info.topic.friendship ? (
                        <Subject1
                          style={{
                            background: "#B9FFC4",
                            boxShadow: "0px 0px 15px #B9FFC4",
                          }}
                        >
                          <span>#우정</span>
                        </Subject1>
                      ) : null}
                      {user_info.topic.love ? (
                        <Subject1
                          style={{
                            background: "#FFAAAA",
                            boxShadow: "0px 0px 15px #FFAAAA",
                          }}
                        >
                          <span>#사랑</span>
                        </Subject1>
                      ) : null}
                      {user_info.topic.dream ? (
                        <Subject1
                          style={{
                            background: "#B7E6FF",
                            boxShadow: "0px 0px 15px #B7E6FF",
                          }}
                        >
                          <span>#꿈</span>
                        </Subject1>
                      ) : null}
                      {user_info.topic.worth ? (
                        <Subject1
                          style={{
                            background: "#B5BDFF",
                            boxShadow: "0px 0px 15px #B5BDFF",
                          }}
                        >
                          <span>#가치</span>
                        </Subject1>
                      ) : null}
                      {user_info.topic.relationship ? (
                        <Subject1
                          style={{
                            background: "#FFF09D",
                            boxShadow: "0px 0px 15px #FFF09D",
                          }}
                        >
                          <span>#관계</span>
                        </Subject1>
                      ) : null}
                      {user_info.topic.myself ? (
                        <Subject1
                          style={{
                            background: "#F9D1FD",
                            boxShadow: "0px 0px 15px #F9D1FD",
                          }}
                        >
                          <span>#나</span>
                        </Subject1>
                      ) : null}
                    </SubjectContainer>
                  )}
                </Head>
                <Body>
                  <Answers
                    onClick={() => {
                      dispatch(setComponent("othersanswers"));
                    }}
                  >
                    낙서
                    <CountText>{other_info.otherAnswerCount}</CountText>
                  </Answers>
                  <MyQuestionBtn
                    onClick={() => {
                      dispatch(setComponent("othersquestion"));
                    }}
                  >
                    질문
                    <CountText>{other_info.otherCustomQuestionCount}</CountText>
                  </MyQuestionBtn>
                  <Myfollowers
                    onClick={() => {
                      setFollowModal(true);
                    }}
                  >
                    구독<CountText>{otherfriend_list.length}</CountText>
                  </Myfollowers>
                </Body>
                <Bottom>
                  <Introduce>{other_info.introduce}</Introduce>
                  {/* <QuestionBtn onClick={()=>{dispatch(setComponent('othersquestion'))}}>질문 카드 보러가기</QuestionBtn> */}
                </Bottom>
              </ProfileDetail>
              <SubjectContainerMobile>
                <div style={{ display: "flex", alignItems: "center" }}>
                  {/* <span style={{fontSize:'14px',marginRight:'17px',fontWeight:'800'}}>선호 태그</span> */}
                </div>
                {user_info.topic.friendship ? (
                  <Subject1
                    style={{
                      background: "#B9FFC4",
                      boxShadow: "0px 0px 15px #B9FFC4",
                    }}
                  >
                    <span>#우정</span>
                  </Subject1>
                ) : null}
                {user_info.topic.love ? (
                  <Subject1
                    style={{
                      background: "#FFAAAA",
                      boxShadow: "0px 0px 15px #FFAAAA",
                    }}
                  >
                    <span>#사랑</span>
                  </Subject1>
                ) : null}
                {user_info.topic.dream ? (
                  <Subject1
                    style={{
                      background: "#B7E6FF",
                      boxShadow: "0px 0px 15px #B7E6FF",
                    }}
                  >
                    <span>#꿈</span>
                  </Subject1>
                ) : null}
                {user_info.topic.worth ? (
                  <Subject1
                    style={{
                      background: "#B5BDFF",
                      boxShadow: "0px 0px 15px #B5BDFF",
                    }}
                  >
                    <span>#가치</span>
                  </Subject1>
                ) : null}
                {user_info.topic.relationship ? (
                  <Subject1
                    style={{
                      background: "#FFF09D",
                      boxShadow: "0px 0px 15px #FFF09D",
                    }}
                  >
                    <span>#관계</span>
                  </Subject1>
                ) : null}
                {user_info.topic.myself ? (
                  <Subject1
                    style={{
                      background: "#F9D1FD",
                      boxShadow: "0px 0px 15px #F9D1FD",
                    }}
                  >
                    <span>#나</span>
                  </Subject1>
                ) : null}
              </SubjectContainerMobile>
            </>
          )}
        </React.Fragment>
      ) : (
        <React.Fragment>
          {followModal ? (
            <FollowModal friend_list={myfriend_list} close={closeFollowModal} />
          ) : null}
          {UpdateModal ? <ProfileUpdateModal close={closeUpdateModal} /> : null}
          {!is_login ? (
            <SpinnerContainer>
              <Loader type="Oval" color="#3d66ba" height={50} width={50} />
            </SpinnerContainer>
          ) : (
            <>
              <Background />
              <ProfileImgContainer
                onClick={() => {
                  setUpdateModal(true);
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
                  <Nickname>{user_info.nickname}</Nickname>
                  {}
                  {user_info.topic?.friendship === false &&
                  user_info.topic?.love === false &&
                  user_info.topic?.dream === false &&
                  user_info.topic?.relationship === false &&
                  user_info.topic?.myself === false &&
                  user_info.topic?.worth === false ? (
                    <SubjectContainer>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <span
                          style={{
                            fontSize: "14px",
                            marginRight: "17px",
                            fontWeight: "800",
                          }}
                        >
                          선택하신 선호 태그가 없습니다. 😗
                        </span>
                      </div>
                    </SubjectContainer>
                  ) : (
                    <SubjectContainer>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <span
                          style={{
                            fontSize: "14px",
                            marginRight: "17px",
                            fontWeight: "800",
                          }}
                        >
                          선호 태그
                        </span>
                      </div>
                      {user_info.topic.friendship ? (
                        <Subject1
                          style={{
                            background: "#B9FFC4",
                            boxShadow: "0px 0px 15px #B9FFC4",
                          }}
                        >
                          <span>#우정</span>
                        </Subject1>
                      ) : null}
                      {user_info.topic.love ? (
                        <Subject1
                          style={{
                            background: "#FFAAAA",
                            boxShadow: "0px 0px 15px #FFAAAA",
                          }}
                        >
                          <span>#사랑</span>
                        </Subject1>
                      ) : null}
                      {user_info.topic.dream ? (
                        <Subject1
                          style={{
                            background: "#B7E6FF",
                            boxShadow: "0px 0px 15px #B7E6FF",
                          }}
                        >
                          <span>#꿈</span>
                        </Subject1>
                      ) : null}
                      {user_info.topic.worth ? (
                        <Subject1
                          style={{
                            background: "#B5BDFF",
                            boxShadow: "0px 0px 15px #B5BDFF",
                          }}
                        >
                          <span>#가치</span>
                        </Subject1>
                      ) : null}
                      {user_info.topic.relationship ? (
                        <Subject1
                          style={{
                            background: "#FFF09D",
                            boxShadow: "0px 0px 15px #FFF09D",
                          }}
                        >
                          <span>#관계</span>
                        </Subject1>
                      ) : null}
                      {user_info.topic.myself ? (
                        <Subject1
                          style={{
                            background: "#F9D1FD",
                            boxShadow: "0px 0px 15px #F9D1FD",
                          }}
                        >
                          <span>#나</span>
                        </Subject1>
                      ) : null}
                    </SubjectContainer>
                  )}
                </Head>
                <Body>
                  <Answers
                    onClick={() => {
                      dispatch(setComponent("myanswers"));
                    }}
                  >
                    낙서
                    <CountText>{user_info.myAnswerCount}</CountText>
                  </Answers>
                  <MyQuestionBtn
                    onClick={() => {
                      dispatch(setComponent("myquestion"));
                    }}
                  >
                    질문
                    <CountText>{user_info.myCustomQuestionCount}</CountText>
                  </MyQuestionBtn>
                  <Myfollowers
                    onClick={() => {
                      setFollowModal(true);
                    }}
                  >
                    구독
                    <CountText>{myfriend_list.length}</CountText>
                  </Myfollowers>
                </Body>
                <Bottom>
                  <Introduce>{user_info.introduce}</Introduce>
                  {/* <QuestionBtn onClick={()=>{dispatch(setComponent('myquestion'))}}>나의 질문 카드 보러가기</QuestionBtn> */}
                </Bottom>
              </ProfileDetail>
              <SubjectContainerMobile>
                <div style={{ display: "flex", alignItems: "center" }}>
                  {/* <span style={{fontSize:'14px',marginRight:'17px',fontWeight:'800'}}>선호 태그</span> */}
                </div>
                {user_info.topic.friendship ? (
                  <Subject1
                    style={{
                      background: "#B9FFC4",
                      boxShadow: "0px 0px 15px #B9FFC4",
                    }}
                  >
                    <span>#우정</span>
                  </Subject1>
                ) : null}
                {user_info.topic.love ? (
                  <Subject1
                    style={{
                      background: "#FFAAAA",
                      boxShadow: "0px 0px 15px #FFAAAA",
                    }}
                  >
                    <span>#사랑</span>
                  </Subject1>
                ) : null}
                {user_info.topic.dream ? (
                  <Subject1
                    style={{
                      background: "#B7E6FF",
                      boxShadow: "0px 0px 15px #B7E6FF",
                    }}
                  >
                    <span>#꿈</span>
                  </Subject1>
                ) : null}
                {user_info.topic.worth ? (
                  <Subject1
                    style={{
                      background: "#B5BDFF",
                      boxShadow: "0px 0px 15px #B5BDFF",
                    }}
                  >
                    <span>#가치</span>
                  </Subject1>
                ) : null}
                {user_info.topic.relationship ? (
                  <Subject1
                    style={{
                      background: "#FFF09D",
                      boxShadow: "0px 0px 15px #FFF09D",
                    }}
                  >
                    <span>#관계</span>
                  </Subject1>
                ) : null}
                {user_info.topic.myself ? (
                  <Subject1
                    style={{
                      background: "#F9D1FD",
                      boxShadow: "0px 0px 15px #F9D1FD",
                    }}
                  >
                    <span>#나</span>
                  </Subject1>
                ) : null}
              </SubjectContainerMobile>
            </>
          )}
        </React.Fragment>
      )}
    </>
  );
};

const Background = styled.div`
  z-index: -1;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  top: 0;
  left: 0;
  opacity: 0.5;
  box-shadow: 0px 0px 6px #ffffff;
  border-radius: 20px;
`;

const ProfileImgContainer = styled.div`
  position: relative;
  width: 126px;
  height: 100%;
  @media (max-width: 500px) {
    width: 75px;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    margin-top: 20px;
  }
`;

const ProfileImg = styled.img`
  width: 126px;
  height: 126px;
  border-radius: 50%;
  object-fit: cover;
  @media (max-width: 500px) {
    width: 75px;
    height: 75px;
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
  @media (max-width: 500px) {
    top: 0px;
    right: 0px;
    width: 20px;
    height: 20px;
  }
`;

const ProfileDetail = styled.div`
  margin: 0px 0px 0px 45px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 500px) {
    margin: 0px 0px 0px 20px;
    justify-content: center;
  }
`;

const Head = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  @media (max-width: 500px) {
    margin-bottom: 10px;
  }
`;

const Body = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
`;

const Bottom = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-top: 20px;
  @media (max-width: 500px) {
    margin-top: 5px;
  }
`;

const Nickname = styled.div`
  font-weight: 600;
  font-size: 22px;
  @media (max-width: 500px) {
    font-size: 16px;
  }
`;

const CountText = styled.span`
  font-weight: 600;
  margin-left: 5px;
  @media (max-width: 500px) {
    margin: 0px;
  }
`;

const Introduce = styled.div`
  margin-top: 20px;
  font-size: 14px;
  @media (max-width: 500px) {
    font-size: 12px;
    margin-top: 5px;
  }
`;

const Answers = styled.div`
  cursor: pointer;
  margin-top: 11px;
  margin-right: 20px;
  font-weight: 400;
  font-size: 14px;
  @media (max-width: 500px) {
    font-size: 12px;
    margin-top: 0px;
  }
`;

const FollowerBtn = styled.div`
  margin-left: 20px;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  @media (max-width: 500px) {
    font-size: 12px;
  }
`;
const MyQuestionBtn = styled.div`
  margin-top: 11px;
  margin-right: 20px;
  cursor: pointer;
  font-weight: 400;
  font-size: 14px;
  @media (max-width: 500px) {
    font-size: 12px;
    margin-top: 0px;
  }
`;

const SubjectContainer = styled.div`
  display: flex;
  flex-direction: row;
  @media (max-width: 700px) {
    display: none;
  }
`;

const SubjectContainerMobile = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  align-items: center;
  @media (min-width: 700px) {
    display: none;
  }
`;

const Subject1 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 72px;
  height: 31px;
  opacity: 0.8;
  margin-left: 10px;
  border-radius: 45px;
  font-size: 14px;
  font-weight: 600;
  @media (max-width: 700px) {
    margin-bottom: 10px;
  }
  @media (max-width: 500px) {
    width: 52px;
    height: 22px;
    font-size: 12px;
    margin-bottom: 10px;
  }
`;

const Myfollowers = styled.div`
  margin-top: 11px;
  margin-right: 20px;
  font-size: 14px;
  cursor: pointer;
  font-weight: 400;
  @media (max-width: 500px) {
    font-size: 12px;
    margin-top: 0px;
  }
`;

const SpinnerContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const QuestionBtn = styled.div`
  padding: 8px 18px;
  background: #ffffff;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 600;
`;

export default Profile;
