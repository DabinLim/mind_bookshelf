import React from "react";
import styled from "styled-components";
import {useDispatch, useSelector} from 'react-redux';
import swal from 'sweetalert';
import {api as friendsActions} from "../redux/modules/friends";
import {api as communityActions, addLikeList, deleteLikeList} from '../redux/modules/community';
import {addAnswersLikeInfo, deleteAnswersLikeInfo} from '../redux/modules/custom';
import {editLikeCardFriend} from "../redux/modules/community";
import useSound from 'use-sound';
import boopSfx from "../static/sounds/DDALGGAK.mp3";

const Like = (props) => {
    const dispatch = useDispatch();
    const is_login = useSelector(state => state.user.is_login);
    const user_info = useSelector(state => state.user.user);
    const currentLocation = useSelector(state => state.router.location.pathname);
    const {currentLike, answerId, questionId, page, width, height, margin,  m_width, m_height, m_margin} = props;
    const styles = {
      width,
      height,
      margin,
      m_width,
      m_height,
      m_margin,
  }
  const [play] = useSound(boopSfx);

    const addLike =() => {
      if (!is_login) {
        swal({
          title: "좋아요 누르기 실패",
          text: "로그인 후 이용 가능한 서비스입니다.",
          icon: "error",
        });
        return;
      }
 
        dispatch(addLikeList({
          nickname:user_info.nickname,
          profileImg:user_info.profileImg,
          userId:user_info.id,
        }))
      

      if( page ==='QnA'){
        dispatch(
          communityActions.addLikeQnA(
            answerId,
            questionId
          )
        );
        play();
        return
      }
      if( page === 'detail'){
        dispatch(
          communityActions.addLikeDetail(
            answerId
          )
        );
        play();
        return
      }
      if( page === 'answers'){
        dispatch(
          communityActions.addLikeAnswers(
            answerId
          )
        );
        play();
        return
      }

      if (page === "friends") {
        dispatch(friendsActions.addLikeFriend(answerId));
        if (currentLocation === "/friends") {
          dispatch(editLikeCardFriend({
            decision: "like",}));
        }
        play();
        console.log(`friends clicked ${answerId}`)
        return;
      }
        
      if(page === 'component'){
        dispatch(communityActions.addLikeAX(
          answerId,
          questionId
          )
        );
        dispatch(addAnswersLikeInfo(answerId))
        play();
        return
      }
      dispatch(communityActions.addLikeAX(
        answerId,
        questionId
        )
      );
      play();
    }
  

    const deleteLike = () => {
      if (!is_login) {
        swal({
          title: "좋아요 누르기 실패",
          text: "로그인 후 이용 가능한 서비스입니다.",
          icon: "error",
        });
        return;
      }


        dispatch(deleteLikeList(user_info.id))
      

      if( page ==='QnA'){
        dispatch(
          communityActions.deleteLikeQnA(
            answerId,
            questionId
          )
        );
        play();
        return
      }
      if( page === 'detail'){
        dispatch(
          communityActions.deleteLikeDetail(
            answerId
          )
        );
        play();
        return
      }
      if( page === 'answers'){
        dispatch(
          communityActions.deleteLikeAnswers(
            answerId
          )
        );
        play();
        return
      }
      if (page === "friends") {
        dispatch(friendsActions.deleteLikeFriend(answerId));
        if (currentLocation === "/friends") {
          dispatch(editLikeCardFriend({
            decision: "dislike",}));
        }
        play();
        console.log(`friends clicked ${answerId}`)
        return;
      }
      if(page === 'component'){
        dispatch(communityActions.deleteLikeAX(
          answerId,
          questionId
          )
        );
        dispatch(deleteAnswersLikeInfo(answerId))
        play();
        return
      }
      dispatch(communityActions.deleteLikeAX(
        answerId,
        questionId
        )
      );
      play();
    }
    
        return (<React.Fragment>
        {currentLike? <LikeIcon {...styles} src="https://user-images.githubusercontent.com/77369674/118684666-5f850100-b83d-11eb-884e-cb0ffbb34dca.png" 
                                    onClick={deleteLike}
                                  />
                                : 
                                <LikeIcon {...styles} src="https://user-images.githubusercontent.com/77369674/118684661-5eec6a80-b83d-11eb-8eba-7ad33f5a05e2.png" 
                                onClick={addLike} />}
         </React.Fragment>)
}

Like.defaultProps = {
  width:'16px',
  height:'15px',
  margin:'0px 6px 0px 0px',
  m_width:'13px',
  m_height:'12px',
  m_margin:'0px 6px 0px 0xp',
}

const LikeIcon = styled.img`
  cursor: pointer;
  width:${props => props.width};
  height: ${props => props.height};
  margin: ${props => props.margin};
  @media (max-width: 500px) {
    width:${props => props.m_width};
    height:${props => props.m_height};
    margin: ${props => props.m_margin};
  }
  
`

export default Like;