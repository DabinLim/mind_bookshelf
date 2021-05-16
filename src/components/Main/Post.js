import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import swal from "sweetalert";
import { history } from "../../redux/configStore";

import { api as answerActions } from "../../redux/modules/answer";
import { CheckCircleOutlined } from "@ant-design/icons";
import CustomSwitch from "../../shared/CustomSwitch";
import { Radio } from "antd";

const Post = (props) => {
  const dispatch = useDispatch();
  const user_info = useSelector((state) => state.user.user);

  const is_login = useSelector((state) => state.user.is_login);

  // comment counter
  const [count, setCount] = useState(0);

  // Switch function

  const [isOpen, setOpen] = useState(true);

  function clickOpen() {
    if (isOpen) {
      setOpen(false);
      return;
    }
    setOpen(true);
  }

  // contents upload
  let [contents, setContents] = React.useState("");
  const ok_submit = contents ? true : false;

  const changeContents = (e) => {
    // if (count === 1000) {
    //   setContents(contents.substring(0, contents.length - 1));
    //   setCount(contents.length - 1);
    //   return;
    // }
    // input 값이 1000자 넘었을 때 부터 추가 안되게
    if(e.target.value.length > 1000){
      return
    }
    setContents(e.target.value);
    setCount(e.target.value.length);
    contents = contents.replace(/(\n|\r\n)/g, "<br>");
  };

  const addAnswer = () => {
    // let str_space = /\s/; // 공백체크
    let check = contents.replaceAll(" ", "");
    if (check === "") {
      swal({
        title: "업로드에 실패하였습니다 😥",
        text: "빈칸만 넣으면 모를 줄 알았죠?!!",
        icon: "error",
      });
      setContents("");
      setCount(0);
      return;
    }
    dispatch(answerActions.sendAnswerAX(props.cardId, contents, isOpen));
    setContents("");
    setCount(0);
  };

  React.useEffect(() => {
    setContents("");
  }, []);

  let opacity = props.available ? 1 : 0.4;
  let topic = "";
  if (props.topic?.length > 0) {
    topic = props.topic[0];
  }

  return (
    <>
      <CardFrame className="post-card">
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
                history.push(`/others/${props.createdUserId}`);
              }}
            ></CardWriterProfile>
            <CardWriter style={{ opacity: opacity }}>
              <b>{props.createdUser}님</b>의 질문
            </CardWriter>
            {/* 500px 아래로 내려갈 때!!!! */}
          </CardWriterInfo>
          <SmallCardLeft>#{topic}</SmallCardLeft>
          <ExtraGroup>
            <AnswerInfo>
              {props?.otherProfileImg?.length > 0 ? (
                <ThreeProfileBox>
                  {props?.otherProfileImg?.map((o, idx) => {
                    return <UserProfile key={idx} src={o.otherProfileImg} />;
                  })}
                </ThreeProfileBox>
              ) : null}
              <div
                style={{
                  opacity: opacity,
                  height: "100%",
                  width: "100%",
                  margin: "0 0 0 8px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  history.push(`/community/${props.cardId}`);
                }}
              >
                <b>{props.answerCount}명</b>이 답변
              </div>
            </AnswerInfo>
          </ExtraGroup>
        </CardInfo>
        {/* 질문 보여주는 곳 */}
        <SmallCardContent style={{ opacity: opacity }}>
          {props.contents}
        </SmallCardContent>
        <CardUpper>
          <CardLeft style={{ opacity: opacity }}>
            <HashTag>#{topic}</HashTag>
          </CardLeft>
          <CardRight style={{ opacity: opacity }}>
            <CardContent>{props.contents}</CardContent>
          </CardRight>
        </CardUpper>
        {/*  포스트 작성하는 곳 */}
        <PostBox>
          {is_login === false ? (
            <>
              <div style={{ margin: "90px 0 0 0 ", cursor:"context-menu" }}>
                <pre>
                  <span style={{ fontSize: "14px" }}>
                    당신이라면 어떻게 대답하시겠나요?
                  </span>
                  <br />
                  <span style={{ fontSize: "14px" }}>
                    로그인시 답변 가능합니다.
                  </span>
                </pre>
              </div>
            </>
          ) : props.available ? (
            <>
              <ElTextarea
                rows={8}
                placeholder={`${
                  user_info?.nickname ? user_info?.nickname + "님" : "당신"
                }이라면 어떻게 답변하시겠어요? \n답변과 그 이유, 느낌 등을 같이 적어주세요.`}
                onChange={changeContents}
                value={contents}
              ></ElTextarea>
              <SmallBtnGroup>
                {props.available ? (
                  <CustomSwitch isOpen={isOpen} onClick={clickOpen} />
                ) : null}
                {ok_submit ? (
                  <SubmitBtn
                    onClick={addAnswer}
                    style={{
                      background: "#061366",
                      color: "#ffffff",
                      transition: "all 200ms ease-in-out",
                    }}
                  >
                    답변하기
                  </SubmitBtn>
                ) : (
                  <SubmitBtn onClick={addAnswer}>답변하기</SubmitBtn>
                )}
              </SmallBtnGroup>
              <BtnGroup>
                <CountLetter>{count}/1000</CountLetter>
                <BtnBox>
                  {props.available ? (
                    <CustomSwitch isOpen={isOpen} onClick={clickOpen} />
                  ) : null}

                  {ok_submit ? (
                    <SubmitBtn
                      onClick={addAnswer}
                      style={{
                        background: "#061366",
                        color: "#ffffff",
                        transition: "all 200ms ease-in-out",
                      }}
                    >
                      답변하기
                    </SubmitBtn>
                  ) : (
                    <SubmitBtn onClick={addAnswer}>답변하기</SubmitBtn>
                  )}
                </BtnBox>
              </BtnGroup>
            </>
          ) : (
            <CompletedBox>
              <CompletedBoxInner>
                <CheckCircleOutlined
                  style={{
                    fontSize: "60px",
                    marginBottom: "10px",
                    fontWeight: "lighter",
                  }}
                />
                <p style={{ fontSize: "24px", margin: "0" }}>답변완료</p>
                {props.allChecked ? (
                  <>
                    <div
                      style={{
                        fontSize: "16px",
                        margin: "0",
                        display: "flex",
                        flexDirection: "column",
                        lineHeight: "1",
                        padding: "10px",
                      }}
                    >
                      <span>오늘 질문은 모두 끝났습니다.</span>
                      <span>내일을 기대해주세요!</span>
                    </div>
                  </>
                ) : null}
              </CompletedBoxInner>
            </CompletedBox>
          )}
        </PostBox>
      </CardFrame>
    </>
  );
};

