import React, { useEffect, useState } from "react";
import { CommunityQnA } from "../components/Community/communityindex";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { api as communityActions } from "../redux/modules/community";
import Loader from "react-loader-spinner";
import { setLoading } from "../redux/modules/community";
import ReplayIcon from "@material-ui/icons/Replay";
import { CardModal } from "../components/Community/communityindex";
import { api as commentActions } from "../redux/modules/comment";
import {history} from '../redux/configStore';

const Community = () => {
  const dispatch = useDispatch();
  const question_list = useSelector((state) => state.community.question);
  const is_loading = useSelector((state) => state.community.is_loading);
  const [cardModal, setCardModal] = useState(false);

  useEffect(() => {
    dispatch(communityActions.communityQuestionAX());
    return () => {
      dispatch(setLoading(true));
    };
  }, []);

  const openCard = (a) => {
    if(window.innerWidth <= 750){
      history.push(`/carddetail/${a.answerId}`)
      return
    }
    const type = "community";
    setCardModal(true);
    dispatch(communityActions.getCardDetail(a.answerId, type));
    dispatch(commentActions.getCommentAX(a.answerId));
  };

  const closeCardModal = () => {
    setCardModal(false);
  };

  return (
    <React.Fragment>
      {cardModal ? <CardModal close={closeCardModal} /> : null}
      {is_loading ? (
        <CommunityBtn style={{ paddingTop: "5px" }}>
          <Loader type="TailSpin" color="Black" height={30} width={30} />
        </CommunityBtn>
      ) : (
        <CommunityBtn
          onClick={() => {
            dispatch(communityActions.communityQuestionAX());
            dispatch(setLoading(true));
          }}
        >
          <ReplayIcon fontSize="large" />
        </CommunityBtn>
      )}
      <CommunityContainer>
        {is_loading ? (
          <div style={{ marginTop: "250px" }}>
            {/* <LoadImage src="https://user-images.githubusercontent.com/67696504/118778023-a964fa00-b8c4-11eb-833b-571bae2f476f.png" /> */}
            <Loader type="Oval" color="#000000" height={100} width={100} />
          </div>
        ) : (
          <CommunityBox>
            {question_list !== 0
              ? question_list.map((q) => {
                  return <CommunityQnA key={q.id} {...q} openCard={openCard} />;
                })
              : null}
          </CommunityBox>
        )}
      </CommunityContainer>
    </React.Fragment>
  );
};

const CommunityBtn = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  right: 26px;
  bottom: 100px;
  width: 63px;
  height: 63px;
  border-radius: 50px;
  background: white;
  z-index: 50;
  cursor: pointer;
  box-shadow: 0px 0px 20px #0000001a;
  @media (max-width: 500px) {
    width: 50px;
    height: 50px;
    right: 14px;
    bottom: 80px;
  }
`;

const CommunityBox = styled.div`
  // height: 100vh;
  margin: 50px 0px 0px 0px;
  width: 100%;
  max-width: 1200px;
  padding: 0px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  @media (max-width: 900px) {
    margin: 50px 0px 0px 0px;
  }
  @media (max-width: 500px) {
    margin: 50px 0px 0px 0px;
  }
  ::-webkit-scrollbar {
    display: none;
    width: 10px; /* width of the entire scrollbar */
  }

  ::-webkit-scrollbar-track {
    display: none;
    background: none; /* color of the tracking area */
  }

  ::-webkit-scrollbar-thumb {
    display: none;
    background-color: #ffffff; /* color of the scroll thumb */
    border-radius: 20px; /* roundness of the scroll thumb */
  }
  @media (max-width: 750px) {
    margin: 50px 0px 0px 0px;
    // padding: 20px 20px;
  }
`;

const CommunityContainer = styled.div`
  z-index: 2;
  width: 100%;
  // height:100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  // overflow-y: auto;
  @media (max-width: 900px) {
    z-index: 20;
  }
`;

const LoadImage = styled.img`
  width: 200px;
  height: 200px;


`

export default Community;
