import React from 'react';
import styled from 'styled-components';
import {BookShelf, BookDetail, Profile, OthersQuestion} from '../components/Books/booksindex';
import {api as userActions} from '../redux/modules/user';
import {useSelector, useDispatch} from 'react-redux';
import { getCookie } from "../shared/Cookie";
import {changeDate, setComponent, setOther, setBookDetailModal, setDateVisible} from '../redux/modules/books';

const OthersBooks = (props) => {
    const dispatch = useDispatch();
    const userId = props.match.params.id;
    const component = useSelector(state => state.books.component);
    const date = useSelector(state => state.books.date);
    const formated_date = useSelector(state => state.books.formated_date);
    const cookie = getCookie("is_login") ? true : false;
    let url = window.location.href.split('/');
    console.log(url)
    let id = url[url.length -2];
    let others_id = url[url.length -1];
    

    React.useEffect(() => {
        dispatch(changeDate(0))
        dispatch(setComponent(''))
        if(cookie){
            dispatch(userActions.myFollowListAX())
        }
    },[])

    React.useEffect(() => {
        dispatch(userActions.othersInfoAX(userId))
        dispatch(userActions.otherFriendListAX(userId))
    },[userId])

    return(
        <React.Fragment>
            <Container>
                <ImgLeft/>
            <ProfileContainer>
                <Profile id={userId} />
            </ProfileContainer>
                {id === 'others' && component === '' &&
                <BookShelf date={date}/>
                }
                {component === 'othersquestion' && <OthersQuestion/>}
                {id !=='others' && component === '' &&
                <BookDetail date={date}/>}
            <ImgRight/>
            </Container>
        </React.Fragment>
    )
}


const Container = styled.div`
    width: 100%;
    height: 100%;
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    align-items:center;
    overflow:auto;
`;

const ProfileContainer = styled.section`
    position:relative;
    margin-top:170px;
    box-sizing:border-box;
    padding:30px;
    width: 100%;
    max-width:988px;
    min-height:190px;
    display: flex;
    flex-direction: row;
`;

const ImgRight = styled.div`
    z-index:2;
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
    z-index:2;
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