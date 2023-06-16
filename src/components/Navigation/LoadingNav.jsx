import React from "react";
import styled from "styled-components";
import '../../App.css';
import NavWrapper from "../Styled/NavWrapper";

const Wrapper = styled(NavWrapper)`

    ul {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        
        align-items: baseline;
    }

    ul li {
        list-style:none;
        line-height:50px;
    }  

    a {
        text-decoration:none;
        font-size:2rem;
        color: #ffffff;
        padding: 1px 7px;
    }
`;

function LoadingNav(props) {
    
    return (
        <Wrapper>
            <ul>
                <li><a>loading...</a></li>
            </ul>
        </Wrapper>
    );
}

export default LoadingNav;