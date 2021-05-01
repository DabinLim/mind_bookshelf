import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { history } from "../../redux/configStore";

const RecentQuestion = (props) => {
  const user = useSelector((state) => state.user.user);
  return (
    <>
      <CardFrame>
        <WriterInfo>
          <CardWriterProfile
            src={props.profileImg}
            onClick={() => {
              if (user?.id === props.userId) {
                history.push(`/mybook`);
                return;
              }
              history.push(`/others/${props.userId}`);
            }}
          />
          <HashTag>{props.nickname}</HashTag>
        </WriterInfo>

        <CardContent>{props.contents}</CardContent>
      </CardFrame>
    </>
  );
};

RecentQuestion.defaultProps = {
  onClick: () => {},
};

const CardFrame = styled.div`
  width: 80%;
  border-radius: 24px;
  padding: 16px 24px;
  margin-bottom: 12px;
  background: #c4c4c4;
`;

const WriterInfo = styled.div`
  display: flex;
  align-items: center;
`;

const CardWriterProfile = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: gray;
  :hover {
    cursor: pointer;
  }
`;

const HashTag = styled.span`
  padding: 6px 14px;
  margin-left: 8px;
  background: #ececec;
  border-radius: 24px;
`;

const CardContent = styled.p`
  margin-top: 20px;
  font-weight: bolder;
`;

export default RecentQuestion;
