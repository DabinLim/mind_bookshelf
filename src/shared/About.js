import React from 'react';
import styled from 'styled-components';

const About  = (props) => {
  return (
    <React.Fragment>
      <Component onClick={() => {props.setAboutModal(false)}} />
      <ModalComponent>
        {/* <HeaderContainer>
          사이트 소개
        </HeaderContainer> */}
        <ContentsContainer>
          <div>
            <ImageContainer src="https://user-images.githubusercontent.com/67696504/117532322-dd693100-b021-11eb-81de-abdf05670f0e.png" />
          </div>
          <div>
            <Content>
              생각을 낙서하며, 나와 주변의 생각의 역사들을 <br/> 
              책장처럼 정리해둔 서비스입니다.<br/><br/>
            </Content>
            <LinkContainer>
              Notion : <Link href="https://www.notion.so/236571f296c0486e803d7da663172ebf" >생각낙서 노션</Link> <br/>
            </LinkContainer>
            <LinkContainer>
              사이트 설문 : <Link href="https://forms.gle/SFxL22PrETj23CBD8">구글 설문지</Link>
            </LinkContainer>
          </div>
        </ContentsContainer>
      </ModalComponent>
    </React.Fragment>
  )
}

const Component = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: black;
  z-index: 40;
  opacity: 0.4;
`

const ModalComponent = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  z-index:50;
  width: 550px;
  border-radius: 15px;
  opacity: 0.9;
  @media (max-width: 600px){
    width: 85%;
  };
  @media (max-width: 450px){
    width: 95%;
    height: 400px;
  }
`

const HeaderContainer = styled.div`
  margin-top: 30px;
  font-weight: 600;
  font-size: 24px;

`

const Content = styled.div`
  font-size: 15px;
  margin-top: 30px;
  // margin-bottom: 30px;
`

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
    };
`

const Bold = styled.span`
    font-weight: bold;
`

const ImageContainer = styled.img`
    width: 100%;
    height: 200px;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
`

const ExitBtn = styled.button`
  border: none;
  outline: none;
  cursor: pointer;
  font-weight: 600;
  font-size: 18px;
  background-color: #FFCC4D;
  border-radius: 5px;
  padding: 8px 12px;
  margin-bottom: 30px;
`

const LinkContainer = styled.div`
  text-align: center;
  font-size: 13px;
`

const Link = styled.a`
  text-decoration: none;
`

export default About