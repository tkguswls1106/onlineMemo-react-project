import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import '../../App.css';
import NavWrapper from "../Styled/NavWrapper";
import axios from 'axios'
import ConfirmModal from "../Modal/ConfirmModal";
import { CheckToken } from "../../utils/CheckToken";

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

    .fa-check {
        font-size: 1.45rem;   
        font-weight: bold;
        color: #3fb950;
    }

    .copyText {
        font-size: 1.15rem;
        font-weight: bold; 
        height: 11px;
    }
`;

function ReadAndEditMemoNav(props) {
    const navigate = useNavigate();

    const [copyClassName, setCopyClassName] = useState('fa fa-clone');

    const [modalOn, setModalOn] = useState(false);
    const [modalText, setModalText] = useState();

    const handleFirstModalClick = (textValue, event) => {
        setModalOn((modalOn) => !modalOn);
        setModalText(textValue);
    }

    const handleClickCopy = (event) => {   
        window.navigator.clipboard.writeText(props.content);

        setCopyClassName('fa fa-check');
        setTimeout(() => {
            setCopyClassName('fa fa-clone');
        }, 2000); // 2초 딜레이 후에 다시 아이콘 변경.
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

    useEffect(() => {
        CheckToken();
    }, []);

    const readPrivateNavItems = [  // 개인메모 보기 용도
        <span className="flex-left">
            &nbsp;<i className="fa fa-arrow-left" aria-hidden="true" onClick={() => { navigate(`/users/${props.userId}/memos`) }}></i>&nbsp;&nbsp;
            <span className="flex-copy" onClick={handleClickCopy}>
                <i className={copyClassName} aria-hidden="true"></i>
                <span className="copyText">복사</span>
            </span>
        </span>,
        <span><button className="editButton" onClick={handleEditClick}>수정</button>&nbsp;&nbsp;<button className="deletePrivateButton" onClick={(event) => handleFirstModalClick("삭제", event)}>삭제</button>&nbsp;</span>
    ];
    const readGroupNavItems = [  // 공동메모 보기 용도
        <span className="flex-left">
            &nbsp;<i className="fa fa-arrow-left" aria-hidden="true" onClick={() => { navigate(-1) }}></i>&nbsp;&nbsp;
            <span className="flex-copy" onClick={handleClickCopy}>
                <i className={copyClassName} aria-hidden="true"></i>
                <span className="copyText">복사</span>
            </span>
        </span>,
        <span><button className="editButton" onClick={handleEditClick}>수정</button>&nbsp;&nbsp;<button className="deleteGroupButton" onClick={(event) => handleFirstModalClick("그룹을 탈퇴", event)}>그룹 탈퇴</button>&nbsp;</span>
    ];
    const editNavItems = [  // 메모 수정 용도
        <span className="flex-left">&nbsp;<i className="fa fa-arrow-left" aria-hidden="true" onClick={() => {props.propPurposeFunction("read")}}></i></span>,
        <span><button className="saveButton" onClick={(event) => handleUpdateSaveClick(props.title, props.content, event)}>저장</button>&nbsp;</span>
    ];

    let navItems;
    if (props.purpose == "readPrivate") {
        navItems = readPrivateNavItems;
    }
    else if (props.purpose == "readGroup") {
        navItems = readGroupNavItems;
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
            {modalOn && (
                <ConfirmModal closeModal={() => setModalOn(!modalOn)}>
                    <i className="fa fa-exclamation-circle" aria-hidden="true"></i>
                    <h2 className="modalTitle">정말&nbsp;{modalText}하시겠습니까?</h2>
                    <br></br>
                    <div style={{ float: "right" }}>
                        <button className="confirmDeleteButton" onClick={handleDeleteClick}>확인</button>&nbsp;&nbsp;
                        <button className="cancelButton" onClick={() => setModalOn(!modalOn)}>취소</button>
                    </div>
                </ConfirmModal>
            )}
        </Wrapper>
    );
}

export default ReadAndEditMemoNav;