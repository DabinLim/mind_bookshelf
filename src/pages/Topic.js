import React from 'react'
import styled from 'styled-components'
import {useDispatch, useSelector} from 'react-redux'
import {api as communityActions, resetTopicInfo} from '../redux/modules/community'
import {history} from '../redux/configStore'
import InfinityScroll from '../shared/InfinityScroll'
import { LeftOutlined } from "@ant-design/icons";
import {CheckOutlined} from "@ant-design/icons";
import GoBack from '../elements/GoBack'



const Topic = (props) => {
  const topic = props.match.params.topic;
  const dispatch = useDispatch();
  const topic_info = useSelector((state) => state.community.topic)
  const topicLike_info = useSelector((state) => state.community.topicLike)
  const next = useSelector((state) => state.community.topic_next)
  const nextLike = useSelector((state) => state.community.topicLike_next)
  const is_loading = useSelector((state) => state.community.topic_loading)
  const is_loadingLike = useSelector((state) => state.community.topicLike_loading)
  const container = React.useRef();
  const containerLike = React.useRef();
  const [type, setType] = React.useState('like')
  const [typeModal, setTypeModal] = React.useState(false);

  React.useEffect(() => {
    dispatch(communityActions.getTopicQuestion(topic, "like"))
    dispatch(communityActions.getTopicQuestion(topic, "new"))
    return () => {
      dispatch(resetTopicInfo())
    };
  },[])


  let color = "";

    if (topic === "가치") {
      color = "#7249B4";
    } else if (topic === "관계") {
      color = "#2761CC";
    } else if (topic === "우정") {
      color = "#E0692D";
    } else if (topic === "나") {
      color = "#458857";
    } else if (topic === "사랑") {
      color = "#D34242";
    } else {
      color = "#E6BA28";
    }

  return(
    <React.Fragment>
      <TopicContainer>
        <TopicBox>
          <Container>
            <Header>
              <HeaderBox2>
                <GoBack/>
                <HeaderText>질문카드 결과</HeaderText>
                <div style={{width:"30px", height:"20px"}}></div>
              </HeaderBox2>
              <HeaderBox>
              <TopicText
                style={{color: color, border: `1px solid ${color}`}}
              >
                <span>#{topic}</span>
              </TopicText>
                {type === "like" ? 
                <HeaderRight>
                  <HeaderRightText style={{fontWeight:"bold"}} >
                  <span style={{fontSize:"18px"}} >•</span> &nbsp; <span>인기순</span> 
                  </HeaderRightText>
                  <HeaderRightText onClick={()=>{
                    setType('new')
                  }}>
                    최신순
                  </HeaderRightText>
                </HeaderRight>
                :
                <HeaderRight>
                  <HeaderRightText onClick={()=>{
                    setType('like')
                  }}>
                    인기순
                  </HeaderRightText>
                  <HeaderRightText style={{fontWeight:"bold"}}>
                  <span style={{fontSize:"18px"}} >•</span> &nbsp; <span>최신순</span> 
                  </HeaderRightText>
                </HeaderRight>
                }
                <HeaderRightMobile>
                  {typeModal? 
                    <HeaderRightModal>
                      {type === "like"?
                      <> 
                      <ModalText 
                        style={{borderBottom: "0.5px solid #D3D4D3", fontWeight:"bold"}} >
                        인기순
                      </ModalText>
                      <ModalText 
                        onClick={()=>{setType("new"); setTypeModal(false);}} 
                      >
                        최신순
                      </ModalText>
                      </>
                      :
                      <>
                      <ModalText 
                        style={{borderBottom: "0.5px solid #D3D4D3"}}
                        onClick={()=>{setType("like"); setTypeModal(false);}}
                      >
                        인기순
                      </ModalText>
                      <ModalText style={{fontWeight:"bold"}} >
                        최신순
                      </ModalText>
                      </>
                      }
                    </HeaderRightModal>
                  :null}
                  {type === "like"? 
                  <HeaderRightText onClick={()=>{
                    if(!typeModal){
                      setTypeModal(true);
                    }else{
                      setTypeModal(false);
                    }
                  }}>인기순</HeaderRightText>
                  :
                  <HeaderRightText onClick={()=>{
                    if(!typeModal){
                      setTypeModal(true);
                    }else{
                      setTypeModal(false);
                    }
                  }} >최신순</HeaderRightText>
                  }
                  {typeModal?
                  <LeftOutlined
                    style={{
                      color: "black",
                      fontSize: "12px",
                      transform:'rotateZ(90deg)',
                      marginLeft:'5px'
                    }}
                  />
                  :
                  <LeftOutlined
                    style={{
                      color: "black",
                      fontSize: "12px",
                      transform:'rotateZ(270deg)',
                      marginLeft:'5px'
                    }}
                  />
                  }

                </HeaderRightMobile>
              </HeaderBox>
            </Header>
            {type === "like"? 
            <BodyLike ref={containerLike} >
            <InfinityScroll
              callNext={() => {
                // if(type === "like"){
                //   dispatch(communityActions.getTopicLikeQuestion(topic))
                // }else{
                //   dispatch(communityActions.getTopicQuestion(topic))
                // }
                dispatch(communityActions.getTopicQuestion(topic, type))
              }}
              is_next={nextLike}
              loading={is_loadingLike}
              ref_value={containerLike}
              modal
              height={100}
            >
              {topicLike_info.map((t) => {
                return(
                  <Card>
                    <div>
                      <UserInfo onClick={() => {history.push(`/others/${t.createdUserId}`)}} >
                        <UserProfileImg src={t.createdUserProfileImg} />
                        <UserNickname>{t.createdUserNickname}</UserNickname>
                      </UserInfo>
                      <QuestionContent onClick={() => {history.push(`/community/${t.questionId}`)}} >
                        {t.contents}
                      </QuestionContent>
                    </div>
                    <AnswerCount>
                      <div>{t.answerCount}명 낙서중</div>
                      <div>{t.createdAt.substring(6,7)}월 {t.createdAt.substring(8,10)}일</div>
                    </AnswerCount>
                  </Card>
                )
              })}
            </InfinityScroll>
            </BodyLike>
            :
            <Body ref={container}>
              <InfinityScroll
                callNext={() => {
                  // if(type === "like"){
                  //   dispatch(communityActions.getTopicLikeQuestion(topic))
                  // }else{
                  //   dispatch(communityActions.getTopicQuestion(topic))
                  // }
                  dispatch(communityActions.getTopicQuestion(topic, type))
                }}
                is_next={next}
                loading={is_loading}
                ref_value={container}
                modal
                height={100}
              >
                {topic_info.map((t) => {
                  return(
                    <Card>
                      <div>
                        <UserInfo onClick={() => {history.push(`/others/${t.createdUserId}`)}} >
                          <UserProfileImg src={t.createdUserProfileImg} />
                          <UserNickname>{t.createdUserNickname}</UserNickname>
                        </UserInfo>
                        <QuestionContent onClick={() => {history.push(`/community/${t.questionId}`)}} >
                          {t.contents}
                        </QuestionContent>
                      </div>
                      <AnswerCount>
                        <div>{t.answerCount}명 낙서중</div>
                        <div>{t.createdAt.substring(6,7)}월 {t.createdAt.substring(8,10)}일</div>
                      </AnswerCount>
                    </Card>
                  )
                })}
              </InfinityScroll>
            </Body>
            }
          </Container>
        </TopicBox>
      </TopicContainer>
    </React.Fragment>
  )

};

const TopicContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url("https://user-images.githubusercontent.com/77369674/118811425-f73f2980-b8e7-11eb-919a-d4421378e117.png");


  @media (max-width: 500px) {
    background-image: url("https://user-images.githubusercontent.com/67696504/118986623-7b61e180-b9ba-11eb-9719-f898c5c5b7a2.png");
    margin: 50px 0px 0px 0px;
}
`

const TopicBox = styled.div`
  z-index: 2;
  width: 100%;
  max-width: 1200px;
  height: 100%;
  box-sizing: border-box;
  // height:100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  overflow-y: auto;
  @media (max-width: 500px) {
    
  }
`

const Container = styled.div`
  width: 800px;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: 50px 0 40px 0;
  margin: auto;
  

  @media (max-width: 500px) {
    width: 330px;
    padding: 23px 0 30px 0;
  }
`
const Header = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
`

const Body = styled.div`
box-sizing: border-box;
padding: 15px 0;
flex-direction: row;
width: 100%;
display: flex;
flex-wrap: wrap;
overflow-y: auto;
::-webkit-scrollbar {
  width: 10px; /* width of the entire scrollbar */
}

::-webkit-scrollbar-track {
  background: none; /* color of the tracking area */
}

::-webkit-scrollbar-thumb {
  background-color: #ffffff; /* color of the scroll thumb */
  border-radius: 20px; /* roundness of the scroll thumb */
}
@media (max-width: 500px) {
  ::-webkit-scrollbar {
    display: none;
  }

  ::-webkit-scrollbar-track {
    background: none; /* color of the tracking area */
  }

  ::-webkit-scrollbar-thumb {
    display: none;
  }
  width: 100%;
  padding: 0;
  flex-wrap: nowrap;
  flex-direction: column;
}
`
const BodyLike = styled.div`
box-sizing: border-box;
padding: 15px 0;
flex-direction: row;
width: 100%;
display: flex;
flex-wrap: wrap;
overflow-y: auto;
::-webkit-scrollbar {
  width: 10px; /* width of the entire scrollbar */
}

::-webkit-scrollbar-track {
  background: none; /* color of the tracking area */
}

::-webkit-scrollbar-thumb {
  background-color: #ffffff; /* color of the scroll thumb */
  border-radius: 20px; /* roundness of the scroll thumb */
}
@media (max-width: 500px) {
  ::-webkit-scrollbar {
    display: none;
  }

  ::-webkit-scrollbar-track {
    background: none; /* color of the tracking area */
  }

  ::-webkit-scrollbar-thumb {
    display: none;
  }
  width: 100%;
  padding: 0;
  flex-wrap: nowrap;
  flex-direction: column;
}
`

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0px 30px 30px 0px;
  width: 364px;
  height: 138px;
  background: #ffffff;
  box-shadow: 0px 0px 20px #0000001A;

  @media (max-width: 500px) {
    width: 326px;
    min-height: 120px;
    max-height: 120px;
    margin: 0px 15px 16px 0px;  
  }
