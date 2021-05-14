import React, { useState } from "react";
import styled from "styled-components";
import LoginModal from "./LoginModal";
import Search from "./Search";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../redux/modules/user";
import SearchIcon from "@material-ui/icons/Search";
import { history } from "../redux/configStore";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/Notifications";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import Notification from "../components/Notification/Notification";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { api as notiActions, setSearch } from "../redux/modules/noti";
import { setComponent } from "../redux/modules/books";
import swal from "sweetalert";
import { getCookie } from "./Cookie";
import axios from "axios";
import { CardModal } from "../components/Community/communityindex";
import { About } from "./sharedindex";
import { CloseOutlined } from "@ant-design/icons";
import CollectionsBookmarkIcon from "@material-ui/icons/CollectionsBookmark";
import CollectionsBookmarkOutlinedIcon from "@material-ui/icons/CollectionsBookmarkOutlined";
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';

const Header = () => {
  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.is_login);
  const [loginModal, setLogin] = useState(false);
  const searchModal = useSelector((state) => state.noti.searchModal);
  const [notiModal, setNoti] = useState(false);
  const is_checked = useSelector((state) => state.noti.is_checked);
  const pathname = useSelector((state) => state.router.location.pathname);
  const user = useSelector((state) => state.user.user);
  const [recent_list, setRecent] = useState();
  const [loading, setLoading] = useState(true);
  const [cardModal, setCardModal] = useState(false);
  const [aboutModal, setAboutModal] = useState(false);

  const closeNotiModal = () => {
    setNoti(false);
  };

  const recentUser = async () => {
    if (!getCookie("is_login")) {
      setLoading(false);
      return;
    }
    const result = await axios.get("/bookshelf/searchUser");
    console.log(result);
    if (result.data.result.searchUser.length === 0) {
      setRecent();
      setLoading(false);
    } else {
      setRecent(result.data.result.searchUser);
      setLoading(false);
    }
  };

  const closeCardModal = () => {
    setCardModal(false);
  };

  const closeLoginModal = () => {
    setLogin(false);
  };

  // 모바일 화면에서 메뉴 활성화
  const [isMenuOpen, setMenuOpen] = useState(false);

  if (is_login) {
    return (
      <React.Fragment>
        {cardModal ? <CardModal close={closeCardModal} /> : null}
        {aboutModal ? <About setAboutModal={setAboutModal} /> : null}
        {isMenuOpen ? (
          <>
            <Component
              onClick={() => {
                setMenuOpen(false);
              }}
            />
            <Menu>
              <MenuCloseBtn
                onClick={() => {
                  setMenuOpen(false);
                }}
              >
                <CloseOutlined />
              </MenuCloseBtn>
              <MenuUl>
                <MenuLi
                  onClick={() => {
                    history.push("/");
                    setMenuOpen(false);
                  }}
                >
                  오늘의 낙서
                </MenuLi>
                <MenuLi
                  onClick={() => {
                    if (!getCookie("is_login")) {
                      swal({
                        title: "로그인 필수!",
                        text: "로그인 후 이용가능해요",
                        icon: "info",
                      });
                      return;
                    }
                    dispatch(setComponent(""));
                    history.push("/mybook");
                    setMenuOpen(false);
                  }}
                >
                  나의 책장
                </MenuLi>
                <MenuLi
                  style={{marginBottom:"105px"}}
                  onClick={() => {
                    history.push("/community");
                    dispatch(setComponent(""));
                    setMenuOpen(false);
                  }}
                >
                  커뮤니티
                </MenuLi>

                <MenuText
                  onClick={() => {
                    setAboutModal(true);
                    setMenuOpen(false);
                  }}
                >
                  소개
                </MenuText>
                <MenuText
                  onClick={() => {
                    dispatch(notiActions.leaveAlarmIO(user.id));
                    setMenuOpen(false);
                  }}
                >
                  로그아웃
                </MenuText>
              </MenuUl>
            </Menu>
          </>
        ) : null}
        <HeaderContainer>
          <HeaderInnerContainer>
            <NaviContainer>
              <MobileIcon
                onClick={() => {
                  setMenuOpen(true);
                }}
              >
                <MenuIcon />
              </MobileIcon>
              <Logo onClick={()=>{history.push('/')}} >생각낙서</Logo>
              <div style={{ display: "flex" }}>
                <MobileIcon style={{ marginRight: "10px" }}>
                  {/* {searchModal ? (
                  <Search
                    recent_list={recent_list}
                    setLoading={setLoading}
                    loading={loading}
                  />
                ) : null} */}
                  <SearchIcon
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      // recentUser();
                      // // dispatch(userActions.getRecentUserAX())
                      // dispatch(setSearch(true));
                      history.push("/search");
                    }}
                  />
              </MobileIcon>
              <MobileIcon>
                {is_checked ? <AlarmBadge /> : null}
                {notiModal ? (
                  <Notification
                    close={closeNotiModal}
                    setCardModal={setCardModal}
                  />
                ) : null}
                <NotificationsNoneOutlinedIcon
                style={{ cursor: "pointer" }}
                onClick={() => {
                  // setNoti(true);
                  // dispatch(notiActions.openAlarmIO(user.id));
                  history.push('/noti')
                }}
              />
              </MobileIcon>
              </div>
              <PageButton
                onClick={() => {
                  history.push("/");
                  dispatch(setComponent(""));
                }}
              >
                오늘의 낙서
              </PageButton>
              <PageButton
                onClick={() => {
                  if (!getCookie("is_login")) {
                    swal({
                      title: "로그인 필수!",
                      text: "로그인 후 이용가능해요",
                      icon: "info",
                    });
                    return;
                  }
                  dispatch(setComponent(""));
                  history.push("/mybook");
                }}
              >
                나의 책장
              </PageButton>
              <PageButton
                onClick={() => {
                  history.push("/community");
                  dispatch(setComponent(""));
                }}
              >
                커뮤니티
              </PageButton>
            </NaviContainer>
            <IconContainer>
              <Icon>
                {is_checked ? <AlarmBadge /> : null}
                {notiModal ? (
                  <Notification
                    close={closeNotiModal}
                    setCardModal={setCardModal}
                  />
                ) : null}
                <NotificationsIcon
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setNoti(true);
                    dispatch(notiActions.openAlarmIO(user.id));
                  }}
                />
              </Icon>
              <Icon>
                {searchModal ? (
                  <Search
                    recent_list={recent_list}
                    setLoading={setLoading}
                    loading={loading}
                  />
                ) : null}
                <SearchIcon
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    recentUser();
                    // dispatch(userActions.getRecentUserAX())
                    dispatch(setSearch(true));
                  }}
                />
              </Icon>
              <Icon>
                {aboutModal ? <About setAboutModal={setAboutModal} /> : null}
                <InfoOutlinedIcon
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setAboutModal(true);
                  }}
                />
              </Icon>
              <TextBtn
                onClick={() => {
                  dispatch(notiActions.leaveAlarmIO(user.id));
                }}
              >
                Logout
              </TextBtn>
            </IconContainer>
          </HeaderInnerContainer>
        </HeaderContainer>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      {loginModal ? <LoginModal close={closeLoginModal} /> : null}
      {aboutModal ? <About setAboutModal={setAboutModal} /> : null}
      {isMenuOpen ? (
        <>
          <Component
            onClick={() => {
              setMenuOpen(false);
            }}
          />
          <Menu>
            <MenuCloseBtn
              onClick={() => {
                setMenuOpen(false);
              }}
            >
              <CloseOutlined />
            </MenuCloseBtn>
            <MenuUl>
              <MenuLi
                onClick={() => {
                  history.push("/");
                  setMenuOpen(false);
                }}
              >
                오늘의 낙서
              </MenuLi>
              <MenuLi
                onClick={() => {
                  if (!getCookie("is_login")) {
                    swal({
                      title: "로그인 필수!",
                      text: "로그인 후 이용가능해요",
                      icon: "info",
                    });
                    return;
                  }
                  dispatch(setComponent(""));
                  history.push("/mybook");
                  setMenuOpen(false);
                }}
              >
                나의 책장
              </MenuLi>
              <MenuLi
                onClick={() => {
                  history.push("/community");
                  dispatch(setComponent(""));
                  setMenuOpen(false);
                }}
                style={{marginBottom:"105px"}}
              >
                커뮤니티
              </MenuLi>
              <MenuText
                onClick={() => {
                  setAboutModal(true);
                  setMenuOpen(false);
                }}
              >
                소개
              </MenuText>
              <MenuText
                onClick={() => {
                  setLogin(true);
                  setMenuOpen(false);
                }}
              >
                로그인
              </MenuText>
            </MenuUl>
          </Menu>
        </>
      ) : null}
      <HeaderContainer>
        <HeaderInnerContainer>
          <NaviContainer>
            <MobileIcon
              onClick={() => {
                setMenuOpen(true);
              }}
            >
              <MenuIcon />
            </MobileIcon>
            <Logo onClick={()=>{history.push('/')}} >생각낙서</Logo>
            <div style={{ display: "flex" }}>
                <MobileIcon style={{ marginLeft: "35px" }}>
                  {/* {searchModal ? (
                  <Search
                    recent_list={recent_list}
                    setLoading={setLoading}
                    loading={loading}
                  />
                ) : null} */}
                  <SearchIcon
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      // recentUser();
                      // // dispatch(userActions.getRecentUserAX())
                      // dispatch(setSearch(true));
                      history.push("/search");
                    }}
                  />
              </MobileIcon>
              </div>
            <PageButton
              onClick={() => {
                history.push("/");
                dispatch(setComponent(""));
              }}
            >
              오늘의 낙서
            </PageButton>
            <PageButton
              onClick={() => {
                if (!getCookie("is_login")) {
                  swal({
                    title: "로그인 필수!",
                    text: "로그인 후 이용가능해요😊",
                    icon: "info",
                  });
                  return;
                }
                dispatch(setComponent(""));
                history.push("/mybook");
              }}
            >
              나의 책장
            </PageButton>
            <PageButton
              onClick={() => {
                history.push("/community");
                dispatch(setComponent(""));
              }}
            >
              커뮤니티
            </PageButton>
          </NaviContainer>
          <IconContainer>
            <Icon
              onClick={() => {
                recentUser();
                // dispatch(userActions.getRecentUserAX())
                setSearch(true);
              }}
            >
              {searchModal ? (
                <Search
                  recent_list={recent_list}
                  setLoading={setLoading}
                  loading={loading}
                />
              ) : null}
              <SearchIcon
                style={{ cursor: "pointer" }}
                onClick={() => {
                  recentUser();
                  dispatch(setSearch(true));
                }}
              />
            </Icon>
            <Icon>
              {aboutModal ? <About setAboutModal={setAboutModal} /> : null}
              <InfoOutlinedIcon
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setAboutModal(true);
                }}
              />
            </Icon>
            <TextBtn
              onClick={() => {
                setLogin(true);
              }}
            >
              Login
            </TextBtn>
          </IconContainer>
        </HeaderInnerContainer>
      </HeaderContainer>
    </React.Fragment>
  );
};