const CardFrame = styled.div`
  width: 100%;
  min-height: 462px;
  max-height: 462px;
  padding: 48px 50px 40px;
  background: white;
  text-align: center;
  border-top-left-radius: 50px;
  @media (max-width: 600px) {
    padding: 17px 18px;
    border-radius: 20px;
    min-height: 462px;
    max-height: 462px;
    width: 100%;
  }
`;

const CardInfo = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: 500px) {
    max-height: 31px;
  }
`;

const ExtraGroup = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 500px) {
    display: none;
  }
`;

const AnswerInfo = styled.span`
  margin-right: 8px;
  display: flex;
  align-items: center;
`;

const ThreeProfileBox = styled.div`
  display: flex;
`;

const UserProfile = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;

  &:nth-child(2) {
    transform: translateX(-40%);
  }

  &:nth-child(3) {
    transform: translateX(-80%);
  }
`;

const CardUpper = styled.div`
  width: 100%;
  display: flex;
  @media (max-width: 500px) {
    display: none;
  }
`;

const CardLeft = styled.div`
  min-width: 72px;
  max-width: 72px;
  margin-right: 8px;
  display: flex;
  align-items: center;
  &::first-child {
    margin-right: 5px;
  }

  @media (max-width: 500px) {
    display: none;
  }
`;

const SmallCardLeft = styled.span`
  min-width: 58px;
  max-width: 58px;
  background: #b5bdff;
  padding: 8px 12px;
  border-radius: 24px;
  text-align: center;
  font: normal normal bold 11px/15px Roboto;
  box-shadow: 0px 0px 15px #c3c9fe;
  letter-spacing: 0px;
  color: #363636;
  cursor: context-menu;
  @media (min-width: 500px) {
    display: none;
  }
`;

const CardRight = styled.div`
  width: 80%;
`;

const HashTag = styled.span`
  min-width: 72px;
  max-width: 72px;
  background: #b5bdff;
  padding: 8px 12px;
  border-radius: 24px;
  text-align: center;
  font: normal normal bold 14px/19px Roboto;
  box-shadow: 0px 0px 15px #c3c9fe;
  letter-spacing: 0px;
  color: #363636;
  font-size: 14px;
  cursor: context-menu;

  @media (min-width: 500px) {
    font-size: 11px;
  }
`;

const CardContent = styled.p`
  margin-top: 17px;
  font-size: 17px;
  font-weight: bolder;
  text-align: left;
  cursor: context-menu;
`;

const SmallCardContent = styled.p`
  margin-top: 17px;
  font-size: 14px;
  font-weight: bolder;
  text-align: left;
  min-height: 60px;
  max-height: 70px;
  margin-bottom: 0;
  @media (min-width: 500px) {
    display: none;
  }
`;

const CardWriterInfo = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 500px) {
    justify-content: space-between;
  }
`;

const CardWriterProfile = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 8px;
  background: gray;
  :hover {
    cursor: pointer;
  }
`;

const CardWriter = styled.span`
  cursor: context-menu;
  @media (max-width: 500px) {
    font-size: 11px;
  }
`;

const PostBox = styled.div`
  @media (max-width: 500px) {
    min-height: 250px;
    max-height: 250px;
  }
`;

const ElTextarea = styled.textarea`
  padding: 0 16px;
  box-sizing: border-box;
  width: 100%;
  font-size: 16px;
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

  @media (max-width: 500px) {
    padding: 0;
    font-size: 12px;
  }
`;

const SmallBtnGroup = styled.div`
  width: 100%;
  min-height: 160px;
  max-height: 165px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  @media (min-width: 500px) {
    display: none;
  }
`;

const BtnGroup = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
  & > button {
    cursor: pointer;
  }
  @media (max-width: 500px) {
    margin: 0;
    display: none;
  }
`;

const CountLetter = styled.span`
  @media (max-width: 500px) {
    display: none;
  }
`;

const BtnBox = styled.div`
  display: flex;
  align-items: center;
  min-width: 200px;
  width: 50%;
  justify-content: flex-end;
`;

const SubmitBtn = styled.button`
  width: 50%;
  padding: 8px 12px;
  border: none;
  outline: none;
  border-radius: 24px;
  color: #061366;
  background: #e2eaff;
  margin-left: 10px;
  cursor: pointer;
  @media (max-width: 500px) {
    width: 112px;
    height: 40px;
  }
`;

const CompletedBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font: normal normal bold 30px/39px Roboto;
  letter-spacing: 0px;
  color: #121212;
  opacity: 0.9;
  height: 200px;
`;

const CompletedBoxInner = styled.div``;

export default Post;
