import React, { useState } from "react";
import styled from "styled-components";
import { LockFilled, UnlockFilled } from "@ant-design/icons";

const CustomSwitch = (props) => {
  const onClick = props.onClick;
  return (
    <>
      <SwitchFrame onClick={onClick}>
        {props.isOpen ? (
          <>
            <OnMsg>공개</OnMsg>
            <LockBox>
              <UnlockFilled />
            </LockBox>
          </>
        ) : (
          <>
            <LockBox>
              <LockFilled style={{ color: "#DBE5FF" }} />
            </LockBox>
            <OffMsg style={{ color: "#ffffff" }}>비공개</OffMsg>
          </>
        )}
      </SwitchFrame>
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
  margin-left: 11px;
  font-size: 14px/19px;
`;

const OffMsg = styled.span`
  margin-right: 11px;
  font-size: 14px/19px;
`;

export default CustomSwitch;
