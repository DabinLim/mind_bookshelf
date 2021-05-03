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
                <ImgLeft/>
            <ProfileContainer>
                <Profile/>
            </ProfileContainer>
                {id === 'mybook' && component === '' &&
                <BookShelf date={date}/>
                }
                {component === 'myquestion' && <MyQuestion/>}
                {id !=='mybook' && component === '' &&
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
    width: 100%;
    max-width:900px;
    height:400px;
    display: flex;
    flex-direction: row;
    border: 1px solid black;
`;

const ImgRight = styled.div`
    z-index:2;
    position:absolute;
    background-image:url('https://user-images.githubusercontent.com/77574867/116843082-cbe6ea00-ac19-11eb-934f-a8c5535229d4.png');
    background-size:contain;
    background-repeat:no-repeat;
    right:0;
    bottom:0;
    width:500px;
    height:635px;
    
`;


const ImgLeft = styled.div`
    z-index:2;
    position:absolute;
    background-image:url('https://user-images.githubusercontent.com/77574867/116843085-cdb0ad80-ac19-11eb-914e-23580b56f529.png');
    background-size:contain;
    background-repeat:no-repeat;
    left:0;
    bottom:45%;
    width:400px;
    height:400px;
    
`;

export default MyBook;