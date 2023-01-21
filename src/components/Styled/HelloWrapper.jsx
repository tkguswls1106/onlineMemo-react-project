import React from "react";
import styled from "styled-components";
import '../../App.css';

const HelloWrapper = styled.div`

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

    & > h2 {
        text-align: center;
        font-size: 2rem;
        color: #463f3a;

        @media(min-height: 648.2px) {
            margin-top: calc(50vh - 277.249px - 30px);
        }

        :not(:first-child) {
            border: solid;
            border-radius: 5px;
            padding: 20px;
            margin: 16.6px 13vw;

            @media(min-width: 1000px) {
                margin-left: calc(50% - 349px);
                margin-right: calc(50% - 349px);
            }
        }
    }

    .flex-container {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        margin-bottom: 5px;
    }

    hr {
        width: 19vw;
        background-color: #463f3a;
        height: 1.4px;
    }

    a {
        margin-top:4px;
        text-decoration: none;
        color: #463f3a;
        font-size: 14px;
        text-shadow: -1px 0px white, 0px 1px white, 1px 0px white, 0px -1px white;
        cursor:pointer;
    }

    button {
        background-color: #463f3a;
        color: white;
        border-radius: 5px;
        font-family: "jua";
    }
`;

export default HelloWrapper;