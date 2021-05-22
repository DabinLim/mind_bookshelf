import React from "react";
import _ from "lodash";
import Spinner from "../elements/Spinner";

const InfinityScroll2 = (props) => {
    // console.log(props)
;    const {callNext, is_next, loading} = props;

    const _handleScroll = _.throttle(() => {
        if(loading){
            return;
        }
        
        const {innerHeight} = window;
        const {scrollHeight} = document.body;

        const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;

        console.log(innerHeight, scrollHeight, scrollTop);
        
        if(scrollHeight - innerHeight - scrollTop < 200) {
            console.log(innerHeight, scrollHeight, scrollTop);
            callNext();
        }
    }, 300);

    const handleScroll = React.useCallback(_handleScroll, [loading]);

    React.useEffect(() => {
        
        if(loading){
            return;
        }

        if(is_next){
            window.addEventListener("scroll", handleScroll);
        }else{
            window.removeEventListener("scroll", handleScroll);
        }
        

        return () => window.removeEventListener("scroll", handleScroll);
    }, [is_next, loading]);

    return (
        <React.Fragment>
            {props.children}
            {is_next && (<Spinner/>)}
        </React.Fragment>
    )
}

InfinityScroll2.defaultProps = {
    children: null,
    callNext: () => {},
    is_next: false,
    loading: false,
}

export default InfinityScroll2;