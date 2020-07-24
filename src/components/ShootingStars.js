import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const Shoot = keyframes`
    0% {
        transform: rotate(-30deg) translate(0, 0);
        opacity: 1;
    }

    100% {
        transform: rotate(-30deg) translate(-1000px, 0);
        opacity: 0;
    }
`;

const Stars = styled.div`
  position: absolute;
  left: 50%;
  top: -10%;
  z-index: -2;
  width: 400px;
  height: 100px;
  // transform: rotate(-30deg);
  opacity: 0.7;

  animation: ${Shoot} 1s linear forwards;
`;

const Star = styled.div`
  position: absolute;
  left: ${(props) => props.left}%;
  top: ${(props) => props.top}%;
  width: ${(props) => props.width}px;
  height: 1px;
  border: 1px solid white;
`;

const ShootingStars = () => {
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimating(!animating), 3000);
  }, [animating]);

  return animating ? (
    <Stars>
      {[...Array(getRandomInt(1, 3)).keys()].map((idx) => (
        <Star
          key={idx}
          left={getRandomInt(0, 100)}
          top={getRandomInt(0, 100)}
          width={getRandomInt(50, 200)}
        />
      ))}
    </Stars>
  ) : null;
};

export default ShootingStars;
