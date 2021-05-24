import React from "react";
import styled from "styled-components";
import { NewQuestion } from "./booksindex";
import { useDispatch, useSelector } from "react-redux";
import {
  api as customActions,
  resetAll,
  setView
} from "../../redux/modules/custom";
import {setComponent} from '../../redux/modules/books';
import InfinityScroll from "../../shared/InfinityScroll";
import {history} from '../../redux/configStore';
import { LeftOutlined } from "@ant-design/icons";
import {CheckOutlined} from "@ant-design/icons";

const MyQuestion = (props) => {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = React.useState(false);
  const custom_question = useSelector((state) => state.custom.custom_question);
  const pop_list = useSelector(state => state.custom.pop_list);
  const custom_count = useSelector((state) => state.custom.custom_count);
  const user_info = useSelector((state) => state.user.user);
  const is_loading = useSelector((state) => state.custom.loading);
  const pop_loading = useSelector(state => state.custom.pop_loading);
  const is_next = useSelector((state) => state.custom.next);
  const pop_next = useSelector(state => state.custom.pop_next);
  const now_view = useSelector(state => state.custom.now_view);
  const container = React.useRef();
  const pop_container = React.useRef();
  const [openFilter, setOpenFilter] = React.useState(false);
  React.useEffect(() => {

    dispatch(customActions.getMyQuest());
    dispatch(customActions.getMyPopQuest());

    return () => {
      dispatch(resetAll());
    };
  }, []);

  return (
    <React.Fragment>
      <Container>
        <Background />
        <TitleContainerMobile>
          <LeftOutlined onClick={() => {history.goBack()}}style={{fontSize:'22px' , transform:'scaleX(0.8)'}}/>
          <TitleMobile>{user_info?.nickname}님의 질문</TitleMobile>
          <AddBtnMobile onClick={()=>{setModalVisible(true)}}><span style={{fontSize:'30px'}}>+</span></AddBtnMobile>
        </TitleContainerMobile>
        <FilterBtnBoxMobile>
          <QuestionCount>{custom_count}개</QuestionCount>
                <FilterToggle>
              {now_view === 'new' && <span>최신순</span>}
              {now_view === 'pop' && <span>답변순</span>}
              {openFilter ? 
              <>
              <Close onClick={() => {setOpenFilter(false)}}/>
              <LeftOutlined
                  onClick={()=>{setOpenFilter(false)}}
                  style={{
                    cursor: "pointer",
                    color: "black",
                    fontSize: "12px",
                    transform:'rotateZ(90deg)',
                    marginLeft:'5px'
                  }}
                />
                </>
                 :
                  <LeftOutlined
                onClick={()=>{setOpenFilter(true)}}
                style={{
                  cursor: "pointer",
                  color: "black",
                  fontSize: "12px",
                  transform:'rotateZ(270deg)',
                  marginLeft:'5px'
                }}
              />}
                </FilterToggle>
                {openFilter && now_view === 'new' && <FilterWhiteBox>
                    <div style={{marginLeft:'8px'}}
                      onClick={() => {
                        dispatch(setView("new"));
                      }}
                    >최신순 <span style={{width:'0',overflow:'visible'}}><CheckOutlined /></span></div>
                    <div
                      onClick={() => {
                        dispatch(setView("pop"));
                      }}
                    >
                      답변순
                    </div>
                  </FilterWhiteBox>}
                {openFilter && now_view === 'pop' && <FilterWhiteBox>
                    <div
                      onClick={() => {
                        dispatch(setView("new"));
                      }}
                    >최신순 </div>
                    <div
                    style={{marginLeft:'8px'}}
                      onClick={() => {
                        dispatch(setView("pop"));
                      }}
                    >
                      답변순<span style={{width:'0',overflow:'visible'}}><CheckOutlined /></span>
                    </div>
                  </FilterWhiteBox>}
                </FilterBtnBoxMobile>
                <GotoBookShelf><LeftOutlined style={{fontSize:'14px',margin:'0px 4px 1px 0px'}}/>책장으로</GotoBookShelf>
        <TitleContainer>
          <Title>
            <span style={{ fontWeight: "600" }}>{user_info?.nickname}</span>님의
            질문카드는{" "}
            <span style={{ fontWeight: "600" }}>{custom_count}개</span>입니다.
          </Title>
          <div style={{display:'flex',flexDirection:'column',justifyContent:'flex-end'}}>
          <FilterBtnBox>
          {now_view === "new" ? (
                  <FilterBtn
                    style={{ fontWeight: "bold" }}
                    onClick={() => {
                      dispatch(setView("new"));
                    }}
                  >
                    •<span style={{ marginLeft: "5px" }}>최신순</span>
                  </FilterBtn>
                ) : (
                  <FilterBtn
                    onClick={() => {
                      dispatch(setView("new"));
                    }}
                  >
                    최신순
                  </FilterBtn>
                )}
                {now_view === "pop" ? (
                  <FilterBtn
                    style={{ fontWeight: "bold" }}
                    onClick={() => {
                      dispatch(setView("pop"));
                    }}
                  >
                    •<span style={{ marginLeft: "5px" }}>답변순</span>
                  </FilterBtn>
                ) : (
                  <FilterBtn
                    onClick={() => {
                      dispatch(setView("pop"));
                    }}
                  >
                    답변순
                  </FilterBtn>
                )}
                </FilterBtnBox>
          </div>
        </TitleContainer>
        <CardContainer view={now_view} ref={container}>
          {now_view ==='new' && <InfinityScroll
            callNext={() => {
              
              console.log("scroooolled!");
              dispatch(customActions.getMyQuest());
            }}
            is_next={is_next ? true : false}
            is_loading={is_loading}
            ref_value={container.current}
          >
            {custom_question &&
              custom_question.map((v, idx) => {
                return (
                  <Card key={idx} {...v}>
                    <QuestionContents onClick={() => {history.push(`/community/${v.questionId}`)}}>{v.questionContents}</QuestionContents>
                    <CreatedAtBox>
                      <AnswerCountMobile>{v.answerCount}명 낙서중</AnswerCountMobile>
                      <CreatedAt >{v.questionCreatedAt}</CreatedAt>
                    </CreatedAtBox>
                  </Card>
                );
              })}
          </InfinityScroll>}
        </CardContainer>
        <CardContainerPop view={now_view} ref={pop_container}>
          {now_view ==='pop' && <InfinityScroll
            callNext={() => {
              
              // console.log("scroooolled!");
              dispatch(customActions.getMyPopQuest());
            }}
            is_next={pop_next ? true : false}
            is_loading={pop_loading}
            ref_value={pop_container.current}
          >
            {pop_list &&
              pop_list.map((v, idx) => {
                return (
                  <Card key={idx} {...v}>
                    <QuestionContents onClick={() => {history.push(`/community/${v.questionId}`)}}>{v.questionContents}</QuestionContents>
                    <CreatedAtBox>
                    <AnswerCountMobile>{v.answerCount}명 낙서중</AnswerCountMobile>
                      <CreatedAt >{v.questionCreatedAt}</CreatedAt>
                    </CreatedAtBox>
                  </Card>
                );
              })}
          </InfinityScroll>}
        </CardContainerPop>
      </Container>
      {modalVisible ? <NewQuestion setModalVisible={setModalVisible} /> : null}
    </React.Fragment>
  );
};

