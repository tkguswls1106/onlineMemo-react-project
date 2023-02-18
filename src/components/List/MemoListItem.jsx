import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from 'axios'

const Wrapper = styled.div`
    width: calc(100% - 32px);
    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    border: 1px solid grey;
    border-radius: 8px;
    cursor: pointer;
    background: white;
    :hover {
        background: lightgrey;
    }
`;

const TitleText = styled.p`
    font-size: 20px;
    font-weight: 500;
`;

function MemoListItem(props) {

    const baseUrl = "http://localhost:8080";

    const [memo, setMemo] = useState();
    const [isStar, setIsStar] = useState();

    useEffect(() => {  // 출생(mount)과, '함수 컴포넌트 리렌더링'시 인생(update) 시점에 실행.
        setMemo(props.memo);
        setIsStar(props.memo.isStar);
    });

    useEffect(() => {
        setMemo(props.memo);  // 출생시점에 setMemo 한번 실행.
        setIsStar(props.memo.isStar);  // 출생시점에 IsStar 한번 실행.
    }, []);

    const handleIsStarClick = async (id, e) => {
        e.preventDefault();

        setIsStar((isStar) => !isStar);  // toggle

        await axios
            .put(baseUrl + "/memos/" + memo.id + "star", {
                isStar: isStar
            })
            .then((response) => {
            })
            .catch((error) => {
                console.log(error);
            })
    }

    let isStarButton;
    if (memo.memoHasUsersCount > 1) {
        isStarButton = <i className="fa fa-users" aria-hidden="true"></i>;
    }
    else {
        {isStar
            ? isStarButton = <i className="fa fa-star" aria-hidden="true" onClick={handleIsStarClick}></i>  // isStar이 1이면 꽉찬 별 버튼
            : isStarButton = <i className="fa fa-star-o" aria-hidden="true" onClick={handleIsStarClick}></i>  // isStar이 0이먄 속이빈 별 버튼
        }
    }

    return (
        <Wrapper onClick={props.onClick}>
            {/* <TitleText>{post.title}</TitleText> */}
            <isStarButton />
            {memo.title}
            {memo.modifiedDate}
            {memo.userResponseDtos.map((user) => {
                return (
                    user.username + " "
                );
            })}
            <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
        </Wrapper>
    );
}

export default MemoListItem;