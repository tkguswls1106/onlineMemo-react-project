import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from 'axios'
import MemoListItem from "./MemoListItem";

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

function MemoList(props) {
    //const { memos, onClickItem } = props;

    const baseUrl = "http://localhost:8080";

    const [memos, setMemos] = useState();

    useEffect(() => {
        getMemos();  // 출생시점에 getMemos() 한번 실행.
    }, []);

    async function getMemos() {
        await axios
            .get(baseUrl + "/users/" + { userId } + "/memos")
            .then((response) => {
                setMemos(response);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const handleMemoClick = async (id, e) => {
        e.preventDefault();

        await axios
            .get(baseUrl + "/memos/" + {id})
            .then((response) => {
                return (
                    <MemoViewPage memo={response} />
                );
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <MemosWrapper>
            {memos.map((memo) => {
                return (
                    <MemoListItem
                        key={memo.id}
                        memo={memo}
                        onClick={(event) => {
                            handleMemoClick(memo.id, event);
                        }}
                    />
                );
            })}
        </MemosWrapper>
    );
}

export default MemoList;