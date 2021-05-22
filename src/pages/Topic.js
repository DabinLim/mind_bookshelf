import React from 'react'
import styled from 'styled-components'
import {useDispatch, useSelector} from 'react-redux'
import {api as communityActions, resetTopicInfo} from '../redux/modules/community'
import {history} from '../redux/configStore'
import InfinityScroll2 from '../shared/InfinityScroll2'



const Topic = (props) => {
  const topic = props.match.params.topic;
  const dispatch = useDispatch();
  const topic_info = useSelector((state) => state.community.topic)
  const next = useSelector((state) => state.community.topic_next)
  const is_loading = useSelector((state) => state.community.topic_loading)

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
            <Header>
              <TopicText
                style={{color: color, border: `1px solid ${color}`}}
              >
                <span>#{topic}</span>
              </TopicText>
            </Header>
            <Body>
              <InfinityScroll2
                callNext={() => {
                  dispatch(communityActions.getTopicQuestion(topic))
                }}
                is_next={next}
                loading={is_loading}
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
                        <b>{t.answerCount}</b>명 낙서중
                      </AnswerCount>
                    </Card>
                  )
                })}
              </InfinityScroll2>
            </Body>
        </TopicBox>
      </TopicContainer>
    </React.Fragment>
  )

};

const TopicContainer = styled.div`
  width: 100%;
  height: 100vh;
`

const TopicBox = styled.div`
margin-top: 50px;
width: 100%;
padding: 40px 50px;
background-image: url("https://user-images.githubusercontent.com/77369674/118811425-f73f2980-b8e7-11eb-919a-d4421378e117.png");
background-size: cover;
background-repeat: no-repeat;
@media (max-width: 500px) {
  padding: 20px 10px 20px 20px
}
`

const Header = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: auto;
`

const Body = styled.div`
  width: 100%;
  margin-top: 40px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  @media (max-width: 500px) {
    margin-top: 20px;
  }
`

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0px 30px 30px 0px;
  width: 272px;
  height: 189px;
  background: #ffffff;
  box-shadow: 0 3px 6px rgba(0,0,0,0.12), 0 2px 5px rgba(0,0,0,0.24);
  // transition: box-shadow 0.25s ease-in 0s, transform 0.25s ease-in 0s;
  // &:hover{
  //   box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
  //   transform: translateY(-8px);
  // };
  @media (max-width: 500px) {
    width: 150px;
    height: 140px;
    margin: 0px 15px 30px 0px;  
  }
`

const AnswerCount = styled.div`
  height: 40px;
  border-top: 1px solid #efefef;  
  padding: 0 20px 0 20px;
  display: flex;
  align-items: center;
  @media (max-width: 500px) {
    padding: 0 10px 0 10px;
  }
`


const UserInfo = styled.div`
  display: flex;
  cursor: pointer;
  align-items: center;
  margin: 20px;
  @media (max-width: 500px) {
    margin: 10px;
  }
`

const UserProfileImg = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 10px;
  border-radius: 25px;
  object-fit: cover;
`
const UserNickname = styled.div`
  font-weight: bold;
`

const QuestionContent = styled.div`
  margin: 0 20px 0 20px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor:pointer;
  &:hover {
    font-weight: bold;
  };
  @media (max-width: 500px) {
    margin: 0 10px 0 10px;
    -webkit-line-clamp: 2;
  }
`


const TopicText = styled.div`
  // font-size: 15px;
  cursor: pointer;
  min-width: 72px;
  max-width: 72px;
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