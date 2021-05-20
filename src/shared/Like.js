import React from "react";
import styled from "styled-components";

const Like = (props) => {
    const {currentLike} = props;

    
        return (<>
            <LikeIcon src="https://user-images.githubusercontent.com/77369674/118684666-5f850100-b83d-11eb-884e-cb0ffbb34dca.png" 
                                    onClick={()=>{
                                      if (!is_login) {
                                        swal({
                                          title: "좋아요 누르기 실패",
                                          text: "로그인 후 이용 가능한 서비스입니다.",
                                          icon: "error",
                                        });
                                        return;
                                      }
                                      dispatch(
                                        communityActions.deleteLikeQnA(
                                          a.answerId,
                                          props.id,
                                        )
                                      );
                                    }}
                                  />{" "}
                                </>)s
    return (<>
    <LikeIcon src="https://user-images.githubusercontent.com/77369674/118684666-5f850100-b83d-11eb-884e-cb0ffbb34dca.png" 
                            onClick={()=>{
                              if (!is_login) {
                                swal({
                                  title: "좋아요 누르기 실패",
                                  text: "로그인 후 이용 가능한 서비스입니다.",
                                  icon: "error",
                                });
                                return;
                              }
                              dispatch(
                                communityActions.deleteLikeQnA(
                                  a.answerId,
                                  props.id,
                                )
                              );
                            }}
                          />{" "}
                        </>
                      ) : (
                        <>
                          <LikeIcon src="https://user-images.githubusercontent.com/77369674/118684661-5eec6a80-b83d-11eb-8eba-7ad33f5a05e2.png" 
                            onClick={() => {
                            if (!is_login) {
                              swal({
                                title: "좋아요 누르기 실패",
                                text: "로그인 후 이용 가능한 서비스입니다.",
                                icon: "error",
                              });
                              return;
                            }
                            dispatch(
                              communityActions.addLikeQnA(
                                a.answerId,
                                props.id,
                              )
                            );
                          }} />
    </>)
}

export default Like;