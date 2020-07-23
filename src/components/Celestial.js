import React from "react";
import styled, { keyframes } from "styled-components";

const Glow = keyframes`
  100% {
    box-shadow: var(--bs-celestial-to);
  }
`;

const Celestial = styled.div`
  position: absolute;
  top: 8%;
  right: 12%;
  z-index: -2;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: var(--color-celestial);
  box-shadow: var(--bs-celestial-from);

  transition: background-color 0.3s ease-out, box-shadow 0.3s ease-out;
  animation: ${Glow} 3s ease-out infinite alternate;

  @media (max-width: 896px) {
    top: 15%;
  }

  @media (max-width: 600px) {
    right: 10%;
    width: 100px;
    height: 100px;
  }
`;

const CelestialComp = () => {
  return <Celestial />;
};

export default CelestialComp;
