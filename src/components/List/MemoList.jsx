import React, { useState, useEffect, useRef } from "react";
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

const NoneSearch = styled.div`
    #noneResult {
        display: none;

        margin-top: 11.5px;
        word-break: keep-all;
        text-align: center;
        font-size: 1.43rem;
        line-height: 127%;

        .fa-times-circle {
            font-size: 4rem;
        }

        & > span {
            color: red;
        }
    }
`;

function MemoList(props) {
    const { userId, sortValue, searchValue } = props;

    // const baseUrl = "http://localhost:8080";

    const [memos, setMemos] = useState();

    async function getMemos() {  // 해당 사용자의 모든 메모 리스트 조회 (초기 메인 화면)
        await axios
            .get(`/users/${userId}/memos`)
            .then((response) => {
                setMemos(response.data.data);
                console.log(response);

                var result = document.getElementById("noneResult");
                result.style.display = 'none';
            })
            .catch((error) => {
                console.log(error);
            })
    }

    async function sortMemos() {  // 메모들 정렬해서 조회
        await axios
            .get(`/users/${userId}/memos?order=${sortValue}`)
            .then((response) => {
                setMemos(response.data.data);
                console.log(response);

                var result = document.getElementById("noneResult");
                result.style.display = 'none';
            })
            .catch((error) => {
                console.log(error);
            })
    }

    async function searchMemos() {  // 메모들 검색해서 조회
        await axios
            .get(`/users/${userId}/memos?search=${searchValue}`)
            .then((response) => {
                setMemos(response.data.data);
                console.log(response);

                if (Object.keys(response.data.data).length == 0) {  // 검색 결과가 0개일 경우
                    // alert("검색하신 메모는 존재하지 않습니다.");
                    var result = document.getElementById("noneResult");
                    result.style.display = 'block';
                }
                else {
                    var result = document.getElementById("noneResult");
                    result.style.display = 'none';
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {  // 출생시점과, sortValue 또는 searchValue 의 값이 변경될때 실행.
        if (sortValue == null && searchValue == null) {
            getMemos();
        }
        else if (sortValue != null) {
            sortMemos();
        }
        else if (searchValue != null) {
            searchMemos();
        }
    }, [sortValue, searchValue]);

    return (
        <MemosWrapper>
            <NoneSearch>
                <div id="noneResult">
                    <span><i className="fa fa-times-circle" aria-hidden="true"></i></span><div style={{ lineHeight: "45%" }}><br></br></div>
                    검색하신 <strong>&#39;{searchValue}&#39;</strong>을 포함하는 <span>메모가 존재하지 않습니다.</span><br></br>
                    제목 또는 내용에 포함된 키워드로 <span>다시 검색해주십시오.</span>
                </div>
            </NoneSearch>
            {memos && memos.map((memo) => {
                return (
                    <MemoItemsWrapper key={memo.id}>
                        <IsStarButton memoId={memo.id} style={{ flexGrow: "4" }} />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Link style={{ textDecoration: "none", flexGrow: "8" }} to={`/memos/${memo.id}`} state={{ userId: userId }}>
                            <MemoListItem memoId={memo.id} /> 
                        </Link>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <MemoOptionButton memoHasUsersCount={memo.memoHasUsersCount} style={{ flexGrow: "4" }} userId={userId} memoId={memo.id} rerendering={getMemos} />
                    </MemoItemsWrapper>
                );
            })}
        </MemosWrapper>
    );
}

export default MemoList;