import React, { useState, useEffect } from "react";
import styled from "styled-components";

import Defaults from "../components/Defaults";
import Content from "../components/Content";
import Globe from "../components/Globe";
import Celestial from "../components/Celestial";
import ShootingStars from "../components/ShootingStars";

const Hero = styled.div`
  position: relative;
  // display: flex;

  // border: 5px solid green;

  @media (max-width: 896px) {
    // border: 2px solid red;
    // flex-direction: column-reverse;
  }
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
        {theme === "dark" ? <ShootingStars /> : null}
        <Content />
        <Globe theme={theme} />
        <Celestial />
      </Hero>
    </>
  );
};

export default IndexPage;
