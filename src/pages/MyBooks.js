import React from 'react';
import {history} from '../redux/configStore';
import styled from 'styled-components';
import {BookShelf, BookDetail, Profile, MyQuestion} from '../components/Books/booksindex';
import {useSelector, useDispatch} from 'react-redux';
import {setComponent} from '../redux/modules/books';
import { getCookie } from '../shared/Cookie';
import {api as userActions} from '../redux/modules/user'

const MyBook = (props) => {
    const dispatch = useDispatch();
    const component = useSelector(state => state.books.component)
    const date = useSelector(state => state.books.date)
    let url = window.location.href.split('/');
    let id = url[url.length -1];
    

    React.useEffect(() => {
        if(!getCookie('is_login')){
            window.alert('로그인 상태가 아닙니다.');
            history.replace('/');
        };
        dispatch(setComponent(''))
        dispatch(userActions.myFollowListAX())
    },[])
    return(
        <React.Fragment>
            <Container>
            {id === 'mybook' && component === '' && <ImgLeft/>}
            <ProfileContainer>
                <Profile/>
            </ProfileContainer>
                {id === 'mybook' && component === '' &&
                <BookShelf date={date}/>
                }
                {component === 'myquestion' && <MyQuestion/>}
                {id !=='mybook' && component === '' &&
                <BookDetail date={date}/>}
                {id === 'mybook' && component === '' && <ImgRight/>}
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

export default MyBook;