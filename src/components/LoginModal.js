import React from 'react'

import styled from 'styled-components'

const LoginModal = (props) => {

  return(
    <React.Fragment>
      <Background onClick={props.close} />
      <LoginBox>
        <Header>
          Login
        </Header>
        <ButtonContainer>
          <Button style={{background: "#FFFFFF", borderBottom: "1px solid #e9ecef"}} href="http://lkj99.shop/auth/google" >
            <ButtonIcon src="https://www.freedomforuminstitute.org/wp-content/uploads/2016/10/google-icon.png" />
            <ButtonText>구글로 로그인</ButtonText>
          </Button>
          <Button style={{background: "#FAE100"}} href="http://lkj99.shop/auth/kakao"  >
            <ButtonIcon src="https://blog.kakaocdn.net/dn/RvGHm/btq0c3b6Thg/7CI0zUHJcapuNgqLP1K5xK/img.png" />
            <ButtonText>카카오로 로그인</ButtonText>
          </Button>
          <Button style={{background: "#00C300"}} href="http://lkj99.shop/auth/naver" >
            <ButtonIcon src="https://blog.kakaocdn.net/dn/czMTX6/btqNbvGUwIu/xxqSeZd4eRMvTHqbfIZUd0/img.png" />
            <ButtonText style={{color: "white", fontWeight: "400"}} >네이버로 로그인</ButtonText>
          </Button>
        </ButtonContainer>
      </LoginBox>
    </React.Fragment>
  )

}

const Background = styled.div`
  position: fixed;
  top: 0;
  left:0;
  opacity: 0.4;
  height: 100vh;
  width: 100vw;
  background-color: black;
  z-index: 20;
`

const LoginBox = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 500px;
  height: 400px;
  transform: translate(-50%, -50%);
  background-color: #FAFAFA;
  z-index: 30;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 500px){
    height: 200px;
    width: 90%;
  };
`

const Header = styled.div`
  font-weight: 600;
  font-size: 20px;
  margin-top: 30px;
`

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  @media (max-width: 500px){
    flex-direction: row;
  };
`

const Button = styled.a`
  height: 50px;
  padding: 8px 0;
  margin-top: 8px;
  display: flex;
  align-items: center;
  cursor: pointer;
  border-radius: 5px;
  text-decoration: none;
  color: black;
  @media (max-width: 500px){
    margin-right: 8px;
    margin-left: 8px;
  };
`
const ButtonIcon = styled.img`
  width: 50px;
  height: auto;
  padding: 0px 10px;
`
const ButtonText = styled.div`
  text-align: center;
  width: 300px;
  margin: auto;
  font-size: 20px;
  font-weight: 600;
  @media (max-width: 500px){
    display:none;
  };
  
`

export default LoginModal;