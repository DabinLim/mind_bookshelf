import React from 'react';
import {history} from '../redux/configStore';
import styled from 'styled-components';
import {NewQuestion, BookShelf, Profile, MyQuestion, MyAnswers, ProfileUpdateModal} from '../components/Books/booksindex';
import {useSelector, useDispatch} from 'react-redux';
import {setComponent, setBookDetailModal, setDateVisible} from '../redux/modules/books';
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
    console.log(userId)
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
                    {/* {id === 'mybook' && component === '' && <ImgLeft/>} */}
                    <ProfileContainer component={component}>
                        <Profile setUpdateModal={setUpdateModal} />
                    </ProfileContainer>
                        {id === 'mybook' && component === '' &&
                        <BookShelf date={date}/>
                        }
                        {component === 'myquestion' && <MyQuestion/>}
                        {component === 'myanswers' && <MyAnswers/>}
                        {/* {id !=='mybook' && component === '' &&
                        <BookDetail date={date}/>} */}
                        {/* {id === 'mybook' && component === '' && <ImgRight/>} */}
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
// justify-content: center;
padding-left: 20px;
font-family: Noto Sans CJK KR;
align-items: center;
// right: 26px;
right: 34px;
bottom: 102px;
width: 150px;
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
    background-image: url("https://user-images.githubusercontent.com/77369674/118811425-f73f2980-b8e7-11eb-919a-d4421378e117.png");
    background-size: cover;
    background-repeat: no-repeat;
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
    background-image: url("https://user-images.githubusercontent.com/67696504/118986623-7b61e180-b9ba-11eb-9719-f898c5c5b7a2.png");
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
    max-width:988px;
    min-height:190px;
    display: flex;
    flex-direction: row;
    @media(max-width:750px){
        ${props => props.component === 'myanswers' || props.component === 'myquestion' ? `display:none`: `display:flex`};
        // padding:10px 50px 30px 50px;
        margin-top:0px;
        margin-bottom:30px;
        height:100%;
        min-height:280px;
        flex-direction:column;
        align-items:center;
        
    }
`;



export default MyBook;