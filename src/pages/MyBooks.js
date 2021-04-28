import React from 'react';
import {history} from '../redux/configStore';
import styled from 'styled-components';
import BookShelf from '../components/Books/BookShelf';
import BookDetail from '../components/Books/BookDetail';
import Profile from '../components/Profile'
import {useSelector, useDispatch} from 'react-redux';
import {setComponent} from '../redux/modules/books';
import MyQuestion from '../components/MyQuestion';
import { getCookie } from '../shared/Cookie';

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
    },url)
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
                <button onClick={()=>{dispatch(setComponent('myquestion'))}}>나의질문</button>
                <button onClick={()=>{history.push('/othersbooks/ggg')}}>친구페이지</button>
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
    flex-direction:row;
    justify-content:space-around;
`;

const ProfileContainer = styled.section`
    position: relative;
    width:25%;
    height:100%;
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    align-items: center;
`

export default MyBook;