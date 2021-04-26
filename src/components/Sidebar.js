import React from "react";
import styled from "styled-components";
import { history } from "../redux/configStore";
import "../static/henrystyle.css";

const Sidebar = (props) => {
  //const sideBtns = document.querySelector(".sidebtn");
  //   document.addEventListener("click", (event) => {
  //     sideBtns.classList.add("active");
  //   });
  return (
    <>
      <SideFrame>
        <SideUl>
          <SideLi>
            <SideBtn className="sidebtn active">오늘의 낙서</SideBtn>
          </SideLi>
          <SideLi>
            <SideBtn  onClick={()=> {history.push('/mybook')}} className="sidebtn">나의 책장</SideBtn>
          </SideLi>
          <SideLi>
            <SideBtn className="sidebtn">커뮤니티</SideBtn>
          </SideLi>
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
