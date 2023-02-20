import React, { useState, useEffect } from "react";
import { useNavigate ,useParams } from "react-router-dom";
import styled from "styled-components";
import axios from 'axios'

const MemosWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    & > * {  // &는 현재 태그인 Wrapper 태그를 의미하고, *는 전체를 의미하므로, & > * 는 Wrapper 태그에 한단계 밑부분 전체의 자식 선택자 태그들을 범위로 지정한것이다.
        :not(:last-child) {  // Wrapper 태그에 한단계 밑부분 전체의 자식 선택자 태그들중에서 가장 마지막 자식 선택자를 제외한 모든 자식 태그들을 범위로 지정한것이다.
            margin-bottom: 16px;
        }
    }
`;

function MemoViewPage(props) {
    const navigate = useNavigate();

    const { memoId } = useParams();

    const baseUrl = "http://localhost:8080";

    const [memo, setMemo] = useState();

    async function getMemo() {  // 해당 사용자의 메모 1개 조회
        await axios
            .get(baseUrl + `/memos/${memoId}`)
            .then((response) => {
                setMemo(response.data);
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        getMemo();  // 출생시점에 getMemo 한번 실행.
    }, []);

    let deleteButton;
    memo.memoHasUsersCount > 1
        ? deleteButton = <button>그룹 탈퇴</button>  // 개인메모가 아닌 공동메모일 경우, 버튼의 텍스트를 '그룹 탈퇴'로 변경.
        : deleteButton = <button>삭제</button>  // 개인메모일 경우, 버튼의 텍스트를 '삭제'로 변경.

    return (
        <MemosWrapper>
            <i className="fa fa-arrow-left" aria-hidden="true" onClick={() => { navigate('/') }}></i>
            메모 보기
            <button>수정</button>
            {deleteButton}
            {memo.title}
            {memo.content}
        </MemosWrapper>
    );
}

export default MemoViewPage;