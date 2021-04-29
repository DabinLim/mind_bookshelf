import React from 'react';
import styled from 'styled-components';
import {BookShelf, BookDetail, Profile, MyQuestion} from '../components/Books/booksindex';
import {api as userActions} from '../redux/modules/user';
import {useSelector, useDispatch} from 'react-redux';
import {changeDate, setComponent, setOther} from '../redux/modules/books';

const OthersBooks = (props) => {
    const dispatch = useDispatch();
    const userId = props.match.params.id;
    const component = useSelector(state => state.books.component);
    const date = useSelector(state => state.books.date);
    const formated_date = useSelector(state => state.books.formated_date);
    const is_login = useSelector(state => state.user.is_login);
    let url = window.location.href.split('/');
    console.log(url)
    let id = url[url.length -2];
    let others_id = url[url.length -1];
    

    React.useEffect(() => {
        dispatch(changeDate(0))
        dispatch(setComponent(''))
        if(is_login){
            dispatch(userActions.myFollowListAX())
        }
    },[])

    React.useEffect(() => {
        dispatch(userActions.othersInfoAX(userId))
        dispatch(userActions.otherFriendListAX(userId))
    },[userId])

    return(
        <React.Fragment>
            <Container>
                {id === 'others' && component === '' &&
                <BookShelf date={date}/>
                }
                {component === 'othersquestion' && <MyQuestion/>}
                {id !=='others' && component === '' &&
                <BookDetail date={date}/>}
            <ProfileContainer>
                <Profile id={userId} />
            </ProfileContainer>
            </Container>
        </React.Fragment>
    )
}

const Container = styled.div`
    margin:20px;
    margin-left: 100px;
    width: 100%;
    height: 80vh;
    display:flex;
    justify-content:space-between;
`;

const ProfileContainer = styled.section`
    width: 300px;
    height:100%;
    display: flex;
    flex-direction: column;
`

export default OthersBooks;