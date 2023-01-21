import React from "react";
import styled from "styled-components";
import '../../App.css';
import { useNavigate } from "react-router-dom";
import BasicWrapper from "../../components/Styled/BasicWrapper";
import SortMemo from "../../components/UI/SortMemo";
import SearchMemo from "../../components/UI/SearchMemo";

const DivWrapper = styled.div`
    // 클래스 이름들은 어떠한 역할로 쓰였는지 참고하라고 명시해둔것이다.

    // 이게 flex-container 역할
    display: flex;
    flex-direction: row;
    justify-content: space-around;

    .flex-item {
        // 이게 flex-item 역할
    }
`;

function MainPage(props) {
    const navigate = useNavigate();

    return (
        <BasicWrapper>
            <DivWrapper className="flex-container">
                <SortMemo className="flex-item"/>
                <SearchMemo className="flex-item" />
            </DivWrapper>
        </BasicWrapper>
    );
}

export default MainPage;