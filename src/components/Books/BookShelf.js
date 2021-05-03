import React from 'react';
import styled from 'styled-components';
import {history} from '../../redux/configStore';
import { ArrowLeft, ArrowRight } from '@material-ui/icons';
import {changeDate, setComponent} from '../../redux/modules/books';
import {useSelector, useDispatch} from 'react-redux';
import {api as booksActions} from '../../redux/modules/books';

const BookShelf = (props) => {

    let num = 32;
    let book = [];
    for(let i = 1; i<num; i++){
        book.push(i);
    }
    const book_1 = book.filter((v,idx) => {
        if(idx < 15){
            return true;
        };
    });
    const book_2 = book.filter((v,idx)=> {
        if(idx >= 15){
            return true;
        };
    });
    console.log(book_1)
    console.log(book_2)
    const dispatch = useDispatch();
    const formated_date = useSelector(state => state.books.formated_date);
    const book_list = useSelector(state => state.books.books);
    const url = window.location.href.split('/');
    let id = url[url.length -1];
    const date = useSelector(state => state.books.date)

    const previousMonth = () => {
        if(id === 'mybook'){
            dispatch(booksActions.getBooks(1));
            return
        } 
        dispatch(booksActions.getOthersBooks(1,id));
    }

    const nextMonth = () => {
        if(id === 'mybook'){
            dispatch(booksActions.getBooks(2));
            return
        }
        dispatch(booksActions.getOthersBooks(2,id));
    }


    React.useEffect(() => {
        dispatch(changeDate(0));
        if(id === 'mybook'){
            dispatch(booksActions.getBooks(0));
        } else {
            dispatch(booksActions.getOthersBooks(0,id));
        }
    },[]);

    return(
        <React.Fragment>
            <Container>
                <ForDate>
                <ArrowLeft onClick={previousMonth} /><span>{formated_date}</span><ArrowRight onClick={nextMonth}/>
                </ForDate>
                <ShelfBox>
                    <BookRow>
                    {book_1.map((v,idx) => {
                        return(<Book key={idx}/>)
                    })}
                    </BookRow>
                <Shelf>
                </Shelf>
                </ShelfBox>
                <ShelfBox>
                    <BookRow>
                    {book_2.map((v,idx) => {
                        return(<Book key={idx}/>)
                    })}
                    </BookRow>
                <Shelf>
                    <ImgRight src='../../static/ㅎㅇㅎㅇ-removebg-preview.png'/>
                </Shelf>
                </ShelfBox>
                </Container>
        </React.Fragment>
    )
}

const Container= styled.section`
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

const ShelfBox = styled.div`
    width:100%;
    height:100%;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
`;

const Shelf = styled.div`
    position:relative;  
    width:100%;
    height: 34px;
    border: 1px solid black;
`;

const BookRow = styled.div`
    display:flex;
    flex-direction:row;
    width:100%;
    max-width:975px;
    border:1px solid black;
    margin: 10px 0px -10px 0px;
`;

const Book = styled.div`
    width:45px;
    height:180px;
    border: 1px solid black;
    margin: 0px 10px;
`;

const ImgRight = styled.img`
    position:absolute;
    left:80%;
    width:520px;
    height:720px;
    
`;




export default BookShelf;


// {book_list && book_list.map((v,idx) => {
//     return(
//         <Book key={idx} onClick={()=>{
//             dispatch(changeDate(`20${v._id}`))
//             if(id === 'mybook'){
//                 history.push(`/mybook/${v._id}`)
//             } else {
//                 history.push(`/others/${id}/${v._id}`)
//             }

//         }}><span style={{margin:'auto'}}>{v._id.charAt(v._id.length -2)}{v._id.charAt(v._id.length -1)}</span></Book>
//     )
// })}