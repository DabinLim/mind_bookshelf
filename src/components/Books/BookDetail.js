import React from "react";
import styled from "styled-components";
import { ArrowLeft, ArrowRight } from "@material-ui/icons";
import {useSelector, useDispatch} from 'react-redux';
import {api as booksActions} from '../../redux/modules/books';
import AnswerCard from './AnswerCard';

const BookDetail = (props) => {
  const dispatch = useDispatch();
  const url = window.location.href.split("/");
  const current_date = url[url.length-1];
  

  

  React.useEffect(() => {
    dispatch(booksActions.getBookDetail(current_date));

  }, []);

  return (
    <React.Fragment>
      <Container>
        <ArrowLeft/>
        <CardContainer>
          <AnswerCard num={1}/>
          <AnswerCard num={2}/>
          <AnswerCard num={3}/>
        </CardContainer>
        <ArrowRight/>
      </Container>
    </React.Fragment>
  );
};

const Container = styled.div`
  position: relative;
  box-sizing: border-box;
  padding: 50px 30px;
  margin: 20px ;
  width: 100%;
  max-width:1000px;
  min-width:800px;
  height: 100%;
  background-color: lightgray;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const CardContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background: whitesmoke;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export default BookDetail;
