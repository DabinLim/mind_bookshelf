import React from "react";
import styled from "styled-components";

const About = (props) => {
  return (
    <React.Fragment>
      <Component
        onClick={() => {
          props.setAboutModal(false);
        }}
      />
      <ModalComponent>
        <ContentsContainer>
          <div>
            <Content>
              나와 주변의 생각들을 <br />
              책장처럼 정리해둔 서비스입니다.
              <br />
              <br />
            </Content>

            <LinkContainer>
              사이트 설문 :{" "}
              <Link target="_blank" href="https://forms.gle/SFxL22PrETj23CBD8">
                설문지
              </Link>
            </LinkContainer>
            <LinkContainer>
            크롬 익스텐션 :{" "}
              <Link target="_blank" href="https://chrome.google.com/webstore/detail/%EC%83%9D%EA%B0%81%EB%82%99%EC%84%9C/bjjoklgeipleefnllgkcmacojnmbplga?hl=ko&">
                생각낙서
              </Link>
            </LinkContainer>
            <div style={{borderTop:"0.3px black solid", width: '150px', margin:'auto', marginTop:"15px",marginBottom:"15px"}}>
              
            </div>
            <LinkContainer>
              Notion :{" "}
              <Link target="_blank" href="https://www.notion.so/5ba8f469ecb346109d73439c05c095e6">
                생각낙서 노션
              </Link>{" "}
              <br />
            </LinkContainer>
            <LinkContainer>
              Instagram :{" "}
              <Link target="_blank" href="https://www.instagram.com/think_doodle/">
                인스타그램
              </Link>
            </LinkContainer>
            <LinkContainer>
              Facebook :{" "}
              <Link target="_blank" href="https://www.facebook.com/thinkdoodle1004">
                페이스북
              </Link>
            </LinkContainer>
          </div>
        </ContentsContainer>
      </ModalComponent>
    </React.Fragment>
  );
};

const Component = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: black;
  z-index: 140;
  opacity: 0.4;
`;

const ModalComponent = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  z-index: 160;
  width: 300px;
  opacity: 1;

`;


const Content = styled.div`
  font-size: 15px;
  margin-top: 10px;

`;

const ContentsContainer = styled.div`
  text-align: center;
  padding: 20px 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 18px;
  line-height: 1.8;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }

`;

const LinkContainer = styled.div`
  text-align: center;
  font-size: 13px;
`;

const Link = styled.a`
  text-decoration: none;
`;

export default About;