const Container = styled.section`
  position: relative;
  box-sizing: border-box;
  padding: 10px 25px 45px 25px;
  width: 100%;
  height: 100%;
  max-width: 1062px;
  max-height: 632px;
  margin:50px auto;
  overflow: hidden;
  @media (max-width: 750px) {
    background-image: url('https://user-images.githubusercontent.com/77369674/118459848-1b0f3d80-b737-11eb-8f1a-906da3e390e2.jpeg');
    background-size:cover;
    background-repeat:no-repeat;
    margin: 50px auto ;
    padding: 23px 25px 20px 25px;
    max-height:93.8%;
    border-radius:0px;
  }
`;
const Background = styled.div`
  z-index: -1;
  position: absolute;
  top: 0;
  left: 0;
  max-width: 988px;
  width: 100%;
  padding: 100%;
  background-color: #ffffff;
  box-shadow: 0px 0px 20px;
  opacity: 0.3;
`;

const TitleContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 60px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 38px;
  margin-top:10px;
  padding:0px 12.5px;
  @media (max-width: 750px) {
    display:none;
  }
`;

const Title = styled.span`
  width: 230px;
  min-width: 230px;
  height: 60px;
  font-size: 22px;
  font-weight: 400;
  @media (max-width: 750px) {
    width: 180px;
    min-width: 180px;
    font-size: 18px;
  }
`;

const TitleContainerMobile = styled.div`
  width:100%;
  height:25px;
  display:flex;
  flex-direction:row;
  justify-content:space-between;
  align-items:center;
  margin-bottom:25px;
  @media(min-width:750px){
    display:none;
  }
`;

const TitleMobile = styled.span`
  width:auto;
  text-align:center;
  font: normal normal bold 15px/22px Noto Sans CJK KR;
`;

const AddBtnMobile = styled.div`
  width:24px;
  height:100%;
  display:flex;
  justify-content:center;
  align-items:center;
  cursor:pointer;
`;



const GotoBookShelf = styled.span`
  display:flex;
  justify-content: flex-start;
  align-items:center;
  margin-left:15px;
  font-size: 16px;
  color: #000000;
  cursor:pointer;
  @media (max-width: 750px) {
    display: none;
  }
