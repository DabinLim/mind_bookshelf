import React from "react";
import styled from "styled-components";
import { history } from "../../redux/configStore";
import {CardDetail} from './booksindex';
import { ArrowLeft, ArrowRight } from "@material-ui/icons";
import { changeDate, setComponent, setDateVisible, setBookDetailModal } from "../../redux/modules/books";
import CardModal from '../Community/CardModal';
import { useSelector, useDispatch } from "react-redux";
import { api as booksActions} from "../../redux/modules/books";

const BookShelf = (props) => {
//   let num = 32;
//   let book = [];
//   for (let i = 1; i < num; i++) {
//     book.push(i);
//   }
// const book_1 = book.filter((v, idx) => {
//     if (idx < 15) {
//       return true;
//     }
//   });
//   const book_2 = book.filter((v, idx) => {
//     if (idx >= 15) {
//       return true;
//     }
//   });
// const [bookDetailModal, setBookDetailModal] = React.useState(null);
const bookDetailModal = useSelector(state=> state.books.book_detail_modal);
// const [date_visible, setDateVisible ] = React.useState(true);
const date_visible = useSelector(state => state.books.date_visible);
  const dispatch = useDispatch();
  const formated_date = useSelector((state) => state.books.formated_date);
  const book_list = useSelector((state) => state.books.books);
  const [cardDetailModal, setCardDetailModal] = React.useState(false);
  const url = window.location.href.split("/");
  let id = url[url.length - 1];
  const date = useSelector((state) => state.books.date);

  const openBook = (givendate) => {
    dispatch(changeDate(`20${givendate}`));
    // if (id === "mybook") {
    //   history.push(`/mybook/${v._id}`);
    // } else {
    //   history.push(`/others/${id}/${v._id}`);
    // }
    // if(bookDetailModal === givendate){
    //   dispatch(setBookDetailModal(null));
    //   dispatch(setDateVisible(true));
    //   console.log(givendate, bookDetailModal)
    //   return
    // }
    if(id === 'mybook'){
      dispatch(booksActions.getNextDetail(givendate));
    }else{
      dispatch(booksActions.getNextOthersBookDetail(givendate,id))
    }
    setCardDetailModal(givendate);
    dispatch(setBookDetailModal(givendate));
    // dispatch(setDateVisible(false));
    console.log(givendate, bookDetailModal)
  }

  const book_1 = book_list.filter((v, idx) => {
    if (idx < 15) {
      return true;
    }
  });
  const book_2 = book_list.filter((v, idx) => {
    if (idx >= 15) {
      return true;
    }
  });

  const close = () => {
    setCardDetailModal(false);
};

  const previousMonth = () => {
    if (id === "mybook") {
      dispatch(booksActions.getBooks(1));
      return;
    }
    dispatch(booksActions.getOthersBooks(1, id));
  };

  const nextMonth = () => {
    if (id === "mybook") {
      dispatch(booksActions.getBooks(2));
      return;
    }
    dispatch(booksActions.getOthersBooks(2, id));
  };

  React.useEffect(() => {
    dispatch(changeDate(0));
    if (id === "mybook") {
      dispatch(booksActions.getBooks(0));
    } else {
      dispatch(booksActions.getOthersBooks(0, id));
    }
  }, []);

  return (
    <React.Fragment>
      <Container>
        <ForDate>
          {date_visible ? 
          <>
          <ArrowLeft onClick={previousMonth} />
          <span>{formated_date}</span> 
          <ArrowRight onClick={nextMonth} />
          </>
          : ''}
        </ForDate>
        <ShelfBox>
          {/* <ImgLeft/> */}
          <BookRow>
          {book_1 &&
              book_1.map((v, idx) => {
                return (
                  <>
                  {/* {bookDetailModal === v._id && <BookDetail openCard={setCardDetailModal} openBook={openBook} date={v._id}/>} */}
                  {cardDetailModal === v._id && <CardModal book date={v._id} close={close}/>}
                  <Book
                    key={idx}
                  >
                    <div style={{position:'relative', width:'100%', height:'100%', cursor:'pointer',zIndex:'3'}} onClick={() => {openBook(v._id)}}>
                    </div>
                      <Date>
                      {v._id.charAt(v._id.length - 2)}
                      {v._id.charAt(v._id.length - 1)}
                    </Date>
                    <BookImage src='https://user-images.githubusercontent.com/77574867/117013284-b0b7cf80-ad2a-11eb-910a-252130e01287.png'/>
                  </Book>
                  </>
                );
              })}
          </BookRow>
          <Shelf></Shelf>
        </ShelfBox>
        <ShelfBox>
          <BookRow>
          {book_2 &&
              book_2.map((v, idx) => {
                return (
                  <>
                  {/* {bookDetailModal === v._id && <BookDetailLow openCard={setCardDetailModal} openBook={openBook} date={v._id}/>} */}
                  {cardDetailModal === v._id && <CardModal book date={v._id} close={close}/>}
                  <Book
                    key={idx}
                  >
                    <div style={{position:'relative', width:'100%', height:'100%', cursor:'pointer',zIndex:'3'}} onClick={() => {openBook(v._id)}}>
                    </div>
                      <Date>
                      {v._id.charAt(v._id.length - 2)}
                      {v._id.charAt(v._id.length - 1)}
                    </Date>
                    <BookImage src='https://user-images.githubusercontent.com/77574867/117013284-b0b7cf80-ad2a-11eb-910a-252130e01287.png'/>
                  </Book>
                  </>
                );
              })}
              
          </BookRow>
          <Shelf></Shelf>
        </ShelfBox>
      </Container>
      {/* <ImgRight/> */}
    </React.Fragment>
  );
};

