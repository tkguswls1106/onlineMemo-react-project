import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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

    const { memoId } = useParams();

    const baseUrl = "http://localhost:8080";

    const [memo, setMemo] = useState();
    const [isStar, setIsStar] = useState();

    async function getMemo() {  // 해당 사용자의 메모 1개 조회
        await axios
            .get(baseUrl + `/memos/${memoId}`)
            .then((response) => {
                setMemo(response.data);
                setIsStar(response.data.isStar);
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        getMemo();  // 출생시점에 getMemo 한번 실행.
    }, []);

    const handleIsStarClick = async (id, e) => {  // 화살표함수로 선언하여 이벤트 사용시 바인딩되도록 함.
        e.preventDefault();  // 리프레쉬 방지 (spa로서)

        setIsStar((isStar) => !isStar);  // toggle

        await axios
            .put(baseUrl + `/memos/${memo.Id}/star`, {
                isStar: isStar
            })
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    let isStarButton;
    if (memo.memoHasUsersCount > 1) {  // 개인메모가 아닌 공동메모일 경우에는, 별이 아닌 다른 그림을 보여주어 즐겨찾기 기능 사용불가하도록 해제시킴.
        isStarButton = <i className="fa fa-users" aria-hidden="true"></i>;
    }
    else {  // 개인메모일 경우에는, 별 그림을 보여주어 즐겨찾기 기능 사용가능하도록 함.
        {isStar
            ? isStarButton = <i className="fa fa-star" aria-hidden="true" onClick={handleIsStarClick}></i>  // isStar이 1이면 꽉찬 별 버튼
            : isStarButton = <i className="fa fa-star-o" aria-hidden="true" onClick={handleIsStarClick}></i>  // isStar이 0이먄 속이빈 별 버튼
        }
    }

    return (
        <Wrapper>
            {isStarButton}
            {memo.title}
            {memo.modifiedDate}
            {memo.userResponseDtos.map((user) => {
                return (
                    <ul style={ memo.memoHasUsersCount == 1 && {visibility:"hidden"}}>
                        <li style={{ listStyleImage: URL("./../../assets/images/user.png")}}>
                            {user.username}
                        </li>
                    </ul>
                );
            })}
            <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
        </Wrapper>
    );
}

export default MemoListItem;