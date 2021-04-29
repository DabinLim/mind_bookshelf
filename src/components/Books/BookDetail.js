import React from "react";
import styled from "styled-components";
import { ArrowLeft, ArrowRight } from "@material-ui/icons";
import {history} from '../../redux/configStore';
import {useSelector, useDispatch} from 'react-redux';
import {api as booksActions} from '../../redux/modules/books';
import AnswerCard from '../../shared/AnswerCard';

const BookDetail = (props) => {
  const dispatch = useDispatch();
  const url = window.location.href.split("/");
  const current_date = url[url.length-1];
  const id = url[url.length-2];
  const date = useSelector(state => state.books.date);
  const book_detail = useSelector(state => state.books.book_detail);


  const previousDay = () => {
    const previous_day = date.subtract(1, 'd').format('YYMMDD');
    if(id === 'mybook'){
      history.push(`/mybook/${previous_day}`);
      return
    }
    history.push(`/others/${id}/${previous_day}`)
  }

  const nextDay = () => {
    const next_day = date.add(1, 'd').format('YYMMDD');
    if(id === 'mybook'){
      history.push(`/mybook/${next_day}`);
      return
    }
    history.push(`/others/${id}/${next_day}`)
  }

  React.useEffect(() => {
    if(id === 'mybook'){
      dispatch(booksActions.getBookDetail(current_date));
    } else
    {
      dispatch(booksActions.getOthersBookDetail(current_date,id));
    }

  }, url);

  return (
    <React.Fragment>
      <Container>
        <ArrowLeft onClick={previousDay}/>
        <CardContainer>
          {book_detail.map((v,idx) => {
            if(idx < 3){
              return(
                <AnswerCard key={idx} num={idx+1} {...v}/>
              )
            }
          })}
        </CardContainer>
        <ArrowRight onClick={nextDay}/>
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
  box-sizing:border-box;
  padding:5%;
  position: relative;
  width: 100%;
  height: 100%;
  background: whitesmoke;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default BookDetail;
