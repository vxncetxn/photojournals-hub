import React, { useState, useEffect } from "react";
import styled from "styled-components";

import Defaults from "../components/Defaults";
import Content from "../components/Content";
import Globe from "../components/Globe";
import Celestial from "../components/Celestial";

const Hero = styled.div`
  display: flex;
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
