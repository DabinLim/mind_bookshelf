import React from 'react';
import {history} from '../redux/configStore';
import styled from 'styled-components';
import {BookShelf, Profile, MyQuestion} from '../components/Books/booksindex';
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
    let url = window.location.href.split('/');
    let id = url[url.length -1];
    

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
            <Container>
            {id === 'mybook' && component === '' && <ImgLeft/>}
            <ProfileContainer>
                <Profile/>
            </ProfileContainer>
                {id === 'mybook' && component === '' &&
                <BookShelf date={date}/>
                }
                {component === 'myquestion' && <MyQuestion/>}
                {/* {id !=='mybook' && component === '' &&
                <BookDetail date={date}/>} */}
                {id === 'mybook' && component === '' && <ImgRight/>}
            </Container>
        </React.Fragment>
    )
}

const Container = styled.div`
    width: 100%;
    height: 100%;
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    align-items:center;
    overflow:auto;
    @media (max-width:1040px){
    margin:0px 10px;
}
`;

const ProfileContainer = styled.section`
    position:relative;
    margin-top:170px;
    box-sizing:border-box;
    padding:30px;
    width: 100%;
    max-width:988px;
    min-height:190px;
    display: flex;
    flex-direction: row;
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