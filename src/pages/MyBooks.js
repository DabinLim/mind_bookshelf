import React from 'react';
import {history} from '../redux/configStore';
import styled from 'styled-components';
import {BookShelf, Profile, MyQuestion, MyAnswers, ProfileUpdateModal} from '../components/Books/booksindex';
import {useSelector, useDispatch} from 'react-redux';
import {setComponent, setBookDetailModal, setDateVisible} from '../redux/modules/books';
import { getCookie } from '../shared/Cookie';
import {api as userActions} from '../redux/modules/user'
import { changeType } from '../redux/modules/community'

const MyBook = (props) => {
    const dispatch = useDispatch();
    const component = useSelector(state => state.books.component)
    const date = useSelector(state => state.books.date)
    const answerInfo = useSelector((state) => state.community.card_detail);
    const [UpdateModal, setUpdateModal] = React.useState(false);
    let url = window.location.href.split('/');
    let id = url[url.length -1];
    
    const closeUpdateModal = () => {
        setUpdateModal(false);
      };

    React.useEffect(() => {
        if(!getCookie('is_login')){
            window.alert('로그인 상태가 아닙니다.');
            history.replace('/');
        };
        dispatch(setComponent(''))
        dispatch(userActions.myFollowListAX())
        return()=>{
            if(answerInfo.length !== 0){
                dispatch(changeType(null))
            }
        }
    },[])
    return(
        <React.Fragment>
            {UpdateModal ? <ProfileUpdateModal close={closeUpdateModal} /> : null}
            <Container>
                <ContainerBox>
                    {id === 'mybook' && component === '' && <ImgLeft/>}
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
                        {id === 'mybook' && component === '' && <ImgRight/>}
                </ContainerBox>
            </Container>
        </React.Fragment>
    )
}

const ContainerBox = styled.div`
    height: 100vh;
    margin: 100px 0px 0px 0px;
    padding-left: 20px;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    @media(max-width:750px){
        padding-left:0px;
        overflow-x:hidden;
        margin:60px 0px 0px 0px;
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
}

@media (max-width: 500px) {
    margin: 0;
    background-image: url("https://user-images.githubusercontent.com/67696504/117994109-4088f980-b37b-11eb-8f2c-9d42c93fd0a3.png");
    background-size:cover;
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
        padding:10px 50px 30px 50px;
        margin-top:0px;
        margin-bottom:30px;
        height:100%;
        min-height:220px;
        flex-direction:column;
        align-items:center;
    }
`;

const ImgRight = styled.div`
    z-index:25;
    position:fixed;
    background-image:url('https://user-images.githubusercontent.com/77574867/116996886-0c785d80-ad17-11eb-9afd-175a104b7f33.png');
    background-size:contain;
    background-repeat:no-repeat;
    right:-70px;
    bottom:-13px;
    width:593px;
    height:731px;
    opacity:0.8;
    pointer-events: none;
    @media (max-width:1400px){
        display:none;
    }
    
`;


const ImgLeft = styled.div`
    z-index:25;
    position:fixed;
    background-image:url('https://user-images.githubusercontent.com/77574867/116996878-0b473080-ad17-11eb-8910-108950e25cb8.png');
    background-size:contain;
    background-repeat:no-repeat;
    left:-20px;
    top:249px;
    width:365px;
    height:341px;
    opacity:0.8;
    pointer-events: none;
    @media (max-width:1400px){
        display:none;
    }
`;

export default MyBook;