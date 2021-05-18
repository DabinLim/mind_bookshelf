import React from "react";
import styled from "styled-components";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { changeDate, setBookDetailModal } from "../../redux/modules/books";
import CardModal from "../Community/CardModal";
import { useSelector, useDispatch } from "react-redux";
import { api as booksActions , resetBooks} from "../../redux/modules/books";
import {history} from '../../redux/configStore';
import { LeftOutlined } from "@ant-design/icons";

const BookShelf = (props) => {
  const bookDetailModal = useSelector((state) => state.books.book_detail_modal);
  const date_visible = useSelector((state) => state.books.date_visible);
  const dispatch = useDispatch();
  const formated_date = useSelector((state) => state.books.formated_date);
  const book_list = useSelector((state) => state.books.books);
  const [cardDetailModal, setCardDetailModal] = React.useState(false);
  const url = window.location.href.split("/");
  let id = url[url.length - 1];

  const openBook = (givendate) => {
    dispatch(changeDate(`20${givendate}`));
    if(window.innerWidth <= 500){
      if (id === "mybook") {
        dispatch(booksActions.getBookDetail(givendate, history, 'move'));
      } else {
        dispatch(booksActions.getOthersBookDetail(givendate, id, history, 'move'));
      }
      return
    }

    if (id === "mybook") {
      dispatch(booksActions.getNextDetail(givendate));
    } else {
      dispatch(booksActions.getNextOthersBookDetail(givendate, id));
    }
    setCardDetailModal(givendate);
    dispatch(setBookDetailModal(givendate));
    console.log(givendate, bookDetailModal);
  };

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

  const book_mobile_1 = book_list.filter((v, idx) => {
    if (idx < 5) {
      return true;
    }
  });

  const book_mobile_2 = book_list.filter((v, idx) => {
    if (5 <= idx && idx < 10) {
      return true;
    }
  });

  const book_mobile_3 = book_list.filter((v, idx) => {
    if (10 <= idx && idx < 15) {
      return true;
    }
  });

  const book_mobile_4 = book_list.filter((v, idx) => {
    if (15 <= idx && idx < 20) {
      return true;
    }
  });

  const book_mobile_5 = book_list.filter((v, idx) => {
    if (20 <= idx && idx < 25) {
      return true;
    }
  });

  const book_mobile_6 = book_list.filter((v, idx) => {
    if (25 <= idx) {
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

    return () => {
      resetBooks();
    }
  }, []);

  return (
    <React.Fragment>
      <Container>
        <ForDate>
          {date_visible ? (
            <>
              <LeftOutlined
                style={{ fontSize: "14px", transform: "scaleX(0.8)"}}
                onClick={previousMonth}
                cursor="pointer"
              />
              <span style={{ margin: "0px 10px 0px 10px" }}>{formated_date}</span>
              <LeftOutlined
                style={{ fontSize: "14px" , transform: "rotateZ(180deg) scaleX(0.8)" }}
                onClick={nextMonth}
                cursor="pointer"
              />
            </>
          ) : (
            ""
          )}
        </ForDate>
        <ShelfBox>
          {/* <ImgLeft/> */}
          <BookRow>
            {book_1 &&
              book_1.map((v, idx) => {
                return (
                  <>
                    {cardDetailModal === v._id && (
                      <CardModal book date={v._id} close={close} />
                    )}
                    {v.count === 1 && (
                      <Book key={idx}>
                        <div
                          style={{
                            position: "relative",
                            width: "100%",
                            height: "100%",
                            cursor: "pointer",
                            zIndex: "3",
                          }}
                          onClick={() => {
                            openBook(v._id);
                          }}
                        ></div>
                        <Date>
                          {v._id.charAt(v._id.length - 2)}
                          {v._id.charAt(v._id.length - 1)}
                        </Date>
                        <BookImage src="https://user-images.githubusercontent.com/77574867/117760850-53a7a680-b261-11eb-8a8e-2727d0edbc91.png" />
                      </Book>
                    )}
                    {v.count === 2 && (
                      <Book key={idx}>
                        <div
                          style={{
                            position: "relative",
                            width: "100%",
                            height: "100%",
                            cursor: "pointer",
                            zIndex: "3",
                          }}
                          onClick={() => {
                            openBook(v._id);
                          }}
                        ></div>
                        <Date>
                          {v._id.charAt(v._id.length - 2)}
                          {v._id.charAt(v._id.length - 1)}
                        </Date>
                        <BookImage src="https://user-images.githubusercontent.com/77574867/117760848-530f1000-b261-11eb-8593-6e8d9699c0b4.png" />
                      </Book>
                    )}
                    {v.count >= 3 && (
                      <Book key={idx}>
                        <div
                          style={{
                            position: "relative",
                            width: "100%",
                            height: "100%",
                            cursor: "pointer",
                            zIndex: "3",
                          }}
                          onClick={() => {
                            openBook(v._id);
                          }}
                        ></div>
                        <Date>
                          {v._id.charAt(v._id.length - 2)}
                          {v._id.charAt(v._id.length - 1)}
                        </Date>
                        <BookImage src="https://user-images.githubusercontent.com/77574867/117760845-51dde300-b261-11eb-8d57-7bdd1870d003.png" />
                      </Book>
                    )}
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
                    {cardDetailModal === v._id && (
                      <CardModal book date={v._id} close={close} />
                    )}
                    {v.count === 1 && (
                      <Book key={idx}>
                        <div
                          style={{
                            position: "relative",
                            width: "100%",
                            height: "100%",
                            cursor: "pointer",
                            zIndex: "3",
                          }}
                          onClick={() => {
                            openBook(v._id);
                          }}
                        ></div>
                        <Date>
                          {v._id.charAt(v._id.length - 2)}
                          {v._id.charAt(v._id.length - 1)}
                        </Date>
                        <BookImage src="https://user-images.githubusercontent.com/77574867/117760850-53a7a680-b261-11eb-8a8e-2727d0edbc91.png" />
                      </Book>
                    )}
                    {v.count === 2 && (
                      <Book key={idx}>
                        <div
                          style={{
                            position: "relative",
                            width: "100%",
                            height: "100%",
                            cursor: "pointer",
                            zIndex: "3",
                          }}
                          onClick={() => {
                            openBook(v._id);
                          }}
                        ></div>
                        <Date>
                          {v._id.charAt(v._id.length - 2)}
                          {v._id.charAt(v._id.length - 1)}
                        </Date>
                        <BookImage src="https://user-images.githubusercontent.com/77574867/117760848-530f1000-b261-11eb-8593-6e8d9699c0b4.png" />
                      </Book>
                    )}
                    {v.count >= 3 && (
                      <Book key={idx}>
                        <div
                          style={{
                            position: "relative",
                            width: "100%",
                            height: "100%",
                            cursor: "pointer",
                            zIndex: "3",
                          }}
                          onClick={() => {
                            openBook(v._id);
                          }}
                        ></div>
                        <Date>
                          {v._id.charAt(v._id.length - 2)}
                          {v._id.charAt(v._id.length - 1)}
                        </Date>
                        <BookImage src="https://user-images.githubusercontent.com/77574867/117760845-51dde300-b261-11eb-8d57-7bdd1870d003.png" />
                      </Book>
                    )}
                  </>
                );
              })}
          </BookRow>
          <Shelf></Shelf>
        </ShelfBox>
        <ShelfBoxMobile>
          <BookRow>
            {book_mobile_1 &&
              book_mobile_1.map((v, idx) => {
                return (
                  <>
                    {cardDetailModal === v._id && (
                      <CardModal book date={v._id} close={close} />
                    )}
                    {v.count === 1 && (
                      <Book key={idx}>
                        <div
                          style={{
                            position: "relative",
                            width: "100%",
                            height: "100%",
                            cursor: "pointer",
                            zIndex: "3",
                          }}
                          onClick={() => {
                            openBook(v._id);
                          }}
                        ></div>
                        <Date>
                          {v._id.charAt(v._id.length - 2)}
                          {v._id.charAt(v._id.length - 1)}
                        </Date>
                        <BookImage src="https://user-images.githubusercontent.com/77574867/118598111-91b84380-b7e8-11eb-879a-e0f3802e7dd2.png" />
                      </Book>
                    )}
                    {v.count === 2 && (
                      <Book key={idx}>
                        <div
                          style={{
                            position: "relative",
                            width: "100%",
                            height: "100%",
                            cursor: "pointer",
                            zIndex: "3",
                          }}
                          onClick={() => {
                            openBook(v._id);
                          }}
                        ></div>
                        <Date>
                          {v._id.charAt(v._id.length - 2)}
                          {v._id.charAt(v._id.length - 1)}
                        </Date>
                        <BookImage src="https://user-images.githubusercontent.com/77574867/118598114-9250da00-b7e8-11eb-9b08-20e3d3c75736.png" />
                      </Book>
                    )}
                    {v.count >= 3 && (
                      <Book key={idx}>
                        <div
                          style={{
                            position: "relative",
                            width: "100%",
                            height: "100%",
                            cursor: "pointer",
                            zIndex: "3",
                          }}
                          onClick={() => {
                            openBook(v._id);
                          }}
                        ></div>
                        <Date>
                          {v._id.charAt(v._id.length - 2)}
                          {v._id.charAt(v._id.length - 1)}
                        </Date>
                        <BookImage src="https://user-images.githubusercontent.com/77574867/118598118-92e97080-b7e8-11eb-96d4-5f0cf5396e75.png" />
                      </Book>
                    )}
                  </>
                );
              })}
          </BookRow>
          <Shelf></Shelf>
        </ShelfBoxMobile>
        <ShelfBoxMobile>
          <BookRow>
            {book_mobile_2 &&
              book_mobile_2.map((v, idx) => {
                return (
                  <>
                    {cardDetailModal === v._id && (
                      <CardModal book date={v._id} close={close} />
                    )}
                    {v.count === 1 && (
                      <Book key={idx}>
                        <div
                          style={{
                            position: "relative",
                            width: "100%",
                            height: "100%",
                            cursor: "pointer",
                            zIndex: "3",
                          }}
                          onClick={() => {
                            openBook(v._id);
                          }}
                        ></div>
                        <Date>
                          {v._id.charAt(v._id.length - 2)}
                          {v._id.charAt(v._id.length - 1)}
                        </Date>
                        <BookImage src="https://user-images.githubusercontent.com/77574867/118598111-91b84380-b7e8-11eb-879a-e0f3802e7dd2.png" />
                      </Book>
                    )}
                    {v.count === 2 && (
                      <Book key={idx}>
                        <div
                          style={{
                            position: "relative",
                            width: "100%",
                            height: "100%",
                            cursor: "pointer",
                            zIndex: "3",
                          }}
                          onClick={() => {
                            openBook(v._id);
                          }}
                        ></div>
                        <Date>
                          {v._id.charAt(v._id.length - 2)}
                          {v._id.charAt(v._id.length - 1)}
                        </Date>
                        <BookImage src="https://user-images.githubusercontent.com/77574867/118598114-9250da00-b7e8-11eb-9b08-20e3d3c75736.png" />
                      </Book>
                    )}
                    {v.count >= 3 && (
                      <Book key={idx}>
                        <div
                          style={{
                            position: "relative",
                            width: "100%",
                            height: "100%",
                            cursor: "pointer",
                            zIndex: "3",
                          }}
                          onClick={() => {
                            openBook(v._id);
                          }}
                        ></div>
                        <Date>
                          {v._id.charAt(v._id.length - 2)}
                          {v._id.charAt(v._id.length - 1)}
                        </Date>
                        <BookImage src="https://user-images.githubusercontent.com/77574867/118598118-92e97080-b7e8-11eb-96d4-5f0cf5396e75.png" />
                      </Book>
                    )}
                  </>
                );
              })}
          </BookRow>
          <Shelf></Shelf>
        </ShelfBoxMobile>
        <ShelfBoxMobile>
          <BookRow>
            {book_mobile_3 &&
              book_mobile_3.map((v, idx) => {
                return (
                  <>
                    {cardDetailModal === v._id && (
                      <CardModal book date={v._id} close={close} />
                    )}
                    {v.count === 1 && (
                      <Book key={idx}>
                        <div
                          style={{
                            position: "relative",
                            width: "100%",
                            height: "100%",
                            cursor: "pointer",
                            zIndex: "3",
                          }}
                          onClick={() => {
                            openBook(v._id);
                          }}
                        ></div>
                        <Date>
                          {v._id.charAt(v._id.length - 2)}
                          {v._id.charAt(v._id.length - 1)}
                        </Date>
                        <BookImage src="https://user-images.githubusercontent.com/77574867/118598111-91b84380-b7e8-11eb-879a-e0f3802e7dd2.png" />
                      </Book>
                    )}
                    {v.count === 2 && (
                      <Book key={idx}>
                        <div
                          style={{
                            position: "relative",
                            width: "100%",
                            height: "100%",
                            cursor: "pointer",
                            zIndex: "3",
                          }}
                          onClick={() => {
                            openBook(v._id);
                          }}
                        ></div>
                        <Date>
                          {v._id.charAt(v._id.length - 2)}
                          {v._id.charAt(v._id.length - 1)}
                        </Date>
                        <BookImage src="https://user-images.githubusercontent.com/77574867/118598114-9250da00-b7e8-11eb-9b08-20e3d3c75736.png" />
                      </Book>
                    )}
                    {v.count >= 3 && (
                      <Book key={idx}>
                        <div
                          style={{
                            position: "relative",
                            width: "100%",
                            height: "100%",
                            cursor: "pointer",
                            zIndex: "3",
                          }}
                          onClick={() => {
                            openBook(v._id);
                          }}
                        ></div>
                        <Date>
                          {v._id.charAt(v._id.length - 2)}
                          {v._id.charAt(v._id.length - 1)}
                        </Date>
                        <BookImage src="https://user-images.githubusercontent.com/77574867/118598118-92e97080-b7e8-11eb-96d4-5f0cf5396e75.png" />
                      </Book>
                    )}
                  </>
                );
              })}
          </BookRow>
          <Shelf></Shelf>
        </ShelfBoxMobile>
        <ShelfBoxMobile>
          <BookRow>
            {book_mobile_4 &&
              book_mobile_4.map((v, idx) => {
                return (
                  <>
                    {cardDetailModal === v._id && (
                      <CardModal book date={v._id} close={close} />
                    )}
                    {v.count === 1 && (
                      <Book key={idx}>
                        <div
                          style={{
                            position: "relative",
                            width: "100%",
                            height: "100%",
                            cursor: "pointer",
                            zIndex: "3",
                          }}
                          onClick={() => {
                            openBook(v._id);
                          }}
                        ></div>
                        <Date>
                          {v._id.charAt(v._id.length - 2)}
                          {v._id.charAt(v._id.length - 1)}
                        </Date>
                        <BookImage src="https://user-images.githubusercontent.com/77574867/118598111-91b84380-b7e8-11eb-879a-e0f3802e7dd2.png" />
                      </Book>
                    )}
                    {v.count === 2 && (
                      <Book key={idx}>
                        <div
                          style={{
                            position: "relative",
                            width: "100%",
                            height: "100%",
                            cursor: "pointer",
                            zIndex: "3",
                          }}
                          onClick={() => {
                            openBook(v._id);
                          }}
                        ></div>
                        <Date>
                          {v._id.charAt(v._id.length - 2)}
                          {v._id.charAt(v._id.length - 1)}
                        </Date>
                        <BookImage src="https://user-images.githubusercontent.com/77574867/118598114-9250da00-b7e8-11eb-9b08-20e3d3c75736.png" />
                      </Book>
                    )}
                    {v.count >= 3 && (
                      <Book key={idx}>
                        <div
                          style={{
                            position: "relative",
                            width: "100%",
                            height: "100%",
                            cursor: "pointer",
                            zIndex: "3",
                          }}
                          onClick={() => {
                            openBook(v._id);
                          }}
                        ></div>
                        <Date>
                          {v._id.charAt(v._id.length - 2)}
                          {v._id.charAt(v._id.length - 1)}
                        </Date>
                        <BookImage src="https://user-images.githubusercontent.com/77574867/118598118-92e97080-b7e8-11eb-96d4-5f0cf5396e75.png" />
                      </Book>
                    )}
                  </>
                );
              })}
          </BookRow>
          <Shelf></Shelf>
        </ShelfBoxMobile>
        <ShelfBoxMobile>
          <BookRow>
            {book_mobile_5 &&
              book_mobile_5.map((v, idx) => {
                return (
                  <>
                    {cardDetailModal === v._id && (
                      <CardModal book date={v._id} close={close} />
                    )}
                    {v.count === 1 && (
                      <Book key={idx}>
                        <div
                          style={{
                            position: "relative",
                            width: "100%",
                            height: "100%",
                            cursor: "pointer",
                            zIndex: "3",
                          }}
                          onClick={() => {
                            openBook(v._id);
                          }}
                        ></div>
                        <Date>
                          {v._id.charAt(v._id.length - 2)}
                          {v._id.charAt(v._id.length - 1)}
                        </Date>
                        <BookImage src="https://user-images.githubusercontent.com/77574867/118598111-91b84380-b7e8-11eb-879a-e0f3802e7dd2.png" />
                      </Book>
                    )}
                    {v.count === 2 && (
                      <Book key={idx}>
                        <div
                          style={{
                            position: "relative",
                            width: "100%",
                            height: "100%",
                            cursor: "pointer",
                            zIndex: "3",
                          }}
                          onClick={() => {
                            openBook(v._id);
                          }}
                        ></div>
                        <Date>
                          {v._id.charAt(v._id.length - 2)}
                          {v._id.charAt(v._id.length - 1)}
                        </Date>
                        <BookImage src="https://user-images.githubusercontent.com/77574867/118598114-9250da00-b7e8-11eb-9b08-20e3d3c75736.png" />
                      </Book>
                    )}
                    {v.count >= 3 && (
                      <Book key={idx}>
                        <div
                          style={{
                            position: "relative",
                            width: "100%",
                            height: "100%",
                            cursor: "pointer",
                            zIndex: "3",
                          }}
                          onClick={() => {
                            openBook(v._id);
                          }}
                        ></div>
                        <Date>
                          {v._id.charAt(v._id.length - 2)}
                          {v._id.charAt(v._id.length - 1)}
                        </Date>
                        <BookImage src="https://user-images.githubusercontent.com/77574867/118598118-92e97080-b7e8-11eb-96d4-5f0cf5396e75.png" />
                      </Book>
                    )}
                  </>
                );
              })}
          </BookRow>
          <Shelf></Shelf>
        </ShelfBoxMobile>
        <ShelfBoxMobile>
          <BookRow>
            {book_mobile_6 &&
              book_mobile_6.map((v, idx) => {
                return (
                  <>
                    {cardDetailModal === v._id && (
                      <CardModal book date={v._id} close={close} />
                    )}
                    {v.count === 1 && (
                      <Book key={idx}>
                        <div
                          style={{
                            position: "relative",
                            width: "100%",
                            height: "100%",
                            cursor: "pointer",
                            zIndex: "3",
                          }}
                          onClick={() => {
                            openBook(v._id);
                          }}
                        ></div>
                        <Date>
                          {v._id.charAt(v._id.length - 2)}
                          {v._id.charAt(v._id.length - 1)}
                        </Date>
                        <BookImage src="https://user-images.githubusercontent.com/77574867/118598111-91b84380-b7e8-11eb-879a-e0f3802e7dd2.png" />
                      </Book>
                    )}
                    {v.count === 2 && (
                      <Book key={idx}>
                        <div
                          style={{
                            position: "relative",
                            width: "100%",
                            height: "100%",
                            cursor: "pointer",
                            zIndex: "3",
                          }}
                          onClick={() => {
                            openBook(v._id);
                          }}
                        ></div>
                        <Date>
                          {v._id.charAt(v._id.length - 2)}
                          {v._id.charAt(v._id.length - 1)}
                        </Date>
                        <BookImage src="https://user-images.githubusercontent.com/77574867/118598114-9250da00-b7e8-11eb-9b08-20e3d3c75736.png" />
                      </Book>
                    )}
                    {v.count >= 3 && (
                      <Book key={idx}>
                        <div
                          style={{
                            position: "relative",
                            width: "100%",
                            height: "100%",
                            cursor: "pointer",
                            zIndex: "3",
                          }}
                          onClick={() => {
                            openBook(v._id);
                          }}
                        ></div>
                        <Date>
                          {v._id.charAt(v._id.length - 2)}
                          {v._id.charAt(v._id.length - 1)}
                        </Date>
                        <BookImage src="https://user-images.githubusercontent.com/77574867/118598118-92e97080-b7e8-11eb-96d4-5f0cf5396e75.png" />
                      </Book>
                    )}
                  </>
                );
              })}
          </BookRow>
          <Shelf></Shelf>
        </ShelfBoxMobile>
      </Container>
    </React.Fragment>
  );
};

const Container = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 20px 0px;
  padding-bottom: 110px;
  @media (min-height: 1200px) {
    padding-bottom: 300px;
  }

  @media (max-width: 750px) {
    margin: 5px 0px;
  }
`;

const ForDate = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
  font: normal normal normal 13px/19px Noto Sans CJK KR;
  @media (min-width: 750px) {
    transform: scale(1.2);
  }
`;

const ShelfBox = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 1040px) {
    margin-left: 0px;
  }
  @media (max-width: 750px) {
    display: none;
  }
