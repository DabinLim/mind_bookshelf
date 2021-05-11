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

const Header = () => {
  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.is_login);
  const [loginModal, setLogin] = useState(false);
  const [menu, setMenu] = useState(false);
  const searchModal = useSelector((state) => state.noti.searchModal);
  const [notiModal, setNoti] = useState(false);
  const is_checked = useSelector((state) => state.noti.is_checked);
  const user = useSelector((state) => state.user.user);
  const [recent_list, setRecent] = useState();
  const [loading, setLoading] = useState(true)
  const [cardModal, setCardModal] = useState(false)
  const [aboutModal, setAboutModal] = useState(false)
  const [navigation, setNavigation] = useState(false)

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
        {navigation?
        <NaviModal>
          <ExitBtn onClick={() => {setNavigation(false)}} >x</ExitBtn>
          <MenuContainer>
            <Menu>
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
                  }} />
            </Menu>
            <Menu>
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
            </Menu>
            <Menu>
              {aboutModal? <About setAboutModal={setAboutModal} /> : null}
              <InfoOutlinedIcon 
              style={{ cursor: "pointer" }}
              onClick={() => {
                  setAboutModal(true);
                }} /></Menu>
            <Menu>
              <HighlightOffIcon
              style={{ cursor: "pointer" }}
              onClick={() => {
                dispatch(notiActions.leaveAlarmIO(user.id));
              }}
            /></Menu>
          </MenuContainer>
        </NaviModal>
        :null}
        {cardModal ? <CardModal close={closeCardModal} /> : null}
        <HeaderContainer>
          <HeaderInnerContainer>
            <NaviContainer>
              <Logo>
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
              <Menuicon>
                <MenuIcon 
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setNavigation(true)
                  }} />
              </Menuicon>
            </IconContainer>
          </HeaderInnerContainer>
          {/* {menu? 
          <MenuContainer>
            <Menu>
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
                  }} />
            </Menu>
            <Menu>
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
            </Menu>
            <Menu>
              {aboutModal? <About setAboutModal={setAboutModal} /> : null}
              <InfoOutlinedIcon 
              style={{ cursor: "pointer" }}
              onClick={() => {
                  setAboutModal(true);
                }} /></Menu>
            <Menu>
              <HighlightOffIcon
              style={{ cursor: "pointer" }}
              onClick={() => {
                dispatch(notiActions.leaveAlarmIO(user.id));
              }}
            /></Menu>
          </MenuContainer>
          : null} */}
        </HeaderContainer>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      {loginModal ? <LoginModal close={closeLoginModal} /> : null}
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
            <Menuicon>
              <MenuIcon
              onClick={() => {
                if(menu){
                setMenu(false)}else{
                  setMenu(true)
                }
                }}
              />
            </Menuicon>
          </IconContainer>
        </HeaderInnerContainer>
        {menu? 
          <MenuContainer>
            <Menu>
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
            </Menu>
            <Menu>
              {aboutModal? <About setAboutModal={setAboutModal} /> : null}
              <InfoOutlinedIcon 
              style={{ cursor: "pointer"}}
              onClick={() => {
                  setAboutModal(true);
                }} /></Menu>
            <Menu>
              <ExitToAppIcon
              style={{ cursor: "pointer" }}
              onClick={() => {
                setLogin(true);
              }}
            /></Menu>
          </MenuContainer>
          : null}
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
  margin-bottom: 10px;
  overflow: visible;
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

const MenuContainer = styled.div`
  display: flex;
  margin-top: 50px;
  padding: 0px 20px;
  

`

const Menu = styled.div`
  position: relative;
  display: none;
  margin: 7px 0;
  font-size: 15px;
  @media (max-width: 900px){
    display: block;
  };
`

const NaviContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: auto;
  align-items: center;
  height: 100%;
  justify-content: flex-start;
  
`;

const Logo = styled.span`
  margin-right: 140px;
  font-size: 18px;
  font-weight: 800;
  @media (max-width: 900px){
    margin-right: 50px;
  };
`

const PageButton = styled.span`
margin: 10px;
font-size: 14px;
font-weight: 600;
cursor: pointer;

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

const Menuicon = styled.div`
  display: none;
  margin-top: 9px;
  margin-left: 25px;
  cursor: pointer;
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

const NaviModal = styled.div`
  position: relative;
  height: 100vh;
  width: 300px;
  position: fixed;
  z-index: 100;
  top: 0;
  right: 0;
  background-color: white;
  transition: 1s;
`

const ExitBtn = styled.div`
  position: fixed;
  top: 3px;
  right: 20px;
  font-size: 20px;
  cursor: pointer;
`

export default Header;
