import React from "react";
import styled from "styled-components";

const ContentPanel = styled.div`
  position: relative;
  width: 40%;
  padding: 85px 75px;
  font-family: var(--font-secondary);
  font-size: 20px;
  color: var(--color-text);
  transition: color 0.3s ease-out;

  z-index: 1;

  @media (max-width: 1200px) {
    padding: 75px 65px;
    font-size: 18px;
  }

  @media (max-width: 896px) {
    width: 60%;
  }

  @media (max-width: 600px) {
    width: 100%;
    padding: 50px 30px;
    font-size: 16px;
  }
`;

const Header = styled.h1`
  font-family: var(--font-primary);
  font-size: 42px;
  font-weight: normal;

  & > span {
    color: var(--color-h1);
  }

  @media (max-width: 1200px) {
    font-size: 36px;
  }

  @media (max-width: 600px) {
    font-size: 30px;
  }
`;

const SubHeader = styled.h2`
  font-size: 32px;
  font-weight: normal;
  margin-top: 10px;

  & > a {
    color: inherit;
    text-decoration: underline dotted;
  }

  @media (max-width: 1200px) {
    font-size: 26px;
  }

  @media (max-width: 600px) {
    font-size: 20px;
  }
`;

const Intro = styled.p`
  font-size: 24px;
  line-height: 1.6;
  position: relative;
  margin-top: 50px;

  &:before {
    content: "“";
    position: absolute;
    left: -15px;
    top: -75px;
    font-family: var(--font-primary);
    font-size: 150px;
    color: var(--color-apostrophe);
    z-index: -1;
    transition: color 0.3s ease-out;
  }

  @media (max-width: 1200px) {
    font-size: 22px;
  }

  @media (max-width: 600px) {
    font-size: 20px;
  }
`;

const Entries = styled.ul`
  margin-top: 30px;

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

const Anchor = styled.a`
  position: relative;

  &:after {
    content: "";
    position: absolute;
    right: 0;
    bottom: -1px;
    z-index: -1;
    width: 0;
    height: 8px;
    background-color: var(--color-h1);
    transition: width 0.3s ease-out;
    will-change: width;
  }

  &:hover:after {
    left: 0;
    width: 100%;
  }
`;

const ContentComp = () => {
  return (
    <ContentPanel>
      <Header>
        <span>photojournals</span>.dev
      </Header>
      <SubHeader>
        by{" "}
        <a
          href="https://vancetan.dev/"
          target="_blank"
          rel="noreferrer noopener"
        >
          vance tan
        </a>
        .
      </SubHeader>
      <Intro>
        This is a place where I store the photo journals curated from the
        experiences on my trips and journeys. Each journal is crafted in a
        unique style of its own, enjoy!
      </Intro>
      <Entries>
        <li>
          <Anchor href="#">> europe2k19</Anchor>
          <Badge color="var(--color-accent-one)" />
        </li>
        <li>
          <Anchor href="#">> taiwanexchange</Anchor>
          <Badge color="var(--color-accent-two)" />
        </li>
      </Entries>
    </ContentPanel>
  );
};

export default ContentComp;
