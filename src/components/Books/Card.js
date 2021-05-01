import React from 'react';
import styled from 'styled-components';

const Card = (props) => {
    const {width, display} = props
    return(
        <React.Fragment>
            <Container display={display} width={width}>
                <Subject>#{props.questionTopic}</Subject>
                <Question>{props.questionContents}</Question>
                <div style={{width:'100%', position:'relative',display:'flex', flexDirection:'row', justifyContent:'flex-end', alignItems:'center'}}><Writing>{props.answerCount}명이 낙서중</Writing></div>
            </Container>
        </React.Fragment>
    )
}

Card.defaultProps = {
    width:'45%',
    display:'flex'
}

const Container = styled.div`
    box-sizing:border-box;
    padding:10px;
    width:${props => props.width};
    height:35%;
    border: 1px solid black;
    display:${props => props.display};
    flex-direction:column;
    background-color:lightgray;
    border-radius: 1em;
    border-style:none;
    margin: 10px 0px;
`;

const Subject = styled.span`
    box-sizing:border-box;
    text-align:center;
    padding:4px;
    width:4em;
    background-color:lavender;
    border-radius:1em;
`;

const Question = styled.span`
    width:80%;
    margin:25px;
    font-size:30px;
    font-weight:600;
`;


const Writing = styled.span`
    margin: 20px 10px;
`;

export default Card;