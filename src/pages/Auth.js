import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCookie, getCookie, deleteCookie } from "../shared/Cookie";
import { api as userActions } from "../redux/modules/user";
import { api as answerActions } from "../redux/modules/answer";
import styled from "styled-components";
import Loader from "react-loader-spinner";

const Auth = (props) => {
  const jwtToken = props.match.params.id;
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(jwtToken);
    setCookie("is_login", jwtToken);
    dispatch(userActions.SocialLoginAX(jwtToken));
    dispatch(answerActions.getQuestionAX());
  }, []);

  return (
    <React.Fragment>
      <SpinContainer>
        <Loader type="Oval" color="#3d66ba" height={120} width={120} />
      </SpinContainer>
    </React.Fragment>
  );
};

const SpinContainer = styled.div`
  margin: auto;
  margin-top: 250px;
  display: flex;
  justify-content: center;
`;

export default Auth;
