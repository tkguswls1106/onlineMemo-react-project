import React, { useEffect } from "react";
import styled from "styled-components";
import '../../App.css';
import { useParams, useLocation } from "react-router-dom";
import BasicWrapper from "../../components/Styled/BasicWrapper";
import SortMemo from "../../components/UI/SortMemo";
import SearchMemo from "../../components/UI/SearchMemo";
import MemoList from "../../components/List/MemoList";
import { CheckToken } from "../../utils/CheckToken";

const DivWrapper = styled.div`
    // 클래스 이름들은 어떠한 역할로 쓰였는지 참고하라고 명시해둔것이다.

    // 이게 flex-container 역할
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: baseline;

    margin-bottom: 11px;

    .flex-item {
        // 이게 flex-item 역할
    }
`;

function MemoListPage(props) {
    const { userId } = useParams();

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const sortValue = searchParams.get('order');
    const searchValue = searchParams.get('search');

    useEffect(() => {
        CheckToken();
    }, []);

    return (
        <BasicWrapper>
            <DivWrapper className="flex-container">
                <SortMemo className="flex-item" userId={userId} />
                <SearchMemo className="flex-item" userId={userId} />
            </DivWrapper>
            <MemoList userId={userId} sortValue={sortValue} searchValue={searchValue} />
        </BasicWrapper>
    );
}

export default MemoListPage;