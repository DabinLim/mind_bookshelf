import React from "react";
import styled from "styled-components";
import "../static/BookDetail.scss";
import { ArrowLeft, ArrowRight } from "@material-ui/icons";
import Card from "./Card";
import { history } from "../redux/configStore";
import {useSelector, useDispatch} from 'react-redux';
import {api as booksActions} from '../redux/modules/books';

const BookDetail = (props) => {
  const dispatch = useDispatch();
  const url = window.location.href.split("/");
  const current_date = url[url.length-1];
  const [page, setPage] = React.useState("defaultpage");
  const [diary, setDiary] = React.useState("defaultdiary");
  const [display, setDisplay] = React.useState(false);

  if (page === "page-origin") {
    setTimeout(function () {
      setPage("page");
    }, 50);
  }
  if (diary === "diary-origin") {
    setTimeout(function () {
      setDiary("diary");
    }, 50);
  }

  if (display === false) {
    setTimeout(function () {
      setDisplay(true);
    }, 550);
  }

  const previousPage = () => {
    setDisplay(false);
    setPage("page-flip");
    setTimeout(function () {
      setDisplay(true);
      setPage("page-origin");
    }, 510);
  };

  const nextPage = () => {
    setDisplay(false);
    setDiary("diary-flip");
    setTimeout(function () {
      setDisplay(true);
      setDiary("diary-origin");
    }, 510);
  };

  React.useEffect(() => {
    dispatch(booksActions.getBookDetail(current_date));
    setPage("page");
    setDiary("diary");
  }, []);

  return (
    <React.Fragment>
      <Container>
        <ArrowLeft onClick={previousPage} fontSize="large" />
        <BookContainer>
          <div className={page}>
            <div className="page-side page-side-front">
              {display ? (
                <>
                  <Card width="100%"></Card>
                  <Card width="100%"></Card>
                </>
              ) : (
                <span className="spinner-on">Logo</span>
              )}
            </div>
            <div className="page-side page-side-back">
              {display ? (
                <>
                  <Card width="100%"></Card>
                  <Card width="100%"></Card>
                </>
              ) : (
                <span className="spinner-on">Logo</span>
              )}
            </div>
          </div>
          <div className={diary}>
            <div className="diary-side diary-side-front">
              {display ? (
                <>
                  <Card width="100%"></Card>
                  <Card width="100%"></Card>
                </>
              ) : (
                <span className="spinner-on">Logo</span>
              )}
            </div>
            <div className="diary-side diary-side-back">
              {display ? (
                <>
                  <Card width="100%"></Card>
                  <Card width="100%"></Card>
                </>
              ) : (
                <span className="spinner-on">Logo</span>
              )}
            </div>
          </div>
        </BookContainer>
        <ArrowRight onClick={nextPage} fontSize="large" />
      </Container>
    </React.Fragment>
  );
};

const Container = styled.div`
  position: relative;
  box-sizing: border-box;
  padding: 50px 20px;
  margin: 20px;
  width: 100%;
  height: 100%;
  background-color: lightgray;
  display: flex;
  flex-direction: row;
  align-items: center;
  perspective: 1000px;
`;

const BookContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background: whitesmoke;
  display: flex;
  flex-direction: row;
  align-items: center;
  transition: linear 1s;
  box-shadow: gray 5px 5px 5px 5px;
  transform-style: preserve-3d;
`;

export default BookDetail;
