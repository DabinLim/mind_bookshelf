import React from 'react';
import styled from 'styled-components';
import BookShelf from '../components/BookShelf';
import BookDetail from '../components/BookDetail';

const MyBook = (props) => {
    let url = window.location.href.split('/');
    let id = url[url.length -1];
    console.log(id)
    return(
        <React.Fragment>

            <Container>
            <DateContainer>
            <ForDate>
            <p> 2021. 05</p>
            </ForDate>
            <BookContainer>
                {0 < id < 32 ? <BookDetail/> : <BookShelf/>}
            </BookContainer>
            </DateContainer>
            <ProfileContainer/>
            </Container>
        </React.Fragment>
    )
}


const DateContainer= styled.div`
    width:100%;
    display:flex;
    flex-direction:column;
`;

const ForDate = styled.div`
    text-align:center;
`;

const Container = styled.div`
    width: 100%;
    height: 80vh;
    display:flex;
    flex-direction:row;
    justify-content:space-around;
`;

const BookContainer = styled.section`
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

const ProfileContainer = styled.section`
    width:20%;
    height:100%;
    border: 1px solid black;
`;

export default MyBook;