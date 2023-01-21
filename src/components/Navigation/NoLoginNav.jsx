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
        border-left: #bcb8b1 solid 2px;
        border-right: #bcb8b1 solid 2px;
        padding: 1px 7px;

        &:hover {
            color: #463f3a;
            background-color: #bcb8b1;
            border-left: #463f3a solid 2px;
            border-right: #463f3a solid 2px;
        }
    }
`;

function NoLoginNav(props) {
    // const { comment } = props;
    const navtexts = ["공지사항", "개발 정보"];

    return (
        <Wrapper>
            <ul>
                {navtexts.map((navtext, index) =>
                {
                    return (
                        <li key={index}><a href="#">{navtext}</a></li>
                    );
                }
                )}
            </ul>
        </Wrapper>
    );
}

export default NoLoginNav;