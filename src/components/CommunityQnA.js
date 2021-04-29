import React from 'react';
import styled from 'styled-components';
import {history} from '../redux/configStore';

const CommunityQnA = (props) => {

  return(
    <React.Fragment>
      <QnAContainer>
        <Question>{props.contents}</Question>
        <Topic>#{props.topic}</Topic>
        <AnswerContainer>
          {
            props.answers.map((a) => {
              return <Answer>
                        <AnswerHeader>
                          <AnswerProfileImg onClick={()=>{history.push(`/others/${a.id}`)}} src={a.profileImg} />
                          <AnswerNickname>{a.nickname}</AnswerNickname>
                        </AnswerHeader>
                          <AnswerContents>
                            {a.contents}
                          </AnswerContents>
                      </Answer>
            })
          }
        </AnswerContainer>
      </QnAContainer>
    </React.Fragment>

  )
}

const QnAContainer = styled.div`
  width: 650px;
  display: flex;
  flex-direction: column;
  align-items: start;
  @media (max-width: 1800px){
    margin-bottom: 60px;
  }
`
const Question = styled.div`
  font-size: 30px;
  font-weight: 600;
  width: 400px;
  height: 100px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`

const AnswerContainer = styled.div`
  display: flex;
  margin-top: 50px;
`

const Answer = styled.div`
  width: 150px;
  height: 150px;
  display: flex;
  flex-direction: column;
  padding: 13px;
  background-color: #C4C4C4;
  border-radius: 30px;
  margin-right: 15px;
`

const AnswerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const AnswerProfileImg = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 40px;
  object-fit: cover;
`

const AnswerNickname = styled.div`
  font-weight: 600;
`

const AnswerContents = styled.div`
  margin-top: 10px;
  font-size: 15px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`

const Topic = styled.div`
  margin-top: 30px;
  display: inline-block;
  background-color: #E5E5E5;
  padding: 5px 14px;
  border-radius: 18px;
  font-weight: 600;
`

export default CommunityQnA
