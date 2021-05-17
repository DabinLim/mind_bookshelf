import React from 'react';
import styled from 'styled-components';
import {history} from '../../redux/configStore';
import {useDispatch, useSelector} from 'react-redux';
import { api as commentActions } from "../../redux/modules/comment";
import { api as communityActions } from "../../redux/modules/community";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { LeftOutlined } from "@ant-design/icons";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import swal from "sweetalert";


const CardDetail = (props) => {
    const dispatch = useDispatch();
    const url = window.location.href.split('/');
    const this_page = url[url.length-2];
    const id = url[url.length -1];
    const comment_list = useSelector(state => state.comment.list);
    const answerInfo = useSelector(state => state.community.card_detail);
    const user_info = useSelector(state => state.user.user);
    const is_login = useSelector(state => state.user.is_login);
    console.log(comment_list, answerInfo);

    React.useEffect(() => {
        if(this_page === 'bookdetail'){
            const type = 'book';
            dispatch(communityActions.getCardDetail(id, type));
            dispatch(commentActions.getCommentAX(id));
        }  else if(this_page === 'carddetail'){
            const type = 'fuck off';
            dispatch(communityActions.getCardDetail(id, type));
            dispatch(commentActions.getCommentAX(id));
        } 

    },[id])

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
                    <MoreVertIcon style={{fontSize:'20px'}}/>
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
                    <Answer>
                        {answerInfo?.answerContents}
                    </Answer>
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
                <CommentList>
                </CommentList>
                <CommentInputBox>
                    <CommentInput placeholder='게시물에 대해 이야기를 나눠보세요.'/>
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
    border: 1px solid black;
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
    border:1px solid black;
    width:30px;
    height:20px;
    display:flex;
    align-items:center;
    justify-content:flex-start;
`;

const Nickname = styled.span`
    border:1px solid black;
    width: auto;
    height: 20px;
    letter-spacing: 0px;
    font: normal normal bold;
    font-weight:800;
`;

const QuestionCreatedUser = styled.span`
    border:1px solid black;
    width:auto;
    height:100%;
    font: normal normal medium 14px/20px;
    letter-spacing:0px;
    font-weight:600;
    color: #363636;
    opacity: 0.7;
`;

const Toggle = styled.div`
    border:1px solid black;
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
    max-width:184px;
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
    font: normal normal normal 13px/19px Noto Sans KR;
    letter-spacing: 0px;
    color: #262626;
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
    border:1px solid black;
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
    font: normal normal normal 14px/20px Noto Sans KR;
    letter-spacing: 0px;
    color: #2F2F2F;
`;

const DateBox = styled.div`
    border:1px solid black;
    font: normal normal normal 12px/18px Noto Sans KR;
    letter-spacing: 0px;
    color: #939393;
    width:50px;
    height:20px;
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:flex-end;
`;

const CommentList = styled.div`
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

const CommentInput = styled.input`
    box-sizing:border-box;
    padding: 12px 22px;
    width:100%;
    height:42px;
    border-style:none;
    background-color:#F5F5F5;
    border-radius:45px;
`;

export default CardDetail;