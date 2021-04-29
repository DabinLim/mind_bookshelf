import React from 'react';
import styled from 'styled-components';
import AnswerCard from '../shared/AnswerCard2';
import {response} from '../redux/Mock/Answers';
import {useDispatch, useSelector} from 'react-redux';
import {api as communityActions} from '../redux/modules/community';
import {setPage, setNext, resetAnswers} from '../redux/modules/community';

const QuestionDetail = (props) => {
    const dispatch = useDispatch()
    const url = window.location.href.split('/');
    const id = url[url.length -1];
    const question_info = useSelector(state => state.community.question_info)
    console.log(question_info)
    const answers = useSelector(state => state.community.answers)

    React.useEffect(() => {
        dispatch(communityActions.getQuestionInfo(id));
        dispatch(communityActions.getAnswers(id));
        return () => {
            dispatch(resetAnswers());
            dispatch(setNext(true));
            dispatch(setPage(1));
        }
    },[])

    return(
        <React.Fragment>
            <Container>

                <QuestionTitle>
                    {question_info ? question_info.questionContents : '질문 내용'}
                </QuestionTitle>
                <button onClick={()=>{dispatch(communityActions.getAnswers(id))}}>더보기</button>
                <Subject>
                    <span>#사랑</span>
                </Subject>
                <AnswersBox>
                    {answers.length && answers.map((v,idx) => {
                        return(
                            <AnswerCard key={idx} {...v} />
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
    max-height:500px;
    display:flex;
    flex-direction: row;
    justify-content: flex-start;
    flex-wrap:wrap;
    overflow-y:auto;
`;

export default QuestionDetail;