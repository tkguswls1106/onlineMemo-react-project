import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import '../../App.css';
import MainPage from "../../pages/Memo/MemoListPage";

const Button = styled.button`
    background-color: #645b56;
    color: white;
    border-radius: 5px;
    font-family: "jua";
    font-size: 1.7rem;

    &:hover {
        cursor: pointer;
        background-color: #4a433f;
    }
`;

function SortMemo(props) {
    const navigate = useNavigate();

    const { userId } = props;

    const [value, setValue] = useState('all-memo');

    const handleChange = (event) => {
        setValue(event.target.value);
    }

    const handleSortClick = (event) => {
        navigate(`/users/${userId}/memos?order=${value}`);
    }

    return (
        <div>
            <select
                value={value} onChange={handleChange}
                style={{
                    border: "solid 2px #645b56", borderRadius: "3px",
                    height: "23px", weight: "102px", fontSize: "1.5rem", fontFamily: "jua", color: "#463f3a"
                }}
            >
                <option value="all-memo">전체 메모</option>
                <option value="private-memo">개인 메모</option>
                <option value="group-memo">공동 메모</option>
                <option value="star-memo">즐겨찾기 개인메모</option>
            </select>
            &nbsp;<Button onClick={handleSortClick}>정렬</Button>
        </div>
    );
}

export default SortMemo;