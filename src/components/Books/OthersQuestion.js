import React from 'react';
import styled from 'styled-components';
import {NewQuestion} from './booksindex';
import {useDispatch, useSelector} from 'react-redux';
import {api as booksActions, setPage, setNext, resetCustomQuestion, setBookLoading} from '../../redux/modules/books';
import InfinityScroll from '../../shared/InfinityScroll';
const OthersQuestion = (props) => {
    const dispatch = useDispatch()
    const [modalVisible, setModalVisible] = React.useState(false);
    const custom_question = useSelector(state => state.books.custom_question);
    const custom_count = useSelector(state => state.books.custom_count);
    const is_loading = useSelector(state => state.books.book_loading);
    const is_next = useSelector(state => state.books.next);
    const user_info = useSelector(state => state.user.other);
    const container = React.useRef();
    const url = window.location.href.split('/');
    const id = url[url.length -1];
    const openModal = () => {
        setModalVisible(true);
      };
    
      const closeModal = () => {
        setModalVisible(false);
      };

    React.useEffect(() => {

            dispatch(booksActions.getOthersQuest(id));
        
        return () => {
            dispatch(resetCustomQuestion());
            dispatch(setPage(1));
            dispatch(setNext(true));
            dispatch(setBookLoading(true))
        }
    },[id])


    return(
        <React.Fragment>
            <Container>
                <Background/>
                <TitleContainer>
                <Title><span style={{fontSize:'22px',fontWeight:'600'}}>{user_info?.nickname}</span>님의 질문카드는 <span style={{fontSize:'22px',fontWeight:'600'}}>{custom_count}개</span>입니다.</Title>
                <AddQuestion onClick={openModal}> <span style={{fontSize:'24px'}}>+</span> 질문 등록하기 </AddQuestion>
                </TitleContainer>
                <CardContainer ref={container}>
                    <InfinityScroll 
                        callNext={() => {
                            console.log(
                                'scroooolled!'
                            )
                            dispatch(booksActions.getOthersQuest(id));
                        }}
                        is_next={is_next? true: false}
                        is_loading={is_loading}
                        ref_value={container.current}
                    >
                    {custom_question && custom_question.map((v,idx) => {
                        return(
                            <Card key={idx} {...v}>
                                <Head>
                                    <SubjectBox>
                                        {v.questionTopic?.length && v.questionTopic.map((v) => {
                                            console.log(v)
                                            if(v === '사랑'){
                                                return (
                                                    <Subject style={{background:"#FFAAAA", boxShadow: "0px 0px 15px #FFAAAA"}} ><span>#사랑</span></Subject>
                                                )
                                            }
                                            if(v === '우정'){
                                                return (
                                                    <Subject style={{background:"#B9FFC4", boxShadow: "0px 0px 15px #B9FFC4"}} ><span>#우정</span></Subject>
                                                )
                                            }
                                            if(v === '꿈'){
                                                return (
                                                    <Subject style={{background:"#B7E6FF", boxShadow: "0px 0px 15px #B7E6FF"}} ><span>#우정</span></Subject>
                                                )
                                            }
                                            if(v === '가치'){
                                                return (
                                                    <Subject style={{background:"#B5BDFF", boxShadow: "0px 0px 15px #B5BDFF"}} ><span>#가치</span></Subject>
                                                )
                                            }
                                            if(v === '관계'){
                                                return (
                                                    <Subject style={{background:"#FFF09D" ,boxShadow: "0px 0px 15px #FFF09D"}} ><span>#관계</span></Subject>
                                                )
                                            }
                                            if(v === '나'){
                                                return (
                                                    <Subject style={{background:"#F9D1FD", boxShadow: "0px 0px 15px #F9D1FD"}} ><span>#나</span></Subject>
                                                )
                                            }
                                        })}
                                    </SubjectBox>
                                    <AnswerCount>
                                        {v.answerCount}명 낙서중
                                    </AnswerCount>
                                </Head>
                                <QuestionContents>
                                    {v.questionContents}
                                </QuestionContents>
                                <CreatedAtBox>
                                    <CreatedAt>
                                        {v.questionCreatedAt}
                                    </CreatedAt>
                                </CreatedAtBox>
                            </Card>
                        )
                    })}
                    </InfinityScroll>
                </CardContainer>
            </Container>
            <NewQuestion
            visible={modalVisible}
            onClose={closeModal}
            maskClosable={true}
            closable={true}/>
        </React.Fragment>
    )
}

const Container = styled.div`
    position:relative;
    box-sizing: border-box;
    padding: 45px 10px 45px 45px;
    width:100%;
    height:100%;
    max-width:988px;
    max-height:632px;
    margin-top:37px;
    margin-bottom:50px;
    border-radius:20px;
    overflow:hidden;
`;
const Background = styled.div`
    z-index:-1;
    position:absolute;
    top:0;
    left:0;
    max-width:988px;
    width:100%;
    padding: 100%;
    background-color: #ffffff;
    box-shadow: 0px 0px 20px;
    opacity: 0.3;
`;

const TitleContainer = styled.div`
    box-sizing:border-box;
    padding-right:70px;
    width:100%;
    height: 60px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom:38px;
`;

const Title = styled.span`
    width:230px;
    min-width:230px;
    height:60px;
    font-size: 22px;
    font-weight:400;
`;

const AddQuestion = styled.span`
    font-size:16px;
    color: #061366;
    cursor:pointer;
`;

const CardContainer = styled.section`
    box-sizing:border-box;
    padding-right:50px;
    width:100%;
    height: 100%;
    display:flex;
    flex-direction:row;
    justify-content:flex-start;
    flex-wrap:wrap;
    overflow:auto;
    padding-bottom:60px;
`;

const Card = styled.div`
    display:flex;
    flex-direction:column;
    width:100%;
    height:100%;
    max-width: 272px;
    max-height:189px;
    margin:0px 20px 25px 0px;
    background: #ffffff;
    box-shadow: 0px 0px 20px #0000001A;
    border-radius: 20px;
    box-sizing:border-box;
    padding:18px;
`;

const Head = styled.div`
    width:100%;
    height: 26px;
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:space-between;
`;

const SubjectBox = styled.div`
    display:flex;
    flex-direction:row;
    width: 50%;
    height:100%;
`;

const Subject = styled.div`
    display: flex;
    justify-content:center;
    align-items:center;
    width:63px;
    height:26px;
    opacity:0.8;
    border-radius: 45px;
    font-size:14px;
    font-weight: 600;
`;

const AnswerCount = styled.span`
    font-size:11px;
`;


const QuestionContents = styled.span`
    font-size:15px;
    font-weight:600;
    width: 100%;
    height:100%;
    margin-top:17px;
    display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CreatedAtBox = styled.div`
    box-sizing:border-box;
    border-top: 1px solid #bbbbbb;
    padding-top:13px;
`;

const CreatedAt = styled.span`
    font-size:11px;
`;

export default OthersQuestion;