import React from 'react';
import styled from 'styled-components';
import {history} from '../../redux/configStore';
import {useDispatch, useSelector} from 'react-redux';
import { api as commentActions } from "../../redux/modules/comment";
import { api as communityActions } from "../../redux/modules/community";
import CommentList from './CommentList';
import CommentInput from './CommentInput';
import CardUpdateModal from './CardUpdateModal';
import CancelConfirm from './CancelConfirm';
import CustomSwitch from '../../shared/CustomSwitch';
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { LeftOutlined } from "@ant-design/icons";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import swal from "sweetalert";
import ChannelService from "../../shared/ChannelService";


const CardDetail = (props) => {
    const dispatch = useDispatch();
    const url = window.location.href.split('/');
    const id = url[url.length -1];
    const user_info = useSelector((state) => state.user.user);
    const comment_list = useSelector(state => state.comment.list);
    const answerInfo = useSelector(state => state.community.card_detail);
    const is_login = useSelector(state => state.user.is_login);
    const [updateAnswer, setUpdateAnswer] = React.useState(false);
    const [updateModal, setUpdateModal] = React.useState(false);
    const [cancelModal, setCancelModal] = React.useState(false);
    const [answer, setAnswer] = React.useState();
    const [isOpen, setOpen] = React.useState(true);

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
            <Container>
                <Head>
                    <GoBackBtn>
                    <LeftOutlined style={{fontSize:'20px'}} onClick={()=>{history.goBack()}}/>
                    </GoBackBtn>
                    <Nickname>
                        <span style={{fontWeight:'600'}}>
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
                            />
                          ) : null}
                          {cancelModal ? (
                            <CancelConfirm
                              {...answerInfo}
                              setCancelModal={setCancelModal}
                              close={props.close}
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
                        if(v === '나'){
                            return(
                                <Subject style={{border:'1px solid #458857',color:'#458857'}}>
                                    <span>
                                    #{v}
                                    </span>
                                </Subject>
                            )
                        }
                        if(v === '사랑'){
                            return(
                                <Subject style={{border:'1px solid #D34242',color:'#D34242'}}>
                                    <span>
                                    #{v}
                                    </span>
                                </Subject>
                            )
                        }
                        if(v === '관계'){
                            return(
                                <Subject style={{border:'1px solid #2761CC',color:'#2761CC'}}>
                                    <span>
                                    #{v}
                                    </span>
                                </Subject>
                            )
                        }
                        if(v === '우정'){
                            return(
                                <Subject style={{border:'1px solid #E0692D',color:'#E0692D'}}>
                                    <span>
                                    #{v}
                                    </span>
                                </Subject>
                            )
                        }
                        if(v === '가치'){
                            return(
                                <Subject style={{border:'1px solid #7249B4',color:'#7249B4'}}>
                                    <span>
                                    #{v}
                                    </span>
                                </Subject>
                            )
                        }
                        if(v === '꿈'){
                            return(
                                <Subject style={{border:'1px solid #E6BA28',color:'#E6BA28'}}>
                                    <span>
                                    #{v}
                                    </span>
                                </Subject>
                            )
                        }
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
                <MiddleBelt>
                    <IconBox>
                        <Like>
                            {answerInfo?.like ? <FavoriteIcon cursor='pointer' onClick={() => {
                        if (!is_login) {
                          swal({
                            title: "좋아요 누르기 실패",
                            text: "로그인 후 이용 가능한 서비스입니다.",
                            icon: "error",
                          });
                          return;
                        }
                        dispatch(
                          communityActions.deleteLikeAX(
                            answerInfo.answerId,
                            answerInfo.questionId
                          )
                        );
                      }} style={{fontSize:'20px', color:'#061366'}}/>:<FavoriteBorderIcon cursor='pointer' onClick={() => {
                        if (!is_login) {
                          swal({
                            title: "좋아요 누르기 실패",
                            text: "로그인 후 이용 가능한 서비스입니다.",
                            icon: "error",
                          });
                          return;
                        }
                        dispatch(
                          communityActions.addLikeAX(
                            answerInfo.answerId,
                            answerInfo.questionId
                          )
                        );
                      }} style={{fontSize:'20px'}}/>}
                            <Count>{answerInfo?.likeCount}</Count>
                        </Like>
                        <Comment>
                            <ChatBubbleOutlineIcon style={{fontSize:'20px',marginTop:'3px'}}/>
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
                    <CommentList/>
                </CommentBox>
                <CommentInputBox>
                    <CommentInput/>
                </CommentInputBox>
            </Container>
        </React.Fragment>
    )
}

const Container = styled.section`
    margin-top: 50px;
    width:100%;
    height:762px;
    overflow-y:auto;
    border: 0.5px solid #D3D3D3;
    border-radius:16px;
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
    height:330px;
`;

const SubjectBox = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:flex-start;
    align-items:center;
    margin-bottom:13px;
`;
const Subject = styled.div`
    margin-right:10px;
    width: 58px;
    height: 25px;
    display:flex;
    align-items:center;
    justify-content:center;
    border-radius:16px;
    font-size:11px;
    font-weight:900;
    letter-spacing: 0px;
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
    max-height:135px;
    overflow-y:auto;
    font: normal normal normal 13px/19px Noto Sans CJK KR;
    letter-spacing: 0px;
    color: #333333;
    white-space: pre-wrap; 
`;

const AnswerInputBox = styled.div`
    width:100%;
    min-height:130px;
    max-height:130px;
    overflow-y:auto;
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
    width:90px;
    height:20px;
    margin-left:7px;
    display:flex;
    flex-direction:row;
    justify-content:space-between;
    align-items:center;
`;

const Like = styled.div`
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

const Count = styled.span`
    text-align:center;
    margin-left:7px;
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
    width:100%;
    height:235px;
    overflow-y:auto;
    border-bottom: 0.5px solid #D3D3D3;
`;

const CommentInputBox = styled.div`
    width:100%;
    box-sizing:border-box;
    padding:18px 25px;
`;



export default CardDetail;