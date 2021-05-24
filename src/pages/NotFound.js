import React from 'react';
import styled from 'styled-components'
import {history} from '../redux/configStore'

const NotFound = (props) => {

  return(
    <React.Fragment>
      <NotFoundContainer>
        <NotFoundNumber>
          404
        </NotFoundNumber>
        <NotFoundHeader>
          Page not found
        </NotFoundHeader>
        <NotFoundText>
          요청하신 페이지는 찾을 수 없는 페이지입니다. <br/>
          입력하신 주소가 맞는지 다시 한 번 확인해주세요.
        </NotFoundText>
        <NotFoundButton onClick={() => {history.push('/')}}>
          GO BACK HOME
        </NotFoundButton>
      </NotFoundContainer>
    </React.Fragment>
  )
}

const NotFoundContainer = styled.div`
  display: flex;
  margin: auto;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  cursor: context-menu;
`

const NotFoundNumber = styled.div`
  font-size: 120px;
  font-weight: 600;
  padding: 0;
`

const NotFoundHeader = styled.div`
  font-size: 29px;
  font-weight: 600;
`

const NotFoundText = styled.div`
  margin-top: 15px;
  font-size: 15px;
  text-align: center;
`

const NotFoundButton = styled.div`
  margin-top: 24px;
  font-weight: 600;
  padding: 10px 20px;
  background: #473674;
  color: white;
  border-radius: 45px;
  cursor: pointer;
`


export default NotFound;