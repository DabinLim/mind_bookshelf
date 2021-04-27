import React from 'react';
import styled from 'styled-components';
import '../../static/AnswerCard.scss';
import AnswerDetail from './AnswerDetail';

const AnswerCard = (props) => {

    const [modalVisible, setModalVisible] = React.useState(false);

    const openModal = () => {
        setModalVisible(true);
      };
    
      const closeModal = () => {
        setModalVisible(false);
      };


    return(
        <React.Fragment>
            <Container onClick={openModal}>
                <Head>
                    <Profile>
                    <ProfileImg/>
                    <span>나의 답변</span>
                    </Profile>
                    <Subject>#사랑</Subject>
                </Head>
                <Body>
                <Title>하고 싶은 일과 잘하는 일 무엇을 해야 할까요?</Title>
                <Answer>
                    하고 싶은 일을 해야 한다고 생각합니다.
                </Answer>
                </Body>
            </Container>
            <AnswerDetail
            visible={modalVisible}
            onClose={closeModal}
            maskClosable={true}
            closable={true}/>
        </React.Fragment>
    )
}

const Container = styled.div`
    box-sizing: border-box;
    padding:20px;
    margin:20px;
    display: flex;
    flex-direction: column;
    width:30%;
    height:50%;
    background-color:lavender;
    box-shadow: gray 2px 2px 2px 2px;
    transition:linear 0.5s;
`;

const Head = styled.div`
    width: 100%;
    height: 10%;
    display:flex;
    align-items:center;
    justify-content:space-between;
    flex-direction:row;
    border:1px solid black;
`;

const Profile = styled.div`
    width:auto;
    height:100%;
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:flex-start;
`;

const ProfileImg = styled.div`
    width: 36px;
    height: 36px;
    border-radius: 36px; 
    background-position: center;
    background-image: url('https://user-images.githubusercontent.com/77574867/116261377-8a39e780-a7b2-11eb-8037-4bb6ebb559b0.jpeg');
    background-size: cover;
    margin: 0px 10px 0px 0px;
`;

const Subject = styled.div`
    box-sizing:border-box;
    padding: 10px 0px;
    font-size: 10px;
    text-align: center;
    width:40px;
    height:30px;
    border-radius: 30px;
    background:white;
`;

const Body = styled.div`
    margin: 20px 0px;
    width:100%;
    height:100%;
    display:flex;
    flex-direction:column;
    justify-content:space-around;
`;

const Title = styled.h3`
    width:100%;
    height:auto;
    margin: 10px 0px;
    font-size:20px;
    font-weight: 600;
`;

const Answer = styled.div`
    width:100%;
    height:auto;
    margin: 20px 0px;
    font-size:15px;
`;

export default AnswerCard;