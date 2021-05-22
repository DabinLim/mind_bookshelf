import React from 'react'
import styled from 'styled-components'
import {useDispatch, useSelector} from 'react-redux'
import {api as communityActions, resetTopicInfo} from '../redux/modules/community'
import {history} from '../redux/configStore'
import InfinityScroll from '../shared/InfinityScroll'



const Topic = (props) => {
  const topic = props.match.params.topic;
  const dispatch = useDispatch();
  const topic_info = useSelector((state) => state.community.topic)
  const next = useSelector((state) => state.community.topic_next)
  const is_loading = useSelector((state) => state.community.topic_loading)
  const container = React.useRef();

  React.useEffect(() => {
    dispatch(communityActions.getTopicQuestion(topic))
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
              <TopicText
                style={{color: color, border: `1px solid ${color}`}}
              >
                <span>#{topic}</span>
              </TopicText>
              <HeaderBox>
                <HeaderText>질문카드 결과</HeaderText>
                <HeaderRight>
                  <HeaderRightText>인기순</HeaderRightText>
                  <HeaderRightText>최신순</HeaderRightText>
                </HeaderRight>
              </HeaderBox>
            </Header>
            <Body ref={container} >
              <InfinityScroll
                callNext={() => {
                  dispatch(communityActions.getTopicQuestion(topic))
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
  background-image: url("https://user-images.githubusercontent.com/77369674/118459848-1b0f3d80-b737-11eb-8f1a-906da3e390e2.jpeg");

  @media (max-width: 650px) {
  }
  @media (max-width: 500px) {
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
`

const Container = styled.div`
  width: 800px;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: 100px 0 40px 0;
  margin: auto;
  

  @media (max-width: 600px) {
    padding: 30px 0 0 0;
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
@media (max-width: 650px) {
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
  max-height: 649px;
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
    width: 150px;
    height: 140px;
    margin: 0px 15px 30px 0px;  
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
    padding: 0 10px 0 10px;
  }
`


const UserInfo = styled.div`
  display: flex;
  cursor: pointer;
  align-items: center;
  margin: 14px 15px 10px 15px;
  @media (max-width: 500px) {
    margin: 10px;
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
`

const QuestionContent = styled.div`
  margin: 0 15px 0 15px;
  // display: -webkit-box;
  // -webkit-line-clamp: 3;
  // -webkit-box-orient: vertical;
  // overflow: hidden;
  // text-overflow: ellipsis;
  font: normal normal bold 14px/20px Noto Sans CJK KR;
  cursor:pointer;
  &:hover {
    font-weight: bold;
  };
  @media (max-width: 500px) {
    margin: 0 10px 0 10px;
    -webkit-line-clamp: 2;
  }
`

const HeaderBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 14px;
  margin-bottom: 20px;
`

const HeaderText = styled.div`
  font: normal normal 800 26px/38px NanumMyeongjo;
  color: #262626;
`

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  font: normal normal normal 13px/19px Noto Sans CJK KR;
  margin-right: 40px;
`


const HeaderRightText = styled.div`
  margin-left: 10px;
  cursor: pointer;
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
`

export default Topic