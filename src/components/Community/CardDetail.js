import React from 'react';
import styled from 'styled-components';
import {history} from '../../redux/configStore';
import {useDispatch, useSelector} from 'react-redux';
import { api as commentActions } from "../../redux/modules/comment";
import { api as communityActions, resetAll } from "../../redux/modules/community";
import { api as userActions } from '../../redux/modules/user';
import CommentList from './CommentList';
import CommentInput from './CommentInput';
import CardUpdateModal from './CardUpdateModal';
import CancelConfirm from './CancelConfirm';
import CustomSwitch from '../../shared/CustomSwitch';
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { LeftOutlined } from "@ant-design/icons";
import ChannelService from "../../shared/ChannelService";
import Like from '../../shared/Like';
import Subject from '../../shared/Subject';
import LikeModal from './LikeModal';


const CardDetail = (props) => {
    const dispatch = useDispatch();
    const url = window.location.href.split('/');
    const id = url[url.length -1];
    const user_info = useSelector((state) => state.user.user);
    const comment_list = useSelector(state => state.comment.list);
    const answerInfo = useSelector(state => state.community.card_detail);
    const like_list = useSelector(state => state.community.like_list);
    const [likeModal, setLikeModal] = React.useState(false);
    const [updateAnswer, setUpdateAnswer] = React.useState(false);
    const [updateModal, setUpdateModal] = React.useState(false);
    const [cancelModal, setCancelModal] = React.useState(false);
    const [answer, setAnswer] = React.useState();
    const [isOpen, setOpen] = React.useState(true);
    const container = React.useRef();
    const closeModal = () => {
        setLikeModal(false);
      };

    const gotoWeb = () => {
        console.log('나도 가고야 싶지 어려운걸 어떡하니')
    }

    const othersPage = () => {
        if(answerInfo?.answerUserId === user_info?.id){
            history.push('/mybook')
            return
        }
        history.push(`/others/${answerInfo.answerUserId}`)
    }

    function clickOpen() {
        if (isOpen) {
          setOpen(false);
          return;
        }
        setOpen(true);
      }

    const changeAnswer = (e) => {
        if (answer.length > 1000) {
          return;
        }
        setAnswer(e.target.value);
      };
    

    React.useEffect(() => {
        const type = 'not_book';
        dispatch(communityActions.getCardDetail(id, type));
        dispatch(commentActions.getCommentAX(id));
        dispatch(communityActions.getLikeList(id));
        dispatch(userActions.myFollowListAX());
        
        return () => {
            dispatch(resetAll());
        }

    },[id])

    React.useEffect(() => {
        ChannelService.shutdown();
        return () => {
        ChannelService.boot({
            pluginKey: "1e06f0ed-5da8-42f4-bb69-7e215b14ec18",
        });
        };
    }, []);

    return(
        <React.Fragment>
      <Notification>
        <NotiContent>모바일 전용 페이지 입니다. 뒤로가기 버튼을 눌러주세요.</NotiContent>
      </Notification>
            <Container>
                <Head>
                    <GoBackBtn>
                    <LeftOutlined style={{fontSize:'20px'}} onClick={()=>{history.goBack()}}/>
                    </GoBackBtn>
                    <Nickname>
                        <span onClick={othersPage} style={{fontWeight:'600',cursor:'pointer'}}>
                        {answerInfo?.nickname}
                        </span>님
                        <QuestionCreatedUser>
                             <span style={{margin:'0px 3px'}}>•</span> 
                            {answerInfo?.questionCreatedUserNickname}님의 질문
                        </QuestionCreatedUser>
                    </Nickname>
                    <Toggle>
                    {answerInfo?.answerUserId === user_info?.id &&(
                            <>
                        {updateModal ? (
                            <CardUpdateModal
                              setCancelModal={setCancelModal}
                              setAnswer={setAnswer}
                              setUpdateAnswer={setUpdateAnswer}
                              close={props.close}
                              setUpdateModal={setUpdateModal}
                              {...answerInfo}
                              detail='card'
                            />
                          ) : null}
                          {cancelModal ? (
                            <CancelConfirm
                              {...answerInfo}
                              setCancelModal={setCancelModal}
                              close={props.close}
                              type="mobile"
                            />
                          ) : null}
                          <MoreVertIcon onClick={() => {
                              if (updateModal) {
                                setUpdateModal(false);
                              } else {
                                setUpdateModal(true);
                              }}} style={{fontSize:'20px'}}/>
                              </>
                              )
                        }
                    </Toggle>
                </Head>
                <Body>
                    <SubjectBox>
                    {answerInfo.questionTopic?.length && answerInfo.questionTopic.map((v,idx) => {
                        return(
                            <Subject topic={v}/>
                        )
                    })}
                    </SubjectBox>
                    <Question>
                        {answerInfo?.questionContents}
                    </Question>
                    {updateAnswer ? <AnswerInputBox>
                        <AnswerInput value={answer} onChange={changeAnswer}/>
                        <EditBox>
                            <CustomSwitch isOpen={isOpen} onClick={clickOpen} />
                            <ButtonBox>
                            <EditBtn onClick={() => {
                        let _answer = {
                          answerId: answerInfo.answerId,
                          questionId: answerInfo.questionId,
                          contents: answer,
                          isOpen: isOpen,
                        };
                        dispatch(communityActions.editAnswerAX(_answer));
                        setUpdateAnswer(false);
                      }}>수정</EditBtn>
                            <CancelBtn onClick={()=>{setUpdateAnswer(false)}}>취소</CancelBtn>
                            </ButtonBox>
                        </EditBox>
                    </AnswerInputBox>:<Answer>
                        {answerInfo?.answerContents}
                    </Answer>}
                </Body>
                {like_list.length ? 
                
                <LikeList>
                    {likeModal? <LikeModal answerId={id} container={container} close={closeModal}/>:null}
                    {like_list.length > 1 ? 
                    <LikePeople onClick={()=>{setLikeModal(true)}}>
                        <span style={{fontWeight:'600'}}>{like_list[0].nickname}</span>님 외 <span style={{fontWeight:'600'}}>{answerInfo?.likeCount -1}</span>명이 좋아합니다.
                    </LikePeople> :
                    <LikePeople onClick={()=>{setLikeModal(true)}}>
                        <span style={{fontWeight:'600'}}>
                        {like_list[0].nickname}
                        </span>님이 좋아합니다.
                    </LikePeople>
                    }
                </LikeList>
                :''}
                <MiddleBelt>          
                    <IconBox>
                        <LikeBox>
                            <Like detail m_width='16px' m_height='15px' currentLike={answerInfo?.like} answerId={answerInfo?.answerId} questionId={answerInfo?.questionId}/>
                            <Count>{answerInfo?.likeCount}</Count>
                        </LikeBox>
                        <Comment>
                        <CommentIcon src="https://user-images.githubusercontent.com/77369674/118684657-5e53d400-b83d-11eb-861f-41aa269aa89e.png" />
                            <Count>{comment_list?.length}</Count>
                        </Comment>
                    </IconBox>
                    <DateBox>
                        <span>
                          {answerInfo?.answerCreatedAt?.charAt(2)}
                          {answerInfo?.answerCreatedAt?.charAt(3)}월
                          {answerInfo?.answerCreatedAt?.charAt(4)}
                          {answerInfo?.answerCreatedAt?.charAt(5)}일
                        </span>
                    </DateBox>
                </MiddleBelt>
                <CommentBox>
                    <CommentList mobile/>
                </CommentBox>
                    <CommentInput/>
            </Container>
        </React.Fragment>
    )
}

