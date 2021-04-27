import React from 'react' 

import styled from 'styled-components'

const OtherBooks = () => {

  return(

    <React.Fragment>
      <Container>
        <ProfileContainer>
          
        </ProfileContainer>
      </Container>
    </React.Fragment>

  )

}

const Container = styled.div`
  margin:20px;
  width: 100%;
  height: 80vh;
  display:flex;
  flex-direction:row;
  justify-content:space-around;
`
const ProfileContainer = styled.section`
    position: relative;
    width:25%;
    height:100%;
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    align-items: center;
`

export default OtherBooks