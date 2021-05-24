import React from 'react'
import styled from 'styled-components'
import {history} from '../redux/configStore'

const GoBack = (props) => {

  <React.Fragment>
    <GoBackBtn>
      <LeftOutlined style={{fontSize:'20px'}} onClick={()=>{history.goBack()}}/>
    </GoBackBtn>
  </React.Fragment>

}

const GoBackBtn = styled.div`
    width:30px;
    height:20px;
    display:flex;
    align-items:center;
    justify-content:flex-start;
`;

export default GoBack;