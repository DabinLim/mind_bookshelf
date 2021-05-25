import React from "react";
import useSound from 'use-sound';
import boopSfx from "../../static/sounds/YOO.mp3";

const BoopButton = () => {
  const [play] = useSound(boopSfx);

  return <button onClick={play}>Boop!</button>;
};

export default BoopButton;