import React, { useState } from "react";
import styled from "styled-components";
import { MinusCircleOutlined, LockFilled } from "@ant-design/icons";

const CustomSwitch = (props) => {
  const onClick = props.onClick;
  return (
    <>
      <SwitchFrame onClick={onClick}>
        {props.isOpen ? (
          <>
            <LockBox style={{ color: "#ffffff" }}>
              <MinusCircleOutlined />
            </LockBox>
            <OnMsg style={{ color: "#7086BF" }}>공개</OnMsg>
          </>
        ) : (
          <>
            <OffMsg style={{ color: "#7086BF" }}>비공개</OffMsg>
            <LockBox>
              <LockFilled style={{ color: "#7086BF" }} />
            </LockBox>
          </>
        )}
      </SwitchFrame>
      {/* 작아질 때 뷰!! */}
      <RadioSwitch>
        {props.isOpen ? (
          <>
            <Circle onClick={onClick}></Circle>
            비공개
          </>
        ) : (
          <>
            <Circle onClick={onClick}>
              <SmallCircle />
            </Circle>
            비공개
          </>
        )}
      </RadioSwitch>
    </>
  );
};

const SwitchFrame = styled.div`
  width: 100px;
  height: 36px;
  border: 1px solid #e2eaff;
  border-radius: 45px;
  display: flex;
  justify-content: space-between;
  background: #dbe5ff;
  color: #7086bf;
  align-items: center;
  cursor: pointer;
  :hover {
    box-shadow: 0px 0px 5px #c1c7fc;
    transition: all 200ms ease-in-out;
  }
  @media (max-width: 500px) {
    display: none;
  }
`;

const LockBox = styled.span`
  width: 36px;
  height: 100%;
  border-radius: 50%;
  background: white;
  color: #7086bf;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const OnMsg = styled.span`
  margin-right: 11px;
  font-size: 14px/19px;
`;

const OffMsg = styled.span`
  margin-left: 11px;
  font-size: 14px/19px;
`;

const RadioSwitch = styled.div`
  width: 100px;
  height: 20px;
  display: flex;
  align-items: center;
  color: #939393;
  @media (min-width: 500px) {
    display: none;
  }
`;

const Circle = styled.span`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 1px solid #939393;
  background: white;
  position: relative;
  margin-right: 5px;
`;

const SmallCircle = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #3C3C3C;
  position: absolute;
  top: 16%;
  right: 10%;
`;

export default CustomSwitch;
