import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import styled from "styled-components";
import axios from 'axios'
import OneMemoWrapper from "../../components/Styled/OneMemoWrapper";
import NewMemoNav from "../../components/Navigation/NewMemoNav";

function NewMemoPage(props) {
    const navigate = useNavigate();

    const { userId } = useParams();

    const location = useLocation();
    const { isGroup, friendList } = location.state;

    // const baseUrl = "http://localhost:8080";

    const [titleValue, setTitleValue] = useState("");
    const [contentValue, setContentValue] = useState("");

    const handleChangeTitle = (event) => {
        setTitleValue(event.target.value);
    }
    const handleChangeContent = (event) => {
        setContentValue(event.target.value);
    }

    const autoResizeTextarea = () => {
        let textarea = document.querySelector('.autoTextarea');

        if (textarea) {
            var scrollLeft = window.pageXOffset ||
                (document.documentElement || document.body.parentNode || document.body).scrollLeft;
            var scrollTop = window.pageYOffset ||
                (document.documentElement || document.body.parentNode || document.body).scrollTop;

            textarea.style.height = 'auto';
            let height = textarea.scrollHeight;  // 높이
            textarea.style.height = `${height + 8}px`;

            window.scrollTo(scrollLeft, scrollTop);
            // textarea.style.height = 'auto'; 로 인하여 발생하는
            // textarea Autosizing Scroll Jumping 현상을 방지하는 역할의 코드이다.
        }
    };

    const autoResizeAndTapkeyTextarea = (event) => {
        let textarea = document.querySelector('.autoTextarea');

        if (textarea) {
            var scrollLeft = window.pageXOffset ||
                (document.documentElement || document.body.parentNode || document.body).scrollLeft;
            var scrollTop = window.pageYOffset ||
                (document.documentElement || document.body.parentNode || document.body).scrollTop;

            textarea.style.height = 'auto';
            let height = textarea.scrollHeight;  // 높이
            textarea.style.height = `${height + 8}px`;

            window.scrollTo(scrollLeft, scrollTop);
            // textarea.style.height = 'auto'; 로 인하여 발생하는
            // textarea Autosizing Scroll Jumping 현상을 방지하는 역할의 코드이다.
        }

        if (event.keyCode === 9) {
            event.preventDefault();
            let val = event.target.value;
            let start = event.target.selectionStart;
            let end = event.target.selectionEnd;
            event.target.value = val.substring(0, start) + "\t" + val.substring(end);
            event.target.selectionStart = event.target.selectionEnd = start + 1;

            return false;  // focus 막음
        }
    };

    function startNewMemo() {
        let textarea = document.querySelector('.autoTextarea');
        if (textarea) {
            textarea.style.height = 'auto';
            let height = textarea.scrollHeight;  // 높이
            textarea.style.height = `${height + 8}px`;
        }  // textarea 초기 높이 지정
    }

    useEffect(() => {
        startNewMemo();  // 출생시점에 startNewMemo 한번 실행.
    }, []);

    // new는 다른 용도와는 다르게, 애초에 빈값이므로 value 속성을 삭제해주어야 인풋으로 값이 적혀진다. 예시로 useState("") 로 시작해버리면 값이 안적혀진다.
    let purposeComponent =
        <div>
            <div className="memoTitle">
                <input type="text" onChange={handleChangeTitle} placeholder="제목을 입력해주세요."
                    style={{ width: "38vw", textAlign: "center", paddingTop: "4px", paddingBottom: "4px", border: "1px solid #463f3a", borderRadius: "5px", backgroundColor: "#f4f3ee" }} />
            </div>
            <hr></hr>
            <div className="memoContent">
                <textarea className="autoTextarea" onChange={handleChangeContent} placeholder="내용을 입력해주세요."
                    style={{ width: "99.2%", resize: "none", minHeight: "calc(100vh - 271px - 38px)", paddingTop: "5px", paddingBottom: "5px", border: "1px solid #463f3a", borderRadius: "5px", backgroundColor: "#f4f3ee" }}
                    onKeyDown={(event) => autoResizeAndTapkeyTextarea(event)} onKeyUp={autoResizeTextarea} />
            </div>
        </div>

    return (
        <div>
            <NewMemoNav userId={userId} title={titleValue} content={contentValue} isGroup={isGroup} friendList={friendList} />
            <OneMemoWrapper>
                {purposeComponent}
            </OneMemoWrapper>
        </div>
    );
}

export default NewMemoPage;