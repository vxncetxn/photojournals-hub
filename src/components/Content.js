import React from "react";
import styled from "styled-components";

const ContentPanel = styled.div`
  width: 30%;
  padding: 50px 75px;

  //   border: 1px solid red;
`;

const Header = styled.h1`
  font-family: var(--font-primary);
  font-size: 36px;
  font-weight: normal;
  color: var(--color-text);

  transition: color 0.3s ease-out;
`;

const SubHeader = styled.h2`
  font-family: var(--font-secondary);
  font-size: 20px;
  font-weight: normal;
  margin-top: 10px;
  color: var(--color-text);

  transition: color 0.3s ease-out;
`;

const ContentComp = () => {
  return (
    <ContentPanel>
      <Header>photojournals.dev</Header>
      <SubHeader>
        by <span style={{ textDecoration: "underline dotted" }}>vance tan</span>
        .
      </SubHeader>
    </ContentPanel>
  );
};

export default ContentComp;