const HeaderContainer = styled.div`
  position: fixed;
  // width: 100vw;
  // height: 120px;
  padding-top: 30px;
  left: 0;
  top: 0;
  z-index: 50;
  // margin-bottom: 10px;
  overflow: visible;
  @media (max-width: 750px) {
    padding-top: 10px;
    padding-bottom: 10px;
    background: black;
    color: white;
  }
`;

const HeaderInnerContainer = styled.div`
  display: flex;
  align-items: center;
  margin: auto;
  width: 100vw;
  height: 100%;
  justify-content: space-between;
  padding: 0 100px 0 100px;
  box-sizing: border-box;
  overflow: visible;
  @media (max-width: 900px) {
    padding: 0 40px 0 40px;
  }
  @media (max-width: 750px) {
    padding: 0 20px 0 20px;
  } ;
`;

const NaviIcon = styled.img``;

const NaviModal = styled.div`
  display: none;
  height: 68px;
  width: 100vw;
  position: fixed;
  z-index: 100;
  bottom: 0;
  right: 0;
  background-color: white;
  @media (max-width: 750px) {
    display: flex;
    padding: 0px 80px;
    align-items: center;
    justify-content: space-between;
  }
  @media (max-width: 500px) {
    display: none;
    padding: 0px 20px;
    align-items: center;
    justify-content: space-between;
  } ;
`;

