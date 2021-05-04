import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import swal from "sweetalert";
import { Switch } from "antd";
import { history } from "../../redux/configStore";

import { api as answerActions } from "../../redux/modules/answer";
import RecentQuestion from "./RecentQuestion";
import { CheckCircleOutlined } from "@ant-design/icons";

const Post = (props) => {
  const dispatch = useDispatch();
  const user_info = useSelector((state) => state.user.user);
  // const answer_list = useSelector((state) => state.answer.answer_list);
  // const answer_id = props.cardId;

  const [isChecked, setCheck] = useState(true);
  const [isRecentOpen, setRecentOpen] = useState(false);

  // Recent modal
  const openRecent = () => {
    setRecentOpen(true);
  };

  const closeRecent = () => {
    setRecentOpen(false);
  };

  // comment counter
  const [count, setCount] = useState(0);

  // Switch function
  function onChange(checked) {
    setCheck(checked);
    console.log(isChecked);
  }

  // contents upload
  const [contents, setContents] = React.useState("");
  const ok_submit = contents ? true : false;

  const changeContents = (e) => {
    if (count === 200) {
      setContents(contents.substring(0, contents.length - 1));
      setCount(contents.length - 1);
      return;
    }
    setContents(e.target.value);
    setCount(e.target.value.length);
  };

  const addAnswer = () => {
    if (contents === "") {
      swal({
        title: "업로드에 실패하였습니다 😥",
        text: "답변이 공란입니다.",
        icon: "error",
      });
      return;
    }
    dispatch(answerActions.sendAnswerAX(props.cardId, contents));
    setContents("");
    setCount(0);
  };

  React.useEffect(() => {
    setContents("");
  }, []);

  let opacity = props.available ? 1 : 0.4;

  // 유효성 체크
  return (
    <>
      <CardFrame>
        {isRecentOpen ? (
          <CommunitySeductor>
            <RecentQuestion close={closeRecent} />
          </CommunitySeductor>
        ) : null}
        {/* <CommunitySeductor>
          {answer_list?.map((a, idx) => {
            return (
              <>
                <RecentQuestion key={idx + "msg"} {...a} />
              </>
            );
          })}
        </CommunitySeductor> */}
        {/* 질문 정보 (작성자 정보 포함) */}
        <CardInfo>
          <CardWriterInfo>
            <CardWriterProfile
              style={{ opacity: opacity }}
              src={
                props.profileImg
                  ? props.profileImg
                  : "data:image/png;base64,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"
              }
              onClick={() => {
                history.push(``);
              }}
            ></CardWriterProfile>
            <CardWriter style={{ opacity: opacity }}>
              <b>{props.createdUser}님</b>의 질문
            </CardWriter>
          </CardWriterInfo>
          <ExtraGroup>
            <AnswerInfo
              style={{ opacity: opacity }}
              onClick={() => {
                history.push(`/community/${props.cardId}`);
              }}
            >
              <b>{props.answerCount}명</b>이 답변
            </AnswerInfo>
            {props.available ? (
              <Switch
                style={{ opacity: opacity }}
                checkedChildren="공개"
                unCheckedChildren="비공개"
                defaultChecked
                onChange={onChange}
              />
            ) : null}
          </ExtraGroup>
        </CardInfo>
        {/* 질문 보여주는 곳 */}
        <CardUpper>
          <CardLeft style={{ opacity: opacity }}>
            {props.topic?.map((p) => {
              let color = "";
              if (p === "나") {
                color = "#F9D9FC";
              } else if (p === "사랑") {
                color = "#FEBABA";
              } else if (p === "관계") {
                color = "#FDF1AE";
              } else if (p === "가치") {
                color = "#C2C8FD";
              } else if (p === "우정") {
                color = "#C4FCCD";
              } else if (p === "꿈") {
                color = "#C3E9FD";
              }
              return <HashTag style={{ background: color }}>#{p}</HashTag>;
            })}
          </CardLeft>
          <CardRight style={{ opacity: opacity }}>
            <CardContent>{props.contents}</CardContent>
          </CardRight>
        </CardUpper>
        {/*  포스트 작성하는 곳 */}
        <PostBox>
          {props.available ? (
            <>
              <ElTextarea
                rows={6}
                maxlength="200"
                placeholder={`${
                  user_info?.nickname ? user_info?.nickname : "고객"
                }님이라면 어떻게 답변하시겠어요?`}
                onChange={changeContents}
                value={contents}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    addAnswer();
                  }
                }}
              ></ElTextarea>
              <BtnGroup>
                {count}/200
                {ok_submit ? (
                  <SubmitBtn
                    onClick={addAnswer}
                    style={{
                      background: "#1890FF",
                      transition: "all 200ms ease-in-out",
                    }}
                  >
                    답변하기
                  </SubmitBtn>
                ) : (
                  <SubmitBtn onClick={addAnswer}>답변하기</SubmitBtn>
                )}
              </BtnGroup>
            </>
          ) : (
            <CompletedBox>
              <CheckCircleOutlined
                style={{ fontSize: "60px", marginBottom: "10px" }}
              />
              <br />
              <p style={{ fontSize: "24px" }}>답변완료</p>
            </CompletedBox>
          )}
        </PostBox>
      </CardFrame>
    </>
  );
};

