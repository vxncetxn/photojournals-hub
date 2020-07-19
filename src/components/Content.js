import React from "react";
import styled from "styled-components";

const ContentPanel = styled.div`
  width: 30%;
  padding: 50px 60px;
  font-family: var(--font-secondary);
  font-size: 20px;
  color: var(--color-text);
  transition: color 0.3s ease-out;

  //   border: 1px solid red;
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

const Content = styled.div`
  margin-top: 50px;

  & > * + * {
    margin-top: 10px;
  }
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
      <Content>
        <div>#europe2k19</div>
        <div>#taiwanexchange</div>
      </Content>
    </ContentPanel>
  );
};

export default ContentComp;
