import React from "react";
import useSound from 'use-sound';
import boopSfx from "../../static/sounds/YOO.mp3";

const Boop = () => {
  console.log('boop')
  return useSound(boopSfx);
};

export default Boop;