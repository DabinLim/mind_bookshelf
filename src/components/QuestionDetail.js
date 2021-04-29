import React from 'react';
import styled from 'styled-components';
import RecentQuestion from '../components/RecentQuestion';
import {response} from '../redux/Mock/Answers';

const QuestionDetail = (props) => {

    return(
        <React.Fragment>
            <Container>

                <QuestionTitle>
                    질문 내용
                </QuestionTitle>
                <Subject>
                    <span>#사랑</span>
                </Subject>
                <AnswersBox>
                    {response.answer_detail.map((v,idx) => {
                        return(
                            <RecentQuestion key={idx} {...v} />
                        )
                    })}
                </AnswersBox>
            </Container>
        </React.Fragment>
    )
}

const Container = styled.section`
    margin:0px 100px;
    width:auto;
    height:100%;
    display:flex;
    flex-direction:column;
    align-items:flex-start;
    justify-content:center;
`;


const QuestionTitle = styled.h2`
    font-size: xx-large;
    width:auto;
`;

const Subject = styled.div`
    width:60px;
    height:40px;
    border-radius:50px;
    display:flex;
    justify-content:center;
    align-items:center;
    background-color:lightgray;
`;

const AnswersBox = styled.div`
    margin: 20px 0px;
    width:100%;
    height:auto;
    display:flex;
    flex-direction: row;
    justify-content: flex-start;
    flex-wrap:wrap;
    overflow-y:auto;
`;

export default QuestionDetail;