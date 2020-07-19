import React from "react";
import styled from "styled-components";

import Defaults from "../components/Defaults";
import Content from "../components/Content";
import Globe from "../components/Globe";

const Hero = styled.div`
  display: flex;
`;

const IndexPage = () => {
  return (
    <>
      <Defaults />
      <Hero>
        <Content />
        <Globe />
      </Hero>
    </>
  );
};

export default IndexPage;
