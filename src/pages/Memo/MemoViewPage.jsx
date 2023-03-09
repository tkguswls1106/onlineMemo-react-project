import React, { useState, useEffect } from "react";
import { useNavigate ,useParams } from "react-router-dom";
import styled from "styled-components";
import axios from 'axios'
import OneMemoWrapper from "../../components/Styled/OneMemoWrapper";

// const DivWrapper = styled.div`
//     // 클래스 이름들은 어떠한 역할로 쓰였는지 참고하라고 명시해둔것이다.

//     // 이게 flex-container 역할
//     display: flex;
//     flex-direction: row;
//     justify-content: space-evenly;
//     align-items: baseline;

//     margin-bottom: 12px;

//     .flex-item {
//         // 이게 flex-item 역할
//     }
// `;

function MemoViewPage(props) {
    const navigate = useNavigate();

    const { memoId } = useParams();

    // const baseUrl = "http://localhost:8080";

    const [memo, setMemo] = useState();

    async function getMemo() {  // 해당 사용자의 메모 1개 조회
        await axios
            .get(`/memos/${memoId}`)
            .then((response) => {
                setMemo(response.data.data);
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        getMemo();  // 출생시점에 getMemo 한번 실행.
    }, []);

    // let deleteButton;
    // memo && memo.memoHasUsersCount > 1
    //     ? deleteButton = <button>그룹 탈퇴</button>  // 개인메모가 아닌 공동메모일 경우, 버튼의 텍스트를 '그룹 탈퇴'로 변경.
    //     : deleteButton = <button>삭제</button>  // 개인메모일 경우, 버튼의 텍스트를 '삭제'로 변경.

    return (
        <OneMemoWrapper>
            {/* <DivWrapper className="flex-container">
                {deleteButton}
            </DivWrapper> */}
            <div className="memoTitle">{memo && memo.title}</div>
            <hr></hr>
            <div className="memoContent">{memo && memo.content}</div>
        </OneMemoWrapper>
    );
}

export default MemoViewPage;