import React from "react";
import styled, { keyframes } from "styled-components";

const Glow = keyframes`
  0% {
    box-shadow: var(--bs-celestial-from);
  }

  100% {
    box-shadow: var(--bs-celestial-to);
  }
`;

const Celestial = styled.div`
  position: absolute;
  top: 40px;
  right: 200px;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: var(--color-celestial);
  opacity: 0.9;
  z-index: -1;

  transition: background-color 0.3s ease-out, box-shadow 0.3s ease-out;
  animation: ${Glow} 3s ease-out infinite alternate;
`;

const CelestialComp = () => {
  return <Celestial />;
};

export default CelestialComp;
