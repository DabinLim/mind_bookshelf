import React from 'react';
import {history} from '../redux/configStore';
import styled from 'styled-components';
import {NewQuestion, BookShelf, Profile, MyQuestion, MyAnswers, ProfileUpdateModal} from '../components/Books/booksindex';
import {useSelector, useDispatch} from 'react-redux';
import {setComponent, changeDate} from '../redux/modules/books';
import { getCookie } from '../shared/Cookie';
import {api as userActions, resetFollower, resetFollowing} from '../redux/modules/user'
import { changeType } from '../redux/modules/community';
import swal from "sweetalert";
import AddIcon from '@material-ui/icons/Add';
import DoneIcon from '@material-ui/icons/Done';

const MyBook = (props) => {
    const dispatch = useDispatch();
    const component = useSelector(state => state.books.component)
    const date = useSelector(state => state.books.date)
    const answerInfo = useSelector((state) => state.community.card_detail);
    const is_login = useSelector((state) => state.user.is_login);
    const [UpdateModal, setUpdateModal] = React.useState(false);
    const [modalVisable, setModalVisible] = React.useState(false);
    const userId = useSelector((state) => state.user.user.id);
    const createdQuestion = useSelector((state) => state.user.other.createdQuestion)

    let url = window.location.href.split('/');
    let id = url[url.length -1];
    const closeUpdateModal = () => {
        setUpdateModal(false);
      };

    React.useEffect(() => {

        if(!getCookie('is_login')){
            window.alert('로그인 상태가 아닙니다.');
            history.replace('/');
            return
        };
        if(getCookie('is_login') || !is_login){
            dispatch(userActions.LoginCheckAX(true));
            dispatch(setComponent(''));
        
        }else{
            dispatch(setComponent(''));
            dispatch(userActions.othersInfoAX(userId));
            dispatch(userActions.getFollowing(userId));
            dispatch(userActions.getFollower(userId));
        }
        return()=>{
            dispatch(changeDate('today'))
            dispatch(resetFollower());
            dispatch(resetFollowing());
            if(answerInfo.length !== 0){
                dispatch(changeType(null))
            }}
    },[])


    return(
        <React.Fragment>
            {UpdateModal ? <ProfileUpdateModal close={closeUpdateModal} /> : null}
            {modalVisable? 
                <NewQuestion setModalVisible={setModalVisible} />
            :null}
            {createdQuestion ? 
            <>
            <CustomBtnIcon
                onClick={() => {
                    setModalVisible(true)
                }}
            >
                <AddIcon fontSize="large" style={{color:"white"}} />
            </CustomBtnIcon>
            <CustomBtn
                onClick={() => {
                    setModalVisible(true)
                }}
            >
                질문 작성
            </CustomBtn>
            </>
            :
            <>
            <CustomBtnIcon
                style={{backgroundColor:"silver"}}
                onClick={() => {
                    swal({
                        title: "질문은 하루에 한 번만 만들 수 있어요.",
                        icon: "error",
                    });
                }}
            >
                <DoneIcon fontSize="large" style={{color:"white"}} />
            </CustomBtnIcon>
            <CustomBtn
                onClick={() => {
                    swal({
                        title: "질문은 하루에 한 번만 만들 수 있어요.",
                        icon: "error",
                    });
                }}
            >
                질문 완료
            </CustomBtn>
            </>
            }
            <Container>
                <ContainerBox>
                    <ProfileContainer component={component}>
                        <Profile setUpdateModal={setUpdateModal} />
                    </ProfileContainer>
                        {id === 'mybook' && component === '' &&
                        <BookShelf date={date}/>
                        }
                        {component === 'myquestion' && <MyQuestion/>}
                        {component === 'myanswers' && <MyAnswers/>}
                </ContainerBox>
            </Container>
        </React.Fragment>
    )
}

const CustomBtnIcon = styled.div`
position: fixed;
display: flex;
justify-content: center;
font-weight: bold;
align-items: center;
right: 26px;
bottom: 100px;
width: 63px;
height: 63px;
border-radius: 50px;
background: black;
z-index: 60;
cursor: pointer;
box-shadow: 0px 0px 20px #0000001a;
@media (max-width: 500px) {
  width: 50px;
  height: 50px;
  right: 14px;
  bottom: 80px;
}
`

const CustomBtn = styled.div`
position: fixed;
display: flex;
padding-left: 20px;
font-family: Noto Sans CJK KR;
font-weight: bold;
align-items: center;
right: 34px;
bottom: 102px;
width: 140px;
height: 58px;
border-radius: 50px;
background: white;
z-index: 50;
cursor: pointer;
box-shadow: 0px 0px 20px #0000001a;
@media (max-width: 500px) {
  display:none;
}
`;

const ContainerBox = styled.div`
    margin: 50px 0px 0px 0px;
    padding-left: 20px;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    @media(max-width:750px){
        padding-left:0px;
        overflow-x:hidden;
        margin:50px 0px 0px 0px;
    }
    ::-webkit-scrollbar {
    display: none;
    };
    @media (max-width: 750px) {
        margin: 50px 0px 0px 0px;
      }
`

const Container = styled.div`
    width: 100%;
    height: 100vh;
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    overflow:auto;
    ::-webkit-scrollbar {
    display:none;
    width: 10px; /* width of the entire scrollbar */
  }

  ::-webkit-scrollbar-track {
    display:none;
    background: none; /* color of the tracking area */
  }

  ::-webkit-scrollbar-thumb {
    display:none;
    background-color: #ffffff; /* color of the scroll thumb */
    border-radius: 20px; /* roundness of the scroll thumb */
  }
    @media (max-width:1040px){
    margin:0px 10px;
}
@media (max-width:750px){
    margin:0px;
    height: 100%;
}

@media (max-width: 500px) {
    margin: 0;
    }
    
`;

const ProfileContainer = styled.section`
    position:relative;
    box-sizing:border-box;
    padding:30px;
    width: 100%;
    margin: auto;
    margin-top: 70px;
    max-width:1070px;
    min-height:190px;
    display: flex;
    flex-direction: row;
    @media(max-width:750px){
        ${props => props.component === 'myanswers' || props.component === 'myquestion' ? `display:none`: `display:flex`};
        margin-top:0px;
        margin-bottom:30px;
        height:100%;
        min-height:280px;
        flex-direction:column;
        align-items:center;
        
    }
`;



export default MyBook;