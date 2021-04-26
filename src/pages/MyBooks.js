import React from 'react';
import styled from 'styled-components';
import BookShelf from '../components/BookShelf';
import BookDetail from '../components/BookDetail';
import {useSelector, useDispatch} from 'react-redux';
import {changeDate} from '../redux/modules/books';
import {api as booksActions} from '../redux/modules/books';
import { ArrowLeft, ArrowRight } from '@material-ui/icons';

const MyBook = (props) => {
    const dispatch = useDispatch();
    const date = useSelector(state => state.books.date)
    const formated_date = useSelector(state => state.books.formated_date)
    let url = window.location.href.split('/');
    let id = url[url.length -1];
    console.log(id)

    React.useEffect(() => {
        dispatch(changeDate(0))
        dispatch(booksActions.getBooks(date))
    },[])
    return(
        <React.Fragment>
            <Container>
            <DateContainer>
            <ForDate>
            <ArrowLeft onClick={() => {dispatch(changeDate(1))}} /><span>{formated_date}</span><ArrowRight onClick={() => {dispatch(changeDate(2))}}/>
            </ForDate>
            <BookContainer>
                {id === 'mybook' ? <BookShelf date={date}/> : <BookDetail/>}
            </BookContainer>
            </DateContainer>
            <ProfileContainer/>
            </Container>
        </React.Fragment>
    )
}


const DateContainer= styled.div`
    width:100%;
    display:flex;
    flex-direction:column;
`;

const ForDate = styled.div`
    width:100%;
    height: 50px;
    display:flex;
    flex-direction:row;
    justify-content:center;
`;

const Container = styled.div`
    margin:20px;
    width: 100%;
    height: 80vh;
    display:flex;
    flex-direction:row;
    justify-content:space-around;
`;

const BookContainer = styled.section`
    margin: 0px auto;
    width: 80%;
    height: 100%;
    border: 1px solid black;
    background-color: gray;
    display:flex;
    justify-content:center;
    align-items:center;
    border-radius: 2rem;
`;

const ProfileContainer = styled.section`
    width:20%;
    height:100%;
    border: 1px solid black;
`;

export default MyBook;