const Component = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  opacity: 0.4;
  height: 100vh;
  width: 100vw;
  background: black;
  z-index: 120;
`;

const Menu = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  cursor: default;
  width: 240px;
  height: 100%;
  background: black;
  z-index: 140;
  color: white;
  padding: 102px 0 0 16px;
`;

const MenuCloseBtn = styled.button`
  position: absolute;
  font-size: 26px;
  top: 10px;
  right: 10px;
  background: none;
  outline: none;
  border: none;
`;

const MenuUl = styled.ul`
  margin: 0;
  padding: 0;
`;

const MenuLi = styled.li`
  list-style: none;
  margin-bottom: 24px;
  cursor: pointer;
  font: normal normal bold 20px/29px Noto Sans KR;
`;

const MenuText = styled.div`
  font: normal normal bold 16px/24px Noto Sans KR;
  cursor: pointer;
  margin-bottom: 14px;
`;

const NaviContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: auto;
  align-items: center;
  height: 100%;
  justify-content: flex-start;
  @media (max-width: 750px) {
    justify-content: space-between;
    width: 100%;
  } ;
`;

const Logo = styled.div`
  margin-right: 140px;
  font-size: 18px;
  font-weight: 800;
  transition: 0.5s;
  cursor:pointer;
  @media (max-width: 900px) {
    margin-right: 80px;
  }
  @media (max-width: 750px) {
    margin-left: 35px;
    margin-right: 0px;
  } ;
