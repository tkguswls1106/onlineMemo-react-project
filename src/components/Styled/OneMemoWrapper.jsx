import React from "react";
import styled from "styled-components";
import '../../App.css';

const OneMemoWrapper = styled.div`

    background-color: #bcb8b1;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    padding: 12px 18.3px;

    min-height: calc(100vh - 271px + 43.5px);
    height: auto;

    font-size: 1.4rem;
    font-family: "LINESeedKR-Bd";
    word-spacing: 2.23px;
    line-height: 150%;

    .memoTitle {
        font-size: 1.55rem;
        text-align: center;
        text-decoration: none;
    }
    .memoContent {
        text-decoration: none;
    }

    hr {
        width: 53vw;
        background-color: black;
        height: 1.23px;
        border: 0px;
    }
`;

export default OneMemoWrapper;