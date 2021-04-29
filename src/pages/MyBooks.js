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
                {id === 'mybook' && component === '' &&
                <BookShelf date={date}/>
                }
                {component === 'myquestion' && <MyQuestion/>}
                {id !=='mybook' && component === '' &&
                <BookDetail date={date}/>}
            <ProfileContainer>
                <Profile/>
            </ProfileContainer>
            </Container>
        </React.Fragment>
    )
}

const Container = styled.div`
    margin:20px;
    width: 100%;
    height: 80vh;
    display:flex;
    justify-content:space-between;
`;

const ProfileContainer = styled.section`
    width: 300px;
    height:100%;
    display: flex;
    flex-direction: column;
`

export default MyBook;