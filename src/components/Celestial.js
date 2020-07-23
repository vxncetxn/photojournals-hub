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
  top: 8%;
  right: 12%;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: var(--color-celestial);
  z-index: -2;

  transition: background-color 0.3s ease-out, box-shadow 0.3s ease-out;
  animation: ${Glow} 3s ease-out infinite alternate;

  @media (max-width: 1200px) {
  }

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
