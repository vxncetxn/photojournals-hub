import React from "react";
import styled from "styled-components";

import Sun from "../assets/sun.svg";
import Moon from "../assets/moon.svg";

const ContentPanel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  width: 40%;
  height: 100vh;
  padding: 85px 75px;
  font-family: var(--font-secondary);
  font-size: 24px;
  color: var(--color-text);
  transition: color 0.3s ease-out;

  z-index: 1;

  @media (max-width: 1200px) {
    width: 50%;
    padding: 75px 65px;
    font-size: 22px;
  }

  @media (max-width: 896px) {
    width: 65%;
    padding: 60px 50px;
    font-size: 20px;
  }

  @media (max-width: 600px) {
    width: 100%;
    padding: 50px 30px;
    font-size: 18px;
  }
`;

const Header = styled.h1`
  font-family: var(--font-primary);
  font-size: 42px;
  font-weight: normal;

  margin-top: 10px;

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
    font-size: 28px;
  }

  @media (max-width: 600px) {
    font-size: 24px;
  }
`;

const Intro = styled.p`
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
`;

const Entries = styled.ul`
  margin-top: 30px;

  & li {
    display: flex;
    align-items: center;
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
  color: var(--color-text);

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

const SunIcon = styled(Sun)`
  width: 25px;
  height: 25px;
  fill: var(--color-h1);

  @media (max-width: 896px) {
    width: 23px;
    height: 23px;
  }

  @media (max-width: 600px) {
    width: 20px;
    height: 20px;
  }
`;

const MoonIcon = styled(Moon)`
  width: 25px;
  height: 25px;
  fill: var(--color-h1);

  @media (max-width: 896px) {
    width: 23px;
    height: 23px;
  }

  @media (max-width: 600px) {
    width: 20px;
    height: 20px;
  }
`;

const ThemeToggle = styled.button`
  width: 25px;
  height: 25px;
  cursor: pointer;
`;

const ContentComp = ({ theme, setTheme }) => {
  return (
    <ContentPanel>
      <ThemeToggle
        onClick={() => {
          if (theme === "light") {
            setTheme("dark");
            localStorage.setItem("theme", "dark");
          } else {
            setTheme("light");
            localStorage.setItem("theme", "light");
          }
        }}
      >
        {theme === "light" ? (
          <MoonIcon />
        ) : theme === "dark" ? (
          <SunIcon />
        ) : null}
      </ThemeToggle>
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
        This is a collection of photo journals - albums that tell vivid stories
        of the many experiences on my trips and travels. Each journal is crafted
        in a unique style of its own, enjoy!
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