`;


const CardContainer = styled.section`
  box-sizing: border-box;
  ${props => props.view === 'new' ? `width:100%`: `width:0`};
  ${props => props.view === 'new' ? `height:100%`: `height:0`};
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  overflow: auto;
  ${props => props.view === 'new' ? `padding-bottom:60px`: `padding-bottom:0px`};
  @media (max-width: 750px) {
    align-content:flex-start;
    padding-right:0px;
  }
`;

const CardContainerPop = styled.section`
  box-sizing: border-box;
  ${props => props.view === 'pop' ? `width:100%`: `width:0`};
  ${props => props.view === 'pop' ? `height:100%`: `height:0`};
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  overflow: auto;
  ${props => props.view === 'pop' ? `padding-bottom:60px`: `padding-bottom:0px`};
  @media (max-width: 750px) {
    align-content:flex-start;
    padding-right:0px;
  }
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  max-width: 312px;
  max-height: 130px;
  margin: 20px 12.5px 0px 12.5px;
  background: #ffffff;
  box-shadow: 0px 0px 20px #0000001a;
  box-sizing: border-box;
  padding: 15px 0px 12px 0px;
  @media (max-width: 750px) {
    padding: 12px 0px 10px 0px;
    box-shadow: 0px 0px 10px #0000001A;
    margin:0px 4px 10px 3px;
    max-width:155px;
    min-height:118px;
    max-height:118px;
    border-radius:0px;
    
  }
`;


const AnswerCountMobile = styled.span`
  font: normal normal normal 11px/16px Noto Sans CJK KR;
  letter-spacing: 0px;
  color: #8B8B8B;
  
`;

const QuestionContents = styled.span`
  cursor:pointer;
  font-size: 15px;
  font-weight: 600;
  width: 100%;
  height: 100%;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  padding:0px 15px;
  &:hover {
    font-weight:800;
    font-size:16px;
  }
  @media(max-width:750px){
    padding:0px 12px;
    height: 100px;
    margin-bottom:13px;
    margin-top:0px;
    font: normal normal bold 13px/19px Noto Sans CJK KR;
  }
`;

const CreatedAtBox = styled.div`
  display:flex;
  flex-direction:row;
  justify-content:space-between;
  box-sizing: border-box;
  border-top: 0.5px solid #E2E2E2;
  padding: 10px 15px 0px 15px;
  @media(max-width:750px){
    padding:0px 12px;
    padding-top:5px;
  }
`;

const CreatedAt = styled.span`
  font-size: 11px;
  font: normal normal normal 11px/16px Noto Sans CJK KR;
  letter-spacing: 0px;
  color: #8B8B8B;
  @media(max-width:750px){
    display:none;
  }
`;


const FilterBtnBoxMobile = styled.div`
  position:relative;
  width:100%;
  display:flex;
  flex-direction:row;
  justify-content:space-between;
  align-items:flex-end;
  font-size:12px;
  margin-right:20px;
  padding-right:20px;
  padding-bottom: 20px;
  box-sizing:border-box;
  @media(min-width:750px){
    display:none;
  }
`;

const Close = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  z-index: 3;`;

const FilterWhiteBox = styled.div`
position:absolute;
z-index: 5;
width: 120px;
min-height: 80px;
top:23px;
right:22px;
display: flex;
flex-direction: column;
font: normal normal medium 14px/20px Noto Sans CJK KR;
background: #FFFFFF 0% 0% no-repeat padding-box;
box-shadow: 0px 0px 20px #00000026;
margin: 0 -18px 0 0;
& > div {
  display: flex;
  justify-content: center;
  padding: 8px 12px;
  height: 40px;
  align-items: center;
  font: normal normal medium 14px/20px Noto Sans CJK KR;
letter-spacing: 0px;
color: #121212;
}

& > div > span {
  margin-left: 8px;
}

& > div:nth-child(2) {
  border-top: 1px solid #00000026;
}
`;

const QuestionCount = styled.span`
  font: normal normal medium 12px/18px Noto Sans CJK KR;
  font-weight:600;
  letter-spacing: 0px;
  color: #333333;
  margin-left:2px;
`;

const FilterToggle = styled.div`
 display:flex;
 flex-direction:row;
 align-items:center;
 font-weight:600;
 justify-content:flex-end;
 margin-right:-17px;
`;

const FilterBtnBox = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  width: 100%;
  
`;

const FilterBtn = styled.button`
  cursor: pointer;
  max-width:80px;
  max-height: 17px;
  text-align: left;
  font: normal normal normal 14px/19px Noto Sans CJK KR;
  border: none;
  outline: none;
  background: none;
  letter-spacing: -1px;
  margin-left: 5px;
  padding: 0px 0px 0px 10px;
  color: #333333;
  :hover {
    font-weight: bold;
  }
  
`;

export default MyQuestion;
