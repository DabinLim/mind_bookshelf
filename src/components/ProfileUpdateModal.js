import React, {useState} from 'react' 
import styled from 'styled-components'
import CreateIcon from '@material-ui/icons/Create';
import Upload from '../shared/Upload'
import {useSelector} from 'react-redux'

const ProfileUpdateModal = (props) => {
  const user_info = useSelector((state) => state.user.user)
  const [edit_introduce, setIntroduce] = useState(false)
  const [edit_nickname, setNickname] = useState(false)

  return(
    <React.Fragment>
      <Background onClick={props.close} />
      <UpdateBox>
        <ImageUpdate>
          <Upload/>
          <ImageIcon src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-camera-512.png" />
        </ImageUpdate>
        {edit_nickname? 
        <InputContainer>
          <Input value={user_info.nickname} />
          <InputButton onClick={()=> {setNickname(false)}} >확인</InputButton>
        </InputContainer>
        : 
        <InputContainer>
          <String>{user_info.nickname}</String>
          <StringButton onClick={()=> {setNickname(true)}} ><CreateIcon/></StringButton>
        </InputContainer>
        }
        {edit_introduce? 
        <InputContainer>
          <Input value={user_info.introduce? user_info.introduce : "자신의 대해서 적어주세요."} />
          <InputButton onClick={()=> {setIntroduce(false)}} >확인</InputButton>
        </InputContainer>
        : 
        <InputContainer>
          <String>{user_info.introduce? user_info.introduce : "자신의 대해서 적어주세요."}</String>
          <StringButton onClick={()=> {setIntroduce(true)}} ><CreateIcon/></StringButton>
        </InputContainer>
        }
      </UpdateBox>
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

const UpdateBox = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 600px;
  transform: translate(-50%, -50%);
  background-color: #FAFAFA;
  z-index: 30;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`

const ImageUpdate = styled.div`
  position: relative;
  margin: 50px 0;
`

const ImageIcon = styled.img`
  width: 25px;
  height: 25px;
  position: absolute;
  top: 110px;
  right: 12px;
  border-radius: 30px;
  background: silver;
  padding: 5px;
  cursor: pointer;
`

const InputContainer = styled.div`
  margin-bottom: 60px;
  display: flex;
`

const Input = styled.input`
  display: block;
  outline: none;
  border: none;
  background-color: transparent;
  border-bottom: 1px solid black;
  padding: 5px;
  font-size: 20px;
  width: 350px;
  border-box: box-sizing;
`

const InputButton = styled.div`
  margin-left: 20px;
  font-size: 20px;
  font-weight: 600;
  cursor:pointer;
`

const String = styled.div`
  font-size: 20px;
  width: 350px;
`

const StringButton = styled.div`
  margin-left: 20px;
  cursor:pointer;
`

export default ProfileUpdateModal