const LikeList = styled.div`
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:flex-start;
    padding-left: 24px;
    border-bottom:0.1px solid #d3d3d34f;
`;

const LikePeople = styled.span`
    margin:9px 0px;
    font: normal normal normal 13px/19px Noto Sans CJK KR;
    cursor:pointer;
`;

const NotiContent = styled.span`
    font-weight:600;
    font-size:20px;
`;

const Notification = styled.div`
    position:fixed;
    width:300px;
    height:300px;
    top:50%;
    left:50%;
    transform: translate(-50%, -50%);
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    @media(max-width:750px){
        display:none;
    }
`;

const GotoWeb = styled.button`
  margin-top:20px;
  width:150px;
  height:35px;
  border-radius:20px;
  border-style:none;
  background-color:lavender;
`;

const Container = styled.section`
    box-sizing:border-box;
    padding-top: 50px;
    width:100%;
    height:100%;
    overflow-y:auto;
    /* border: 0.5px solid #D3D3D3; */
    background-color: #ffffff;
    border-radius:16px 16px 0px 0px;
    padding-bottom:50px;
    @media(min-height:850px){
        height:100%;
    }
    @media(min-width:750px){
        display:none;
    }
`;

const Head = styled.div`
    box-sizing:border-box;
    padding:22px 24px;
    display:flex;
    flex-direction:row;
    justify-content:space-between;
    align-items:center;
    border-bottom: 0.5px solid #D3D3D3;
`;

