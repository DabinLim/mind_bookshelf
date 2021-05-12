import React, { useState } from "react";
import styled from "styled-components";
import LoginModal from "./LoginModal";
import Search from "./Search";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../redux/modules/user";
import SearchIcon from "@material-ui/icons/Search";
import { history } from "../redux/configStore";
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import NotificationsIcon from "@material-ui/icons/Notifications";
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import Notification from "../components/Notification/Notification";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { api as notiActions, setSearch } from "../redux/modules/noti";
import { setComponent } from "../redux/modules/books";
import swal from "sweetalert";
import { getCookie } from "./Cookie";
import axios from 'axios'
import { CardModal } from "../components/Community/communityindex"
import InfoIcon from '@material-ui/icons/Info';
import {About} from './sharedindex'
import HomeIcon from '@material-ui/icons/Home';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import ForumOutlinedIcon from '@material-ui/icons/ForumOutlined';
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined';

const Header = () => {
  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.is_login);
  const [loginModal, setLogin] = useState(false);
  const searchModal = useSelector((state) => state.noti.searchModal);
  const [notiModal, setNoti] = useState(false);
  const is_checked = useSelector((state) => state.noti.is_checked);
  const user = useSelector((state) => state.user.user);
  const [recent_list, setRecent] = useState();
  const [loading, setLoading] = useState(true)
  const [cardModal, setCardModal] = useState(false)
  const [aboutModal, setAboutModal] = useState(false)

  const closeNotiModal = () => {
    setNoti(false);
  };

  const recentUser = async () => {
    if(!getCookie("is_login")){
      setLoading(false)
      return
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

  if (is_login) {
    return (
      <React.Fragment>
        <NaviModal>
          <Menu>
            <MenuIcon fontSize="large" />
            <MenuText>메뉴</MenuText>
          </Menu>
          <Menu
            onClick={() => {
                history.push("/");
                dispatch(setComponent(""));
              }}
            >
            <HomeIcon fontSize="large" />
            <MenuText>오늘의 낙서</MenuText>
          </Menu>
          <Menu
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
            <ImportContactsIcon fontSize="large" />
            <MenuText>나의 책장</MenuText>
          </Menu>
          <Menu
            onClick={() => {
              history.push("/community");
              dispatch(setComponent(""));
            }}
          >
            <ChatOutlinedIcon fontSize="large" />
            <MenuText>커뮤니티</MenuText>
          </Menu>
        </NaviModal>
        {cardModal ? <CardModal close={closeCardModal} /> : null}
        <HeaderContainer>
          <HeaderInnerContainer>
            <NaviContainer>
              <MobileIcon>
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
                  }}/>
              </MobileIcon>
              <Logo>
                Logo
              </Logo>
              <MobileIcon>
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
              </MobileIcon>
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
              <Icon
              >
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
                {aboutModal? <About setAboutModal={setAboutModal} /> : null}
                <InfoOutlinedIcon 
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                  setAboutModal(true);
                }} />
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
      <NaviModal>
        <Menu>
          <MenuIcon fontSize="large" />
          <MenuText>메뉴</MenuText>
        </Menu>
        <Menu
          onClick={() => {
              history.push("/");
              dispatch(setComponent(""));
            }}
          >
          <HomeIcon fontSize="large" />
          <MenuText>오늘의 낙서</MenuText>
        </Menu>
        <Menu
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
          <ImportContactsIcon fontSize="large" />
          <MenuText>나의 책장</MenuText>
        </Menu>
        <Menu
          onClick={() => {
            history.push("/community");
            dispatch(setComponent(""));
          }}
        >
          <ChatOutlinedIcon fontSize="large" />
          <MenuText>커뮤니티</MenuText>
        </Menu>
      </NaviModal>
      <HeaderContainer>
        <HeaderInnerContainer>
          <NaviContainer>
            <Logo
            >
              Logo
            </Logo>
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
              <SearchIcon style={{ cursor: "pointer" }}
              onClick={() => {
                recentUser();
                dispatch(setSearch(true));
              }}
              />
            </Icon>
            <Icon>
                {aboutModal? <About setAboutModal={setAboutModal} /> : null}
                <InfoOutlinedIcon 
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                  setAboutModal(true);
                }} />
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
  padding-top: 40px;
  left: 0;
  top: 0;
  z-index: 50;
  // margin-bottom: 10px;
  overflow: visible;
  @media (max-width: 500px){
    padding-top: 10px;
  };
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
  @media (max-width: 900px){
    padding: 0 60px 0 60px;
  };
  @media (max-width: 500px){
    padding: 0 20px 0 20px;
  };
`;

const NaviModal = styled.div`
  display: none;
  height: 80px;
  width: 100vw;
  position: fixed;
  z-index: 100;
  bottom: 0;
  right: 0;
  background-color: #EBEFF2;
  @media (max-width: 900px){
    display: flex;
    padding: 0px 80px;
    align-items: center;
    justify-content: space-between;
  };
  @media (max-width: 500px){
    display: flex;
    padding: 0px 20px;
    align-items: center;
    justify-content: space-between;
  };
`

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 14px;
  cursor: pointer;
`
const MenuText = styled.div`
`



const NaviContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: auto;
  align-items: center;
  height: 100%;
  justify-content: flex-start;
  @media (max-width: 900px){
    justify-content: space-between;
    width: 100%;
  };
`;

const Logo = styled.span`
  margin-right: 140px;
  font-size: 18px;
  font-weight: 800;
  transition: 0.5s;
  @media (max-width: 900px){
    margin-right: 0px;
  };
`

const PageButton = styled.span`
margin: 10px;
font-size: 14px;
font-weight: 600;
cursor: pointer;
@media (max-width: 900px){
  display: none;
};
`

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
  @media (max-width: 900px){
    display: none;
  };
`;

const Icon = styled.div`
  position: relative;
  margin-left: 25px;
  margin-top: 9px;
  @media (max-width: 900px){
    display: none;
  };
`;

const MobileIcon = styled.div`
  position: relative;
  display: none;
  margin-left: 25px;
  margin-top: 9px;
  @media (max-width: 900px){
    display: block;
  };

`

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


export default Header;
