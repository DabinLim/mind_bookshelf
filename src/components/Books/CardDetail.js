import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { api as communityActions } from "../../redux/modules/community";
import { api as commentActions } from "../../redux/modules/comment";
import { api as booksActions, changeDate } from "../../redux/modules/books";
import { ArrowLeft, ArrowRight } from "@material-ui/icons";

const CardDetail = (props) => {
  const dispatch = useDispatch();
  const answerInfo = useSelector((state) => state.community.card_detail);
  const answerQuantity = useSelector((state) => state.books.book_detail);
  const thisMonthBooks = useSelector((state) => state.books.books);
  const nowdate = useSelector((state) => state.books.date);

  const nextCard = () => {
    const nowindex = answerQuantity.findIndex((v) => {
      if (v.answerId === answerInfo.answerId) {
        return v;
      }
    });

    if (nowindex === answerQuantity.length - 1) {
      const nowBook = thisMonthBooks.findIndex((v) => {
        if (v._id === nowdate.format("YYMMDD")) {
          return v;
        }
      });
      if (nowBook === thisMonthBooks.length - 1) {
        window.alert("이번달에는 작성하신 카드가 더 이상 없습니다.");
        return;
      }
      dispatch(changeDate(`20${thisMonthBooks[nowBook + 1]._id}`));
      dispatch(booksActions.getNextDetail(thisMonthBooks[nowBook + 1]._id));
      return;
    }
    dispatch(
      communityActions.getCardDetail(answerQuantity[nowindex + 1].answerId)
    );
    dispatch(
      commentActions.getCommentAX(answerQuantity[nowindex + 1].answerId)
    );
  };

  const previousCard = () => {
    const nowindex = answerQuantity.findIndex((v) => {
      if (v.answerId === answerInfo.answerId) {
        return v;
      }
    });
    if (nowindex === 0) {
      const nowBook = thisMonthBooks.findIndex((v) => {
        if (v._id === nowdate.format("YYMMDD")) {
          return v;
        }
      });
      if (nowBook === 0) {
        window.alert("이번달에는 작성하신 카드가 더 이상 없습니다.");
        return;
      }
      dispatch(changeDate(`20${thisMonthBooks[nowBook - 1]._id}`));
      dispatch(booksActions.getPreviousDetail(thisMonthBooks[nowBook - 1]._id));
      return;
    }
    dispatch(
      communityActions.getCardDetail(answerQuantity[nowindex - 1].answerId)
    );
    dispatch(
      commentActions.getCommentAX(answerQuantity[nowindex - 1].answerId)
    );
  };

  return (
    <React.Fragment>
      <Background onClick={props.close} />
      <SearchContainer>
        <Container>
          <ArrowLeftBox>
            <ArrowLeft
              disabled={true}
              fontSize="large"
              cursor="pointer"
              onClick={previousCard}
            />
          </ArrowLeftBox>
          {answerInfo.answerContents}
          {answerInfo.answerId}
          {answerInfo.nickname}
          {answerInfo.like}
          {answerInfo.isOpen}
          {answerInfo.likeCount}
          {answerInfo.questionContents}
          {answerInfo.questionCreatedUserId}
          {answerInfo.questionCreatedUserNickname}
          {answerInfo.profileImg}
          {answerInfo.questionTopic}
          <ArrowRightBox>
            <ArrowRight fontSize="large" cursor="pointer" onClick={nextCard} />
          </ArrowRightBox>
        </Container>
      </SearchContainer>
    </React.Fragment>
  );
};

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  opacity: 0;
  height: 100vh;
  width: 100vw;
  z-index: 20;
`;

const SearchContainer = styled.div`
  position: fixed;
  border-radius: 50px;
  top: 50%;
  left: 50%;
  width: 840px;
  height: 500px;
  background: #ffffff;
  align-items: center;
  transform: translate(-50%, -50%);
  box-shadow: 0px 0px 15px #0000001a;
  z-index: 30;
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 40px;
`;

const ArrowLeftBox = styled.div`
  position: absolute;
  top: 50%;
  left: -10%;
`;

const ArrowRightBox = styled.div`
  position: absolute;
  top: 50%;
  right: -10%;
`;

export default CardDetail;
