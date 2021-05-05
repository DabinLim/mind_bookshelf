import React, { useEffect, useState } from "react";
import { CommunityQnA } from "../components/Community/communityindex";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { api as communityActions } from "../redux/modules/community";
import Loader from "react-loader-spinner";
import { setLoading } from "../redux/modules/community"

const Community = () => {
  const dispatch = useDispatch();
  const question_list = useSelector((state) => state.community.question);
  const is_loading = useSelector((state) => state.community.is_loading)

  useEffect(() => {
    dispatch(communityActions.communityQuestionAX());
    return() => {
      dispatch(setLoading(true));
    }
  }, []);

  return (
    <React.Fragment>
      <CommunityContainer>
        <div></div>
        {is_loading? 
        <Loader type="Oval" color="#3d66ba" height={50} width={50} />
        :
        <CommunityBox>
          {question_list !== 0
            ? question_list.map((q) => {
                return <CommunityQnA key={q.id} {...q} />;
              })
            : null}
        </CommunityBox>
        }
      </CommunityContainer>
    </React.Fragment>
  );
};

const CommunityBox = styled.div`
  // width: 100%;
  height:100vh;
  margin: 40px 0px 0px 291px;
  display: flex;
  flex-direction: column;
  overflow-y:auto;
`;

const CommunityContainer = styled.div`
  width: 100%;
  // height:100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-y:auto;
`;

export default Community;
