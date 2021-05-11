import React from 'react'
import styled from 'styled-components' 
import { api as userActions } from "../../redux/modules/user";
import {useDispatch} from 'react-redux'


const WithdrawalModal = (props) => {
  const dispatch = useDispatch()

  return(
    <React.Fragment>
      <Background onClick={() => {props.setWidthdrawal(false)}} />
      <WithdrawalContainer>
        <Head>정말로 탈퇴하실건가요??</Head>
        <ButtonContainer>
          <Button onClick={() => {dispatch(userActions.withdrawalAX())}} >탈퇴</Button>
          <Button style={{marginLeft:"30px"}} onClick={() => {props.setWidthdrawal(false)}} >취소</Button>
        </ButtonContainer>
      </WithdrawalContainer>
    </React.Fragment>
  )


}

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  opacity: 0.4;
  height: 100vh;
  width: 100vw;
  background-color: black;
  z-index: 110;
`;

const WithdrawalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 500px;
  height: 400px;
  transform: translate(-50%, -50%);
  background-color: #FAFAFA;
  z-index: 120;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 500px){
    height: 200px;
    width: 90%;
  };
`
const Head = styled.div`
  font-weight: 600;
  font-size: 20px;
  margin-top: 40px;
`

const ButtonContainer = styled.div`
  display: flex;
  margin-top: 50px;

`

const Button = styled.div`
  cursor: pointer;
  font-size: 24px;
  &:hover{
    font-weight: 600;
  }

`

export default WithdrawalModal