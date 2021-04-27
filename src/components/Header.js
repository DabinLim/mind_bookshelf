import React, {useState} from 'react' 
import styled from 'styled-components'
import LoginModal from './LoginModal'
import {useSelector, useDispatch} from 'react-redux'
import {logOut} from '../redux/modules/user'

const Header = () => {
  const dispatch = useDispatch()
  const is_login = useSelector((state) => state.user.is_login)
  const [loginModal, setLogin] = useState(false) 

  const closeLoginModal = () => {
    setLogin(false)
  }

  console.log(is_login)
  
  if(is_login){
    return(
      <React.Fragment>
        <HeaderContainer>
          <HeaderInnerContainer>
          <TextBtn onClick={() => {dispatch(logOut())}}>Logout</TextBtn>
          </HeaderInnerContainer>
        </HeaderContainer>
      
      </React.Fragment>
    )
  }
      
    return(
        <React.Fragment>
          {loginModal? 
          <LoginModal close={closeLoginModal} />
          :null}
          <HeaderContainer>
            <HeaderInnerContainer>
              <TextBtn onClick={()=>{setLogin(true)}} >Login</TextBtn>
            </HeaderInnerContainer>
          </HeaderContainer>
        </React.Fragment>
    )
  


}

const HeaderContainer = styled.div`
  position: fixed;
  width: 100vw;
  height: 55px;
  background-color: transparent;
  border-bottom: 1px solid #e9ecef;
  left:0;
  top:0;
  z-index:5;
  margin-bottom:10px;


`

const HeaderInnerContainer = styled.div`
    display: flex;
    align-items: center;
    margin:auto;
    width: 90%;
    height: 100%;
    justify-content: flex-end;
    padding: 0 20px 0 20px;
    box-sizing: border-box;
`

const TextBtn = styled.div`
  font-size: 18px;
  cursor: pointer;

`

export default Header