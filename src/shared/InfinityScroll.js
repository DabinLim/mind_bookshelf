import React from 'react';
import _ from 'lodash';
import Spinner from '../elements/Spinner';

const InfinityScroll = (props) => {
    const {callNext, is_next, is_loading} = props;

    // 이벤트 발생 300ms 후에 callNext 함수 호출하기
    const _handleScroll = _.throttle(() => {
        if(is_loading){
            console.log('1')
            return;
        }
        if(!props.ref_value){
            console.log('2')
            return
        }
        if(props.modal){
            console.log('하이')
            const {clientHeight} = props.ref_value.current;
            const {scrollHeight} = props.ref_value.current;
    
            // 브라우저마다 document에 접근해서 scrollTop을 가지고 오는 방법이 다름
            const {scrollTop} = props.ref_value.current;
            // (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
    
            if(scrollHeight - clientHeight - scrollTop < props.height) {
                console.log('whyrano')
                callNext();
            }
            return
        }
        console.log('하이')
        const {clientHeight} = props.ref_value;
        const {scrollHeight} = props.ref_value;
  
        // 브라우저마다 document에 접근해서 scrollTop을 가지고 오는 방법이 다름
        const {scrollTop} = props.ref_value;
        // (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
   
        if(scrollHeight - clientHeight - scrollTop < 100) {
            console.log('whyrano')
            callNext();
        }
    },300)
    // 리렌더링이 되더라도 _handleScroll 함수를 초기화 하지 않도록
    const handleScroll = React.useCallback(_handleScroll, [is_loading]);

    React.useEffect(() => {
        // 다음 데이터가 없으면 이벤트 구독해제
        console.log(props.ref_value);
        if(is_loading){
            
            return;
        };
        if(!props.ref_value){
            
            return
        }
        if(is_next){
            
            console.log(props.ref_value)
            if(props.modal){
                props.ref_value.current.addEventListener('scroll', handleScroll);
            }else{
                props.ref_value.addEventListener('scroll', handleScroll);
            }
        }else{
            if(props.modal){
                console.log('end', is_next)
                props.ref_value.current.removeEventListener('scroll', handleScroll)
            }else{
                props.ref_value.removeEventListener('scroll', handleScroll);
            }
        }
        

        // 이벤트 구독 해제, Clean up
        // if(props.modal && props.ref_value.current !== null){
        //    console.log(props.ref_value.current)
        //     return () => props.ref_value.current.removeEventListener('scroll', handleScroll);
        // } else{
            if(!props.modal){

                return () => props.ref_value.removeEventListener('scroll', handleScroll);
            }
        // }

    },[is_next, is_loading]);

    return (
        <React.Fragment>
            {props.children}
            {is_next && (<Spinner/>)}
        </React.Fragment>
    )
}


InfinityScroll.defaultProps = {
    children:null,
    callNext: () => {

    },
    is_next: false,
    is_loading: false,
}
export default InfinityScroll;