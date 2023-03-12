import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import '../../App.css';
import NavWrapper from "../Styled/NavWrapper";

const Wrapper = styled(NavWrapper)`

    position: sticky;
    top: 0px;

    ul {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        
        align-items: baseline;
    }

    ul li {
        list-style:none;
        line-height:50px;
        padding: 0px 7px;
        font-size: 2rem;
    }  

    .fa-arrow-left {
        font-size: 2.1rem;  
        font-weight: bolder;
        color: #f4f3ee;
        text-shadow: -1.6px 0 #463f3a, 0 1.6px #463f3a, 1.6px 0 #463f3a, 0 -1.6px #463f3a;
        padding: 2.3px 4.8px;

        &:hover {
            cursor: pointer;
        }
    }

    button {
        border-radius: 6.5px;
        font-family: "jua";
        font-size: 1.75rem;

        width: 51.5px;
        height: 27px;

        padding-bottom: 0px;

        &:hover {
            cursor: pointer;
        }
    }

    .editButton {
        background-color: #463f3a;
        color: white;
    }

    .deleteButton {
        background-color: #dfafa1;
        color: #463f3a;
    }

    .saveButton {
        background-color: #a1c4df;
        color: #463f3a;
    }

    .flex-left {
        display: inline-flex;
        align-items: center;
    }

    .flex-copy {
        display: inline-flex;
        flex-direction: column;
        // align-items: center;
        justify-content: center;
        line-height: 13.7px;
        width: 30px;
        margin-top: 1.5px;

        color: #463f3a;        
        border: solid 1.8px #463f3a;
        border-radius: 6px;
        background-color: #f4f3ee;
        padding: 2.3px 4.8px;

        &:hover {
            cursor: pointer;
        }
    }

    .fa-clone {
        font-size: 1.45rem;   
        font-weight: bold;
    }

    .copyText {
        font-size: 1.15rem;
        font-weight: bold; 
        height: 11px;
    }
`;

function OneMemoNav(props) {
    const navigate = useNavigate();

    const readNavItems = [  // 메모 보기 용도
        <span className="flex-left">
            &nbsp;<i className="fa fa-arrow-left" aria-hidden="true" onClick={() => { navigate('/') }}></i>&nbsp;&nbsp;
            <span className="flex-copy">
                <i className="fa fa-clone" aria-hidden="true"></i>
                <span className="copyText">복사</span>
            </span>
        </span>,
        <span><button className="editButton">수정</button>&nbsp;&nbsp;<button className="deleteButton">삭제</button>&nbsp;</span>
    ];
    const newNavItems = [  // 메모 작성 용도
        <span className="flex-left">&nbsp;<i className="fa fa-arrow-left" aria-hidden="true" onClick={() => { navigate('/') }}></i></span>,
        <span><button className="saveButton">저장</button>&nbsp;</span>
    ];
    const editNavItems = [  // 메모 수정 용도
        <span className="flex-left">&nbsp;<i className="fa fa-arrow-left" aria-hidden="true" onClick={() => { navigate('/') }}></i></span>,
        <span><button className="saveButton">저장</button>&nbsp;</span>
    ];

    return (
        <Wrapper>
            <ul>
                {readNavItems.map((navItem, index) => {
                    return (
                        <li key={index}>{navItem}</li>
                    );
                }
                )}
            </ul>
        </Wrapper>
    );
}

export default OneMemoNav;