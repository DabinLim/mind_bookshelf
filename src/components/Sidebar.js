import React, { useState } from "react";
import styled from "styled-components";
import { history } from "../redux/configStore";
import { setComponent } from "../redux/modules/books";
import { useDispatch } from "react-redux";
import "../static/henrystyle.scss";

const Sidebar = (props) => {
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
                  history.push("/mybook");
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
                  history.push("/");
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
  width: 14%;
  min-width: 192px;
  background: rgba(196, 196, 196, 0.3);
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
