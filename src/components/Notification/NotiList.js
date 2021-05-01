import React from "react";
import styled from "styled-components"

import Noti from "./Noti";

const NotiList = (props) => {
    return (<>
        <NotiListFrame>
            <Noti />
            <Noti />
            <Noti />
        </NotiListFrame></>)
}

const NotiListFrame = styled.div``;

export default NotiList;