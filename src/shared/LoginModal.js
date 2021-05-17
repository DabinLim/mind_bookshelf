import React from "react";

import styled from "styled-components";

const LoginModal = (props) => {
  return (
    <React.Fragment>
      <Background onClick={props.close} />
      <LoginBox>
        <Header>로그인</Header>
        <ButtonContainer>
          <Button
            style={{ background: "#FFFFFF", marginTop: "0" }}
            href="http://lkj99.shop/auth/google"
          >
            <ButtonIcon src="https://www.freedomforuminstitute.org/wp-content/uploads/2016/10/google-icon.png" />
            <ButtonText>구글로 로그인</ButtonText>
          </Button>
          <Button
            style={{ background: "#FFFFFF" }}
            href="http://lkj99.shop/auth/naver"
          >
            <ButtonIcon src="https://m.animalplanet.co.kr/assets/image/icon/icon_main_naver.png" />
            <ButtonText>
              네이버로 로그인
            </ButtonText>
          </Button>
          <Button
            style={{ background: "#FAE100", border:"none" }}
            href="http://lkj99.shop/auth/kakao"
          >
            <ButtonIcon src="https://blog.kakaocdn.net/dn/RvGHm/btq0c3b6Thg/7CI0zUHJcapuNgqLP1K5xK/img.png" />
            <ButtonText>카카오로 로그인</ButtonText>
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
  z-index: 21;
`;

const LoginBox = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 500px;
  height: 400px;
  transform: translate(-50%, -50%);
  background-color: #FFFFFF;
  z-index: 30;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 500px) {
    height: 256px;
    width: 280px;
  } ;
`;

const Header = styled.div`
  font-weight: 600;
  font-size: 20px;
  color: #121212;
  margin-top: 22px;
  margin-bottom: 22px;
  @media (max-width: 500px) {
    font: normal normal bold 14px/20px Noto Sans KR;
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
  height: 50px;
  width: 300px;
  padding: 8px 0;
  margin-top: 8px;
  display: flex;
  align-items: center;
  cursor: pointer;
  text-decoration: none;
  color: black;
  border: 0.699999988079071px solid #D3D3D3;
  @media (max-width: 500px) {
    width: 200px;
    height: 46px;
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
  font-size: 20px;
  font-weight: 600;
  @media (max-width: 500px) {
    font-size: 15px;
  } ;
`;

export default LoginModal;
