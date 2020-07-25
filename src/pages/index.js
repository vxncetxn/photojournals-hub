import React, { useState, useEffect } from "react";
import styled from "styled-components";

import Defaults from "../components/Defaults";
import Content from "../components/Content";
import Globe from "../components/Globe";
import Celestial from "../components/Celestial";
import ShootingStars from "../components/ShootingStars";

const Hero = styled.div`
  position: relative;
`;

const IndexPage = () => {
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    setTheme(
      localStorage.getItem("theme")
        ? localStorage.getItem("theme")
        : matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
    );
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("theme", theme);
  }, [theme]);

  return (
    <>
      <Defaults />
      <Hero>
        {theme === "dark" ? <ShootingStars /> : null}
        <Content theme={theme} setTheme={setTheme} />
        <Globe theme={theme} />
        <Celestial />
      </Hero>
    </>
  );
};

export default IndexPage;
