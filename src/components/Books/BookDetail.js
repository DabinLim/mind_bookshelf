import React from "react";
import styled from "styled-components";
import {useSelector, useDispatch} from 'react-redux';
import CardDetail from './CardDetail';
import CardModal from '../Community/CardModal';
import {api as communityActions} from '../../redux/modules/community';
import { api as commentActions } from "../../redux/modules/comment";
import {setAnswerInfo} from '../../redux/modules/comment';
import {setBookDetailModal, setDateVisible} from '../../redux/modules/books';


const BookDetail = (props) => {
    const dispatch = useDispatch()
    const book_detail = useSelector(state => state.books.book_detail);


    const openCard = (v) => {
        console.log(v)
        dispatch(communityActions.getCardDetail(v.answerId, 'book'))
        dispatch(commentActions.getCommentAX(v.answerId))
        props.openCard(props.date)
        dispatch(setBookDetailModal(null))
    };
    console.log(book_detail)
  return (
    <React.Fragment>
      <Background onClick={()=> {
                dispatch(setBookDetailModal(null))
                dispatch(setDateVisible(true))
                }} />
      <Container>
          {book_detail.length && book_detail.map((v,idx) => {
              if(idx < 3){
                  return(
                    <DetailContainer key={idx}>
                    <Head>
                  {v.questionTopic[0] === '사랑' && <Subject style={{background:"#FFAAAA", boxShadow: "0px 0px 15px #FFAAAA"}} ><span>#사랑</span></Subject>}
                  {v.questionTopic[0] === '우정' && <Subject style={{background:"#B9FFC4", boxShadow: "0px 0px 15px #B9FFC4"}} ><span>#우정</span></Subject>}
                  {v.questionTopic[0] === '꿈' && <Subject style={{background:"#B7E6FF", boxShadow: "0px 0px 15px #B7E6FF"}} ><span>#꿈</span></Subject>}
                  {v.questionTopic[0] === '가치' && <Subject style={{background:"#B5BDFF", boxShadow: "0px 0px 15px #B5BDFF"}} ><span>#가치</span></Subject>}
                  {v.questionTopic[0] === '관계' && <Subject style={{background:"#FFF09D" ,boxShadow: "0px 0px 15px #FFF09D"}} ><span>#관계</span></Subject>}
                  {v.questionTopic[0] === '나' && <Subject style={{background:"#F9D1FD", boxShadow: "0px 0px 15px #F9D1FD"}} ><span>#나</span></Subject>}
                  <TitleBox>
                  <Title onClick={() => {openCard(v)}}>{v.questionContents}</Title>
                  </TitleBox>
                    </Head>
                    <Contents>
                        {v.answerContents}
                    </Contents>
                </DetailContainer>
                  )
              }
          })}
      </Container>
    </React.Fragment>
  );
};

const Container = styled.div`
    box-sizing:border-box;
    padding-top:5px;
  border-radius:20px;
  position: absolute;
  top: -106px;
  left: 0;
  width:1207px;
  
  height: 95px;
  align-items: center;
  /* transform: translate(-50%, -50%); */
  z-index: 30;
  display: flex;
  flex-direction: row;
  justify-content:flex-start;
  overflow-y:hidden;

`;

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: #000000;
  opacity:0.45;
  z-index: 15;
  /* pointer-events:none; */
`;

const DetailContainer = styled.div`
    width:100%;
    height:100%;
    margin:0px 45px 0px 10px;
`;

const Head = styled.div`
    width:100%;
    display:flex;
    flex-direction:row;
    margin-bottom:17px;
`;

const Subject = styled.div`
  display: flex;
  justify-content:center;
  align-items:center;
  min-width:72px;
  height:31px;
  opacity:0.8;
  border-radius: 45px;
  font-size:14px;
  font-weight: 600;
  
`;

const TitleBox = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
`;

const Title = styled.span`
    font-size:17px;
    margin-left:16px;
    color:#ffffff;
    font-weight:400;
    display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor:pointer;
  &:hover{
      font-weight:800;
  }
`;

const Contents = styled.span`

    width:100%;
    height:100%;
    font-size:14px;
    color:#ffffff;
    
    display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;


export default BookDetail;
