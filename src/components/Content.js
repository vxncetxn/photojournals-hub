import React from "react";
import styled from "styled-components";

const ContentPanel = styled.div`
  width: 40%;
  padding: 100px 75px;
  font-family: var(--font-secondary);
  font-size: 20px;
  color: var(--color-text);
  transition: color 0.3s ease-out;

  // border: 1px solid red;
`;

const Header = styled.h1`
  font-family: var(--font-primary);
  font-size: 42px;
  font-weight: normal;
`;

const SubHeader = styled.h2`
  font-size: 32px;
  font-weight: normal;
  margin-top: 10px;
`;

const Intro = styled.p`
  font-size: 24px;
  position: relative;
  margin-top: 50px;

  &:before {
    content: "“";
    position: absolute;
    left: -15px;
    top: -50px;
    font-family: var(--font-primary);
    font-size: 150px;
    color: var(--color-primary);
    z-index: -1;
    transition: color 0.3s ease-out;
  }
`;

const Entries = styled.ul`
  margin-top: 50px;

  & a {
    color: inherit;
  }

  & > li + li {
    margin-top: 10px;
  }
`;

const Badge = styled.span`
  display: inline-block;
  width: 20px;
  height: 12px;
  background-color: ${(props) => props.color};
  margin-left: 10px;
`;

const ContentComp = () => {
  return (
    <ContentPanel>
      <Header>photojournals.dev</Header>
      <SubHeader>
        by <span style={{ textDecoration: "underline dotted" }}>vance tan</span>
        .
      </SubHeader>
      <Intro>
        This is a little hub for my photo albums from my past and recent
        travels, enjoy!
      </Intro>
      <Entries>
        <li>
          <a href="#">#europe2k19</a>
          <Badge color="var(--color-accent-one)" />
        </li>
        <li>
          <a href="#">#taiwanexchange</a>
          <Badge color="var(--color-accent-two)" />
        </li>
      </Entries>
    </ContentPanel>
  );
};

export default ContentComp;
