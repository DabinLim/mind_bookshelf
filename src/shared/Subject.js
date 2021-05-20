import React from 'react';
import styled from 'styled-components';

const Subject = (props) => {
    const {topic} = props

    return(
        <React.Fragment>
            <SubjectBtn {...props}><span>#{topic}</span></SubjectBtn>
        </React.Fragment>
    )
}

Subject.defaultProps = {
    width:'72px',
    height:'31px',
    m_width:'58px',
    m_height:'25px',
    borderRadius:'16px',
    fontSize:'11px',
    margin:'',
}

const SubjectBtn = styled.div`
    margin-right:10px;
    width: ${props => props.width};
    height: ${props => props.height};
    display:flex;
    align-items:center;
    justify-content:center;
    border-radius:${props => props.borderRadius};
    font-size:${props => props.fontSize};
    margin:${props => props.margin};
    font-weight:900;
    letter-spacing: 0px;
    ${props => props.topic === '나' && 'border: 1px solid #458857; color: #458857'};
    ${props => props.topic === '가치' && 'border:1px solid #7249B4; color:#7249B4'};
    ${props => props.topic === '사랑' && 'border:1px solid #D34242; color:#D34242'};
    ${props => props.topic === '관계' && 'border:1px solid #2761CC; color:#2761CC'};
    ${props => props.topic === '우정' && 'border:1px solid #E0692D; color:#E0692D'};
    ${props => props.topic === '꿈' && 'border:1px solid #E6BA28; color:#E6BA28'};
    @media(max-width:750px){
        width:${props => props.m_width};
        height:${props => props.m_height};
    }
`;


export default Subject;