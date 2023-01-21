import React from "react";
import styled from "styled-components";
import '../../App.css';

const NavWrapper = styled.nav`
    text-align:center;
    background-color: #8a817c;
    font-family: "jua";
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;

    border-top: solid #463f3a 1px;
    border-left: solid #463f3a 1px;
    border-right: solid #463f3a 1px;

    @media(min-width: 1365px) {
        border: none;
    }

    ul {
        list-style:none;
        display:inline-block;
        margin: 0px;
        padding: 0px;
    }
`;

export default NavWrapper;