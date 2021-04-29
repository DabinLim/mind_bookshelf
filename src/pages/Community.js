import React, {useEffect, useState} from 'react' 
import {CommunityQnA} from '../components/Community/communityindex';
import styled from 'styled-components'
import {useDispatch, useSelector} from 'react-redux'
import {api as communityActions} from "../redux/modules/community"

const Community = () => {
  const dispatch = useDispatch()
  const question_list = useSelector((state) => state.community.question)
  console.log(question_list)

  useEffect(() => {
    dispatch(communityActions.communityQuestionAX())
  },[])

  

  return(
    <React.Fragment>
      <CommunityContainer>
      <div></div>
      <CommunityBox>
        {question_list !== 0 ?
        question_list.map((q) => {
          return <CommunityQnA key={q.id} {...q} />
        }):null}
      </CommunityBox>
      </CommunityContainer>
    </React.Fragment>
  )

}

const CommunityBox = styled.div`
  width: 100%;
  margin: 0 60px 60px 60px;
  display: flex;
  justify-content: space-around;
  @media (max-width: 1800px){
    flex-direction: column;
    margin-top: 60px;
  }
`

const CommunityContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export default Community

