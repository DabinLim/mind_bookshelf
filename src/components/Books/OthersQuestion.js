import React from 'react';
import styled from 'styled-components';
import {NewQuestion} from './booksindex';
import {useDispatch, useSelector} from 'react-redux';
import {api as booksActions, setPage, setNext, resetCustomQuestion} from '../../redux/modules/books';
const OthersQuestion = (props) => {
    const dispatch = useDispatch()
    const [modalVisible, setModalVisible] = React.useState(false);
    const custom_question = useSelector(state => state.books.custom_question);
    const page_owner_id = useSelector(state => state.books.page_owner);
    const openModal = () => {
        setModalVisible(true);
      };
    
      const closeModal = () => {
        setModalVisible(false);
      };

    React.useEffect(() => {
        
            dispatch(booksActions.getOthersQuest(page_owner_id));
        
        return () => {
            dispatch(resetCustomQuestion());
            dispatch(setPage(1));
            dispatch(setNext(true));
        }
    },[])


    return(
        <React.Fragment>
            <Container>
                <TitleContainer>
                <Title>생각낙서님의 질문은 27개 입니다.</Title>
                <AddQuestion onClick={openModal}> 질문 등록하기 </AddQuestion>
                <button onClick={() => {dispatch(booksActions.getOthersQuest())}}>더 보기</button>
                </TitleContainer>
                <CardContainer>
                    {/* {custom_question && custom_question.map((v,idx) => {
                        return(
                            <Card key={idx} {...v} />
                        )
                    })} */}
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

export default OthersQuestion;