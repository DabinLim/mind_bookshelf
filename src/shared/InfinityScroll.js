import React from 'react';
import _ from 'lodash';
import {Spinner} from '../elements';

const InfinityScroll = (props) => {
    const {callNext, is_next, is_loading} = props;
    // 이벤트 발생 300ms 후에 callNext 함수 호출하기
    const _handleScroll = _.throttle(() => {

        if(is_loading){
            return;
        }

        const {innerHeight} = window;
        const {scrollHeight} = document.body;
        // 브라우저마다 document에 접근해서 scrollTop을 가지고 오는 방법이 다름
        const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;

        if(scrollHeight - innerHeight - scrollTop < 200) {
            callNext();
        }
    },300)
    // 리렌더링이 되더라도 _handleScroll 함수를 초기화 하지 않도록
    const handleScroll = React.useCallback(_handleScroll, [is_loading])

    React.useEffect(() => {
        // 다음 데이터가 없으면 이벤트 구독해제
        if(is_next){
            window.addEventListener('scroll', handleScroll);
        }else{
            window.removeEventListener('scroll', handleScroll)
        }

        // 이벤트 구독 해제, Clean up
        return () => window.removeEventListener('scroll', handleScroll);
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