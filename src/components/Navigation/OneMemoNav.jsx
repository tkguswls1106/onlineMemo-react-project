import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import '../../App.css';
import NavWrapper from "../Styled/NavWrapper";
import axios from 'axios'

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
            color: #f4f3eea4;
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

        &:hover {
            background-color: #463f3aa4;
        }
    }

    .deletePrivateButton {
        background-color: #dfafa1;
        color: #463f3a;

        &:hover {
            background-color: #dfb1a1a4;
        }
    }

    .deleteGroupButton {
        background-color: #dfafa1;
        color: #463f3a;

        width: 80px;

        &:hover {
            background-color: #dfb1a1a4;
        }
    }

    .saveButton {
        background-color: #a1c4df;
        color: #463f3a;

        &:hover {
            background-color: #a1c4dfa4;
        }
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
            background-color: #f4f3eea4;
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

    const handleClickCopy = (event) => {   
        window.navigator.clipboard.writeText(props.content);
        // alert("메모 내용을 전체 복사하였습니다.");
    }

    const handleEditClick = (event) => {
        props.propPurposeFunction("edit");  // 하위 컴포넌트 함수
    }

    const handleUpdateSaveClick = async (titleValue, contentValue, e) => {  // 화살표함수로 선언하여 이벤트 사용시 바인딩되도록 함.
        // e.preventDefault();  // 리프레쉬 방지 (spa로서)

        await axios
            .put(`/memos/${props.memoId}`, {
                title: titleValue,
                content: contentValue
            })
            .then((response) => {
                console.log(response);
                
                props.propPurposeFunction("read");  // 하위 컴포넌트 함수
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const handleDeleteClick = async (e) => {  // 화살표함수로 선언하여 이벤트 사용시 바인딩되도록 함.
        // e.preventDefault();  // 리프레쉬 방지 (spa로서)

        await axios
            .delete(`/users/${props.userId}/memos/${props.memoId}`)
            .then((response) => {
                console.log(response);

                navigate(`/users/${props.userId}/memos`);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const readPrivateNavItems = [  // 개인메모 보기 용도
        <span className="flex-left">
            &nbsp;<i className="fa fa-arrow-left" aria-hidden="true" onClick={() => { navigate('/') }}></i>&nbsp;&nbsp;
            <span className="flex-copy" onClick={handleClickCopy}>
                <i className="fa fa-clone" aria-hidden="true"></i>
                <span className="copyText">복사</span>
            </span>
        </span>,
        <span><button className="editButton" onClick={handleEditClick}>수정</button>&nbsp;&nbsp;<button className="deletePrivateButton" onClick={(event) => handleDeleteClick(event)}>삭제</button>&nbsp;</span>
    ];
    const readGroupNavItems = [  // 공동메모 보기 용도
        <span className="flex-left">
            &nbsp;<i className="fa fa-arrow-left" aria-hidden="true" onClick={() => { navigate('/') }}></i>&nbsp;&nbsp;
            <span className="flex-copy" onClick={handleClickCopy}>
                <i className="fa fa-clone" aria-hidden="true"></i>
                <span className="copyText">복사</span>
            </span>
        </span>,
        <span><button className="editButton" onClick={handleEditClick}>수정</button>&nbsp;&nbsp;<button className="deleteGroupButton" onClick={(event) => handleDeleteClick(event)}>그룹 탈퇴</button>&nbsp;</span>
    ];
    const newNavItems = [  // 메모 작성 용도
        <span className="flex-left">&nbsp;<i className="fa fa-arrow-left" aria-hidden="true" onClick={() => { navigate('/') }}></i></span>,
        <span><button className="saveButton">저장</button>&nbsp;</span>
    ];
    const editNavItems = [  // 메모 수정 용도
        <span className="flex-left">&nbsp;<i className="fa fa-arrow-left" aria-hidden="true" onClick={() => { navigate('/') }}></i></span>,
        <span><button className="saveButton" onClick={(event) => handleUpdateSaveClick(props.title, props.content, event)}>저장</button>&nbsp;</span>
    ];

    let navItems;
    if (props.purpose == "readPrivate") {
        navItems = readPrivateNavItems;
    }
    else if (props.purpose == "readGroup") {
        navItems = readGroupNavItems;
    }
    else if (props.purpose == "new") {
        navItems = newNavItems;
    }
    else if (props.purpose == "edit") {
        navItems = editNavItems;
    }

    return (
        <Wrapper>
            <ul>
                {navItems.map((navItem, index) => {
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