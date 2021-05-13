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
        {/* <HeaderContainer>
          사이트 소개
        </HeaderContainer> */}
        <ContentsContainer>
          <div>
            <ImageContainer src="https://user-images.githubusercontent.com/67696504/118116495-4e935480-b425-11eb-83ac-e1d08bf27ee8.png" />
          </div>
          <div>
            <Content>
              나와 주변의 생각들을 <br />
              책장처럼 정리해둔 서비스입니다.
              <br />
              <br />
            </Content>

            <LinkContainer>
              사이트 설문 :{" "}
              <Link href="https://forms.gle/SFxL22PrETj23CBD8">
                설문지
              </Link>
            </LinkContainer>
            <div style={{borderTop:"0.3px black solid", width: '150px', margin:'auto', marginTop:"15px",marginBottom:"15px"}}>
              
            </div>
            <LinkContainer>
              Notion :{" "}
              <Link target="_blank" href="https://www.notion.so/236571f296c0486e803d7da663172ebf">
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
  width: 550px;
  border-radius: 15px;
  opacity: 0.9;
  @media (max-width: 600px) {
    width: 85%;
  }
  @media (max-width: 450px) {
    width: 95%;
    // height: 400px;
  }
`;


const Content = styled.div`
  font-size: 15px;
  margin-top: 30px;
  @media (max-width: 450px) {
    margin-top:10px;
  }
`;

const ContentsContainer = styled.div`
  text-align: center;
  padding: 70px 0;
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
  @media (max-width: 450px) {
    padding: 20px 0;
  }
`;

const ImageContainer = styled.img`
  width: 100%;
  height: 200px;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
`;


const LinkContainer = styled.div`
  text-align: center;
  font-size: 13px;
`;

const Link = styled.a`
  text-decoration: none;
`;

export default About;
