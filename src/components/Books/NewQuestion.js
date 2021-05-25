import React, { useState } from "react";
import styled from "styled-components";
import swal from "sweetalert";
import QuestionConfirm from "./QuestionConfirm";

const NewQuestion = (props) => {
  const [question, setQuestion] = useState("");
  const [confirmModal, setConfirmModal] = useState(false);
  const [_friendship, setFriendship] = useState(false);
  const [_relationship, setRelationship] = useState(false);
  const [_love, setLove] = useState(false);
  const [_worth, setWorth] = useState(false);
  const [_myself, setMyself] = useState(false);
  const [_dream, setDream] = useState(false);
  const [_topic, setTopic] = useState();
  const numberChecked = () => {
    const checkedType = [
      _friendship,
      _relationship,
      _love,
      _worth,
      _myself,
      _dream,
    ];
    if (Object.values(checkedType).filter((x) => x == true).length == 2) {
      console.log(2);
      return;
    }
    return true;
  };

  const changeQuestion = (e) => {
    if (e.target.value.length >= 50) {
      return;
    }
    setQuestion(e.target.value);
  };

  const checkedSwal = () => {
    swal({
      title: "더이상 주제를 추가할 수 없습니다.",
      text: `주제는 2개까지 선택 가능합니다.`,
      icon: "error",
    });
  };

  const checkedRelationship = () => {
    if (!_relationship) {
      setRelationship(true);
      if (!numberChecked()) {
        checkedSwal();
        setRelationship(false);
      }
    } else {
      setRelationship(false);
    }
  };

  const checkedFriendship = () => {
    if (!_friendship) {
      setFriendship(true);
      if (!numberChecked()) {
        checkedSwal();
        setFriendship(false);
      }
    } else {
      setFriendship(false);
    }
  };

  const checkedLove = () => {
    if (!_love) {
      setLove(true);
      if (!numberChecked()) {
        checkedSwal();
        setLove(false);
      }
    } else {
      setLove(false);
    }
  };

  const checkedDream = () => {
    if (!_dream) {
      setDream(true);
      if (!numberChecked()) {
        checkedSwal();
        setDream(false);
      }
    } else {
      setDream(false);
    }
  };

  const checkedWorth = () => {
    if (!_worth) {
      setWorth(true);
      if (!numberChecked()) {
        checkedSwal();
        setWorth(false);
      }
    } else {
      setWorth(false);
    }
  };

  const checkedMyself = () => {
    if (!_myself) {
      setMyself(true);
      if (!numberChecked()) {
        checkedSwal();
        setMyself(false);
      }
    } else {
      setMyself(false);
    }
  };

  const checkTopic = () => {
    let result = [];
    if (_dream) {
      result.push("꿈");
    }
    if (_friendship) {
      result.push("우정");
    }
    if (_love) {
      result.push("사랑");
    }
    if (_myself) {
      result.push("나");
    }
    if (_relationship) {
      result.push("관계");
    }
    if (_worth) {
      result.push("가치");
    }
    return result;
  };

  const addQuestion = () => {
    const topic = checkTopic();
    if (!topic) {
      swal({
        title: "주제를 골라주세요.",
        text: `주제를 1개이상 선택해주세요!`,
        icon: "error",
      });
      return;
    }
    setTopic(topic);
    if (!/.{5,}$/g.test(question)) {
      swal({
        title: "질문이 정상적으로 작성되지 않았습니다.",
        text: `최소 5글자 이상 작성해주셔야 합니다.`,
        icon: "error",
      });
      return;
    }
    setConfirmModal(true);
  };

  return (
    <React.Fragment>
      {confirmModal ? (
        <QuestionConfirm
          setModalVisible={props.setModalVisible}
          setConfirmModal={setConfirmModal}
          topic={_topic}
          question={question}
        />
      ) : null}
      <ModalOverlay
        onClick={() => {
          props.setModalVisible(false);
        }}
      />
      <ModalInner>
        <Container>
          <HeaderContainer>
          <SubmitBtn style={{color:"#A8A8A8"}} onClick={()=>{
            props.setModalVisible(false);
          }} >취소</SubmitBtn>
          <Header>나의 질문</Header>
          <SubmitBtn onClick={addQuestion} >완료</SubmitBtn>
          </HeaderContainer>
          <Line/>
          <TypeContainer>
            <InputLabel>주제</InputLabel>
            <TypeBox style={{marginBottom: "13px"}}>
              {_friendship ? (
                <CheckedLabel
                  onClick={checkedFriendship}
                  style={{
                    background: "#F4F4F4", 
                    color: "#E0692D",
                    border: "2px solid #E0692D",
                  }}
                >
                  #우정
                </CheckedLabel>
              ) : (
                <CheckedLabel
                  onClick={checkedFriendship}
                  style={{ 
                    background: "#F4F4F4",
                    border: "2px solid #F4F4F4",
                  }}
                >
                  #우정
                </CheckedLabel>
              )}
              {_love ? (
                <CheckedLabel
                  onClick={checkedLove}
                  style={{
                    background: "#F4F4F4", 
                    color: "#D34242",
                    border: "2px solid #D34242",
                  }}
                >
                  #사랑
                </CheckedLabel>
              ) : (
                <CheckedLabel
                  onClick={checkedLove}
                  style={{ 
                    background: "#F4F4F4",
                    border: "2px solid #F4F4F4"
                  }}
                >
                  #사랑
                </CheckedLabel>
              )}
              {_dream ? (
                <CheckedLabel
                  onClick={checkedDream}
                  style={{
                    background: "#F4F4F4", 
                    color: "#E6BA28",
                    border: "2px solid #E6BA28",
                  }}
                >
                  #꿈
                </CheckedLabel>
              ) : (
                <CheckedLabel
                  onClick={checkedDream}
                  style={{ 
                    background: "#F4F4F4",
                    border: "2px solid #F4F4F4"
                  }}
                >
                  #꿈
                </CheckedLabel>
              )}
            </TypeBox>
            <TypeBox>
              {_worth ? (
                <CheckedLabel
                  onClick={checkedWorth}
                  style={{
                    background: "#F4F4F4", 
                    color: "#7249B4",
                    border: "2px solid #7249B4",
                  }}
                >
                  #가치
                </CheckedLabel>
              ) : (
                <CheckedLabel
                  onClick={checkedWorth}
                  style={{ 
                    background: "#F4F4F4",
                    border: "2px solid #F4F4F4",
                  }}
                >
                  #가치
                </CheckedLabel>
              )}
              {_relationship ? (
                <CheckedLabel
                  onClick={checkedRelationship}
                  style={{
                    background: "#F4F4F4", 
                    color: "#2761CC",
                    border: "2px solid #2761CC",
                  }}
                >
                  #관계
                </CheckedLabel>
              ) : (
                <CheckedLabel
                  onClick={checkedRelationship}
                  style={{ 
                    background: "#F4F4F4", 
                    border: "2px solid #F4F4F4"
                  }}
                >
                  #관계
                </CheckedLabel>
              )}
              {_myself ? (
                <CheckedLabel
                  onClick={checkedMyself}
                  style={{
                    background: "#F4F4F4", 
                    color: "#458857",
                    border: "2px solid #458857",
                  }}
                >
                  #나
                </CheckedLabel>
              ) : (
                <CheckedLabel
                  onClick={checkedMyself}
                  style={{ 
                    background: "#F4F4F4",
                    border: "2px solid #F4F4F4",
                  }}
                >
                  #나
                </CheckedLabel>
              )}
            </TypeBox>
          </TypeContainer>
          <Line/>
          <InputContainer>
            <InputLabel>질문</InputLabel>
            <div style={{ position: "relative" }}>
              <Textarea
                rows="4"
                value={question}
                type="text"
                placeholder="질문을 입력해주세요."
                onChange={changeQuestion}
              />
              <CountQuestion>{question.length}/50</CountQuestion>
            </div>
          </InputContainer>
        </Container>
      </ModalInner>
    </React.Fragment>
  );
};

