import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import styled from "styled-components";
import axios from 'axios'
import OneMemoWrapper from "../../components/Styled/OneMemoWrapper";
import OneMemoNav from "../../components/Navigation/OneMemoNav";

function OneMemoPage(props) {
    const navigate = useNavigate();

    const { memoId } = useParams();

    const location = useLocation();
    const { userId } = location.state;

    // const baseUrl = "http://localhost:8080";

    const [memo, setMemo] = useState();
    const [titleValue, setTitleValue] = useState("");
    const [contentValue, setContentValue] = useState("");
    const [purpose, setPurpose] = useState("read");

    const highPurposeFunction = (text) => {  // 상위 컴포넌트 함수
        setPurpose(text);
    }

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

    async function getMemo() {  // 해당 사용자의 메모 1개 조회
        await axios
            .get(`/memos/${memoId}`)
            .then((response) => {
                setMemo(response.data.data);
                setTitleValue(response.data.data.title);
                setContentValue(response.data.data.content);

                let textarea = document.querySelector('.autoTextarea');
                if (textarea) {
                    textarea.style.height = 'auto';
                    let height = textarea.scrollHeight;  // 높이
                    textarea.style.height = `${height + 8}px`;
                }  // textarea 초기 높이 지정

                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        getMemo();  // 출생시점에 getMemo 한번 실행.
    }, [purpose]);

    let purposeText;
    let purposeComponent;
    if (purpose == "edit") {
        purposeText = "edit";

        purposeComponent =
            <div>
                <div className="memoTitle">
                    <input type="text" value={memo && titleValue} onChange={handleChangeTitle} placeholder="제목을 입력해주세요."
                        style={{ width: "38vw", textAlign: "center", paddingTop: "4px", paddingBottom: "4px", border: "1px solid #463f3a", borderRadius: "5px", backgroundColor: "#f4f3ee" }} />
                </div>
                <hr></hr>
                <div className="memoContent">
                    <textarea className="autoTextarea" value={memo && contentValue} onChange={handleChangeContent} placeholder="내용을 입력해주세요."
                        style={{ width: "99.2%", resize: "none", minHeight: "calc(100vh - 271px - 38px)", paddingTop: "5px", paddingBottom: "5px", border: "1px solid #463f3a", borderRadius: "5px", backgroundColor: "#f4f3ee" }}
                        onKeyDown={(event) => autoResizeAndTapkeyTextarea(event)} onKeyUp={autoResizeTextarea} />
                </div>
            </div>
    }
    else if (purpose == "new") {
        purposeText = "new";
    }
    else {  // (purpose == "read") 일때
        memo && memo.memoHasUsersCount > 1
            ? purposeText = "readGroup"  // 개인메모가 아닌 공동메모일 경우, 버튼의 텍스트를 '그룹 탈퇴'로 변경.
            : purposeText = "readPrivate";  // 개인메모일 경우, 버튼의 텍스트를 '삭제'로 변경.

        purposeComponent =
            <div>
                <div className="memoTitle">{memo && memo.title}</div>
                <hr></hr>
                <div className="memoContent">{memo && memo.content}</div>
            </div>
    }

    return (
        <div>
            <OneMemoNav purpose={purposeText} userId={userId} memoId={memoId} title={memo && titleValue} content={memo && contentValue} propPurposeFunction={highPurposeFunction} />
            <OneMemoWrapper>
                {purposeComponent}
            </OneMemoWrapper>
        </div>
    );
}

export default OneMemoPage;