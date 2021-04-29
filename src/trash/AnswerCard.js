import React from 'react';
import styled from 'styled-components';
import '../../static/AnswerCard.scss';
import {useDispatch, useSelector} from 'react-redux';
import {api as booksActions} from '../../redux/modules/books';
import {setSelect} from '../../redux/modules/books';
import RecommendCard from './RecommendCard';

const AnswerCard = (props) => {
    console.log(props)
    const dispatch = useDispatch();
    const now_selected = useSelector(state => state.books.selected_card);
    const card_answers = useSelector(state => state.books.card_answers);
    const url = window.location.href.split("/");
    const current_date = url[url.length-1];
    const [scale, setScale] = React.useState('scale(1)');
    const [z_index, setZ] = React.useState(1);
    const [width, setWidth] = React.useState('30%');
    const [height, setHeight] = React.useState('50%');


      if(props.num !== now_selected && scale === 'scale(1.5)'){
        setScale('scale(1)');
        setZ(1);
        setHeight('50%');
        setWidth('30%');
        };

      const changeScale = () => {
          console.log(props.info.questionId)
        dispatch(booksActions.getCardAnswers(current_date,props.info.questionId))
          dispatch(setSelect(props.num))
          if(scale === 'scale(1)'){
            setScale('scale(2)')
            setZ(2);
            setHeight('60%');
            setWidth('50%');
          }
          if(scale === 'scale(2)'){
              setScale('scale(1)')
              setZ(1)
              setHeight('50%');
              setWidth('30%');
          }
      }

      React.useEffect(() => {
        
      },[])


    return(
        <React.Fragment>
            <Container scale={scale} z_index={z_index} width={width} height={height} onClick={changeScale}>
                <Head>
                    <Profile>
                    <ProfileImg src={props.info.questionCreatedUserProfileImg}/>
                    <span>{props.info.questionCreatedUserNickname}</span>
                    </Profile>
                    <Subject>#사랑</Subject>
                </Head>
                <Body>
                <Title>{props.info.questionContents}</Title>
                <Answer>
                    {props.info.answerContents}
                </Answer>
                </Body>
                <Recommend>
                {scale === 'scale(2)' && card_answers &&card_answers.other.map((v,idx) => {
                    if(idx<3){
                        return(
                            <RecommendCard info={v}/>
                        )
                    }
                })}
                </Recommend>
            </Container>
        </React.Fragment>
    )
}

const Container = styled.div`
    z-index: ${props => props.z_index};
    box-sizing: border-box;
    padding:20px;
    margin:20px;
    display: flex;
    flex-direction: column;
    width: ${props => props.width};
    height: ${props => props.height};
    background-color:lavender;
    box-shadow: gray 2px 2px 2px 2px;
    transition:linear 0.2s;
    transform: ${props => props.scale};
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
    background-image: url('${props => props.src}');
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

const Recommend = styled.div`
    display:flex;
    flex-direction:row;
    width:100%;
    height:auto;
    justify-content:space-between;
`;

export default AnswerCard;