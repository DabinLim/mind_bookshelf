import React, { useEffect, useState } from "react";
import { CommunityQnA } from "../components/Community/communityindex";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { api as communityActions,resetAll } from "../redux/modules/community";
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
      dispatch(resetAll())
      history.push(`/carddetail/${a.answerId}`)
      return
    }
    const type = "community";
    setCardModal(true);
    dispatch(resetAll());
    dispatch(communityActions.getCardDetail(a.answerId, type));
    dispatch(communityActions.getLikeList(a.answerId));
    dispatch(commentActions.getCommentAX(a.answerId));
  };

  const closeCardModal = () => {
    setCardModal(false);
  };

  return (
    <React.Fragment>
      {cardModal ? <CardModal close={closeCardModal} /> : null}
      {is_loading ? (
        <CommunityBtnIcon style={{ paddingTop: "5px" }}>
          <Loader type="TailSpin" color="white" height={30} width={30} />
        </CommunityBtnIcon>
      ) : (
        <CommunityBtnIcon
          onClick={() => {
            dispatch(communityActions.communityQuestionAX());
            dispatch(setLoading(true));
          }}
        >
          <ReplayIcon fontSize="large" style={{color:"white"}} />
        </CommunityBtnIcon>
      )}
       <CommunityBtn
          onClick={() => {
            dispatch(communityActions.communityQuestionAX());
            dispatch(setLoading(true));
          }}
        > 새로 고침
        </CommunityBtn>
      <CommunityContainer>
        {is_loading ? (
          <div style={{ marginTop: "250px" }}>
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

const CommunityBtnIcon = styled.div`
position: fixed;
display: flex;
justify-content: center;
font-weight: bold;
align-items: center;
right: 26px;
bottom: 100px;
width: 63px;
height: 63px;
border-radius: 50px;
background: black;
z-index: 60;
cursor: pointer;
box-shadow: 0px 0px 20px #0000001a;
@media (max-width: 500px) {
  width: 50px;
  height: 50px;
  right: 14px;
  bottom: 80px;
}

`

const CommunityBtn = styled.div`
  position: fixed;
  display: flex;
  padding-left: 20px;
  font-family: Noto Sans CJK KR;
  font-weight: bold;
  align-items: center;
  right: 34px;
  bottom: 102px;
  width: 140px;
  height: 58px;
  border-radius: 50px;
  background: white;
  z-index: 50;
  cursor: pointer;
  box-shadow: 0px 0px 20px #0000001a;
  @media (max-width: 500px) {
    display:none;
  }
`;

const CommunityBox = styled.div`
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
    margin: 70px 0px 0px 0px;
  }
`;

const CommunityContainer = styled.div`
background-image: url("https://user-images.githubusercontent.com/77369674/118811425-f73f2980-b8e7-11eb-919a-d4421378e117.png");
    background-size: cover;
    background-repeat: no-repeat;
  z-index: 2;
  width: 100%;
  height:100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 900px) {
    z-index: 20;
  }
  @media (max-width:750px){
    background-image: url("https://user-images.githubusercontent.com/67696504/118986623-7b61e180-b9ba-11eb-9719-f898c5c5b7a2.png");
    height:100%;
}
`;

export default Community;
