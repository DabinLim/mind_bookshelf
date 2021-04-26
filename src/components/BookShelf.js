import React from 'react';
import styled from 'styled-components';
import {history} from '../redux/configStore';
import { ArrowLeft, ArrowRight } from '@material-ui/icons';
import {changeDate, setComponent} from '../redux/modules/books';
import {useSelector, useDispatch} from 'react-redux';

const BookShelf = (props) => {
    const dispatch = useDispatch();
    const formated_date = useSelector(state => state.books.formated_date)
    const date = props.date.format('YYMMDD')
    const day = props.date.format('DD')

    return(
        <React.Fragment>
            <Container>
                <ForDate>
                <ArrowLeft onClick={() => {dispatch(changeDate(1))}} /><span>{formated_date}</span><ArrowRight onClick={() => {dispatch(changeDate(2))}}/>
                </ForDate>
                <Shelf>
            <BookContainer>
                <BookRow>
                <Book onClick={() => {history.push(`/mybook/${date}`)}}>{day}</Book>
                </BookRow>
            </BookContainer>
                </Shelf>
                </Container>
        </React.Fragment>
    )
}

const Container= styled.div`
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

const Shelf = styled.section`
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

const BookContainer = styled.div`
    box-sizing: border-box;
    width:90%;
    height:90%;
    background-color: white;
    display:flex;
    flex-direction:column;
    justify-content:flex-end;
`;

const BookRow = styled.div`
    width:100%;
    height:100%;
    display:flex;
    flex-direction:row;
    flex-wrap:wrap-reverse;
    align-content: flex-start;
    justify-content: flex-start;
`;

const Book = styled.div`
    margin:2px;
    position: relative;
    width: 10.5%;
    height: 24%;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.4);
    &:before {
        content: "";
    box-sizing: border-box;
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0px;
    top: 0px;
    background: linear-gradient(to right,rgba(0,0,0,0.2) 0px,rgb(245 180 255 / 10%) 5%,rgb(245 180 255 / 90%) 95%,rgba(0,0,0,0.2) 100%);
    }
`;




export default BookShelf;