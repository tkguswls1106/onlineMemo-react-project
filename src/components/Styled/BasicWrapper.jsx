import React from "react";
import styled from "styled-components";
import '../../App.css';

const BasicWrapper = styled.div`

    background-color: #bcb8b1;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    padding: 12px;
    font-family: "jua";

    // header = 49.5 + 18 px = 67.5px
    // nav = 55.5px
    // footer = 64.5 + 18 px = 82.5px
    // article padding = 24px
    // => 229.5px
    // height: calc(100vh - 229.5px);

    // header = 94.5px
    // nav = 50px
    // footer = 64.5 + 18 px = 102.5px
    // article padding = 24px
    // => 271px
    // height: calc(100vh - 271px);

    @media(max-height: 648.1px) {
        height: 100%;
    }

    @media(min-height: 648.2px) {
        height: calc(100vh - 271px);
    }

    @media(min-height: 648.2px) and (max-width: 1364.9px) {
        height: calc(100vh - 271px + 43.5px);
    }

    overflow: auto;

    &::-webkit-scrollbar {
        width: 5px;
        background-color: #bcb8b1;
        border-radius: 4px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: #5e5c58;
        border-radius: 4px;
    }
`;

export default BasicWrapper;