const CommunitySeductor = styled.div`
  display: flex;
`;

const CardFrame = styled.div`
  width: 100%;
  padding: 16px 24px;
  background: white;
  text-align: center;
  border-top-left-radius: 20px;
`;

const CardInfo = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ExtraGroup = styled.div`
  display: flex;
  align-items: center;
`;

const AnswerInfo = styled.span`
  margin-right: 8px;
  cursor: pointer;
  :hover {
    transform: scale(1.1);
    transition: all 200ms ease-in-out;
  }
`;

const CardUpper = styled.div`
  width: 100%;
  display: flex;
`;

const CardLeft = styled.div`
  width: 20%;
  display: flex;
  align-items: center;
  &::first-child {
    margin-right: 5px;
  }
`;

const CardRight = styled.div`
  width: 80%;
`;

const HashTag = styled.span`
  min-width: 40px;
  background: #ededed;
  padding: 8px 12px;
  border-radius: 24px;
  text-align: left;
  font: normal normal bold 14px/19px Roboto;
  box-shadow: 0px 0px 15px #c1c7fc;
  letter-spacing: 0px;
  color: #363636;
  font-size: 12px;
  :hover {
    cursor: pointer;
  }
`;

const CardContent = styled.p`
  margin-top: 20px;
  font-size: 20px;
  font-weight: bolder;
  text-align: left;
`;

const CardWriterInfo = styled.div`
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

const CardWriter = styled.span`
  margin-left: 8px;
`;

const PostBox = styled.div``;

const ElTextarea = styled.textarea`
  padding: 0 16px;
  box-sizing: border-box;
  width: 100%;
  font-size: 20px;
  border: none;
  overflow: auto;
  outline: none;

  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;

  resize: none; /*remove the resize handle on the bottom right*/

  & :focus {
    border: none;
  }
`;

const BtnGroup = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: auto;
  & > button {
    cursor: pointer;
  }
`;
const SubmitBtn = styled.button`
  width: 30%;
  padding: 8px 12px;
  border: none;
  outline: none;
  border-radius: 24px;
  color: white;
  background: gray;
`;

const CompletedBox = styled.div`
  text-align: center;
  font: normal normal bold 30px/39px Roboto;
  letter-spacing: 0px;
  color: #121212;
  opacity: 0.9;
  height: 200px;
`;

const AnsweredCard = styled.div`
  position: fixed;
  background: white;
  width: 40%;
  height: 40%;
  opacity: 0.8;
  z-index: 30;
`;

const AnsweredComment = styled.div``;
export default Post;
