import React from 'react'
import styled from 'styled-components' 
import { api as userActions } from "../../redux/modules/user";
import {useDispatch} from 'react-redux'
import swal from "sweetalert";


const WithdrawalModal = (props) => {
  const dispatch = useDispatch()
  const [input, setInput] = React.useState();

  const changeNickname=(e)=>{
    if(e.target.value.length > 10){
      return
    }
    setInput(e.target.value)
  }

  return(
    <React.Fragment>
      <Background onClick={() => {props.setWidthdrawal(false)}} />
      <WithdrawalContainer>
        <Head>정말로 탈퇴하실건가요??</Head>
        <InputContainer>
          <InputLabel for="nickname" >자신의 닉네임을 적어주세요.</InputLabel>
          <Input value={input} id="nickname" placeholder={props.nickname} onChange={changeNickname} />
        </InputContainer>
        <ButtonContainer>
          {input === props.nickname? 
          <Button style={{color:"#EB5959", borderTop: '0.5px solid #D3D4D3'}} onClick={() => {dispatch(userActions.withdrawalAX())}} >탈퇴</Button>
          :
          <Button style={{color:"silver", borderTop: '0.5px solid #D3D4D3'}} 
            onClick={()=>{swal({
              title: "닉네임이 제대로 적혔는지 확인해주세요.",
              text: `${props.nickname}가 적혀있는지 확인해주세요.`,
              icon: "error",
            });}}
          >탈퇴</Button>
          }
          <Button style={{borderTop: '0.5px solid #D3D4D3'}} onClick={() => {props.setWidthdrawal(false)}} >취소</Button>
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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  top: 50%;
  left: 50%;
  width: 280px;
  transform: translate(-50%, -50%);
  background: #FFFFFF;
  z-index: 360;
`
const Head = styled.div`
  margin: 30px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align:center;
  font: normal normal medium 14px/20px Noto Sans CJK KR  ;
`

const InputContainer = styled.div`
display:flex;
flex-direction: column;
align-items: center;
margin-bottom: 15px;
`

const InputLabel = styled.label`
font: normal normal normal 11px Noto Sans CJK KR;
margin-bottom: 5px;
`

const Input = styled.input`
display: block;
outline: none;
background: #F5F5F5 0% 0% no-repeat padding-box;
height: 35px;
padding: 0px 15px;
font: normal normal normal 13px/19px Noto Sans CJK KR;
width: 170px;
border: none;
box-sizing: border-box;
border-radius: 5px;
::placeholder {
  color: silver;
}
`

const ButtonContainer = styled.div`
height: 94px;
display: flex;
flex-direction: column;
align-items: center;
`

const Button = styled.div`
width: 100%;
height: 47px;
display: flex;
align-items: center;
justify-content: center;
font: normal normal normal 14px/20px Noto Sans CJK KR;
cursor: pointer;
`

export default WithdrawalModal