const GoBackBtn = styled.div`
    width:30px;
    height:20px;
    display:flex;
    align-items:center;
    justify-content:flex-start;
`;

const Nickname = styled.span`
    width: auto;
    height: 20px;
    letter-spacing: 0px;
    font: normal normal bold Noto Sans CJK KR;
    font-weight:800;
`;

const QuestionCreatedUser = styled.span`
    width:auto;
    height:100%;
    font: normal normal medium 14px/20px Noto Sans CJK KR;
    letter-spacing:0px;
    font-weight:600;
    color: #363636;
    opacity: 0.7;
`;

const Toggle = styled.div`
    position: relative;
    width:30px;
    height:20px;
    display:flex;
    align-items:center;
    justify-content:flex-end;
`;

const Body = styled.div`
    box-sizing:border-box;
    padding:20px 25px;
    border-bottom: 0.5px solid #D3D3D3;
    height:auto;
`;

const SubjectBox = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:flex-start;
    align-items:center;
    margin-bottom:13px;
`;


const Question = styled.div`
    width:100%;
    min-height:25px;
    max-height:82px;
    height:auto;
    font: normal normal 800 19px/27px Nanum Myeongjo;
    letter-spacing: 0px;
    color: #000000;
    opacity: 0.9;
    overflow-y:auto;
    margin-bottom:20px;
`;

const Answer = styled.div`
    width:100%;
    font: normal normal normal 13px/19px Noto Sans CJK KR;
    letter-spacing: 0px;
    color: #333333;
    white-space: pre-wrap; 
`;

const AnswerInputBox = styled.div`
    width:100%;
    height:auto;
    min-height:130px;
    max-height:130px;
    font: normal normal normal 13px/19px Noto Sans CJK KR;
    letter-spacing: 0px;
    color: #262626;
    margin-bottom:30px;
    white-space: pre-wrap; 
`;

const AnswerInput = styled.textarea`
    border-style:none;
    min-height:100px;
    width:100%;
    height:100%;
`;

const EditBox = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:space-between;
    align-items:center;
`;

const ButtonBox = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:flex-end;
    align-items:center;
`;

const EditBtn = styled.button`
    border-style:none;
    width:80px;
    height:25px;
    border-radius:15px;
    background-color:#473674;
    margin-right:10px;
    color:#ffffff; 
    font-weight:600;
`;

const CancelBtn = styled.button`
    border-style:none;
    width:80px;
    height:25px;
    border-radius:15px;
    background-color:#473674;
    color:#ffffff; 
    font-weight:600;
`;

const MiddleBelt = styled.div`
    width:100%;
    height:50px;
    box-sizing:border-box;
    padding:0px 18px;
    display:flex;
    flex-direction:row;
    justify-content:space-between;
    align-items:center;
    border-bottom: 0.5px solid #D3D3D3;
`;

const IconBox = styled.div`
    width:75px;
    height:20px;
    margin-left:7px;
    display:flex;
    flex-direction:row;
    justify-content:space-between;
    align-items:center;
`;

const LikeBox = styled.div`
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:center;
`;

const Comment = styled.div`
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:center;
`;

const CommentIcon = styled.img`
  cursor: pointer;
  width: 16px;
  height: 15px;
margin-right:6px;
`;

const Count = styled.span`
    text-align:center;
    margin-bottom:2px;
    font: normal normal normal 14px/20px Noto Sans CJK KR;
    letter-spacing: 0px;
    color: #2F2F2F;
`;

const DateBox = styled.div`
    font: normal normal normal 12px/18px Noto Sans CJK KR;
    letter-spacing: 0px;
    color: #939393;
    width:50px;
    height:20px;
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:flex-end;
`;

const CommentBox = styled.div`
    box-sizing:border-box;
    width:100%;
    height:auto;
    padding:10px 0px 40px 0px;
`;



export default CardDetail;