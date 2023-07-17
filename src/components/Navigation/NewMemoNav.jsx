import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import '../../App.css';
import NavWrapper from "../Styled/NavWrapper";
import axios from 'axios'
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

        padding: 1px 6px 1px 6px;
        border-top: 2px solid #767676;
        border-left: 2px solid #767676;
        border-bottom: 2px solid #212121;
        border-right: 2px solid #212121;

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

function NewMemoNav(props) {
    const navigate = useNavigate();

    const handleInviteGroupMemo = async (memoId, e) => {  // 화살표함수로 선언하여 이벤트 사용시 바인딩되도록 함.
        // e.preventDefault();  // 리프레쉬 방지 (spa로서)

        await axios
            .post(`${process.env.REACT_APP_DB_HOST}/memos/${memoId}`, {
                userRequestDtos: props.friendList
            })
            .then((response) => {
                //console.log(response);

                navigate(`/users/${props.userId}/memos`);
            })
            .catch((error) => {
                //console.log(error);
            })
    }

    const handleNewSaveClick = async (titleValue, contentValue, e) => {  // 화살표함수로 선언하여 이벤트 사용시 바인딩되도록 함.
        // e.preventDefault();  // 리프레쉬 방지 (spa로서)

        if (titleValue.length < 1) {
            var element = document.querySelector(".memoTitleInput");
            element.style.border = "3.3px solid #dd2b2b";
            element.style.borderRadius = "5px";
        }
        else {
            await axios
                .post(`${process.env.REACT_APP_DB_HOST}/users/${props.userId}/memos`, {
                    title: titleValue,
                    content: contentValue
                })
                .then((response) => {
                    //console.log(response);

                    var memoId = response.data.data.memoId

                    if (props.isGroup == 1) {  // 새 공동메모 생성시라면
                        handleInviteGroupMemo(memoId, e);
                    }
                    else {  // 새 개인메모 생성시라면
                        navigate(`/memos/${memoId}`, { state: { userId: props.userId } });
                    }
                })
                .catch((error) => {
                    //console.log(error);
                })
        }
    }

    useEffect(() => {
        CheckToken();
    }, []);

    const newNavItems = [  // 메모 작성 용도
        <span className="flex-left">&nbsp;<i className="fa fa-arrow-left" aria-hidden="true" onClick={() => { navigate(-1) }}></i></span>,
        <span><button className="saveButton" onClick={(event) => handleNewSaveClick(props.title, props.content, event)}>저장</button>&nbsp;</span>
    ];

    let navItems = newNavItems;

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

export default NewMemoNav;