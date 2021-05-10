import React, { useEffect, useState } from "react";
import { CommunityQnA } from "../components/Community/communityindex";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { api as communityActions } from "../redux/modules/community";
import Loader from "react-loader-spinner";
import { setLoading } from "../redux/modules/community";

const Community = () => {
  const dispatch = useDispatch();
  const question_list = useSelector((state) => state.community.question);
  const is_loading = useSelector((state) => state.community.is_loading);

  useEffect(() => {
    dispatch(communityActions.communityQuestionAX());
    return () => {
      dispatch(setLoading(true));
    };
  }, []);

  return (
    <React.Fragment>
      <ImgRight />
      <ImgLeft />
      <CommunityContainer>
        <div></div>
        {is_loading ? (
          <Loader type="Oval" color="#3d66ba" height={50} width={50} />
        ) : (
          <CommunityBox>
            {question_list !== 0
              ? question_list.map((q) => {
                  return <CommunityQnA key={q.id} {...q} />;
                })
              : null}
          </CommunityBox>
        )}
      </CommunityContainer>
    </React.Fragment>
  );
};

const CommunityBox = styled.div`
  // width: 100%;
  height: 100vh;
  margin: 100px 0px 0px 271px;
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
    };
`;

const CommunityContainer = styled.div`
  z-index: 2;
  width: 100%;
  // height:100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: auto;
`;

const ImgRight = styled.div`
  // z-index:-1;
  position: fixed;
  background-image: url("https://user-images.githubusercontent.com/77574867/116996886-0c785d80-ad17-11eb-9afd-175a104b7f33.png");
  background-size: contain;
  background-repeat: no-repeat;
  right: -70px;
  bottom: -13px;
  width: 593px;
  height: 731px;
  opacity: 0.8;
  pointer-events: none;
  @media (max-width: 1400px) {
    display: none;
  }
`;

const ImgLeft = styled.div`
  // z-index:2;
  position: fixed;
  background-image: url("https://user-images.githubusercontent.com/77574867/116996878-0b473080-ad17-11eb-8910-108950e25cb8.png");
  background-size: contain;
  background-repeat: no-repeat;
  left: -20px;
  top: 249px;
  width: 365px;
  height: 341px;
  opacity: 0.8;
  pointer-events: none;
  @media (max-width: 1400px) {
    display: none;
  }
`;

export default Community;
