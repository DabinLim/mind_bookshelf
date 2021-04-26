import React from 'react';
import styled from 'styled-components';
import {history} from '../redux/configStore';

const BookShelf = (props) => {
    console.log(props)
    const date = props.date.format('YYMMDD')
    const day = props.date.format('DD')

    return(
        <React.Fragment>
            <Container>
                <WeeklyBooks>
                <Book onClick={() => {history.push(`/mybook/${date}`)}}>{day}</Book>
                </WeeklyBooks>
            </Container>
        </React.Fragment>
    )
}

const Container = styled.div`
    box-sizing: border-box;
    width:90%;
    height:90%;
    background-color: white;
    display:flex;
    flex-direction:column;
    justify-content:flex-end;
`;

const WeeklyBooks = styled.div`
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