import React from 'react';
import styled from 'styled-components';

const Card = (props) => {
    const {width, display} = props
    return(
        <React.Fragment>
            <Container display={display} width={width}>
                <Subject>#사랑</Subject>
                <Question>하고 싶은 일과 잘하는 일 무엇을 해야 할까요?</Question>
                <div style={{width:'100%', position:'relative',display:'flex', flexDirection:'row', justifyContent:'flex-end', alignItems:'center'}}><Profile1/><Profile2/><Profile3/><Writing>75명이 낙서중</Writing></div>
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

const Profile1 = styled.div`
    position:absolute;
    top:15%;
    left:50%;
    width:40px;
    height:40px;
    background-color:black;
    border-style:none;
    border-radius:20px;
`;
const Profile2 = styled.div`
    position:absolute;
    top:15%;
    left:55%;
    width:40px;
    height:40px;
    background-color:darkgray;
    border-style:none;
    border-radius:20px;
`;
const Profile3 = styled.div`
    position:absolute;
    top:15%;
    left:60%;
    width:40px;
    height:40px;
    background-color:gray;
    border-style:none;
    border-radius:20px;
`;

const Writing = styled.span`
    margin: 20px 10px;
`;

export default Card;