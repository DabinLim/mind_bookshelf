import React from "react";
import styled from "styled-components";
import {useDispatch, useSelector} from 'react-redux';
import swal from 'sweetalert';
import {api as communityActions} from '../redux/modules/community';

const Like = (props) => {
    const dispatch = useDispatch();
    const is_login = useSelector(state => state.user.is_login);
    const {currentLike, answerId, questionId, page, width, height, margin,  m_width, m_height, m_margin} = props;
    const styles = {
      width,
      height,
      margin,
      m_width,
      m_height,
      m_margin,
  }

    const addLike =() => {
      if (!is_login) {
        swal({
          title: "좋아요 누르기 실패",
          text: "로그인 후 이용 가능한 서비스입니다.",
          icon: "error",
        });
        return;
      }
      if( page ==='QnA'){
        dispatch(
          communityActions.addLikeQnA(
            answerId,
            questionId
          )
        );
        return
      }
      if( page === 'detail'){
        dispatch(
          communityActions.addLikeDetail(
            answerId
          )
        );
        return
      }
      if( page === 'answers'){
        dispatch(
          communityActions.addLikeAnswers(
            answerId
          )
        );
        return
      }
      dispatch(communityActions.addLikeAX(
        answerId,
        questionId
        )
      );
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
      if( page ==='QnA'){
        dispatch(
          communityActions.deleteLikeQnA(
            answerId,
            questionId
          )
        );
        return
      }
      if( page === 'detail'){
        dispatch(
          communityActions.deleteLikeDetail(
            answerId
          )
        );
        return
      }
      if( page === 'answers'){
        dispatch(
          communityActions.deleteLikeAnswers(
            answerId
          )
        );
        return
      }
      dispatch(communityActions.deleteLikeAX(
        answerId,
        questionId
        )
      );
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