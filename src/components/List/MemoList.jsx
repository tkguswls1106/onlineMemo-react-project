import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from 'axios'
import MemoListItem from "./MemoListItem";
import IsStarButton from "../UI/IsStarButton";
import MemoOptionButton from "../UI/MemoOptionButton";

const MemosWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    & > * {  // &는 현재 태그인 Wrapper 태그를 의미하고, *는 전체를 의미하므로, & > * 는 Wrapper 태그에 한단계 밑부분 전체의 자식 선택자 태그들을 범위로 지정한것이다.
        :not(:last-child) {  // Wrapper 태그에 한단계 밑부분 전체의 자식 선택자 태그들중에서 가장 마지막 자식 선택자를 제외한 모든 자식 태그들을 범위로 지정한것이다.
            margin-bottom: 6px;
        }
    }
`;

const MemoItemsWrapper = styled.div`
    width: calc(100% - 36px);
    padding: 12.5px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    background: #FEF5C6;
    border-bottom: 2.2px solid #463f3a;
    box-shadow: 0px 0.7px;
    border-radius: 9px;
    cursor: pointer;
    :hover {
        background: #faeb9e;
    }

    .fa-users {
        font-size: 1.7rem;
        color: #a14e1b;
    }
    .fa-star {
        font-size: 1.7rem;
        color: orange;

        :hover {
            cursor: grab;
        }
    }
    .fa-star-o {
        font-size: 1.7rem;
        color: orange;

        :hover {
            cursor: grab;
        }
    }
    .fa-ellipsis-v {
        font-size: 1.7rem;
        color: #463f3a;

        :hover {
            cursor: grab;
        }
    }
`;

function MemoList(props) {
    const { userId } = props;

    // const baseUrl = "http://localhost:8080";

    const [memos, setMemos] = useState();

    async function getMemos() {  // 해당 사용자의 모든 메모 리스트 조회 (초기 메인 화면)
        await axios
            .get(`/users/${userId}/memos`)
            .then((response) => {
                setMemos(response.data.data);
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        getMemos();  // 출생시점에 getMemos() 한번 실행.
    }, []);

    return (
        <MemosWrapper>
            {memos && memos.map((memo) => {
                return (
                    <MemoItemsWrapper key={memo.id}>
                        <IsStarButton memoId={memo.id} style={{ flexGrow: "4" }} />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Link style={{ textDecoration: "none", flexGrow: "8" }} to={`/memos/${memo.id}`}>
                            <MemoListItem memoId={memo.id} /> 
                        </Link>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <MemoOptionButton memoHasUsersCount={memo.memoHasUsersCount} style={{ flexGrow: "4" }} />
                    </MemoItemsWrapper>
                );
            })}
        </MemosWrapper>
    );
}

export default MemoList;