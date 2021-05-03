import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Post from "../Main/Post";

const ComponentSlider = (props) => {
  const question_list = useSelector((state) => state.answer.question_list);
  return (
    <>
      {question_list?.map((q, idx) => {
        return <Post key={idx} {...q}></Post>;
      })}
    </>
  );
};

export default ComponentSlider;