const Container = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 20px 0px;
  padding-bottom:110px;
  @media (min-height:1200px){
    padding-bottom:300px;
  }
`;

const ForDate = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const ShelfBox = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width:1040px){
    margin-left:0px;
}
`;

const Shelf = styled.div`
  opacity: 0.3;
  position: relative;
  margin: -20px 0px 20px 0px;
  width: 100%;
  max-width:1040px;
  height: 34px;
  background-color: #ffffff;
`;

const BookRow = styled.div`
  position:relative;
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 210px;
  max-width: 1055px;
  /* overflow:hidden; */
  margin: 10px 0px -5px 55px;
  @media (max-width:1000px){
        
        width:900px;
    }
    @media (max-width:1040px){
    margin:10px 0px -5px 20px;
}
@media (max-width:800px){
    margin:10px 0px -5px 160px;
}
`;

 

const Book = styled.div`
    position:relative;
    display:flex;
    align-items:center;
    justify-content:center;
  z-index: 2;
  width: 46px;
  height: 210px;
  margin: 0px 10px;
  /* transition: linear .1s; */
  
  /* background-image:url('');
  background-size:cover; */
  &:hover{
    transform:scale(1.2);
    z-index:40;
  }
  @media (max-width:1000px){
    margin: 0px 5px;
    }
`;

const Date = styled.span`
  position:absolute;
  top:20px;
  left:14px;
  z-index:2;
  color:#ffffff;
  font-weight:600;
`;

const BookImage = styled.img`
  position:absolute;
  top:-10px;
  left:-23px;
  z-index:1;

`;



// const ImgRight = styled.div`
//     z-index:2;
//     position:absolute;
//     background-image:url('https://user-images.githubusercontent.com/77574867/116843082-cbe6ea00-ac19-11eb-934f-a8c5535229d4.png');
//     background-size:contain;
//     background-repeat:no-repeat;
//     right:0;
//     bottom:0;
//     width:500px;
//     height:635px;

// `;

// const ImgLeft = styled.div`
//     z-index:2;
//     position:absolute;
//     background-image:url('https://user-images.githubusercontent.com/77574867/116843085-cdb0ad80-ac19-11eb-914e-23580b56f529.png');
//     background-size:contain;
//     background-repeat:no-repeat;
//     left:0;
//     bottom:20;
//     width:450px;
//     height:450px;

// `;

export default BookShelf;
