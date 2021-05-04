import React from "react";
import styled from "styled-components";
import { history } from "../../redux/configStore";
import { ArrowLeft, ArrowRight } from "@material-ui/icons";
import { changeDate, setComponent } from "../../redux/modules/books";
import { useSelector, useDispatch } from "react-redux";
import { api as booksActions } from "../../redux/modules/books";

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
  
  const dispatch = useDispatch();
  const formated_date = useSelector((state) => state.books.formated_date);
  const book_list = useSelector((state) => state.books.books);
  const url = window.location.href.split("/");
  let id = url[url.length - 1];
  const date = useSelector((state) => state.books.date);

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

  console.log(book_1)
  console.log(book_2)

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
          <ArrowLeft onClick={previousMonth} />
          <span>{formated_date}</span>
          <ArrowRight onClick={nextMonth} />
        </ForDate>
        <ShelfBox>
          {/* <ImgLeft/> */}
          <BookRow>
          {book_1 &&
              book_1.map((v, idx) => {
                return (
                  <Book
                    key={idx}
                    onClick={() => {
                      dispatch(changeDate(`20${v._id}`));
                      if (id === "mybook") {
                        history.push(`/mybook/${v._id}`);
                      } else {
                        history.push(`/others/${id}/${v._id}`);
                      }
                    }}
                  >
                      <Date>
                      {v._id.charAt(v._id.length - 2)}
                      {v._id.charAt(v._id.length - 1)}
                    </Date>
                    <BookImage src='https://user-images.githubusercontent.com/77574867/117013284-b0b7cf80-ad2a-11eb-910a-252130e01287.png'/>
                  </Book>
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
                  <Book
                    key={idx}
                    onClick={() => {
                      dispatch(changeDate(`20${v._id}`));
                      if (id === "mybook") {
                        history.push(`/mybook/${v._id}`);
                      } else {
                        history.push(`/others/${id}/${v._id}`);
                      }
                    }}
                  >
                    <Date>
                      {v._id.charAt(v._id.length - 2)}
                      {v._id.charAt(v._id.length - 1)}
                    </Date>
                    <BookImage src='https://user-images.githubusercontent.com/77574867/117013284-b0b7cf80-ad2a-11eb-910a-252130e01287.png'/>
                  </Book>
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
  padding-bottom:100px;
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
`;

const Shelf = styled.div`
  opacity: 0.3;
  position: relative;
  margin: -20px 0px 20px 0px;
  width: 100%;
  height: 34px;
  background-color: #ffffff;
`;

const BookRow = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 210px;
  max-width: 1055px;
  overflow:hidden;
  margin: 10px 0px -5px 65px;
  @media (max-width:1000px){
        
        width:900px;
    }
@media (max-width:1040px){
    margin:10px 0px -5px 0px;
}
`;

 

const Book = styled.div`
    position:relative;
    display:flex;
    align-items:center;
    justify-content:center;
  z-index: 1;
  width: 46px;
  height: 210px;
  margin: 0px 10px;
  cursor: pointer;
  /* background-image:url('');
  background-size:cover; */
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
