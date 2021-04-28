import React, {useEffect} from 'react'
import {useDispatch} from 'react-redux' 
import { setCookie, getCookie, deleteCookie } from '../shared/Cookie';
import {api as userActions} from '../redux/modules/user'
import styled from "styled-components"
import Loader from "react-loader-spinner"
import axios from "axios";

const Auth = (props) => {
  const jwtToken = props.match.params.id;
  const dispatch = useDispatch();
  useEffect(() => {
    setCookie('is_login', jwtToken);
    axios.defaults.headers.common["Authorization"]= `Bearer ${getCookie('is_login')}`;
    dispatch(userActions.SocialLoginAX());
  }, [])

  return(
    <React.Fragment>
      <SpinContainer>
          <Loader
            type="Oval"
            color="#3d66ba"
            height={120}
            width={120}
          />
        </SpinContainer>
    </React.Fragment>
  )


}

const SpinContainer = styled.div`
  margin: auto;
  margin-top: 250px;
  display: flex;
  justify-content: center;
`

export default Auth