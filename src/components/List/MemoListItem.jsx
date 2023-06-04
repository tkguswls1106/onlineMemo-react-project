import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from 'axios'
import { CheckToken } from "../../utils/CheckToken";

const TitleDateUserWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;

    color: #463f3a;
`;

const TitleDateWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    height: 37px;
    flex-wrap: nowrap;
    justify-content: space-between;

    .titleDiv {
        font-size: 1.8rem;

        height: 18.6px;
        overflow: hidden;
    }

    .dateDiv {
        font-size: 1.13rem;

        height: 13.1px;
    }
`;

const UserWrapper = styled.div`
    font-size: 1.25rem;
    color: #a14e1b;

    height: 37px;
    overflow: auto;

    &::-webkit-scrollbar {
        width: 5px;
        background-color: lightgray;
        border-radius: 4px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: gray;
        border-radius: 4px;
    }

    .user-ul {
        list-style-type: none;
        margin-top: 5px;
        margin-bottom: 5px;
        padding-left: 30px;

        :first-child {
            margin-top: 2px;
        }
        :last-child {
            margin-bottom: 2px;
        }
    }
    .user-li:before {
        content: "\f007";
        font-family: "FontAwesome";
    }
`;

function MemoListItem(props) {
    const { memoId } = props;

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
        CheckToken();

        getMemo();  // 출생시점에 getMemo 한번 실행.
    }, []);

    return (
        <TitleDateUserWrapper>
            <TitleDateWrapper>
                <div className="titleDiv">{memo && memo.title}</div>
                <div className="dateDiv">{memo && memo.modifiedDate}</div>
            </TitleDateWrapper>
            <UserWrapper>
                {memo && memo.userResponseDtos.map((user) => {
                    return (
                        <ul key={user.id} className="user-ul" style={memo.memoHasUsersCount == 1 ? { visibility: "hidden" } : { visibility: "visible" }}>
                            <li className="user-li">
                                &nbsp;{user.username}&nbsp;
                            </li>
                        </ul>
                    );
                })}
            </UserWrapper>
        </TitleDateUserWrapper>
    );
}

export default MemoListItem;