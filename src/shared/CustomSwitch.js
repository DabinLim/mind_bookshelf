import React from "react";
import styled from "styled-components";

const CustomSwitch = (props) => {
  const onClick = props.onClick;
  return (
    <>
      {/* 작아질 때 뷰!! */}
      <RadioSwitch>
        {props.isOpen ? (
          <>
            <Circle src={"https://user-images.githubusercontent.com/77369674/118648262-30f72e00-b81d-11eb-9ae7-632dbac0aef4.png"} onClick={onClick}></Circle>
            비공개
          </>
        ) : (
          <>
            <Circle src={"https://user-images.githubusercontent.com/77369674/118648260-305e9780-b81d-11eb-96d1-6fda0bb022e2.png"} onClick={onClick}>
            </Circle>
            비공개
          </>
        )}
      </RadioSwitch>
    </>
  );
};

const RadioSwitch = styled.div`
  width: 100px;
  height: 20px;
  display: flex;
  align-items: center;
  color: #939393;
`;

const Circle = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 5px;
`;

export default CustomSwitch;
