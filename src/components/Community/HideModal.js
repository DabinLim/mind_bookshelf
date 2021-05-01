import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { LockOutlined } from "@ant-design/icons";

const HideModal = (props) => {
  const dispatch = useDispatch();

  return (
    <React.Fragment>
      <Component onClick={props.close}></Component>
      <ModalComponent>
        <HideBtn>
          나만 보기 <LockOutlined />
        </HideBtn>
      </ModalComponent>
    </React.Fragment>
  );
};

const Component = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  opacity: 0.4;
  height: 100%;
  width: 100%;
  background-color: black;
  z-index: 10;
`;

const ModalComponent = styled.div`
  position: fixed;
  width: 50%;
  height: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  z-index: 50;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.12), 0 2px 5px rgba(0, 0, 0, 0.24);
  @media (max-width: 950px) {
    width: 400px;
  }
  @media (max-width: 400px) {
    width: 95%;
  }
`;

const HideBtn = styled.button`
  outline: none;
  border: none;
  background: yellow;
  cursor: pointer;
  height: 50%;
`;

export default HideModal;
