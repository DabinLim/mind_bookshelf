import React, {useState} from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {api as booksActions} from '../../redux/modules/books';
import swal from "sweetalert";

const NewQuestion = (props) => {
  const dispatch = useDispatch();
  const [question, setQuestion] = useState("");
  const [_friendship, setFriendship]  = useState(false);
  const [_relationship, setRelationship] = useState(false);
  const [_love, setLove] = useState(false);
  const [_worth, setWorth] = useState(false);
  const [_myself, setMyself] = useState(false);
  const [_dream, setDream] = useState(false);

  const numberChecked = () => {
    const checkedType = [_friendship, _relationship, _love, _worth, _myself, _dream]
    if(Object.values(checkedType).filter(x => x==true).length == 2){
      console.log(2)
      return
    } 
    return true
  }

  const changeQuestion = (e) => {
    if(e.target.value.length === 50){
      return
    }
    setQuestion(e.target.value)
  }

  const checkedSwal = () => {
    swal({
      title: "더이상 주제를 추가할 수 없습니다.😅",
      text: `주제는 2개까지 선택 가능합니다.`,
      icon: "error",
  });
  }

  const checkedRelationship = () => {
    if(!_relationship){
      setRelationship(true)
      if(!numberChecked()){
        checkedSwal()
        setRelationship(false)
      }
    } else{
      setRelationship(false)
    }
  }

  const checkedFriendship = () => {
    if(!_friendship){
      setFriendship(true)
      if(!numberChecked()){
        checkedSwal()
        setFriendship(false)
      }
    } else{
      setFriendship(false)
    }
  }

  const checkedLove = () => {
    if(!_love){
      setLove(true)
      if(!numberChecked()){
        checkedSwal()
        setLove(false)
      }
    } else{
      setLove(false)
    }
  }

  const checkedDream = () => {
    if(!_dream){
      setDream(true)
      if(!numberChecked()){
        checkedSwal()
        setDream(false)
      }
    } else{
      setDream(false)
    }
  }

  const checkedWorth = () => {
    if(!_worth){
      setWorth(true)
      if(!numberChecked()){
        checkedSwal()
        setWorth(false)
      }
    } else{
      setWorth(false)
    }
  }

  const checkedMyself = () => {
    if(!_myself){
      setMyself(true)
      if(!numberChecked()){
        checkedSwal()
        setMyself(false)
      }
    } else{
      setMyself(false)
    }
  }

  const checkTopic = () => {
    let result = []
    if(_dream){
      result.push('꿈')
    }
    if(_friendship){
      result.push('우정')
    }
    if(_love){
      result.push('사랑')
    }
    if(_myself){
      result.push('나')
    }
    if(_relationship){
      result.push('관계')
    }
    if(_worth){
      result.push('가치')
    }
    return result
  }

  const addQuestion = () => {
    const topic = checkTopic()
    console.log(topic)
    if(!topic){
      swal({
        title: "주제를 골라주세요.😅",
        text: `주제를 1개이상 선택해주세요!`,
        icon: "error",
      });
      return
    }
    if(!question){
      swal({
        title: "질문을 작성해주세요.😅",
        text: `성의껏 작성해주시면 감사하겠습니다`,
        icon: "error",
      });
      return
    }
    console.log(topic, question)
    dispatch(booksActions.addQuest(topic, question))
    props.setModalVisible(false)
  }

  return (
    <React.Fragment>
      <ModalOverlay onClick={()=>{props.setModalVisible(false)}} />
          <ModalInner>
            <Container>
            <Header>나의 질문</Header>
            <div style={{width:'300', marginLeft: '50px' }}>
              <InputLabel>주제</InputLabel>
            </div>
            <TypeContainer>
              <div style={{marginBottom: '13px'}}>
              {_friendship?
                <CheckedLabel onClick={checkedFriendship}  style={{background:"#B9FFC4" , boxShadow: '0px 0px 15px #C5FDCE'}} >#우정</CheckedLabel>
                :
                <CheckedLabel onClick={checkedFriendship} style={{background:"#F4F4F4"}} >#우정</CheckedLabel>
              }
              {_love? 
                <CheckedLabel  onClick={checkedLove}  style={{background:"#FFAAAA" , boxShadow: '0px 0px 15px #FDB9B9'}} >#사랑</CheckedLabel>
                :
                <CheckedLabel onClick={checkedLove} style={{background:"#F4F4F4"}} >#사랑</CheckedLabel>
              }
              {_dream? 
                <CheckedLabel onClick={checkedDream} style={{background:"#B7E6FF" , boxShadow: '0px 0px 15px #C4EAFE'}} >#꿈</CheckedLabel>
                :
                <CheckedLabel onClick={checkedDream} style={{background:"#F4F4F4"}} >#꿈</CheckedLabel>
              }
              </div>
              <div>
              {_worth? 
                <CheckedLabel onClick={checkedWorth} style={{background:"#B5BDFF" , boxShadow: '0px 0px 15px #C1C7FC'}} >#가치</CheckedLabel>
                :
                <CheckedLabel onClick={checkedWorth} style={{background:"#F4F4F4"}} >#가치</CheckedLabel>
              }
              {_relationship? 
                <CheckedLabel onClick={checkedRelationship} style={{background:"#FFF09D", boxShadow: '0px 0px 15px #FEF2AF'}}>#관계</CheckedLabel>
                :
                <CheckedLabel onClick={checkedRelationship} style={{background:"#F4F4F4"}} >#관계</CheckedLabel>
                
              }
              {_myself? 
                <CheckedLabel onClick={checkedMyself} style={{background:"#F9D1FD", boxShadow: '0px 0px 15px #F9D9FC' }} >#나</CheckedLabel>
                :
                <CheckedLabel onClick={checkedMyself} style={{background:"#F4F4F4"}} >#나</CheckedLabel>
              }
              </div>
            </TypeContainer>
            <InputContainer>
              <InputLabel>질문</InputLabel>
              <div style={{position:"relative"}} >
                <Textarea rows="4" type='text' placeholder='질문을 입력해주세요.' onChange={changeQuestion} />
                <CountQuestion>{question.length}/50</CountQuestion>
              </div>
            </InputContainer>
            <SubmitBtn onClick={addQuestion}>등록</SubmitBtn>
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
  border-radius: 10px;
  width: 400px;
  height: auto;
  max-width: 480px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
`;

const Container = styled.div`
  box-sizing:border-box;
  display:flex;
  flex-direction:column;
`;

const Header = styled.div`
  margin: auto;
  margin-top: 30px;
  margin-bottom: 20px;
  font-weight: 600;
  font-size: 20px;
`

const TypeContainer = styled.div`
  width: 350px;
  margin: auto;
  padding: 10px 0 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom: 0.3px solid #E0E0E0;
`

const CheckedLabel = styled.div`
  display: inline-block;
  margin-right: 14px;
  margin-left: 14px;
  cursor: pointer;
  width: 72px;
  padding: 6px 0;
  text-align: center;
  border-radius: 20px;
`

const InputContainer = styled.div`
  width: 300px;
  margin: auto;
  margin-top: 20px;
  margin-bottom: 20px;

`

const InputLabel = styled.label`
  font-weight: 600;
  font-size: 17px;
`

const Textarea = styled.textarea`
  width: 100%;
  display: block;
  outline: none;
  border: none;
  background: #F2F2F2 0% 0% no-repeat padding-box;
  border-radius: 10px;
  opacity: 0.8;
  padding: 10px 22px;
  font-size: 14px;
  border: none;
  box-sizing: border-box;
  margin-top: 5px;
`

const CountQuestion = styled.div`
  position: absolute;
  bottom: 10px;
  right:12px;
  opacity: 0.6;
`

const SubmitBtn = styled.div`
  font-size: 15px;
  cursor: pointer;
  text-align: center;
  border: 1px solid #707070;
  border-radius: 45px;
  padding: 5px 0;
  width: 73px;
  margin: auto;
  &:hover{
    border:1px solid #303685;
    background: #303685;
    color: white;
    font-weight: 600;
  }
  margin-bottom: 30px;
`

export default NewQuestion;
