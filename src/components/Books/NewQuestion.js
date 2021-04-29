import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {api as booksActions} from '../../redux/modules/books';

const NewQuestion = (props) => {
  const { className, visible, maskClosable,  onClose } = props;
  const dispatch = useDispatch();
  const topic = React.useRef('');
  const content = React.useRef('');
  const onMaskClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose(e);
    }
  };

  const close = (e) => {
    if (onClose) {
      onClose(e);
    }
  };

  const addQuestion = () => {
    if(topic.current.value === '' || content.current.value ===''){
      window.alert('주제 또는 내용을 입력하세요')
      return
    }
    dispatch(booksActions.addQuest(topic.current.value, content.current.value))
  }

  return (
    <React.Fragment>
      <ModalOverlay visible={visible}>
        <ModalContainer
          className={className}
          tabIndex="-1"
          visible={visible}
          onClick={maskClosable ? onMaskClick : null}
        >
          <ModalInner tabIndex="0">
            <Container>
            <input type='text' placeholder='topic'/>
            <textarea type='text' placeholder='content'/>
            <button onClick={addQuestion}>질문등록하기</button>
            </Container>
          </ModalInner>
        </ModalContainer>
      </ModalOverlay>
    </React.Fragment>
  );
};

const ModalOverlay = styled.div`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999;
`;

const ModalContainer = styled.div`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? "block" : "none")};
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  overflow: auto;
  outline: 0;
`;

const ModalInner = styled.div`
  box-sizing: border-box;
  position: relative;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  background-color: #fff;
  border-radius: 10px;
  width: 400px;
  height: auto;
  max-width: 480px;
  top: 50%;
  transform: translateY(-50%);
  margin: 0 auto;
  padding: 20px 20px;
`;

const Container = styled.div`
  box-sizing:border-box;
  padding:20px;
  display:flex;
  flex-direction:column;
`;

export default NewQuestion;
