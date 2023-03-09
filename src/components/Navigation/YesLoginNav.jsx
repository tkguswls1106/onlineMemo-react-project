import React from "react";
import styled from "styled-components";
import '../../App.css';
import NavWrapper from "../Styled/NavWrapper";
import DropdownLeft from "../UI/DropdownLeft";
import DropdownRight from "../UI/DropdownRight";

const Wrapper = styled(NavWrapper)`

    ul {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        
        align-items: baseline;
    }

    ul li {
        font-size:2rem;
        list-style: none;
        line-height:50px;
        color: #ffffff;
    }

    .fa-user-o {
        border: solid 2.3px #bcb8b1;
        border-radius: 6px;
        padding: 2.3px 4.8px;
        color: #ffffff;
        background-color: #463f3a;

        &:hover {
            cursor: pointer;
        }
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

    button {
        background-color: #463f3a;
        color: white;
        border-radius: 5px;
        font-family: "jua";
        font-size: 1.8rem;

        &:hover {
            cursor: pointer;
        }
    }
`;

function YesLoginNav(props) {

    const dropItemsUser = [
        {
            name: "회원정보",
            link: "#",
        },
        {
            name: "친구 목록",
            link: "#",
        },
        {
            name: "로그아웃",
            link: "#",
        },
    ]

    const dropItemsPlus = [
        {
            name: "+ 개인 메모",
            link: "#",
        },
        {
            name: "+ 공동 메모",
            link: "#",
        },
    ]

    return (
        <Wrapper>
            <ul>
                <DropdownLeft
                    dropMain={<i className="fa fa-user-o" aria-hidden="true"></i>}
                    dropItems={dropItemsUser}
                />
                <li><a href="#">공지사항</a></li>
                <li><a href="#">개발 정보</a></li>
                <DropdownRight
                    dropMain={<span><button>+ 새 메모&nbsp;<i className="fa fa-caret-down" aria-hidden="true"></i></button></span>}
                    dropItems={dropItemsPlus}
                />
            </ul>
        </Wrapper>
    );
}

export default YesLoginNav;