import React from 'react'
import styled from 'styled-components'
import {useDispatch} from 'react-redux'
import {api as communityActions} from '../redux/modules/community'


const Topic = (props) => {
  const topic = props.match.params.topic.split(':')[1];
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(communityActions.getTopicQuestion(topic))
  },[])

  console.log(topic)
  console.log(props.match.params)
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
              <Card>
                <div>
                  <UserInfo>
                    <UserProfileImg />
                    <UserNickname>행복한_이순신</UserNickname>
                  </UserInfo>
                  <QuestionContent>
                    카레맛 똥 vs 똥맛 카레카레맛 똥 vs 똥맛 카레카레맛 똥 vs 똥맛 카레카레맛 똥 vs 똥맛 카레
                  </QuestionContent>
                </div>
                <AnswerCount>
                  0명 낙서중
                </AnswerCount>
              </Card>
            </Body>
        </TopicBox>
      </TopicContainer>
    </React.Fragment>
  )

};

const TopicContainer = styled.div`
  width: 100%;
`

const TopicBox = styled.div`
margin-top: 50px;
width: 100%;
padding: 40px 50px;
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
`

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0px 30px 30px 0px;
  width: 272px;
  height: 189px;
  background: #ffffff;
  box-shadow: 0px 0px 20px #0000001a;
`

const AnswerCount = styled.div`
  height: 40px;
  border-top: 1px solid #efefef;  
  padding: 0 20px 0 20px;
  display: flex;
  align-items: center;
`


const UserInfo = styled.div`
  display: flex;
  align-items: center;
  margin: 20px;
`

const UserProfileImg = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 10px;
`
const UserNickname = styled.div`
  
`

const QuestionContent = styled.div`
  margin: 0 20px 0 20px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
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