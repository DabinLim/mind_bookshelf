import React, { useState } from "react";
import styled from "styled-components";
import LoginModal from "./LoginModal";
import Search from "./Search";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../redux/modules/user";
import SearchIcon from "@material-ui/icons/Search";
import { history } from "../redux/configStore";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Notification from "../components/Notification/Notification";
import { api as notiActions } from "../redux/modules/noti";
import { setComponent } from "../redux/modules/books";
import swal from "sweetalert";
import { getCookie } from "./Cookie";

const Header = () => {
  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.is_login);
  const [loginModal, setLogin] = useState(false);
  const [searchModal, setSearch] = useState(false);
  const [notiModal, setNoti] = useState(false);
  const noti_list = useSelector((state) => state.noti.noti_list);
  const is_checked = useSelector((state) => state.noti.is_checked);
  const user = useSelector((state) => state.user.user);

  const closeNotiModal = () => {
    setNoti(false);
  };

  const closeSearchModal = () => {
    setSearch(false);
  };

  const closeLoginModal = () => {
    setLogin(false);
  };

  if (is_login) {
    return (
      <React.Fragment>
        {notiModal ? <Notification close={closeNotiModal} /> : null}
        {searchModal ? <Search close={closeSearchModal} /> : null}
        <HeaderContainer>
          <HeaderInnerContainer>
            <NaviContainer>
              <span style={{marginRight:'40px',fontSize:'18px',fontWeight:'800'}}>Logo</span>
              <span onClick={() => {
                  history.push("/");
                  dispatch(setComponent(""));
                }} style={{margin:'10px',fontSize:'14px',fontWeight:'600',cursor:'pointer'}}>오늘의 낙서</span>
              <span onClick={() => {
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
                }}style={{margin:'10px',fontSize:'14px',fontWeight:'600',cursor:'pointer'}}>나의 책장</span>
              <span onClick={() => {
                  history.push("/community");
                  dispatch(setComponent(""));
                }}
                style={{margin:'10px',fontSize:'14px',fontWeight:'600',cursor:'pointer'}}>커뮤니티</span>
            </NaviContainer>
            <IconContainer>
            <Icon
              onClick={() => {
                setNoti(true);
                dispatch(notiActions.openAlarmIO());
              }}
            >
              {is_checked ? <AlarmBadge /> : null}
              <NotificationsIcon />
            </Icon>
            <Icon
              onClick={() => {
                setSearch(true);
              }}
            >
              <SearchIcon />
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
      {searchModal ? <Search close={closeSearchModal} /> : null}
      {loginModal ? <LoginModal close={closeLoginModal} /> : null}
      <HeaderContainer>
        <HeaderInnerContainer>
          <Icon
            onClick={() => {
              setSearch(true);
            }}
          >
            <SearchIcon />
          </Icon>
          <TextBtn
            onClick={() => {
              setLogin(true);
            }}
          >
            Login
          </TextBtn>
        </HeaderInnerContainer>
      </HeaderContainer>
    </React.Fragment>
  );
};

const HeaderContainer = styled.div`
  position: fixed;
  width: 100vw;
  height: 55px;
  background-color: white;
  border-bottom: 1px solid #e9ecef;
  left: 0;
  top: 0;
  z-index: 5;
  margin-bottom: 10px;
  overflow: visible;
`;

const HeaderInnerContainer = styled.div`
  display: flex;
  align-items: center;
  margin: auto;
  width: 90%;
  height: 100%;
  justify-content: space-between;
  padding: 0 20px 0 20px;
  box-sizing: border-box;
  overflow: visible;
`;

const NaviContainer = styled.div`
  display: flex;
  flex-direction:row;
  width:auto;
  align-items: center;
  height: 100%;
  justify-content: flex-start;
`;

const IconContainer = styled.div`
  display: flex;
  width:auto;
  align-items: center;
  height: 100%;
  justify-content: flex-end;
`;

const TextBtn = styled.div`
  font-size: 18px;
  cursor: pointer;
`;

const Icon = styled.div`
  position: relative;
  margin-right: 20px;
  margin-top: 9px;
  cursor: pointer;
  padding: 6px 11px;
  // background-color: silver;
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
  right: 12px;
  top: 5px;
`;

export default Header;
