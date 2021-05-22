import React, {useState} from "react";
import styled from "styled-components";
import FriendPostList from "../components/Friends/FriendPostList";
import {useDispatch, useSelector} from "react-redux";
import {api as friendsActions} from "../redux/modules/friends";
import {setLoading} from "../redux/modules/friends";
import {history} from "../redux/configStore";
import swal from "sweetalert";
import CardModal from "../components/Community/CardModal";
import { api as commentActions } from "../redux/modules/comment";
import { api as communityActions } from "../redux/modules/community";
import FriendPost from "../components/Friends/FriendPost";

const FriendsGround = (props) => {
    const dispatch = useDispatch();
    const friends_list = useSelector((state) => state.friends.answer_list);
    const is_next = useSelector((state) => state.friends.is_next);
    const [cardModal, setCardModal] = useState(false);

    const openCard = (a) => {
      if(window.innerWidth <= 750){
        history.push(`/carddetail/${a}`)
        return
      }
      const type = "detail";
      dispatch(communityActions.getCardDetail(a, type));
      dispatch(commentActions.getCommentAX(a));
      setCardModal(true);
    };

    const closeCardModal = () => {
      setCardModal(false);
    };

    React.useEffect(() => {
        dispatch(friendsActions.getFriendAnswers());
        // else {
        //     swal({
        //         title: "접근 실패 😢",
        //         text: "로그인 후 입장 가능합니다❕",
        //         icon: "error",
        //       });
        //       history.replace("/");
        // }
        return ()=> {
            dispatch(setLoading(true));        
        }
    }, [])

    return (<>
    <Outer>
    {cardModal ? <CardModal close={closeCardModal} /> : null}
        <CommunityContainer>
            <Container>
            <ContainerUpper>
                <QuestionTitle>친구들의 생각을<br/>살펴보세요</QuestionTitle>
            </ContainerUpper>
                <AnswersBox>
                    {friends_list?.map((f, idx) => {
                      return (<><FriendPost openCard={openCard} {...f} key={idx}/></>)
                    })}
                </AnswersBox>
            </Container>
        </CommunityContainer>
    </Outer>
    </>)
}

const Outer = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 150px;
  @media (max-width: 650px) {
    margin-top: 100px;
  }
  @media (max-width: 500px) {
    margin: 50px 0px 0px 0px;
    background-size: cover;
    background-repeat: no-repeat;
    background-image: url("https://user-images.githubusercontent.com/77369674/118459848-1b0f3d80-b737-11eb-8f1a-906da3e390e2.jpeg");
  }
`;

const CommunityContainer = styled.div`
  z-index: 2;
  width: 100%;
  max-width: 1200px;
  height: 100%;
  box-sizing: border-box;
  // height:100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  overflow-y: auto;
`;

const Container = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  ::-webkit-scrollbar {
    width: 10px; /* width of the entire scrollbar */
  }

  ::-webkit-scrollbar-track {
    background: none; /* color of the tracking area */
  }

  ::-webkit-scrollbar-thumb {
    background-color: #ffffff; /* color of the scroll thumb */
    border-radius: 20px; /* roundness of the scroll thumb */
  }
`;

const ContainerUpper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 80px;
  padding: 15px 20px;
  @media (max-width: 500px) {
    margin-top: 10px;
  }
`;

const AnswersBox = styled.div`
  padding: 0px 20px;
  box-sizing: border-box;
  margin: 140px 0px;
  width: 100%;
  max-height: 649px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  overflow-y: auto;
  ::-webkit-scrollbar {
    width: 10px; /* width of the entire scrollbar */
  }

  ::-webkit-scrollbar-track {
    background: none; /* color of the tracking area */
  }

  ::-webkit-scrollbar-thumb {
    background-color: #ffffff; /* color of the scroll thumb */
    border-radius: 20px; /* roundness of the scroll thumb */
  }
  @media (max-width: 650px) {
    ::-webkit-scrollbar {
      display: none;
    }

    ::-webkit-scrollbar-track {
      background: none; /* color of the tracking area */
    }

    ::-webkit-scrollbar-thumb {
      display: none;
    }
    margin: 20px 0px;
  }
`;

const QuestionTitle = styled.h2`
font: normal normal bold 30px/39px Nanum Myeongjo;
  letter-spacing: 0px;
  width: 60%;
  margin: 29px 0 0 0;
  @media (max-width: 750px) {
    margin: 12px 0;
    font: normal normal bold 22px/24px Nanum Myeongjo;
    width: 80%;
    min-height: 100px;
    max-height: 100px;
    overflow: scroll;
  }
  @media (max-width: 650px) {
    width: 226;
    text-align: left;
    font: normal normal 800 19px/27px Nanum Myeongjo;
    letter-spacing: 0px;
    color: #000000;
    opacity: 0.9;
  }
`;

export default FriendsGround;