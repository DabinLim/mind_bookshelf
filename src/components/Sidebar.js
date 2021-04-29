import React, { useState } from "react";
import styled from "styled-components";
import { history } from "../redux/configStore";
import { setComponent } from "../redux/modules/books";
import { useDispatch } from "react-redux";
import "../static/henrystyle.scss";
import swal from "sweetalert";
import { getCookie } from "../shared/Cookie";

const Sidebar = (props) => {
  console.log(window.location.href.split("/"));
  //const sideBtns = document.querySelector(".sidebtn");
  //   document.addEventListener("click", (event) => {
  //     sideBtns.classList.add("active");
  //   });
  const dispatch = useDispatch();

  const [isJot, setJot] = useState(true);
  const [isShelf, setShelf] = useState(false);
  const [isCom, setCom] = useState(false);

  const onClick = (e) => {
    if (e.target.dataset.name === undefined) {
      return;
    }
    if (e.target.dataset.name === "오늘의 낙서") {
      setJot(true);
      setShelf(false);
      setCom(false);
    }
    if (e.target.dataset.name === "나의 책장") {
      setJot(false);
      setShelf(true);
      setCom(false);
    }
    if (e.target.dataset.name === "커뮤니티") {
      setJot(false);
      setShelf(false);
      setCom(true);
    }
  };

  return (
    <>
      <SideFrame>
        <SideUl onClick={onClick}>
          {isJot ? (
            <SideLi style={{ background: "white" }}>
              <SideBtn
                className="sidebtn active"
                data-name="오늘의 낙서"
                onClick={() => {
                  history.push("/");
                  dispatch(setComponent(""));
                }}
              >
                오늘의 낙서
              </SideBtn>
            </SideLi>
          ) : (
            <SideLi style={{ background: "none" }}>
              <SideBtn
                className="sidebtn active"
                data-name="오늘의 낙서"
                onClick={() => {
                  history.push("/");
                }}
              >
                오늘의 낙서
              </SideBtn>
            </SideLi>
          )}
          {isShelf ? (
            <SideLi style={{ background: "white" }}>
              <SideBtn
                onClick={() => {
                  if (!getCookie("is_login")) {
                    swal({
                      title: "로그인 필수!",
                      text: "로그인 후 이용가능해요😊",
                      icon: "info",
                    });
                    return;
                  }
                  history.push("/mybook");
                }}
                className="sidebtn"
                data-name="나의 책장"
              >
                나의 책장
              </SideBtn>
            </SideLi>
          ) : (
            <SideLi style={{ background: "none" }}>
              <SideBtn
                onClick={() => {
                  if (!getCookie("is_login")) {
                    swal({
                      title: "로그인 필수!",
                      text: "로그인 후 이용가능해요😊",
                      icon: "info",
                    });

                    return;
                  }
                  history.push("/mybook");
                  dispatch(setComponent(""));
                }}
                className="sidebtn"
                data-name="나의 책장"
              >
                나의 책장
              </SideBtn>
            </SideLi>
          )}
          {isCom ? (
            <SideLi style={{ background: "white" }}>
              <SideBtn className="sidebtn" data-name="커뮤니티">
                커뮤니티
              </SideBtn>
            </SideLi>
          ) : (
            <SideLi style={{ background: "none" }}>
              <SideBtn className="sidebtn" data-name="커뮤니티">
                커뮤니티
              </SideBtn>
            </SideLi>
          )}
        </SideUl>
      </SideFrame>
    </>
  );
};

const SideFrame = styled.nav`
  min-width: 160px;
  background: rgba(196, 196, 196, 0.3);
  min-height: 100%;
`;

const SideUl = styled.ul`
  margin: 0 0 0 30px;
  padding: 60px 0;
  position: relative;
`;

const SideLi = styled.li`
  margin-bottom: 20px;
  list-style: none;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;

  & > button:hover {
    background: white;
  }
`;

const SideBtn = styled.button`
  outline: none;
  border: none;
  background: none;
  padding: 12px 0px 12px 20px;
  width: 100%;
  font-weight: bold;
  text-align: left;
  font-size: 18px;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  &:hover {
    cursor: pointer;
  }
`;
export default Sidebar;
