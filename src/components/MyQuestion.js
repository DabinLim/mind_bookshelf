import React from 'react';
import styled from 'styled-components';
import Card from './Card';

const MyQuestion = (props) => {

    return(
        <React.Fragment>
            <Container>
                <TitleContainer>
                <Title>생각낙서님의 질문은 27개 입니다.</Title>
                <AddQuestion> 질문 등록하기 </AddQuestion>
                </TitleContainer>
                <CardContainer>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                </CardContainer>
            </Container>
        </React.Fragment>
    )
}

const Container = styled.div`
    box-sizing: border-box;
    padding: 50px;
    width:100%;
    height:100%;
`;

const TitleContainer = styled.div`
    width:100%;
    height: 20%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const Title = styled.span`
    width:40%;
    font-size: 40px;
    font-weight:800;
`;

const AddQuestion = styled.button`
    font-size:20px;
    border-style:none;
    color: blue;
    background-color:white;
    cursor:pointer;
`;

const CardContainer = styled.section`
    width:100%;
    height: 100%;
    display:flex;
    flex-direction:row;
    justify-content:space-between;
    flex-wrap:wrap;
    overflow:auto;
`;

export default MyQuestion;