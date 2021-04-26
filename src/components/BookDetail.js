import React from 'react';
import styled from 'styled-components';
import '../static/BookDetail.scss';
import { ArrowLeft, ArrowRight } from '@material-ui/icons';
import Card from './Card';
import {history} from '../redux/configStore';

const BookDetail = (props) => {
    console.log(props.date)
    const url = window.location.href.split('/');
    const date = url[url.length -1];
    const [cardpage, setCardPage] = React.useState('carddefault');
    const [diarypage, setDiaryPage] = React.useState('diarydefault');

    const nextPage = () => {
        let new_date = props.date.add(1,'d');
        history.push(`${new_date.format('YYMMDD')}`)
        setDiaryPage('nextpage')
    }

    const previousPage = () => {
        let new_date = props.date.subtract(1,'d');
        history.push(`${new_date.format('YYMMDD')}`)
        setCardPage('previouspage')
    }

    React.useEffect(() => {
        setCardPage('cardpage')
        setDiaryPage('diarypage')
    },[])

    return(
        <React.Fragment>
            <Container>
                <ArrowLeft onClick={previousPage} fontSize='large'/>
                <div className={cardpage}>
                    <Card width='100%'></Card>
                    <Card width='100%'></Card>
                    </div>
                    <div className={diarypage}>
                    <Card width='100%'></Card>
                    <Card width='100%'></Card>
                    </div>
                    <ArrowRight onClick={nextPage} fontSize='large'/>
            </Container>
        </React.Fragment>
    )
}

const Container = styled.div`
    box-sizing:border-box;
    padding:50px 20px;
    margin:20px;
    width:100%;
    height:100%;
    background-color:lightgray;
    display:flex;
    flex-direction:row;
    align-items:center;
`;



export default BookDetail;