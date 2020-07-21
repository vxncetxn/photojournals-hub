import React, { useState, useEffect } from "react";
import styled from "styled-components";

import Defaults from "../components/Defaults";
import Content from "../components/Content";
import Globe from "../components/Globe";

const Hero = styled.div`
  display: flex;
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
  box-shadow: var(--bs-celestial);
  z-index: -1;

  transition: background-color 0.3s ease-out, box-shadow 0.3s ease-out;
`;

const IndexPage = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.setAttribute("theme", theme);
  }, [theme]);

  return (
    <>
      <Defaults />
      <Hero
        onClick={() => {
          if (theme === "light") {
            setTheme("dark");
          } else {
            setTheme("light");
          }
        }}
      >
        <Content />
        <Globe />
        <Celestial />
      </Hero>
    </>
  );
};

export default IndexPage;
