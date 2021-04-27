import ReactCardFlip from "react-card-flip";
import React, { useState } from "react";

import styled from "styled-components";

import CardFront from "./CardFront";
import CardBack from "./CardBack";

const CardFlipper = (props) => {
  const [isFlipped, setFlip] = useState(false);

  const onClick = () => {
    if (isFlipped) {
      setFlip(false);
      return;
    }
    setFlip(true);
  };
  return (
    <>
      <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
        <>
          <CardFront onClick={onClick}></CardFront>
        </>
        <>
          <CardBack onClick={onClick}></CardBack>
        </>
      </ReactCardFlip>
    </>
  );
};

export default CardFlipper;
