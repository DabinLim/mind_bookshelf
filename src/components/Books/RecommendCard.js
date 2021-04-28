import React from 'react';
import styled from 'styled-components';

const RecommendCard = (props) => {
    console.log(props)
    return(
        <React.Fragment>
            <Container>
                <Profile>
                    <ProfileImg src={props.info.otherUserProfileImg}></ProfileImg>
                    <span style={{fontSize:'10px',fontWeight:'600'}}>{props.info.otherUserNickname}</span>
                </Profile>
                <Body>
                    {props.info.otherUserContents}
                </Body>
            </Container>
        </React.Fragment>
    )
}

const Container = styled.div`
    width:30%;
    box-sizing:border-box;
    padding:2px;
    display:flex;
    flex-direction:column;
    justify-content:flex-start;
    background-color: lightgray;
`;


const Profile = styled.div`
    width:100%;
    height:auto;
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:flex-start;
`;

const ProfileImg = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 20px; 
    background-position: center;
    background-image: url('${props => props.src}');
    background-size: cover;
    margin: 0px 10px 0px 0px;
`;

const Body = styled.span`
    margin: 10px 0px;
    font-size: 10px;
    text-align:center;
`;

export default RecommendCard