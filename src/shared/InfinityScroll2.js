import React from "react";
import _ from "lodash";
import Spinner from "../elements/Spinner";

const InfinityScroll2 = (props) => {

    const {callNext, is_next, loading, height} = props;

    const _handleScroll = _.throttle(() => {
        console.log('하이')
        if(loading){
            return;
        }
        console.log('하이')
        const {innerHeight} = props.ref_value;
        const {scrollHeight} = props.ref_value;

        const {scrollTop} = props.ref_value;
        
        if(scrollHeight - innerHeight - scrollTop < height) {
            callNext();
        }
    }, 300);

    const handleScroll = React.useCallback(_handleScroll, [loading]);

    React.useEffect(() => {
      console.log(props.ref_value)
        if(loading){
            return;
        }
        if(!props.ref_value){
          return
        }
        if(is_next){
            console.log('예스')
            props.ref_value.addEventListener("scroll", handleScroll);
        }else{
          props.ref_value.removeEventListener("scroll", handleScroll);
        }
        

        return () => props.ref_value.removeEventListener("scroll", handleScroll);
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
    height: 200,
}

export default InfinityScroll2;