import React from 'react';
import {history} from '../redux/configStore';
import styled from 'styled-components';
import BookShelf from '../components/Books/BookShelf';
import BookDetail from '../components/Books/BookDetail';
import Profile from '../components/Profile'
import {api as userActions} from '../redux/modules/user';
import {useSelector, useDispatch} from 'react-redux';
import {changeDate, setComponent} from '../redux/modules/books';
import MyQuestion from '../components/MyQuestion';

const OthersBooks = (props) => {
    const dispatch = useDispatch();
    const userId = props.match.params.id;
    const component = useSelector(state => state.books.component)
    const date = useSelector(state => state.books.date)
    const formated_date = useSelector(state => state.books.formated_date)
    let url = window.location.href.split('/');
    let id = url[url.length -2];
    

    React.useEffect(() => {
        console.log(userId)
        dispatch(userActions.othersInfoAX(userId))
        dispatch(changeDate(0))
        dispatch(setComponent(''))
    },[userId])
    return(
        <React.Fragment>
            <Container>
                {id === 'othersbooks' && component === '' &&
                <BookShelf date={date}/>
                }
                {component === 'myquestion' && <MyQuestion/>}
                {id !=='othersbooks' && component === '' &&
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
    width: 100%;
    height: 80vh;
    display:flex;
    flex-direction:row;
    justify-content:space-around;
`;

const ProfileContainer = styled.section`
    position: relative;
    width:25%;
    height:100%;
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    align-items: center;
`

export default OthersBooks;