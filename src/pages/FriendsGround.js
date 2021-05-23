import React, {useState} from "react";
import styled from "styled-components";
import FriendPostList from "../components/Friends/FriendPostList";
import {useDispatch, useSelector} from "react-redux";
import {api as friendsActions} from "../redux/modules/friends";
import {setLoading, setInitialLoading} from "../redux/modules/friends";
import {history} from "../redux/configStore";
import swal from "sweetalert";
import CardModal from "../components/Community/CardModal";
import { api as commentActions } from "../redux/modules/comment";
import { api as communityActions } from "../redux/modules/community";
import FriendPost from "../components/Friends/FriendPost";
import InfinityScroll from '../shared/InfinityScroll'
import Loader from "react-loader-spinner";

const FriendsGround = (props) => {
    const dispatch = useDispatch();
    const friends_list = useSelector((state) => state.friends.answer_list);
    const lastId = friends_list[friends_list?.length - 1]?._id;
    console.log(lastId);
    const is_next = useSelector((state) => state.friends?.next);
    const is_loading = useSelector((state) => state.friends.is_loading);
    const is_initialLoading = useSelector((state) => state.friends.is_initialLoading);
    const [cardModal, setCardModal] = useState(false);
    const container = React.useRef();

    const openCard = (a) => {
      if(window.innerWidth <= 750){
        history.push(`/carddetail/${a}`)
        return
      }
      const type = "friends";
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
    {is_initialLoading ?  <LoadingDiv>
            <Loader type="Oval" color="#000000" height={100} width={100} />
          </LoadingDiv>: 
          <>
          <CommunityContainer>
                {friends_list?.length > 0 ? <><Container><AnswersBox ref={container}>
                <QuestionTitle>친구들의 생각을<br/>살펴보세요</QuestionTitle>
                  {lastId && <InfinityScroll
                    callNext={() => {
                      dispatch(friendsActions.getNextFriendAnswers(lastId));
                    }}
                    is_next={is_next}
                    is_loading={is_loading}
                    ref_value={container.current}
                  >
                        {friends_list?.map((f, idx) => {
                          return (<><FriendPost openCard={openCard} {...f} key={idx}/></>)
                        })}
                    </InfinityScroll>}
                </AnswersBox>
                </Container></>: <><NoFriendText>아직 아무도 팔로우하고 있지 않군요! <br/> <span>다양한 사람을 팔로우해서 <br/> 더 많은 낙서를 즐기세요!</span></NoFriendText></>}
          </CommunityContainer>
        </>
        }
    </Outer>
    </>)
}

const Outer = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url("https://user-images.githubusercontent.com/77369674/118459848-1b0f3d80-b737-11eb-8f1a-906da3e390e2.jpeg");

  @media (max-width: 650px) {
  }
  @media (max-width: 500px) {
    margin: 50px 0px 0px 0px;
  }
`;

const LoadingDiv = styled.div`
  margin: auto;
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
  @media (max-width:500px) {
    
  }
`;

const Container = styled.section`
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: 88px 0 0 0;
  margin: auto;
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

  @media (max-width: 600px) {
    padding: 30px 0 0 0;
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
  box-sizing: border-box;
  // margin: 140px auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  // box-shadow: 0px 0px 0px 20px #0000001a; 
  // justify-content: flex-start;
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
    width: 100%;
    padding: 0;
    max-height: 649px;
  }
`;

const QuestionTitle = styled.h2`
font: normal normal bold 30px/39px Nanum Myeongjo;
  letter-spacing: 0px;
  width: 750px;
  margin: 0 0 34px 0;
  @media (max-width: 750px) {
    margin: 0 0 12px 0;
    font: normal normal bold 22px/24px Nanum Myeongjo;
    width: 80%;
    overflow: scroll;
    min-height: 70px;
  }
  @media (max-width: 600px) {
    width: 226;
    text-align: left;
    font: normal normal 800 19px/27px Nanum Myeongjo;
    letter-spacing: 0px;
    color: #000000;
    opacity: 0.9;
  }
`;

const NoFriendText = styled.div`
  margin: auto;
  display: flex;
  justify-content: center;
  flex-direction: column;
  font: normal normal bold 34px/39px NanumMyeongjo;
  align-items: center;
  @media (max-width: 500px) {
    font: normal normal 800 22px/27px NanumMyeongjo;

  }
  & > span {
    margin-top: 18px;
    text-align: center;
    font: normal normal normal 15px/21px Noto Sans CJK KR;
    @media (max-width: 500px) {
      font: normal normal normal 13px/19px Noto Sans CJK KR;
    }
  }
`; 

export default FriendsGround;