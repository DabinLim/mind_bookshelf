import React from 'react';
import {history} from '../redux/configStore';
import styled from 'styled-components';
import BookShelf from '../components/BookShelf';
import BookDetail from '../components/BookDetail';
import {useSelector, useDispatch} from 'react-redux';
import {changeDate, setComponent} from '../redux/modules/books';
import {api as booksActions} from '../redux/modules/books';
import MyQuestion from '../components/MyQuestion';

const MyBook = (props) => {
    const dispatch = useDispatch();
    const component = useSelector(state => state.books.component)
    const date = useSelector(state => state.books.date)
    const formated_date = useSelector(state => state.books.formated_date)
    let url = window.location.href.split('/');
    let id = url[url.length -1];
    console.log(id)

    React.useEffect(() => {
        dispatch(changeDate(0))
        dispatch(booksActions.getBooks(date))
        dispatch(setComponent(''))
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

            <ProfileContainer><button onClick={()=>{dispatch(setComponent('myquestion'))}}>나의질문</button></ProfileContainer>
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
    width:20%;
    height:100%;
    border: 1px solid black;
`;

export default MyBook;