const ModalOverlay = styled.div`
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 99;
`;

const ModalInner = styled.div`
  position: absolute;
  box-sizing: border-box;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  background-color: #fff;
  height: auto;
  width: 290px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  @media (max-width: 420px) {
    width: 290px;
  } ;
`;

const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding:0 24px;
  height: 48px;
`

const Header = styled.div`
  margin: auto;
  font: normal normal bold 14px/20px Noto Sans CJK KR;
`;

const TypeContainer = styled.div`
  width: 242px;
  margin: auto;
  padding: 20px 0 20px 0;
  display: flex;
  flex-direction: column;
`;

const TypeBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`
const Line = styled.div`
  width: 100%;
  border-bottom: 0.5px solid #D3D4D3;

`

const CheckedLabel = styled.div`
  display: inline-block;
  font: normal normal bold 12px/18px Noto Sans CJK KR;
  cursor: pointer;
  width: 72px;
  padding: 6px 0;
  text-align: center;
  border-radius: 20px;
  border: "2px solid #F4F4F4";
`;

const InputContainer = styled.div`
  width: 242px;
  margin: auto;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const InputLabel = styled.div`
  font: normal normal bold 14px/20px Noto Sans CJK KR;
  margin-bottom: 9px;
`;

const Textarea = styled.textarea`
  width: 100%;
  display: block;
  outline: none;
  border: none;
  background: #f2f2f2 0% 0% no-repeat padding-box;
  border-radius: 10px;
  opacity: 0.8;
  padding: 10px 22px;
  font-size: 14px;
  border: none;
  resize: none;
  box-sizing: border-box;
  margin-top: 5px;
`;

const CountQuestion = styled.div`
  position: absolute;
  bottom: 10px;
  right: 12px;
  opacity: 0.6;
`;

const SubmitBtn = styled.div`
  cursor: pointer;
  font: normal normal normal 14px/20px Noto Sans CJK KR;
`;

export default NewQuestion;
