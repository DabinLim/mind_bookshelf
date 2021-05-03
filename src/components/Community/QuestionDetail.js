import React from 'react';
import styled from 'styled-components';
import AnswerCard from '../../shared/AnswerCard2';
// import {response} from '../redux/Mock/Answers';
import {useDispatch, useSelector} from 'react-redux';
import {api as moreviewActions, resetAll, setView} from '../../redux/modules/moreview';

const QuestionDetail = (props) => {
    const dispatch = useDispatch()
    const url = window.location.href.split('/');
    const id = url[url.length -1];
    const now_view = useSelector(state => state.moreview.now_view);
    const question_info = useSelector(state => state.moreview.question_info);
    console.log(question_info)
    const answers = useSelector(state => state.moreview.answers);
    const like_answers = useSelector(state => state.moreview.like_answers);
    const friends_answers = useSelector(state => state.moreview.friends_answers);

    React.useEffect(() => {
        dispatch(moreviewActions.getQuestionInfo(id));
        dispatch(moreviewActions.getAnswers(id));
        return () => {
            dispatch(resetAll());
        }
    },[])

    return(
        <React.Fragment>
            <Container>

                <QuestionTitle>
                    {question_info ? question_info.questionContents : '질문 내용'}
                </QuestionTitle>
                <button onClick={()=>{
                    dispatch(moreviewActions.getAnswers(id))
                    dispatch(setView('new'));
                }}>더보기</button>
                <button onClick={()=>{
                    dispatch(moreviewActions.getLikeAnswer(id))
                    dispatch(setView('like'));   
                    }}>좋아요 순서</button>
                <button onClick={()=>{
                    dispatch(moreviewActions.getFriendsAnswer(id))
                    dispatch(setView('friends'));
                    }}>친구 답변</button>
                <Subject>
                    <span>#사랑</span>
                </Subject>
                <AnswersBox>
                    {now_view === 'new' && answers.length && answers.map((v,idx) => {
                        return(
                            <AnswerCard key={idx} {...v} />
                        )
                    })}
                    {now_view === 'like' && like_answers.length && like_answers.map((v,idx) => {
                        return(
                            <AnswerCard key={idx} {...v} />
                        )
                    })}
                    {now_view === 'friends' && friends_answers.length && friends_answers.map((v,idx) => {
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