`;

const PageButton = styled.span`
  margin: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  @media (max-width: 750px) {
    display: none;
  } ;
`;

const IconContainer = styled.div`
  display: flex;
  width: auto;
  align-items: center;
  height: 100%;
  justify-content: flex-end;
`;

const TextBtn = styled.div`
  font-size: 18px;
  cursor: pointer;
  margin-left: 25px;
  @media (max-width: 750px) {
    display: none;
  } ;
`;

const Icon = styled.div`
  position: relative;
  margin-left: 25px;
  margin-top: 9px;
  @media (max-width: 750px) {
    display: none;
  } ;
`;

const MobileIcon = styled.div`
  position: relative;
  display: none;
  margin-top: 9px;
  @media (max-width: 750px) {
    display: block;
  } ;
`;

const AlarmBadge = styled.div`
  background-color: red;
  width: 10px;
  height: 10px;
  font-size: 9px;
  text-align: center;
  border-radius: 10px;
  position: absolute;
  color: white;
  font-weight: 600;
  right: 0px;
  top: 2px;
`;

const MobileLoginModal = styled.div`
  position: absolute;
  width: 100px;
  height: 50px;
  bottom: 60px;
  z-index: 400;
  font-size: 14px;
  background: #ebeff2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-top-right-radius: 20px;

  & > h3 {
    margin: 0;
    cursor: pointer;
  }
`;

export default Header;