`

const AnswerCount = styled.div`
  height: 40px;
  padding: 0 15px;
  font: normal normal normal 11px/16px Noto Sans KR;
  border-top: 1px solid #efefef;  
  padding: 0 20px 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 500px) {
    padding: 0 12px 0 12px;
    height: 30px;
  }
`


const UserInfo = styled.div`
  display: flex;
  cursor: pointer;
  align-items: center;
  margin: 14px 15px 10px 15px;
  @media (max-width: 500px) {
    margin: 12px 12px 6px 12px;
  }
`

const UserProfileImg = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 10px;
  border-radius: 25px;
  object-fit: cover;
`
const UserNickname = styled.div`
font: normal normal bold 12px/17px Noto Sans CJK KR;
@media (max-width: 500px) {
  font: normal normal bold 11px/16px Noto Sans CJK KR;
}
`

const QuestionContent = styled.div`
  margin: 0 15px 0 15px;
  font: normal normal bold 14px/20px Noto Sans CJK KR;
  cursor:pointer;
  &:hover {
    font-weight: bold;
  };
  @media (max-width: 500px) {
    margin: 0 12px 0 12px;
    font: normal normal bold 13px/19px Noto Sans CJK KR;
  }
`

const HeaderBox2 =styled.div`
  display: flex;
  align-items:center;
  justify-content: space-between;
`

const HeaderBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 21px;
  margin-bottom: 12px;
`

const HeaderText = styled.div`
  font: normal normal 800 26px/38px NanumMyeongjo;
  color: #262626;
  display: flex;
  @media (max-width: 500px) {
    font: normal normal bold 14px/20px Noto Sans CJK KR;
  }
`

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  font: normal normal normal 13px/19px Noto Sans CJK KR;
  margin-right: 40px;
  @media (max-width: 500px) {
    display: none;
  }
`

const HeaderRightMobile = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-right: 5px;
  font: normal normal medium 12px/17px Noto Sans CJK KR;
  @media (min-width: 500px) {
    display: none;
  }
`

const HeaderRightText = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;
  cursor: pointer;
`

const HeaderRightModal = styled.div`
  position: absolute;
  top:35px;
  right:0;
  z-index: 10;
  width: 120px;
  height: 80px;
  background-color: white;
  box-shadow: 0px 0px 20px #00000026;
`

const ModalText = styled.div`
display: flex;
justify-content: center;
align-items: center;
height: 40px;
font: normal normal medium 14px/20px Noto Sans CJK KR;
`

const TopicText = styled.div`
  cursor: pointer;
  min-width: 66px;
  max-width: 66px;
  height: 28px;
  padding: 5px 0px;
  letter-spacing: 0px;
  border-radius: 18px;
  font-weight: 600;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 500px) {
    min-width: 58px;
    max-width: 58px;
    height: 25px;
  }
`

export default Topic