import React from "react";
import logoImages from "../static/images/logo.png"
import NaverIcon from "../static/images/naver.png"
import GoogleIcon from "../static/images/google.png"
import KaKaoIcon from "../static/images/kakao.png"
import styled from "styled-components";

const LoginModal = (props) => {
  return (
    <React.Fragment>
      <Background onClick={props.close} />
      <LoginBox>
        <Logo src={logoImages} />
        <Header>로그인</Header>
        <MobileHeader>생각낙서</MobileHeader>
        <MobileBodyText>
        5분만에 완성되는 나만의 책장 <br/>
        로그인 시 이용 가능합니다.
        </MobileBodyText>
        <ButtonContainer>
          <Button
            style={{ background: "#FAE100", border:"none" }}
            href="http://lkj99.shop/auth/kakao"
          >
            <ButtonIcon src={KaKaoIcon} />
            <ButtonText>카카오로 로그인</ButtonText>
          </Button>
          <Button
            style={{ background: "#FFFFFF", marginTop: "0" }}
            href="http://lkj99.shop/auth/naver"
          >
            <ButtonIcon src={NaverIcon} />
            <ButtonText>
              네이버로 로그인
            </ButtonText>
          </Button>
          <Button
            style={{ background: "#FFFFFF", marginTop: "0", marginBottom: "0" }}
            href="http://lkj99.shop/auth/google"
          >
            <ButtonIcon src={GoogleIcon} />
            <ButtonText>구글로 로그인</ButtonText>
          </Button>
        </ButtonContainer>
      </LoginBox>
    </React.Fragment>
  );
};

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  opacity: 0.4;
  height: 100vh;
  width: 100vw;
  background-color: black;
  z-index: 600;
`;

const LoginBox = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 380px;
  transform: translate(-50%, -50%);
  background-color: #FFFFFF;
  z-index: 610;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 500px) {
    // height: 256px;
    width: 280px;
  } ;
`;

const Logo = styled.img`
width: 140px;
height: 140px;
object-fit: cover;
margin-top: 45px;
@media (max-width: 500px) {
  display: none;
} ;
`
const MobileHeader = styled.div`
font: normal normal bold 20px/29px Noto Sans CJK KR;
margin-top: 23px;
@media (max-width: 500px) {
  display: none;
} ;
`

const MobileBodyText = styled.div`
font: normal normal normal 14px/20px Noto Sans CJK KR;
text-align: center;
margin-top: 10px;
@media (max-width: 500px) {
  display: none;
} ;
`

const Header = styled.div`
  font: normal normal bold 16px/20px Sans CJK KR;
  color: #121212;
  margin-top: 22px;
  margin-bottom: 22px;
  @media (min-width: 500px) {
    display:none;
  } ;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 33px;
  @media (max-width: 500px) {

  } ;
`;

const Button = styled.a`
  height: 46px;
  width: 290px;
  padding: 8px 0;
  margin-top: 48px;
  display: flex;
  align-items: center;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  color: black;
  border: 0.699999988079071px solid #D3D3D3;
  box-sizing: border-box;
  margin-bottom: 16px;
  @media (max-width: 500px) {
    width: 200px;
    height: 46px;
    margin-top: 0px;
    margin-bottom: 10px;
  } ;
`;
const ButtonIcon = styled.img`
  width: 50px;
  height: auto;
  padding: 0px 10px;
  @media (max-width: 500px) {

  } ;
`;
const ButtonText = styled.div`
  text-align: center;
  margin: auto;
  font: normal normal normal 16px/24px Noto Sans CJK KR;
  @media (max-width: 500px) {
    font: normal normal medium 14px/20px Sans CJK KR;
  } ;
`;

export default LoginModal;
