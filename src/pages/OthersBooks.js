import React from 'react';
import styled from 'styled-components';
import {BookShelf, Profile, OthersQuestion, OthersAnswers, UnfollowConfirmModal} from '../components/Books/booksindex';
import {api as userActions, resetFollower, resetFollowing} from '../redux/modules/user';
import {useSelector, useDispatch} from 'react-redux';
import { getCookie } from "../shared/Cookie";
import {changeDate, setComponent} from '../redux/modules/books';
import { changeType } from '../redux/modules/community'

const OthersBooks = (props) => {
    const dispatch = useDispatch();
    const userId = props.match.params.id;
    const component = useSelector(state => state.books.component);
    const date = useSelector(state => state.books.date);
    const formated_date = useSelector(state => state.books.formated_date);
    const answerInfo = useSelector((state) => state.community.card_detail);
    const cookie = getCookie("is_login") ? true : false;
    const [UnfollowModal, setUnfollowModal] = React.useState(false) 
    const other_info = useSelector((state) => state.user.other);

    let url = window.location.href.split('/');
    let id = url[url.length -2];
    let others_id = url[url.length -1];
    

    React.useEffect(() => {
        dispatch(changeDate(0))
        dispatch(setComponent(''))
        if(cookie){
            dispatch(userActions.myFollowListAX())
        }
        return()=>{
            if(answerInfo.length !== 0){
                dispatch(changeType(null))
            }
        }
    },[])

    React.useEffect(() => {
        
        dispatch(userActions.othersInfoAX(userId))
        dispatch(userActions.getFollowing(userId));
        dispatch(userActions.getFollower(userId));
        return()=>{
            dispatch(resetFollower());
            dispatch(resetFollowing());
        }
    },[userId])

    return(
        <React.Fragment>
            {UnfollowModal? 
                <UnfollowConfirmModal id={userId} setUnfollowModal={setUnfollowModal} other  nickname={other_info.nickname} />
            :null}
            <Container>
                <ContainerBox>
            <ProfileContainer component={component}>
                <Profile id={userId} setUnfollowModal={setUnfollowModal} />
            </ProfileContainer>
                {id === 'others' && component === '' &&
                <BookShelf date={date}/>
                }
                {component === 'othersquestion' && <OthersQuestion/>}
                {component === 'othersanswers' && <OthersAnswers/>}
                </ContainerBox>
                {/* <ImgLeft/> */}
            {/* <ImgRight/> */}
            </Container>
        </React.Fragment>
    )
}

const ContainerBox = styled.div`
    margin: 50px 0px 0px 0px;
    padding-left: 20px;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    @media(max-width:750px){
        padding-left:0px;
        overflow-x:hidden;
        margin:50px 0px 0px 0px;
    }
    ::-webkit-scrollbar {
    display: none;
    };
    @media (max-width: 750px) {
        margin: 50px 0px 0px 0px;
      }
`

const Container = styled.div`
    width: 100%;
    height:100vh;
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    overflow:auto;
    ::-webkit-scrollbar {
    display:none;
    width: 10px; /* width of the entire scrollbar */
  }

  ::-webkit-scrollbar-track {
    display:none;
    background: none; /* color of the tracking area */
  }

  ::-webkit-scrollbar-thumb {
    display:none;
    background-color: #ffffff; /* color of the scroll thumb */
    border-radius: 20px; /* roundness of the scroll thumb */
  }
    @media (max-width:1040px){
    margin:0px 10px;
}
@media (max-width:750px){
    margin:0px;
    height:100%;
}

    
`;

const ProfileContainer = styled.section`
    position:relative;
    box-sizing:border-box;
    padding:30px;
    width: 100%;
    margin: auto;
    margin-top: 70px;
    max-width:1070px;
    min-height:190px;
    display: flex;
    flex-direction: row;
    @media(max-width:750px){
        ${props => props.component === 'othersanswers' || props.component === 'othersquestion' ? `display:none`: `display:flex`};
        // padding:56px 50px 30px 50px;
        margin-top:0px;
        margin-bottom:30px;
        height:100%;
        min-height:330px;
        flex-direction:column;
        align-items:center;
    }
`;

const ImgRight = styled.div`
    z-index:25;
    position:fixed;
    background-image:url('https://user-images.githubusercontent.com/77574867/116996886-0c785d80-ad17-11eb-9afd-175a104b7f33.png');
    background-size:contain;
    background-repeat:no-repeat;
    right:-70px;
    bottom:-13px;
    width:593px;
    height:731px;
    opacity:0.8;
    pointer-events: none;
    @media (max-width:1400px){
        display:none;
    }
    
`;


const ImgLeft = styled.div`
    z-index:25;
    position:fixed;
    background-image:url('https://user-images.githubusercontent.com/77574867/116996878-0b473080-ad17-11eb-8910-108950e25cb8.png');
    background-size:contain;
    background-repeat:no-repeat;
    left:-20px;
    top:249px;
    width:365px;
    height:341px;
    opacity:0.8;
    pointer-events: none;
    @media (max-width:1400px){
        display:none;
    }
`;

export default OthersBooks;