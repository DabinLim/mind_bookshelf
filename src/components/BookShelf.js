import React from 'react';
import styled from 'styled-components';
import {history} from '../redux/configStore';
import { ArrowLeft, ArrowRight } from '@material-ui/icons';
import {changeDate, setComponent} from '../redux/modules/books';
import {useSelector, useDispatch} from 'react-redux';
import {api as booksActions} from '../redux/modules/books';

const BookShelf = (props) => {
    const dispatch = useDispatch();
    const formated_date = useSelector(state => state.books.formated_date)
    const book_list = useSelector(state => state.books.books);
    const date = props.date.format('YYMMDD')
    const day = props.date.format('DD')
    console.log(props)

    const previousMonth = () => {
        dispatch(changeDate(1));
        dispatch(booksActions.getBooks(props.date.subtract(1,'M')))
    }

    const nextMonth = () => {
        dispatch(changeDate(2));
        dispatch(booksActions.getBooks(props.date.add(1,'M')));
    }

    React.useEffect(() => {
        dispatch(booksActions.getBooks(props.date))
    },[])

    return(
        <React.Fragment>
            <Container>
                <ForDate>
                <ArrowLeft onClick={previousMonth} /><span>{formated_date}</span><ArrowRight onClick={nextMonth}/>
                </ForDate>
                <Shelf>
            <BookContainer>
                <BookRow>
                    {book_list.length && book_list.map((v,idx) => {
                        return(
                            <Book key={idx} onClick={() => {history.push(`/mybook/${date}`)}}>{v.YYMMDD}</Book>
                        )
                    })}
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