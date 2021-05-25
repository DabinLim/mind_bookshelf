import React, { useState } from "react";
import styled  from "styled-components";
import LoginModal from "./LoginModal";
import Search from "./Search";
import { useSelector, useDispatch } from "react-redux";
import SearchIcon from "@material-ui/icons/Search";
import { history } from "../redux/configStore";
import MenuIcon from "@material-ui/icons/Menu";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import Notification from "../components/Notification/Notification";
import { api as notiActions, setSearch } from "../redux/modules/noti";
import { setComponent } from "../redux/modules/books";
import { getCookie } from "./Cookie";
import axios from "axios";
import { CardModal } from "../components/Community/communityindex";
import { About } from "./sharedindex";
import { CloseOutlined } from "@ant-design/icons";
import NotificationsNoneOutlinedIcon from "@material-ui/icons/NotificationsNoneOutlined";
import "../static/Card.css";
import logoImages from "../static/images/logo.png"
import headerLogo from "../static/images/headerLogo.png"

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

  // active 된 페이지 헤더 표시하기
  let main = "";
  let bookshelf = "";
  let community = "";
  let friends ="";

  if (pathname === "/") {
    main = "main";
    bookshelf = "";
    community = "";
    friends ="";
  } else if (pathname === "/mybook") {
    main = "";
    bookshelf = "bookshelf";
    community = "";
    friends ="";
  } else if (pathname.includes("community") || pathname.includes("topic")) {
    main = "";
    bookshelf = "";
    community = "community";
    friends ="";
  }
  else if (pathname.includes("others")) {
    main = "";
    bookshelf = "";
    community = "";
    friends ="";
  } 
  else {
    main = "";
    bookshelf = "";
    community = "";
    friends ="friends";
  }

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
              <LogoImgMobile 
                onClick={() => {
                  history.push("/");
                }}
                src={headerLogo}/>
              <MenuUl>
                <MenuLi
                  onClick={() => {
                    history.push("/");
                    setMenuOpen(false);
                  }}
                  className={main}
                >
                  오늘의 낙서
                  <p
                    style={{
                      textAlign: "left",
                      fontSize: "11px",
                      color: "#909090",
                    }}
                  >
                    오늘 받은 질문 확인, 답변
                  </p>
                </MenuLi>
                <MenuLi
                  onClick={() => {
                    if (!is_login) {
                      setLogin(true);
                      setMenuOpen(false);
                      return;
                    }
                    dispatch(setComponent(""));
                    history.push("/mybook");
                    setMenuOpen(false);
                  }}
                  className={bookshelf}
                >
                  나의 책장
                  <p
                    style={{
                      textAlign: "left",
                      fontSize: "11px",
                      color: "#909090",
                    }}
                  >
                    나의 모든 질문과 답변 한눈에 확인
                  </p>
                </MenuLi>
                <MenuLi
                onClick={() => {
                  if (!is_login) {
                    setLogin(true);
                    setMenuOpen(false);
                    return;
                  }
                  history.push("/friends");
                  dispatch(setComponent(""));
                  setMenuOpen(false);
                }}
                className={friends}
              >
                너의 생각
                <p
                  style={{
                    textAlign: "left",
                    fontSize: "11px",
                    color: "#909090",
                  }}
                >
                  팔로우한 친구들의 생각 모아보기
                </p>
              </MenuLi>
              <MenuLi
                  onClick={() => {
                    history.push("/community");
                    dispatch(setComponent(""));
                    setMenuOpen(false);
                  }}
                  className={community}
                  style={{ marginBottom: "105px" }}
                >
                  생각의 바다
                  <p
                  style={{
                    textAlign: "left",
                    fontSize: "11px",
                    color: "#909090",
                  }}
                >
                  랜덤으로 다양한 질문과 답변 즐기기
                </p>
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
              <LogoBox>
              <LogoImg src={headerLogo}
                onClick={() => {
                  history.push("/");
                }}
              />
              <Logo
                onClick={() => {
                  history.push("/");
                }}
              >
                생각낙서
              </Logo>
              </LogoBox>
              <div style={{ display: "flex" }}>
                <MobileIcon style={{ marginRight: "10px" }}>
                  <SearchIcon
                    style={{ cursor: "pointer" }}
                    onClick={() => {
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
                      history.push("/noti");
                    }}
                  />
                </MobileIcon>
              </div>
              <PageButton
                onClick={() => {
                  history.push("/");
                  dispatch(setComponent(""));
                }}
                className={main}
              >
                오늘의 낙서
              </PageButton>
              <PageButton
                onClick={() => {
                  if (!is_login) {
                    setLogin(true);
                    return;
                  }
                  dispatch(setComponent(""));
                  history.push("/mybook");
                }}
                className={bookshelf}
              >
                나의 책장
              </PageButton>
              <PageButton
                onClick={() => {
                  if (!is_login) {
                    setLogin(true);
                    return;
                  }
                  history.push("/friends");
                  dispatch(setComponent(""));
                }}
                className={friends}
              >
                너의 생각
              </PageButton>
              <PageButton
                onClick={() => {
                  history.push("/community");
                  dispatch(setComponent(""));
                }}
                className={community}
              >
                생각의 바다
              </PageButton>
            </NaviContainer>
            <IconContainer>
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
                    dispatch(setSearch(true));
                  }}
                />
              </Icon>
              <Icon>
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
                    setNoti(true);
                    dispatch(notiActions.openAlarmIO(user.id));
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
                로그아웃
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
            <LogoImgMobile 
              onClick={() => {
                history.push("/");
              }}
              src={headerLogo}/>
            <MenuUl>
              <MenuLi
                onClick={() => {
                  history.push("/");
                  setMenuOpen(false);
                }}
                className={main}
              >
                오늘의 낙서
                <p
                  style={{
                    textAlign: "left",
                    fontSize: "11px",
                    color: "#909090",
                  }}
                >
                  오늘 받은 질문 확인, 답변
                </p>
              </MenuLi>
              <MenuLi
                onClick={() => {
                  if (!is_login) {
                    setLogin(true);
                    setMenuOpen(false);
                    return;
                  }
                  dispatch(setComponent(""));
                  history.push("/mybook");
                  setMenuOpen(false);
                }}
                className={bookshelf}
              >
                나의 책장
                <p
                  style={{
                    textAlign: "left",
                    fontSize: "11px",
                    color: "#909090",
                  }}
                >
                  나의 모든 질문과 답변 한눈에 확인
                </p>
              </MenuLi>
              <MenuLi
                onClick={() => {
                  if (!is_login) {
                    setLogin(true);
                    setMenuOpen(false);
                    return;
                  }
                  history.push("/friends");
                  dispatch(setComponent(""));
                  setMenuOpen(false);
                }}
                className={friends}
              >
                너의 생각
                <p
                  style={{
                    textAlign: "left",
                    fontSize: "11px",
                    color: "#909090",
                  }}
                >
                  팔로우한 친구들의 생각 모아보기
                </p>
              </MenuLi>
              <MenuLi
                onClick={() => {
                  history.push("/community");
                  dispatch(setComponent(""));
                  setMenuOpen(false);
                }}
                className={community}
                style={{ marginBottom: "105px" }}
              >
                생각의 바다
                <p
                  style={{
                    textAlign: "left",
                    fontSize: "11px",
                    color: "#909090",
                  }}
                >
                  랜덤으로 다양한 질문과 답변 즐기기
                </p>
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
            <LogoBox>
              <LogoImg 
                onClick={() => {
                  history.push("/");
                }}
                src={headerLogo}/>
              <Logo
                onClick={() => {
                  history.push("/");
                }}
              >
                생각낙서
              </Logo>
              </LogoBox>
            <div style={{ display: "flex" }}>
              <MobileIcon style={{ marginLeft: "35px" }}>
                <SearchIcon
                  style={{ cursor: "pointer" }}
                  onClick={() => {
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
              className={main}
            >
              오늘의 낙서
            </PageButton>
            <PageButton
              onClick={() => {
                if (!is_login) {
                  setLogin(true);
                  return;
                }
                dispatch(setComponent(""));
                history.push("/mybook");
              }}
              className={bookshelf}
            >
              나의 책장
            </PageButton>
            <PageButton
                onClick={() => {
                  if (!is_login) {
                    setLogin(true);
                    return;
                  }
                  history.push("/friends");
                  dispatch(setComponent(""));
                }}
                className={friends}
              >
                너의 생각
              </PageButton>
            <PageButton
              onClick={() => {
                history.push("/community");
                dispatch(setComponent(""));
              }}
              className={community}
            >
              생각의 바다
            </PageButton>
          </NaviContainer>
          <IconContainer>
            <Icon
              onClick={() => {
                recentUser();
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
              로그인
            </TextBtn>
          </IconContainer>
        </HeaderInnerContainer>
      </HeaderContainer>
    </React.Fragment>
  );
};

const HeaderContainer = styled.div`
  position: fixed;
  padding-top: 10px;
  padding-bottom: 10px;
  background: #191919;
  color: white;
  height: 50px;
  left: 0;
  top: 0;
  z-index: 50;
  overflow: visible;
  @media (max-width: 750px) {
    padding-top: 10px;
    padding-bottom: 10px;
    background: black;
    color: white;
    height: 50px;
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
  @media (max-width: 1000px) {
    padding: 0 20px 0 20px;
  }
  @media (max-width: 750px) {
    padding: 0 20px 0 20px;
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
  background: #191919;
  z-index: 140;
  color: white;
  padding: 40px 0px 0 0px;
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
  margin-bottom: 22px;
  cursor: pointer;
  font: normal normal normal 20px/29px Noto Sans CJK KR;
  padding-left: 16px;
`;

const MenuText = styled.div`
  font: normal normal normal 16px/24px Noto Sans CJK KR;
  cursor: pointer;
  margin-bottom: 14px;
  padding-left: 16px;
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

const LogoImgMobile = styled.img`
  width:40px;
  height:40px;
  margin-bottom:20px;
  margin-left:16px;
  image-rendering: -webkit-optimize-contrast;
`;

const LogoBox = styled.div`
  width:auto;
  display:flex;
  flex-direction:row;
  align-items:center;
`;

const LogoImg = styled.img`
  cursor:pointer;
  width: 40px;
  height:40px;
  margin-right: 10px;
  image-rendering: -webkit-optimize-contrast;
  @media(max-width:750px){
    display:none;
  }
`;

const Logo = styled.div`
  margin-right: 140px;
  font: normal normal normal 17px Noto Sans CJK KR;
  transition: 0.5s;
  cursor: pointer;
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
  font: normal normal medium 15px/22px Noto Sans CJK KR;
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
  font: normal normal normal 15px/22px Noto Sans CJK KR;
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

export default Header;