`;

const ShelfBoxMobile = styled.div`
  position: relative;
  width: 100%;
  max-width: 335px;
  margin: 0px auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (min-width: 750px) {
    display: none;
  }
`;

const Shelf = styled.div`
  opacity: 1;
  position: relative;
  margin: -20px 0px 20px 0px;
  width: 100%;
  max-width: 1040px;
  height: 34px;
  background: #FFFFFF 0% 0% no-repeat padding-box;
  box-shadow: 0px 0px 10px #0000001A;
  @media (max-width: 750px) {
    max-width:335px;
  }
`;

const BookRow = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 210px;
  max-width: 1055px;
  /* overflow:hidden; */
  margin: 10px 0px -5px 55px;
  @media (max-width: 1000px) {
    width: 900px;
  }
  @media (max-width: 1040px) {
    margin: 10px 0px -5px 20px;
  }
  @media (max-width: 800px) {
    margin: 10px 0px -5px 160px;
  }

  @media (max-width: 750px) {
    margin: 10px 5px -15px 0px;
    max-width: 300px;
    height: 150px;
    
    /* overflow:hidden; */
    justify-content: flex-start;
  }
`;

const Book = styled.div`
  
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  width: 46px;
  height: 210px;
  margin: 0px 10px;

  &:hover {
    z-index: 40;
    transform:translateY(-20%);
  }
  @media (max-width: 1000px) {
    margin: 0px 5px;
  }
  @media (max-width: 750px) {
    margin: 0px 11px;
    width: 38px;
    height: 140px;
  }
`;

const Date = styled.span`
  position: absolute;
  top: 20px;
  left: 14px;
  z-index: 2;
  color: #ffffff;
  font-weight: 600;
  @media (max-width: 750px) {
    top: 10px;
    left: 13px;
  }
`;

const BookImage = styled.img`
  position: absolute;
  top: -10px;
  left: -23px;
  z-index: 1;
  @media (max-width: 750px) {
    top: -10px;
    left: -13px;
  }
`;

export default BookShelf;
