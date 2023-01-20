import React from "react";
import styled from "styled-components";
import '../../App.css';
import NavWrapper from "../Styled/NavWrapper";

const Wrapper = styled(NavWrapper)`
    @media(min-width: 320px) {
        ul li {
            list-style:none;
            float:left;
            padding:0px 9vw;
            line-height:50px;
        }  
    }
    @media(min-width: 425px) {
        ul li {
            list-style:none;
            float:left;
            padding:0px 13vw;
            line-height:50px;
        }  
    }
    @media(min-width: 768px) {
        ul li {
            list-style:none;
            float:left;
            padding:0px 18vw;
            line-height:50px;
        }  
    }

    a {
        text-decoration:none;
        font-size:2rem;
        color: #ffffff;
        border-left: #bcb8b1 solid;
        border-right: #bcb8b1 solid;
        padding: 1px 7px;
    }
`;

function NoLoginNav(props) {
    // const { comment } = props;
    const navtexts = ["공지사항", "개발 정보"];

    return (
        <Wrapper>
            <ul>
                {navtexts.map((navtext) =>
                {
                    return (
                        <li><a href="#">{navtext}</a></li>
                    );
                }
                )}
            </ul>
        </Wrapper>
    );
}

export default NoLoginNav;