import React from 'react';
import styled from 'styled-components';
import {BookShelf, BookDetail, Profile, OthersQuestion} from '../components/Books/booksindex';
import {api as userActions} from '../redux/modules/user';
import {useSelector, useDispatch} from 'react-redux';
import { getCookie } from "../shared/Cookie";
import {changeDate, setComponent, setOther} from '../redux/modules/books';

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
    height: 80vh;
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    align-items:center;
`;

const ProfileContainer = styled.section`
    box-sizing:border-box;
    padding:20px 0px;
    width: 100%;
    max-width:975px;
    height:400px;
    display: flex;
    flex-direction: row;
`;

const ImgRight = styled.div`
    z-index:2;
    position:fixed;
    background-image:url('https://user-images.githubusercontent.com/77574867/116865619-ed110000-ac44-11eb-94d6-a47a23118a2a.png');
    background-size:contain;
    background-repeat:no-repeat;
    right:-70px;
    bottom:-13px;
    width:593px;
    height:731px;
    opacity:0.7;
    pointer-events: none;
    @media (max-width:1400px){
        display:none;
    }
    
`;


const ImgLeft = styled.div`
    z-index:2;
    position:fixed;
    background-image:url('https://user-images.githubusercontent.com/77574867/116865611-eb473c80-ac44-11eb-81b9-0cfb5d202074.png');
    background-size:contain;
    background-repeat:no-repeat;
    left:-20px;
    top:249px;
    width:365px;
    height:341px;
    opacity:0.7;
    pointer-events: none;
    @media (max-width:1400px){
        display:none;
    }
`;

export default OthersBooks;