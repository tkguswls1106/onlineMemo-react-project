import React from "react";
import styled from "styled-components";
import '../../App.css';

const BasicWrapper = styled.div`

    background-color: #bcb8b1;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    padding: 12px;
    font-family: "jua";

    border-bottom: solid #463f3a 1px;
    border-left: solid #463f3a 1px;
    border-right: solid #463f3a 1px;

    @media(min-width: 1365px) {
        border: none;
    }

    // header = 49.5 + 18 px = 67.5px
    // nav = 55.5 + 1 px = 56.5px
    // footer = 64.5 + 18 px = 82.5px
    // article padding & border = 25px
    // => 231.5px
    // height: calc(100vh - 231.5px);

    // header = 94.5px
    // nav = 50px
    // footer = 64.5 + 18 px = 102.5px
    // article padding & border = 24px
    // => 271px
    // height: calc(100vh - 271.5px);

    @media(max-height: 648.1px) {
        height: 100%;
    }

    @media(min-height: 648.2px) {
        height: calc(100vh - 271px);
    }

    @media(min-height: 648.2px) and (max-width: 1364.9px) {
        height: calc(100vh - 271px + 43.5px);
    }
`;

export default BasicWrapper;